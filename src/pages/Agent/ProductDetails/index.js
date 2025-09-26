import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Linking,
} from 'react-native';
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import {FlatList} from 'react-native';
import ContactListItem from '../../../components/contactListItem';
import DepartmentItem from '../../../components/DepartmentItem';
import {styles} from './styles';
import ProductListItem from '../../../components/ProductListItem';
import Motorplus from '../../../icons/Motorplus.png'; // Replace with the actual logo path
import MotorLady from '../../../icons/MotorLady.png'; // Replace with the actual logo path
import OtherListItem from '../../../components/OtherListItem';
import {useGetProductListQuery} from '../../../redux/services/productSlice';
import LoadingScreen from '../../../components/LoadingScreen';
import Logo from '../../../icons/Logo.png'; // Replace with the actual logo path
import youtube from '../../../icons/youtubeIcons.png'; // Replace with the actual logo path

import ReadMore from 'react-native-read-more-text';
import {Modal, PaperProvider} from 'react-native-paper';

const window = Dimensions.get('window');

export default function ProductDetails({navigation, route}) {
  const {item} = route.params; // Extract item from params

  // console.log('itemvvvvvv', item);
  const [SelectedType, setSelectedType] = useState(1);
  const {data: products, isLoading, error} = useGetProductListQuery();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(productList);
  const [brochureList, setBrochureList] = useState([]);

  const renderItem = ({item}) => <ProductListItem item={item} />;

  const renderDepartmentItem = ({item}) => <OtherListItem item={item} />;
  // console.log('item?.imageUrl', item?.imageUrl);

  useEffect(() => {
    const list = [];

    if (item?.brochEnglish) {
      list.push({
        title: 'English PDF',
        url: item.brochEnglish,
        onPress: () => item.brochEnglish && Linking.openURL(item.brochEnglish),
      });
    }
    if (item?.brochSinhala) {
      list.push({
        title: 'Sinhala PDF',
        url: item.brochSinhala,
        onPress: () => item.brochSinhala && Linking.openURL(item.brochSinhala),
      });
    }
    if (item?.brochTamil) {
      list.push({
        title: 'Tamil PDF',
        url: item.brochTamil,
        onPress: () => item.brochTamil && Linking.openURL(item.brochTamil),
      });
    }
    // if (item?.documentUrl) {
    //   list.push({
    //     title: 'PDF',
    //     url: item.documentUrl,
    //     onPress: () => item.documentUrl && Linking.openURL(item.documentUrl),
    //   });
    // }

    setBrochureList(list); // remove current items and set new
  }, [item]);

  useEffect(() => {
    // When the component mounts or when products are fetched, show all data initially
    setFilteredData(products?.data || []);
  }, [products]);

  useEffect(() => {
    if (searchText == '') {
      setFilteredData(products?.data || []);
    }
  }, [searchText]);

  const handleSearch = () => {
    setSearchText(searchText);
    if (searchText === '') {
      setFilteredData(products?.data || []); // Reset to show all products
    } else {
      // console.log('searchText', searchText);
      // return;
      const filtered = products?.data?.filter(item =>
        item.productName.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  const otherList = filteredData?.filter(item => item.documentUrl);
  const productList = filteredData?.filter(item => !item.documentUrl);

  const renderTruncatedFooter = handlePress => (
    <Text style={{color: COLORS.primary, marginTop: 5}} onPress={handlePress}>
      Show more
    </Text>
  );
  const renderRevealedFooter = handlePress => (
    <Text style={{color: COLORS.primary, marginTop: 5}} onPress={handlePress}>
      Show less
    </Text>
  );
  // console.log('brochureList', brochureList);
  return (
    <PaperProvider>
      <View style={Styles.container}>
        <HeaderBackground />
        <Header
          Title="Product Portfolio"
          onPress={() => navigation.goBack()}
          haveDownload={brochureList.length > 0}
          downloadItems={brochureList}
          onButton={() => console.log('Button Pressed', item)}
          ButtonTitle={'Download'}
        />
        <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
          <View
            style={{
              alignItems: 'center',
              marginVertical: 10,
              position: 'relative',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                height: window.width * 0.6,
                width: window.width * 0.6,
                borderRadius: 17,
                objectFit: 'contain',
              }}
              source={item?.imageUrl ? {uri: item.imageUrl} : Logo}></Image>
            {/* <TouchableOpacity
              onPress={() => Linking.openURL(item.englishUrl)}
              style={{
                position: 'absolute',

                alignSelf: 'center',
              }}>
              <Image
                style={{height: 70, width: 70, resizeMode: 'contain'}}
                source={youtube}></Image>
            </TouchableOpacity> */}
            {(item?.englishUrl || item?.tamilUrl || item?.sinhalaUrl) && (
              <TouchableOpacity
                onPress={() => setShowLanguageOptions(true)}
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                }}>
                <Image
                  style={{height: 70, width: 70, resizeMode: 'contain'}}
                  source={youtube}
                />
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              borderRadius: 5,
              backgroundColor: COLORS.primary,
              width: '100%',
              // height: 34,
              justifyContent: 'center',
              paddingHorizontal: 13,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Bold,
                color: COLORS.white,
                fontSize: 16,
              }}>
              {item?.productName}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 20,
              fontFamily: Fonts.Roboto.SemiBold,
              color: COLORS.black,
            }}>
            {item?.shortDesc}
          </Text>

          <Text
            style={{
              marginVertical: 15,
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.primaryGreen,
              fontSize: window.width * 0.036,
            }}>
            Benefits:
          </Text>

          <View style={{marginBottom: 20}}>
            <ReadMore
              numberOfLines={5}
              renderTruncatedFooter={renderTruncatedFooter}
              renderRevealedFooter={renderRevealedFooter}
              onReady={this._handleTextReady}>
              <Text
                style={{
                  marginTop: 10,
                  fontFamily: Fonts.Roboto.SemiBold,
                  color: COLORS.black,
                }}>
                {item?.longDesc}
              </Text>
            </ReadMore>
          </View>
          {/* <Text
          style={{
            marginTop: 10,
            fontFamily: Fonts.Roboto.SemiBold,
            color: COLORS.black,
          }}>
          {apiText.split('\n').map((line, index) => (
            <Text key={index}>
              {line.trim() !== '' ? `\u2022 ${line.trim()}\n` : ''}
            </Text>
          ))}
        </Text> */}
        </ScrollView>
      </View>
      <Modal
        transparent
        animationType="fade"
        visible={showLanguageOptions}
        onRequestClose={() => setShowLanguageOptions(false)}>
        <View
          style={{
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 20,
              borderRadius: 10,
              width: '80%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: COLORS.darkText,
                marginBottom: 20,
                alignSelf: 'center',
              }}>
              Select a Language
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              {item?.englishUrl && (
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => {
                    Linking.openURL(item.englishUrl);
                    setShowLanguageOptions(false);
                  }}>
                  <Image
                    style={{height: 50, width: 50, resizeMode: 'contain'}}
                    source={youtube}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      paddingTop: 3,
                      fontFamily: Fonts.Roboto.SemiBold,
                      color: COLORS.darkText,
                    }}>
                    English
                  </Text>
                </TouchableOpacity>
              )}

              {item?.tamilUrl && (
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => {
                    Linking.openURL(item.tamilUrl);
                    setShowLanguageOptions(false);
                  }}>
                  <Image
                    style={{height: 50, width: 50, resizeMode: 'contain'}}
                    source={youtube}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      paddingTop: 3,
                      fontFamily: Fonts.Roboto.SemiBold,
                      color: COLORS.darkText,
                    }}>
                    Tamil
                  </Text>
                </TouchableOpacity>
              )}

              {item?.sinhalaUrl && (
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => {
                    Linking.openURL(item.sinhalaUrl);
                    setShowLanguageOptions(false);
                  }}>
                  <Image
                    style={{height: 50, width: 50, resizeMode: 'contain'}}
                    source={youtube}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      paddingTop: 3,
                      fontFamily: Fonts.Roboto.SemiBold,
                      color: COLORS.darkText,
                    }}>
                    Sinhala
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity onPress={() => setShowLanguageOptions(false)}>
              <Text
                style={{
                  color: 'red',

                  marginTop: 20,
                  marginRight: 35,
                  textAlign: 'right',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </PaperProvider>
  );
}

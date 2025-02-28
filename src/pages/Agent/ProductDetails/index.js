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
import ReadMore from 'react-native-read-more-text';

const window = Dimensions.get('window');

export default function ProductDetails({navigation, route}) {
  const {item} = route.params; // Extract item from params
  console.log('itemvvvvvv', item);
  const [SelectedType, setSelectedType] = useState(1);
  const {data: products, isLoading, error} = useGetProductListQuery();

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(productList);

  const renderItem = ({item}) => <ProductListItem item={item} />;

  const renderDepartmentItem = ({item}) => <OtherListItem item={item} />;

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
      console.log('searchText', searchText);
      // return;
      const filtered = products?.data?.filter(item =>
        item.productName.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  const otherList = filteredData?.filter(item => item.documentUrl);
  const productList = filteredData?.filter(item => !item.documentUrl);

  _renderRevealedFooter = handlePress => {
    return (
      <Text style={{color: COLORS.primary, marginTop: 5}} onPress={handlePress}>
        Show less
      </Text>
    );
  };
  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Product portfolio" onPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Image
            style={{
              height: window.width * 0.6,
              width: window.width * 0.6,
              borderRadius: 17,
              objectFit: 'contain',
            }}
            source={{uri: item?.imageUrl}}></Image>
        </View>

        <View
          style={{
            borderRadius: 5,
            backgroundColor: COLORS.primary,
            width: '100%',
            height: 34,
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
            renderTruncatedFooter={this._renderTruncatedFooter}
            renderRevealedFooter={this._renderRevealedFooter}
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
  );
}

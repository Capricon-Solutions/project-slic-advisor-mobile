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

const window = Dimensions.get('window');

export default function ProductPortfolio({navigation}) {
  const [SelectedType, setSelectedType] = useState(1);
  const {data: products, isLoading, error} = useGetProductListQuery();

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(productList);

  const renderItem = ({item}) => (
    <ProductListItem
      item={item}
      onPress={() => {
        console.log('Navigating with item:', item); // Debugging
        navigation.navigate('ProductDetails', {item});
      }}
    />
  );

  const renderDepartmentItem = ({item}) => (
    <OtherListItem
      item={item}
      onPress={() => navigation.navigate('ProductDetails', {item})}
    />
  );

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
  console.log('res', products);
  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Product portfolio" onPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
        <View style={styles.mainWrap}>
          <TouchableOpacity
            onPress={() => setSelectedType(1)}
            style={{
              backgroundColor:
                SelectedType == 1 ? COLORS.primary : COLORS.white,
              borderRadius: 12,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Text
              style={{
                color: SelectedType == 1 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              Product
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(2)}
            style={{
              backgroundColor:
                SelectedType == 2 ? COLORS.primary : COLORS.white,
              borderRadius: 12,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: SelectedType == 2 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              Other
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrap}>
          <TextInput
            style={styles.textInput}
            onChangeText={v => setSearchText(v)}
            placeholder="Quick Search"
          />
          <TouchableOpacity
            onPress={() => handleSearch()}
            style={styles.searchButton}>
            <Octicons name="search" color={COLORS.white} size={20} />
          </TouchableOpacity>
        </View>

        {isLoading == true ? (
          <LoadingScreen />
        ) : (
          <View>
            {SelectedType == 1 ? (
              <FlatList
                data={productList}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  fadeDuration: 1000,
                  backgroundColor: 'transparent',
                  paddingBottom: window.height * 0.25,
                }}
                renderItem={renderItem}
                // keyExtractor={item => item.id.toString()}
              />
            ) : (
              <FlatList
                data={otherList}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  fadeDuration: 1000,
                  backgroundColor: 'transparent',
                  paddingBottom: window.height * 0.25,
                }}
                renderItem={renderDepartmentItem}
                // keyExtractor={item => item.id.toString()}
              />
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

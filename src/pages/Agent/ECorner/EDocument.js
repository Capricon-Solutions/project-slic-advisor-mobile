import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './styles';
import LoadingScreen from '../../../components/LoadingScreen';
import EDocItems from '../../../components/EDocItems';
import {useGetEDocumentQuery} from '../../../redux/services/eCornerSlice';

const window = Dimensions.get('window');

export default function EDocument({navigation}) {
  const {data: EDocument, isLoading} = useGetEDocumentQuery();
  const [SelectedType, setSelectedType] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const getCurrentData = () => {
    if (!EDocument?.data) return [];
    if (SelectedType === 1) return EDocument.data.motor;
    if (SelectedType === 2) return EDocument.data.nonMotor;
    if (SelectedType === 3) return EDocument.data.claims;
    return [];
  };

  useEffect(() => {
    const originalData = getCurrentData();

    if (searchText.trim() === '') {
      setFilteredData(originalData);
    } else {
      const filtered = originalData.filter(item =>
        item?.docName?.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  }, [searchText, SelectedType, EDocument]);

  const renderDocItems = ({item}) => (
    <EDocItems item={item} navigation={navigation} />
  );

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="E-Document" onPress={() => navigation.goBack()} />

      <View style={{paddingHorizontal: 5}}>
        {/* Search Bar */}
        <View style={[styles.searchWrap, {marginHorizontal: 15}]}>
          <TextInput
            style={styles.textInput}
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholder="Search document name..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={() => {}} style={styles.searchButton}>
            <Feather name="search" color={COLORS.white} size={20} />
          </TouchableOpacity>
        </View>

        {/* Type Tabs */}
        <View style={[styles.mainWrap, {marginHorizontal: 15}]}>
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
              Motor
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
              Non-Motor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(3)}
            style={{
              backgroundColor:
                SelectedType == 3 ? COLORS.primary : COLORS.white,
              borderRadius: 12,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: SelectedType == 3 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              Claims
            </Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text
          style={{
            paddingHorizontal: 20,
            fontFamily: Fonts.Roboto.Bold,
            color: COLORS.textColor,
            fontSize: 15,
            marginTop: 5,
          }}>
          {SelectedType === 1
            ? 'Motor'
            : SelectedType === 2
            ? 'Non-Motor'
            : 'Claims'}{' '}
          Documents
        </Text>

        {/* Loader or FlatList */}
        <View>
          {isLoading ? (
            <View
              style={{
                position: 'absolute',
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LoadingScreen />
            </View>
          ) : (
            <FlatList
              data={filteredData}
              renderItem={renderDocItems}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                backgroundColor: 'transparent',
                paddingBottom: window.height * 0.25,
                paddingHorizontal: 15,
              }}
              ListEmptyComponent={
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 40,
                    color: '#888',
                    fontFamily: Fonts.Roboto.Medium,
                  }}>
                  No documents found.
                </Text>
              }
            />
          )}
        </View>
      </View>
    </View>
  );
}

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
  SafeAreaView,
  Share,
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
import LoadingScreen from '../../../components/LoadingScreen';
import Feather from 'react-native-vector-icons/Feather';
import LoaderKit from 'react-native-loader-kit';

import {
  useGetBranchesQuery,
  useGetDepartmentQuery,
} from '../../../redux/services/contactSlice';
import EconerItems from '../../../components/EconerItems';
import EDocItems from '../../../components/EDocItems';
import ELetterItems from '../../../components/ELetterItems';
import MonthYearPicker from '../../../components/MonthYearPicker';
import {useGetmotorRenewalsListQuery} from '../../../redux/services/policyRenewalsSlice';
import moment from 'moment';
import {useSelector} from 'react-redux';
const window = Dimensions.get('window');

const data = [
  {
    id: 1,
    type: 'Claim Form',
    conunt: '827',
    download: false,
    Share: false,
  },
  {
    id: 2,
    type: 'Drivers Statement',
    conunt: '827',
    download: false,
    Share: false,
  },
  {
    id: 3,
    type: 'Drivers Statement',
    conunt: '827',
    download: false,
    Share: false,
  },
  {
    id: 4,
    type: 'Drivers Statement',
    conunt: '827',
    download: true,
    Share: true,
  },
];

export default function MotorRenewalLetter({navigation}) {
  const renderLetterItems = ({item}) => (
    <ELetterItems item={item} navigation={navigation} />
  );
  const [searchText, setSearchText] = useState('');
  const userCode = useSelector(state => state.Profile.userCode);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const handleSearch = v => {
    const query = v.toLowerCase();

    const filtered = motorRenewalsList?.data?.motorRenewals?.filter(
      item =>
        item.policyNo?.toLowerCase().includes(query) ||
        item.customerName
          ?.toLowerCase()
          .split(/\W+/)
          .some(word => word.startsWith(query)) ||
        item.vehicleNo?.toLowerCase().includes(query),
    );

    setFilteredData(filtered);
  };

  function handleClear(v) {
    if (v === '') {
      setFilteredData(motorRenewalsList?.data.motorRenewals);
    } else {
      handleSearch(v);
    }
  }
  // const currentYear = new Date().getFullYear();
  const lastMonthStart = moment()
    .subtract(3, 'month')
    .startOf('month')
    .format('YYYY-MM-DD');
  const currentMonthEnd = moment().endOf('month').format('YYYY-MM-DD');
  const [fromDate, toDate] = selectedDate
    ? selectedDate.split(' to ')
    : [lastMonthStart, currentMonthEnd];

  const {
    data: motorRenewalsList,
    error,
    isFetching,
    refetch,
  } = useGetmotorRenewalsListQuery({
    id: usertype == 2 ? personalCode : userCode, // Dynamic ID
    fromDate: fromDate,
    toDate: toDate,
  });

  useEffect(() => {
    refetch;
    setFilteredData(motorRenewalsList?.data?.motorRenewals);
    console.log(
      'motorRenewalsList?.data',
      motorRenewalsList?.data?.motorRenewals,
    );
  }, [motorRenewalsList]);
  return (
    <SafeAreaView style={Styles.container}>
      <MonthYearPicker
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={v => setSelectedDate(v)}
        onSelectText={v => setSelectedDate(v)}
      />
      <HeaderBackground />
      <Header
        Title="Motor Renewal Letter"
        onPress={() => navigation.goBack()}
      />
      <View style={{paddingHorizontal: 5}}>
        <View
          style={[
            styles.searchWrap,
            {marginHorizontal: 15, marginVertical: 3},
          ]}>
          <TextInput
            style={styles.textInput}
            value={searchText}
            onChangeText={v => {
              setSearchText(v);
              handleClear(v); // Now works with latest value
            }}
            placeholder="Quick search"
          />
          <TouchableOpacity
            onPress={() => handleSearch(searchText)}
            style={styles.searchButton}>
            <Feather name="search" color={COLORS.white} size={20} />
          </TouchableOpacity>
        </View>
        <View
          style={[styles.searchWrap, {marginHorizontal: 15, marginBottom: 3}]}>
          <TextInput
            style={styles.textInput}
            value={fromDate + ' - ' + toDate}
            // onChangeText={v => setSearchText(v)}
            placeholder="11/2024"
          />
          <TouchableOpacity
            onPress={() => setPickerVisible(true)}
            style={styles.searchButton}>
            <Feather name="calendar" color={COLORS.white} size={20} />
          </TouchableOpacity>
        </View>

        <View>
          {filteredData?.length < 1 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '80%',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.Roboto?.Bold,
                  fontSize: window.width * 0.04,
                  color: COLORS.grayText,
                }}>
                {'No letters available.!'}
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredData}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                fadeDuration: 1000,
                backgroundColor: 'transparent',
                paddingBottom: window.height * 0.5,
                paddingHorizontal: 15,
              }}
              // ListFooterComponent={<View style={{height: 80}} />}
              renderItem={renderLetterItems}
              // keyExtractor={item => item.id.toString()}
            />
          )}
        </View>
      </View>
      {isFetching && (
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            width: '100%',
            height: '100%',
          }}>
          <LoaderKit
            style={{width: 50, height: 50}}
            name={'LineScalePulseOutRapid'} // Optional: see list of animations below
            color={COLORS.grayText} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
          />
        </View>
      )}
    </SafeAreaView>
  );
}

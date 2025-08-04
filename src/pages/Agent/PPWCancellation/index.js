import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './styles';
import LoadingScreen from '../../../components/LoadingScreen';
import TableComponent from '../../../components/TableComponent';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {useGetBranchesQuery} from '../../../redux/services/contactSlice';
import {useSelector} from 'react-redux';
import {
  useGetPPWCanceledListQuery,
  useGetPPWReminderListQuery,
} from '../../../redux/services/ppwCancelationSlice';
import MonthYearPicker from '../../../components/MonthYearPicker';
import moment from 'moment';
import DropdownComponent from '../../../components/DropdownComponent';
import DropdownComponentNoLabel from '../../../components/DropdownComponentNoLabel';
import DropdownFilled from '../../../components/DropdownFilled';

const window = Dimensions.get('window');

export default function PPWCancellation({navigation}) {
  // const {data: branches, isLoading, error} = useGetBranchesQuery();
  const [selectedItem, setSelectedItem] = useState();
  const [selectedValue, setSelectedValue] = useState('M');
  const userCode = useSelector(state => state.Profile.userCode);
  const [SelectedType, setSelectedType] = useState(1);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const tableHead = [
    'Policy No',
    'Customer Name',
    'Vehicle No',
    'Debit Amount',
    'Payment Date',
    'Due Date',
  ];
  const tableHeadNM = [
    'Policy No',
    'Customer Name',
    'Vehicle No',
    'Debit Amount',
    'Payment Date',
    'Due Date',
  ];

  const tableHead2 = [
    'Policy No',
    'Customer Name',
    'Vehicle No',
    'Debit Amount',
    'Payment Date',
    'Cancelled Date',
    'Re-Instate Date',
    'Due Date',
  ];
  const tableHead2NM = [
    'Policy No',
    'Customer Name',
    'Vehicle No',
    'Debit Amount',
    'Payment Date',
    'Cancelled Date',
    'Re-Instate Date',
    'Due Date',
  ];

  const columnWidths = [180, 150, 110, 110, 130, 110];
  const columnWidths2 = [180, 150, 110, 110, 130, 110, 120, 110];
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  console.log('personalCode', personalCode);
  const lastMonthStart = moment()
    .subtract(2, 'month')
    .startOf('month')
    .format('YYYY-MM-DD');
  const currentMonthEnd = moment().endOf('month').format('YYYY-MM-DD');
  console.log('currentMonthEnd', currentMonthEnd);
  const [fromDate, toDate] = selectedDate
    ? selectedDate.split(' to ')
    : [lastMonthStart, currentMonthEnd];

  // const ppwCancelationReminderResponse = useSelector(
  //   state => state.ppwCancelation.ppwCancelationReminderResponse.data,
  // );
  const {
    data: PPWCanceledList,
    error: errorC,
    isFetching: isFetchingC,
  } = useGetPPWCanceledListQuery({
    id: usertype == 2 ? personalCode : userCode, // Dynamic ID
    pType: selectedValue,
    fromDate: fromDate,
    toDate: toDate,
  });

  const {
    data: PPWReminderList,
    error,
    isFetching,
  } = useGetPPWReminderListQuery({
    id: usertype == 2 ? personalCode : userCode, // Dynamic ID
    pType: selectedValue,
    fromDate: fromDate,
    toDate: toDate,
  });
  console.log('PPWReminderList', PPWReminderList);
  const handleSelect = value => {
    setSelectedValue(value);
  };

  useEffect(() => {
    console.log('error', error);
    console.log('errorC', errorC);
  }, [PPWCanceledList, PPWReminderList, error, errorC]);

  const tableData = PPWReminderList?.data?.map(item => [
    item?.policyNo?.toString() ?? 'N/A',
    item?.custName?.toString() ?? 'N/A',
    item?.pmve2?.toString() ?? 'N/A',
    item?.debitAmount?.toString() ?? 'N/A',
    item?.paymentDate?.toString() ?? 'N/A',
    item?.dueDate?.toString() ?? 'N/A',
  ]);

  const tableData2 = PPWCanceledList?.data?.map(item => [
    item?.policyNumber?.toString() ?? 'N/A',
    item?.customerName?.toString() ?? 'N/A',
    item?.vehicleNumber?.toString() ?? 'N/A',
    item?.debitAmount?.toString() ?? 'N/A',
    item?.paymentDate?.toString() ?? 'N/A',
    item?.cancelledDate?.toString() ?? 'N/A',
    item?.reInstateDate?.toString() ?? 'N/A',
    item?.dueDate?.toString() ?? 'N/A',
  ]);

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="PPW Cancellation" onPress={() => navigation.goBack()} />
      <MonthYearPicker
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={v => setSelectedDate(v)}
      />
      <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
        <View style={[styles.mainWrap, {marginTop: 5}]}>
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
              Reminders List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedType(2);
              // setSelectedValue('M');
            }}
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
              Cancelled list
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={[styles.searchWrap, {flex: 0.59, marginVertical: 12}]}>
            <TextInput
              value={fromDate + ' - ' + toDate}
              readOnly
              style={styles.textInput}
            />
            <TouchableOpacity
              onPress={() => setPickerVisible(true)}
              style={styles.searchButton}>
              <Feather name="calendar" color={COLORS.white} size={20} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.41, paddingLeft: 2}}>
            {/* <AutocompleteDropdown
              clearOnFocus={true}
              closeOnBlur={true}
              closeOnSubmit={false}
              initialValue="Motor" // Set only the 'id' value here
              onSelectItem={item => {
                if (item) {
                  setSelectedItem(item.id); // Only set 'id' if item is not null or undefined
                }
              }}
              dataSet={[
                {id: 'Motor', title: 'Motor'},
                {id: 'Non-Motor', title: 'Non-Motor'},
              ]}
            /> */}
            <DropdownFilled
              Color={COLORS.white}
              search={false}
              cancelable={true}
              value={selectedValue}
              placeholder={'Select Type'}
              onSelect={handleSelect} // Pass the handleSelect function as a prop
              dropdownData={[
                {label: 'Motor', value: 'M'},
                {label: 'Non-Motor', value: 'G'},
              ]}
            />
          </View>
        </View>
        <View>
          <Text
            style={{
              fontFamily: Fonts.Roboto.SemiBold,
              fontSize: 14,
              marginBottom: 10,
              color: COLORS.borderColor,
            }}>
            (Click on Policy Number to View Details)
          </Text>
        </View>
        <View>
          {SelectedType == 1 ? (
            <View>
              {isFetching == true ? (
                <LoadingScreen />
              ) : (
                <TableComponent
                  Error={'Sorry, No Data Found'}
                  tableHead={selectedValue == 'M' ? tableHead : tableHeadNM}
                  tableData={tableData}
                  navigation={navigation}
                  clickableColumns={[0]}
                  columnWidths={columnWidths}
                  haveTotal={false}
                />
              )}
            </View>
          ) : (
            <View>
              {isFetchingC == true ? (
                <LoadingScreen />
              ) : (
                <TableComponent
                  Error={'Sorry, No Data Found'}
                  tableHead={selectedValue == 'M' ? tableHead2 : tableHead2NM}
                  tableData={tableData2}
                  navigation={navigation}
                  clickableColumns={[0]}
                  columnWidths={columnWidths2}
                  haveTotal={false}
                />
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

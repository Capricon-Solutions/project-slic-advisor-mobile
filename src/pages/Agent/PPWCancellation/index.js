import React, { useEffect, useState } from 'react';
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
import { Styles } from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import LoadingScreen from '../../../components/LoadingScreen';
import TableComponent from '../../../components/TableComponent';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useGetBranchesQuery } from '../../../redux/services/contactSlice';
import { useSelector } from 'react-redux';
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

export default function PPWCancellation({ navigation }) {
  // const {data: branches, isLoading, error} = useGetBranchesQuery();
  const [selectedItem, setSelectedItem] = useState();
  const [selectedValue, setSelectedValue] = useState(null);

  const [SelectedType, setSelectedType] = useState(1);

  const tableHead = [
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

  const columnWidths = [120, 150, 110, 110, 130, 110];
  const columnWidths2 = [120, 150, 110, 110, 130, 110, 120, 110];
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const lastMonthStart = moment()
    .subtract(2, 'month')
    .startOf('month')
    .format('YYYY-MM-DD');
  const currentMonthEnd = moment().endOf('month').format('YYYY-MM-DD');
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
    id: 907719, // Dynamic ID
    pType: selectedValue,
    fromDate: fromDate,
    toDate: toDate,
  });

  const {
    data: PPWReminderList,
    error,
    isFetching,
  } = useGetPPWReminderListQuery({
    id: 907719, // Dynamic ID
    pType: selectedValue,
    fromDate: fromDate,
    toDate: toDate,
  });
  const handleSelect = value => {
    setSelectedValue(value);
  };

  useEffect(() => {
    console.log('error', error);
    console.log('errorC', errorC);
  }, [PPWCanceledList, PPWReminderList, error, errorC]);

  const tableData = PPWReminderList?.data?.map(item => [
    item?.policyNumber.toString() ?? '',
    item?.customerName.toString() ?? '',
    item?.vehicleNumber.toString() ?? '',
    item?.debitAmount.toString() ?? '',
    item?.paymentDate.toString() ?? '',
    item?.dueDate.toString() ?? '',
  ]);

  const tableData2 = PPWCanceledList?.data.map(item => [
    item?.policyNumber.toString() ?? '',
    item?.customerName.toString() ?? '',
    item?.vehicleNumber.toString() ?? '',
    item?.debitAmount.toString() ?? '',
    item?.paymentDate.toString() ?? '',
    item?.cancelledDate.toString() ?? '',
    item?.reInstateDate.toString() ?? '',
    item?.dueDate.toString() ?? '',
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
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
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
              Reminders List
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
          <View style={[styles.searchWrap, { flex: 0.6 }]}>
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
          <View style={{ flex: 0.4, padding: 2 }}>
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
              placeholder={'Select Type'}
              onSelect={handleSelect} // Pass the handleSelect function as a prop
              dropdownData={[
                { label: 'Motor', value: 'Motor' },
                { label: 'Non-Motor', value: 'Non-Motor' },
              ]}
            />
          </View>
        </View>
        <View>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Regular,
              fontSize: 14,
              marginBottom: 10,
            }}>
            (Click on policy Number to view details)
          </Text>
        </View>
        <View>
          {SelectedType == 1 ? (
            <View>
              {isFetching == true ? (
                <LoadingScreen />
              ) : (
                <TableComponent
                  Error={error?.data?.Error}
                  tableHead={tableHead}
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
                  Error={errorC?.data?.Error}
                  tableHead={tableHead2}
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

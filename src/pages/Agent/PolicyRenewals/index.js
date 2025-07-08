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
  ActivityIndicator,
  SafeAreaView, // Added for the loading animation
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
import {useGetBranchesQuery} from '../../../redux/services/contactSlice';
import {useSelector} from 'react-redux';
import {
  useGetmotorRenewalsListQuery,
  useGetnonMotorRenewalsListQuery,
} from '../../../redux/services/policyRenewalsSlice';
import MonthYearPicker from '../../../components/MonthYearPicker';
import moment from 'moment';
import TableComponentPR from '../../../components/TableComponentPR';

const window = Dimensions.get('window');

export default function PolicyRenewals({navigation}) {
  const userCode = useSelector(state => state.Profile.userCode);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const [SelectedType, setSelectedType] = useState(1);
  // const [loading, setLoading] = useState(false); // Loading state

  const tableHead = [
    'Due Date',
    'Customer Name',
    'Vehicle No',
    'Policy No',
    'NCB',
    'Sum Insured',
    'Total Amt',
    'Policy Status',
  ];

  const tableHead2 = [
    'Due Date',
    'Customer Name',
    'Policy No',
    'Policy Type',
    'Sum Insured',
    'Total Amt',
    'Policy Status',
  ];

  const columnWidths = [110, 190, 100, 200, 90, 130, 120, 110];
  const columnWidths2 = [110, 190, 200, 90, 130, 120, 110];
  const [selectedDate, setSelectedDate] = useState(null);
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

  const {
    data: nonmotorRenewalsList,
    errorN,
    isFetching: isFetchingN,
    refetch: refetchN,
  } = useGetnonMotorRenewalsListQuery({
    id: usertype == 2 ? personalCode : userCode, // Dynamic ID
    fromDate: fromDate,
    toDate: toDate,
  });

  const [isPickerVisible, setPickerVisible] = useState(false);
  const nonMotorRenewalsResponse = nonmotorRenewalsList?.data?.nonMotorRenewals;
  const motorRenewalsResponse = motorRenewalsList?.data?.motorRenewals;

  const tableData = motorRenewalsResponse?.map(item => [
    item?.dueDate.toString() ?? '',
    item?.customerName.toString() ?? '',
    item?.vehicleNo.toString() ?? '',
    item?.policyNo.toString() ?? '',
    item?.ncbPerc.toString() ?? '',
    item?.sumInsured != null
      ? Number(item.sumInsured).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : '',
    item?.premiumAmount != null
      ? Number(item.premiumAmount).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : '',
    item?.policyStatus.toString() ?? '',
  ]);

  const tableData2 = nonMotorRenewalsResponse?.map(item => [
    item?.policyEndDate.toString() ?? '',
    item?.customerName.toString() ?? '',
    item?.policyNumber.toString() ?? '',
    item?.policyType.toString() ?? '',
    item?.sumInsured?.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) ?? '',
    item?.totalAmount?.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) ?? '',
    item?.isPaid.toString() ?? '',
  ]);
  return (
    <SafeAreaView style={Styles.container}>
      <MonthYearPicker
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={v => setSelectedDate(v)}
        onSelectText={v => setSelectedDate(v)}
      />
      <HeaderBackground />
      <Header Title="Policy Renewals" onPress={() => navigation.goBack()} />
      <View style={{paddingHorizontal: 20}}>
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
              Motor Renewals
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
              Non-Motor Renewals
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.searchWrap, {marginVertical: 12}]}>
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
        <View>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Regular,
              fontSize: 14,
              marginBottom: 10,
              color: COLORS.borderColor,
            }}>
            (Click on policy Number to view details)
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{paddingBottom: window.height * 0.5}}>
          {SelectedType == 1 ? (
            <View>
              {isFetching == true ? (
                <LoadingScreen />
              ) : (
                <TableComponentPR
                  tableHead={tableHead}
                  tableData={tableData}
                  navigation={navigation}
                  clickableColumns={[3]}
                  columnWidths={columnWidths}
                  haveTotal={false}
                />
              )}
            </View>
          ) : (
            <View>
              {isFetchingN == true ? (
                <LoadingScreen />
              ) : (
                <TableComponentPR
                  tableHead={tableHead2}
                  tableData={tableData2}
                  navigation={navigation}
                  clickableColumns={[2]}
                  columnWidths={columnWidths2}
                  haveTotal={false}
                />
              )}
            </View>
          )}
        </ScrollView>
        {/* )} */}
      </View>
    </SafeAreaView>
  );
}

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
import {useGetBranchesQuery} from '../../../redux/services/contactSlice';
import {useSelector} from 'react-redux';
import {
  useGetmotorRenewalsListQuery,
  useGetnonMotorRenewalsListQuery,
} from '../../../redux/services/policyRenewalsSlice';
import MonthYearPicker from '../../../components/MonthYearPicker';
const window = Dimensions.get('window');

export default function PolicyRenewals({navigation}) {
  const [SelectedType, setSelectedType] = useState(1);

  const tableHead = [
    'Due Date',
    'Customer Name',
    'Vehicle No',
    'Policy No',
    'Policy Type',
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

  const {
    data: motorRenewalsList,
    error,
    isLoading,
  } = useGetmotorRenewalsListQuery({
    id: 907719, // Dynamic ID
    fromDate: '2007-01-11',
    toDate: '2009-01-11',
  });

  const {
    data: nonmotorRenewalsList,
    errorN,
    isLoadingN,
  } = useGetnonMotorRenewalsListQuery({
    id: 907719, // Dynamic ID
    fromDate: '2007-01-11',
    toDate: '2009-01-11',
  });

  const nonMotorRenewalsResponse = nonmotorRenewalsList?.data;
  const motorRenewalsResponse = motorRenewalsList?.data;

  const tableData = motorRenewalsResponse?.map(item => [
    item?.policyEndDate.toString() ?? '',
    item?.customerName.toString() ?? '',
    item?.vehicleNumber.toString() ?? '',
    item?.policyNumber.toString() ?? '',
    item?.policyType.toString() ?? '',
    item?.sumInsured.toString() ?? '',
    item?.totalAmount.toString() ?? '',
    item?.isPaid.toString() ?? '',
  ]);

  const tableData2 = nonMotorRenewalsResponse?.map(item => [
    item?.policyEndDate.toString() ?? '',
    item?.customerName.toString() ?? '',
    item?.policyNumber.toString() ?? '',
    item?.policyType.toString() ?? '',
    item?.sumInsured.toString() ?? '',
    item?.totalAmount.toString() ?? '',
    item?.isPaid.toString() ?? '',
  ]);

  const columnWidths = [110, 190, 100, 120, 90, 110, 110, 110];

  const columnWidths2 = [110, 190, 120, 90, 110, 110, 110];
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    console.log('selectedDate', selectedDate);
  }, [selectedDate]);

  const [isPickerVisible, setPickerVisible] = useState(false);

  return (
    <View style={Styles.container}>
      <MonthYearPicker
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={v => setSelectedDate(v)}
      />
      <HeaderBackground />
      <Header Title="Policy Renewals" onPress={() => navigation.goBack()} />
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
              non-motor renewals
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrap}>
          <TextInput style={styles.textInput} placeholder="11/2024" />
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
            }}>
            (Click on policy Number to view details)
          </Text>
        </View>

        {SelectedType == 1 ? (
          <View>
            {isLoading == true ? (
              <LoadingScreen />
            ) : (
              <TableComponent
                tableHead={tableHead}
                tableData={tableData}
                columnWidths={columnWidths}
                haveTotal={false}
              />
            )}
          </View>
        ) : (
          <View>
            {isLoadingN == true ? (
              <LoadingScreen />
            ) : (
              <TableComponent
                tableHead={tableHead2}
                tableData={tableData2}
                columnWidths={columnWidths2}
                haveTotal={false}
              />
            )}
          </View>
        )}

        {/* )} */}
      </ScrollView>
    </View>
  );
}

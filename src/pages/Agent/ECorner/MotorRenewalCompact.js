import React, {useState} from 'react';
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
import LoadingScreen from '../../../components/LoadingScreen';
import Feather from 'react-native-vector-icons/Feather';

import {
  useGetBranchesQuery,
  useGetDepartmentQuery,
} from '../../../redux/services/contactSlice';
import EconerItems from '../../../components/EconerItems';
import EDocItems from '../../../components/EDocItems';
import ELetterItems from '../../../components/ELetterItems';
import TableComponent from '../../../components/TableComponent';
import TableComponentEC from '../../../components/TableComponentEC';
import MonthYearPicker from '../../../components/MonthYearPicker';
import {useGetmotorRenewalsListQuery} from '../../../redux/services/policyRenewalsSlice';
import moment from 'moment';
import {useSelector} from 'react-redux';
const window = Dimensions.get('window');

export default function MotorRenewalCompact({navigation}) {
  const userCode = useSelector(state => state.Profile.userCode);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
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
  const motorRenewalsResponse = motorRenewalsList?.data;

  const tableHead = [
    'Due Date',
    'Customer Name',
    'Vehicle No',
    'Policy No',
    'NCB Perc',
    'Sum Insured',
    'Premium Amt',
    'Policy Status',
  ];

  const tableData = motorRenewalsResponse?.map(item => [
    item?.dueDate?.toString() ?? '',
    item?.customerName?.toString() ?? '',
    item?.vehicleNo?.toString() ?? '',
    item?.policyNo?.toString() ?? '',
    item?.ncbPerc?.toString() ?? '',
    item?.sumInsured != null
      ? Number(item.sumInsured).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : '0.00',
    item?.premiumAmount != null
      ? Number(item.premiumAmount).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : '0.00',
    item?.policyStatus?.toString() ?? '',
  ]);
  const columnWidths = [100, 140, 100, 200, 70, 100, 100, 100];

  return (
    <View style={Styles.container}>
      <MonthYearPicker
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={v => setSelectedDate(v)}
        onSelectText={v => setSelectedDate(v)}
      />
      <HeaderBackground />
      <Header
        Title="Motor Renewal Compact"
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <View
            style={[styles.searchWrap, {marginHorizontal: 0, marginBottom: 3}]}>
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

          <Text
            style={{
              fontFamily: Fonts.Roboto.Regular,
              fontSize: 14,
              marginVertical: 20,
              color: COLORS.borderColor,
            }}>
            (Click on policy Number to view details)
          </Text>

          {isFetching == true ? (
            <LoadingScreen />
          ) : (
            <TableComponentEC
              haveTotal={false}
              tableHead={tableHead}
              tableData={tableData}
              navigation={navigation}
              clickableColumns={[3]}
              columnWidths={columnWidths}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

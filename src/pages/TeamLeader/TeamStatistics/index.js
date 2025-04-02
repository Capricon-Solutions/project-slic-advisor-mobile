import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Styles } from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import { FlatList } from 'react-native';
import ContactListItem from '../../../components/contactListItem';
import DepartmentItem from '../../../components/DepartmentItem';
import { styles } from './styles';
import TableComponent from '../../../components/TableComponent';
import DateRangePicker from '../../../components/DateRangePicker';
import HorizontalTableComponent from '../../../components/HorizontalTableComponent';
import LandscapeHeader from '../../../components/LandscapeHeader';
import { useSelector } from 'react-redux';
import { useGetteamPerfQuery } from '../../../redux/services/IndividualPerfSlice';
import moment from 'moment';
import LoaderKit from 'react-native-loader-kit';

import MonthYearPicker from '../../../components/MonthYearPicker';
const window = Dimensions.get('window');

export default function TeamStatistics({ navigation }) {
  const [SelectedType, setSelectedType] = useState(1);
  const tableHead = ['', 'Renewals', 'New', 'Refunds', 'Endorsements', 'Total'];
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const lastMonthStart = moment()
    .subtract(0, 'month')
    .startOf('month')
    .format('YYYY-MM-DD');
  const columnWidths = [200, 160, 120, 130, 120, 100];
  const currentMonthEnd = moment().endOf('month').format('YYYY-MM-DD');
  const [fromDate, toDate] = selectedDate
    ? selectedDate.split(' to ')
    : [lastMonthStart, currentMonthEnd];
  const {
    data: individualPerf,
    error,
    isFetching,
    refetch,
  } = useGetteamPerfQuery({
    id: 1715, // Dynamic ID
    fromDate: fromDate,
    toDate: toDate,
  });
  const monthNameFrench = moment(fromDate).format('MMMM');

  const tableData = [
    {
      title: "Premium for " + monthNameFrench,
      renewal: individualPerf?.data?.monthly.premiumForRenewal,
      new: individualPerf?.data.monthly.premiumForNew,
      refund: individualPerf?.data.monthly.premiumForRefund,
      endorsement: individualPerf?.data.monthly.premiumForEndorsement,
      total: individualPerf?.data.monthly.premiumForTotal,
    },
    {
      title: "Premium for 2024",
      renewal: individualPerf?.data.yearly.premiumForRenewal,
      new: individualPerf?.data.yearly.premiumForNew,
      refund: individualPerf?.data.yearly.premiumForRefund,
      endorsement: individualPerf?.data.yearly.premiumForEndorsement,
      total: individualPerf?.data.yearly.premiumForTotal,
    },
    {
      title: "No. of Policies for " + monthNameFrench,
      renewal: individualPerf?.data.monthly.noOfPoliciesForRenewal,
      new: individualPerf?.data.monthly.noOfPoliciesForNew,
      refund: individualPerf?.data.monthly.noOfPoliciesForRefund,
      endorsement: individualPerf?.data.monthly.noOfPoliciesForEndorsement,
      total: individualPerf?.data.monthly.noOfPoliciesForTotal,
    },
    {
      title: "No. of Policies for 2024",
      renewal: individualPerf?.data.yearly.noOfPoliciesForRenewal,
      new: individualPerf?.data.yearly.noOfPoliciesForNew,
      refund: individualPerf?.data.yearly.noOfPoliciesForRefund,
      endorsement: individualPerf?.data.yearly.noOfPoliciesForEndorsement,
      total: individualPerf?.data.yearly.noOfPoliciesForTotal,
    },
  ];

  const tableDataFinal = tableData?.map(item => [
    item?.title?.toString() ?? '',
    item?.renewal?.toString() ?? '',
    item?.new?.toString() ?? '',
    item?.refund?.toString() ?? '',
    item?.endorsement?.toString() ?? '',
    item?.total?.toString() ?? '',
  ]);

  useEffect(() => {
    console.log("individualPerf", individualPerf);
  }, [individualPerf])


  return (
    <View style={Styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      {/* <HeaderBackground /> */}
      <MonthYearPicker
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={v => setSelectedDate(v)}
        onSelectText={v => setSelectedDate(v)}

      />
      <View style={{ paddingHorizontal: 20 }}>
        <LandscapeHeader
          haveSearch={true}
          Title="Team Statistics"
          calenderClick={() => setPickerVisible(true)}
          onPress={() => navigation.goBack()}
          fromDate={fromDate}
          toDate={toDate}
        />
      </View>

      {/* <View>
        <View style={styles.searchWrap}>
          <TextInput style={styles.textInput} placeholder="11/2024" />
          <TouchableOpacity style={styles.searchButton}>
            <Feather name="calendar" color={COLORS.primaryGreen} size={20} />
          </TouchableOpacity>
        </View>
      </View> */}

      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
        style={{}}>
        <HorizontalTableComponent
          onPress={() => navigation.navigate('PolicyDetails')}
          haveTotal={false}
          tableHead={tableHead}
          tableData={tableDataFinal}
          columnWidths={columnWidths}
        />
      </ScrollView>
      {isFetching && <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '100%', height: '100%' }}>

        <LoaderKit
          style={{ width: 50, height: 50 }}
          name={'LineScalePulseOutRapid'} // Optional: see list of animations below
          color={COLORS.grayText} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
        />
      </View>}
    </View>
  );
}

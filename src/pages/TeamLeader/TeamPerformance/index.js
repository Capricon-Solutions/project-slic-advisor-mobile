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
  StatusBar,
} from 'react-native';
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native';
import ContactListItem from '../../../components/contactListItem';
import DepartmentItem from '../../../components/DepartmentItem';
import {styles} from './styles';
import TableComponent from '../../../components/TableComponent';
import DateRangePicker from '../../../components/DateRangePicker';
import HorizontalTableComponent from '../../../components/HorizontalTableComponent';
import LandscapeHeader from '../../../components/LandscapeHeader';
import {useSelector} from 'react-redux';
import LoaderKit from 'react-native-loader-kit';

import HorizontalMargedTableComponent from '../../../components/HorizontalMargedTableComponent';
import {
  useGetteamCurrentPerfMonthQuery,
  useGetteamCurrentPerfYearQuery,
} from '../../../redux/services/IndividualPerfSlice';
const window = Dimensions.get('window');

export default function TeamPerformance({navigation}) {
  const userCode = useSelector(state => state.Profile.userCode);
  const [SelectedType, setSelectedType] = useState(1);
  const tableHead = ['', 'New', 'Renewals', 'Total'];
  const columnWidths = [200, 180, 180, 180];

  const {
    data: CurrentPerformanceMonth,
    error,
    isFetching,
    refetch,
  } = useGetteamCurrentPerfMonthQuery({
    id: userCode, // Dynamic ID
    //  fromDate: fromDate,
    //  toDate: toDate,
  });
  const {
    data: CurrentPerformanceYear,
    error: yearError,
    isFetching: yearFetching,
  } = useGetteamCurrentPerfYearQuery({
    id: userCode, // Dynamic ID
    //  fromDate: fromDate,
    //  toDate: toDate,
  });
  console.log('CurrentPerformanceMonth', CurrentPerformanceMonth);
  const IndividualStatResponse = useSelector(
    state => state.teamStat.teamStatResponse.data,
  );

  const tableData = (
    SelectedType == 1 ? CurrentPerformanceMonth : CurrentPerformanceYear
  )?.data?.map(item => [
    item?.agentName?.toString() ?? '',
    {
      cash: item?.cashNewMotorPrm.toLocaleString('en-US', {
        minimumFractionDigits: 2,
      }),
      debit: item?.debitNewMotorPrm.toLocaleString('en-US', {
        minimumFractionDigits: 2,
      }),
    },
    {
      cash: item?.cashRenMotorPrm.toLocaleString('en-US', {
        minimumFractionDigits: 2,
      }),
      debit: item?.debitRenMotorPrm.toLocaleString('en-US', {
        minimumFractionDigits: 2,
      }),
    },
    {
      cash: item?.totCashMotorPrm.toLocaleString('en-US', {
        minimumFractionDigits: 2,
      }),
      debit: item?.totDebitMotorPrm.toLocaleString('en-US', {
        minimumFractionDigits: 2,
      }),
    },
  ]);
  const renderItem = ({item}) => <ContactListItem item={item} />;

  const renderDepartmentItem = ({item}) => <DepartmentItem item={item} />;

  const handleLoad = (from, to) => {
    console.log('Selected From:', from);
    console.log('Selected To:', to);
  };

  return (
    <View style={Styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      {/* <HeaderBackground /> */}
      <View style={{paddingHorizontal: 20}}>
        <LandscapeHeader
          haveSearch={false}
          Title="Current Month / Year Performance"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={[styles.mainWrap, {marginTop: 1}]}>
        <TouchableOpacity
          onPress={() => setSelectedType(1)}
          style={{
            backgroundColor: SelectedType == 1 ? COLORS.primary : COLORS.white,
            borderRadius: 20,
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 6,
            paddingHorizontal: 5,
          }}>
          <Text
            style={{
              color: SelectedType == 1 ? COLORS.white : COLORS.black,
              fontFamily: Fonts.Roboto.SemiBold,
            }}>
            Month Performance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedType(2)}
          style={{
            backgroundColor: SelectedType == 2 ? COLORS.primary : COLORS.white,
            borderRadius: 20,
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 6,
            paddingHorizontal: 5,
          }}>
          <Text
            style={{
              color: SelectedType == 2 ? COLORS.white : COLORS.black,
              fontFamily: Fonts.Roboto.SemiBold,
            }}>
            Year Performance
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
        style={{}}>
        {tableData?.length > 0 && (
          <HorizontalMargedTableComponent
            onPress={() => navigation.navigate('PolicyDetails')}
            haveTotal={false}
            tableHead={tableHead}
            tableData={tableData}
            columnWidths={columnWidths}
          />
        )}
      </ScrollView>
      {(isFetching || yearFetching) && (
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
            name={'LineScalePulseOutRapid'}
            color={COLORS.grayText}
          />
        </View>
      )}
    </View>
  );
}

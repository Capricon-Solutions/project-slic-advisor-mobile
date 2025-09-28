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
import MonthYearPicker from '../../../components/MonthYearPicker';
import moment from 'moment';
import {useGetindividualPerfQuery} from '../../../redux/services/IndividualPerfSlice';
import LoadingScreen from '../../../components/LoadingScreen';
import LoaderKit from 'react-native-loader-kit';
import MonthYearPickerSinglePast from '../../../components/MonthYearPickerSinglePast';
import MonthYearPickerSingle from '../../../components/MonthYearPickerSingle';
import MonthYearPickerSingleCurrent from '../../../components/MonthYearPickerSingleCurrent';
import Orientation from 'react-native-orientation-locker';

const window = Dimensions.get('window');

export default function IndividualStatistics({navigation}) {
  const userCode = useSelector(state => state.Profile.userCode);
  const [SelectedType, setSelectedType] = useState(1);
  const tableHead = ['', 'Renewals', 'New', 'Refunds', 'Endorsements', 'Total'];
  // const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY/MM')); // default to current month

  const [selectedMonthName, setSelectedMonthName] = useState(null);
  const [selectedYearName, setSelectedYearName] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const lastMonthStart = moment()
    .subtract(0, 'month')
    .startOf('month')
    .format('YYYY-MM-DD');
  const currentMonthEnd = moment().endOf('month').format('YYYY-MM-DD');

  const isCurrentMonth = moment(selectedDate, 'YYYY/MM').isSame(
    moment(),
    'month',
  );

  const fromDate = selectedDate
    ? moment(selectedDate, 'YYYY/MM').startOf('month').format('YYYY-MM-DD')
    : lastMonthStart;

  const toDate = selectedDate
    ? isCurrentMonth
      ? moment().format('YYYY-MM-DD') // today if current month
      : moment(selectedDate, 'YYYY/MM').endOf('month').format('YYYY-MM-DD')
    : currentMonthEnd;

  const {
    data: individualPerf,
    error,
    isFetching,
    refetch,
  } = useGetindividualPerfQuery({
    id: userCode, // Dynamic ID
    fromDate: fromDate,
    toDate: toDate,
  });
  useEffect(() => {
    if (selectedDate) {
      const monthName = moment(selectedDate, 'YYYY/MM').format('MMMM');
      const yearName = moment(selectedDate, 'YYYY/MM').format('YYYY');
      setSelectedMonthName(monthName);
      setSelectedYearName(yearName);
    }
  }, [selectedDate]);
  const formatNumber = value => Number(value || 0).toLocaleString();

  const tableData = [
    {
      title: `Premium for ${selectedMonthName}`,
      renewal: formatNumber(individualPerf?.data?.monthly.premiumForRenewal),
      new: formatNumber(individualPerf?.data?.monthly.premiumForNew),
      refund: formatNumber(individualPerf?.data?.monthly.premiumForRefund),
      endorsement: formatNumber(
        individualPerf?.data?.monthly.premiumForEndorsement,
      ),
      total: formatNumber(individualPerf?.data?.monthly.premiumForTotal),
    },
    {
      title: `Premium for ${selectedYearName}`,
      renewal: formatNumber(individualPerf?.data?.yearly.premiumForRenewal),
      new: formatNumber(individualPerf?.data?.yearly.premiumForNew),
      refund: formatNumber(individualPerf?.data?.yearly.premiumForRefund),
      endorsement: formatNumber(
        individualPerf?.data?.yearly.premiumForEndorsement,
      ),
      total: formatNumber(individualPerf?.data?.yearly.premiumForTotal),
    },
    {
      title: `No. of Policies for ${selectedMonthName}`,
      renewal: formatNumber(
        individualPerf?.data?.monthly.noOfPoliciesForRenewal,
      ),
      new: formatNumber(individualPerf?.data?.monthly.noOfPoliciesForNew),
      refund: formatNumber(individualPerf?.data?.monthly.noOfPoliciesForRefund),
      endorsement: formatNumber(
        individualPerf?.data?.monthly.noOfPoliciesForEndorsement,
      ),
      total: formatNumber(individualPerf?.data?.monthly.noOfPoliciesForTotal),
    },
    {
      title: `No. of Policies for ${selectedYearName}`,
      renewal: formatNumber(
        individualPerf?.data?.yearly.noOfPoliciesForRenewal,
      ),
      new: formatNumber(individualPerf?.data?.yearly.noOfPoliciesForNew),
      refund: formatNumber(individualPerf?.data?.yearly.noOfPoliciesForRefund),
      endorsement: formatNumber(
        individualPerf?.data?.yearly.noOfPoliciesForEndorsement,
      ),
      total: formatNumber(individualPerf?.data?.yearly.noOfPoliciesForTotal),
    },
  ];

  const columnWidths = [200, 160, 120, 130, 120, 100];

  const IndividualStatResponse = useSelector(
    state => state.individualStat.IndividualStatResponse.data,
  );

  const tableDataFinal = tableData?.map(item => [
    item?.title?.toString() ?? '',
    item?.renewal?.toString() ?? '',
    item?.new?.toString() ?? '',
    item?.refund?.toString() ?? '',
    item?.endorsement?.toString() ?? '',
    item?.total?.toString() ?? '',
  ]);

  return (
    <View style={Styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      <MonthYearPickerSingleCurrent
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={v => setSelectedDate(v)}
        onSelectText={v => setSelectedDate(v)}
        lockOrientation={false}
      />

      <View style={{paddingHorizontal: 20}}>
        <LandscapeHeader
          haveSearch={true}
          calenderClick={() => setPickerVisible(true)}
          Title="Individual Statistics"
          onPress={() => navigation.goBack()}
          fromDate={fromDate}
          toDate={toDate}
        />
      </View>

      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 1,
            paddingTop: 5,
          }}>
          <HorizontalTableComponent
            onPress={() => console.log('test')}
            clickable={false}
            haveTotal={false}
            tableHead={tableHead}
            tableData={tableDataFinal}
            columnWidths={columnWidths}
          />
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
    </View>
  );
}

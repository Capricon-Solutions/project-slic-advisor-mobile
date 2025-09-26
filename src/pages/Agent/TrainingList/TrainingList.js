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
import TableComponent from '../../../components/TableComponent';
import DateRangePicker from '../../../components/DateRangePicker';
import {useSelector} from 'react-redux';
import MonthYearPicker from '../../../components/MonthYearPicker';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import LoaderKit from 'react-native-loader-kit';

import {useGetTrainingListByDateQuery} from '../../../redux/services/trainingSlice';
const window = Dimensions.get('window');

export default function TrainingList({navigation}) {
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
  const [SelectedType, setSelectedType] = useState(1);
  const tableHead = [
    'Training No.',
    'Topic',
    'Type',
    'Date and Time',
    'Status',
  ];

  const columnWidths = [100, 160, 100, 130, 150];

  const TrainingListResponse = useSelector(
    state => state.trainingList.trainingListResponse.data,
  );
  const {
    data: TrainingList,
    isFetching,
    refetch,
    error,
  } = useGetTrainingListByDateQuery({
    fromDate,
    toDate,
    userCode: usertype == 2 ? personalCode : userCode,
  });

  // useEffect(() => {
  //   console.log('TrainingList', TrainingList);
  // }, [TrainingList]);

  const tableData = TrainingList?.data?.map(item => [
    item?.trainId?.toString() ?? '',
    item?.topic?.toString() ?? '',
    item?.trainType === 'G'
      ? 'General'
      : item?.trainType === 'M'
      ? 'Motor'
      : '',
    item?.trainDate ? moment(item.trainDate).format('DD/MM/YYYY HH.mmA') : '',
    item?.status?.toString() ?? '',
  ]);

  const renderItem = ({item}) => <ContactListItem item={item} />;

  const renderDepartmentItem = ({item}) => <DepartmentItem item={item} />;

  const handleLoad = (from, to) => {
    // console.log('Selected From:', from);
    // console.log('Selected To:', to);
  };

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <MonthYearPicker
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={v => setSelectedDate(v)}
        onSelectText={v => setSelectedDate(v)}
      />
      <Header Title="Training List" onPress={() => navigation.goBack()} />
      <View
        style={[styles.searchWrap, {marginHorizontal: 20, marginBottom: 20}]}>
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
      <ScrollView
        fadingEdgeLength={20}
        contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 10}}>
        <TableComponent
          haveTotal={false}
          tableHead={tableHead}
          tableData={tableData}
          columnWidths={columnWidths}
        />
      </ScrollView>
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

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
const window = Dimensions.get('window');

export default function IndividualStatistics({navigation}) {
  const [SelectedType, setSelectedType] = useState(1);
  const tableHead = ['', 'Renewals', 'New', 'Refunds', 'Endorsements', 'Total'];
  // const tableData = [
  //   [
  //     'Premium for November',
  //     'Social Media Marketing',
  //     'General',
  //     '1,283',
  //     '0',
  //     '1,135,750',
  //   ],
  //   [
  //     'Premium for 2024',
  //     'Social Media Marketing',
  //     'General',
  //     '1,283',
  //     '0',
  //     '1,135,750',
  //   ],
  //   [
  //     'No. of Policies for November',
  //     'Social Media Marketing',
  //     'General',
  //     '1,283',
  //     '0',
  //     '1,135,750',
  //   ],
  //   [
  //     'No. of Policies for 2024',
  //     'Social Media Marketing',
  //     'General',
  //     '1,283',
  //     '0',
  //     '1,135,750',
  //   ],
  //   [
  //     'Premium for 2024',
  //     'Social Media Marketing',
  //     'General',
  //     '1,283',
  //     '0',
  //     '1,135,750',
  //   ],
  // ];
  const columnWidths = [200, 160, 120, 130, 120, 100];

  const IndividualStatResponse = useSelector(
    state => state.individualStat.IndividualStatResponse.data,
  );

  const tableData = IndividualStatResponse?.tableData?.map(item => [
    item?.first.toString() ?? '',
    item?.Renewals.toString() ?? '',
    item?.New.toString() ?? '',
    item?.Refunds.toString() ?? '',
    item?.Endorsements.toString() ?? '',
    item?.Total.toString() ?? '',
  ]);
  const renderItem = ({item}) => <ContactListItem item={item} />;

  const renderDepartmentItem = ({item}) => <DepartmentItem item={item} />;

  const handleLoad = (from, to) => {
    console.log('Selected From:', from);
    console.log('Selected To:', to);
  };

  return (
    <View style={Styles.container}>
      {/* <HeaderBackground /> */}
      <View style={{paddingHorizontal: 20}}>
        <LandscapeHeader
          haveSearch={true}
          Title="IndividualStatistics"
          onPress={() => navigation.goBack()}
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
          haveTotal={false}
          tableHead={tableHead}
          tableData={tableData}
          columnWidths={columnWidths}
        />
      </ScrollView>
    </View>
  );
}

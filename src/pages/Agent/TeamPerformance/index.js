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
import HorizontalMargedTableComponent from '../../../components/HorizontalMargedTableComponent';
const window = Dimensions.get('window');

export default function TeamPerformance({navigation}) {
  const [SelectedType, setSelectedType] = useState(1);
  const tableHead = ['', 'New', 'Renewals', 'Total'];
  const columnWidths = [200, 160, 160, 160];

  // const tableData = [
  //   ['Region 1', 10, 5, 8, 3, 18, 8],
  //   ['Region 2', 7, 2, 6, 4, 13, 6],
  //   ['Region 3', 9, 4, 5, 2, 14, 6],
  //   ['Region 4', 6, 3, 7, 5, 13, 8],
  //   ['Total', 32, 14, 26, 14, 58, 28],
  // ];

  const IndividualStatResponse = useSelector(
    state => state.teamStat.teamStatResponse.data,
  );

  const tableData = IndividualStatResponse?.tableData?.map(item => [
    item?.first.toString() ?? '',
    item?.New,
    item?.Renewals,
    item?.Total,
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
          Title="Current Performance"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.mainWrap}>
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
        <HorizontalMargedTableComponent
          onPress={() => navigation.navigate('PolicyDetails')}
          haveTotal={false}
          tableHead={tableHead}
          tableData={tableData}
          columnWidths={columnWidths}
        />
      </ScrollView>
    </View>
  );
}

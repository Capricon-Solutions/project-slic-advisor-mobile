import React, { useState } from 'react';
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
import { Styles } from '../../../../theme/Styles';
import HeaderBackground from '../../../../components/HeaderBackground';
import Header from '../../../../components/Header';
import COLORS from '../../../../theme/colors';
import Fonts from '../../../../theme/Fonts';
import KpiSummery from '../../../../icons/KpiSummery.png'; // Replace with the actual logo path
import * as Progress from 'react-native-progress';
import DuesSummery from '../../../../icons/DuesSummery.png'; // Replace with the actual logo path
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Octicons from 'react-native-vector-icons/Octicons';
import { FlatList } from 'react-native';
import ContactListItem from '../../../../components/contactListItem';
import DepartmentItem from '../../../../components/DepartmentItem';
import { styles } from './styles';
import LoaderKit from 'react-native-loader-kit';

import LoadingScreen from '../../../../components/LoadingScreen';
import {
  useGetBranchesQuery,
  useGetDepartmentQuery,
} from '../../../../redux/services/contactSlice';
import { useSelector } from 'react-redux';
import TableComponent from '../../../../components/TableComponent';
import RegionTableComponent from '../../../../components/RegionTableComponent';
import { useRegionalSummeryQuery } from '../../../../redux/services/SummeryApiSlice';
import moment from 'moment';
const window = Dimensions.get('window');

export default function RegionSummary({ navigation }) {
  const [selectedType, setSelectedType] = useState('monthly');
  const motorData = useSelector(state => state.DUES.motorData);
  const nonmotorData = useSelector(state => state.DUES.nonmotorData);
  const currentMonthNumber = moment().month() + 1; // +1 because Moment.js months are 0-indexed
  const currentMonthName = moment().format('MMMM');
  const tableHead = [
    'Region',
    '2024 Ach',
    '2024 Tar',
    'Ach (%)',
    '2023 Ach',
    'Grow (%)',
  ];
  const columnWidths = [130, 70, 70, 60, 70, 60];



  const {
    data: RegionalSummery,
    error: RegionalSummeryError,
    isLoading: RegionalSummeryLoading,
    isFetching: RegionalSummeryFetching,
  } = useRegionalSummeryQuery({
    month: currentMonthNumber,
  });
  const DataSet = selectedType == "monthly" ? RegionalSummery?.data?.monthly : RegionalSummery?.data?.cumulative;

  const tableData = DataSet?.map(item => [
    item.rank?.toString() + '. ' + item.region?.toString(),
    item.achievement?.toString(),
    item.target?.toString(),
    item.achPresentage?.toString(),
    item.lastYear?.toString(),
    item.growthPresentage?.toString(),
  ]);
  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Region Summary" onPress={() => navigation.goBack()} />


      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>

        <View style={{}}>
          <Text
            style={{
              fontFamily: Fonts.Roboto.SemiBold,
              color: COLORS.textColor,
              fontSize: 15,
              marginBottom: 0,
            }}>
            Compare this year’s sales with last year’s to track growth and trends.
          </Text>

          <View style={styles.mainWrap}>
            <TouchableOpacity
              onPress={() => setSelectedType('monthly')}
              style={{
                backgroundColor:
                  selectedType === 'monthly' ? COLORS.primary : COLORS.white,
                borderRadius: 15,
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 4,
              }}>
              <Text
                style={{
                  color: selectedType === 'monthly' ? COLORS.white : COLORS.black,
                  fontFamily: Fonts.Roboto.SemiBold,
                }}>
                Monthly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedType('cumulative')}
              style={{
                backgroundColor:
                  selectedType === 'cumulative' ? COLORS.primary : COLORS.white,
                borderRadius: 15,
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 4,
              }}>
              <Text
                style={{
                  color: selectedType === 'cumulative' ? COLORS.white : COLORS.black,
                  fontFamily: Fonts.Roboto.SemiBold,
                }}>
                Cumulative
              </Text>
            </TouchableOpacity>
          </View>
          <RegionTableComponent
            tableHead={tableHead}
            tableData={tableData}
            columnWidths={columnWidths}
            haveTotal={false}
            navigation={navigation}
            touchable={true}
          />

        </View>
      </ScrollView>
      {RegionalSummeryLoading &&

        <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '100%', height: '100%' }}>

          <LoaderKit
            style={{ width: 50, height: 50 }}
            name={'LineScalePulseOutRapid'} // Optional: see list of animations below
            color={COLORS.grayText} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
          />
        </View>}
    </View>
  );
}

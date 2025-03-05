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
import {Styles} from '../../../../theme/Styles';
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
import {FlatList} from 'react-native';
import ContactListItem from '../../../../components/contactListItem';
import DepartmentItem from '../../../../components/DepartmentItem';
import {styles} from './styles';
import LoadingScreen from '../../../../components/LoadingScreen';
import {
  useGetBranchesQuery,
  useGetDepartmentQuery,
} from '../../../../redux/services/contactSlice';
import {useSelector} from 'react-redux';
import TableComponent from '../../../../components/TableComponent';
import RegionTableComponent from '../../../../components/RegionTableComponent';
const window = Dimensions.get('window');

export default function BranchSummary({navigation, route}) {
  const [SelectedType, setSelectedType] = useState(1);
  const motorData = useSelector(state => state.DUES.motorData);
  const nonmotorData = useSelector(state => state.DUES.nonmotorData);
  const {title} = route.params;
  const tableHead = [
    'Region',
    '2024 Ach',
    '2024 Tar',
    'Ach (%)',
    '2023 Ach',
    'Grow (%)',
  ];
  const columnWidths = [110, 60, 60, 60, 60, 60];
  const Data = [
    {
      id: 1,
      region: 'Dehiwela',
      '2024Ach': '18',
      '2024Tar': '132',
      ach: '14%',
      '2023Ach': '120',
      grow: '-84%',
    },
    {
      id: 2,
      region: 'kirulapane',
      '2024Ach': '18',
      '2024Tar': '132',
      ach: '14%',
      '2023Ach': '120',
      grow: '-84%',
    },
    {
      id: 3,
      region: 'Moratuwa',
      '2024Ach': '18',
      '2024Tar': '132',
      ach: '14%',
      '2023Ach': '120',
      grow: '-84%',
    },
    {
      id: 4,
      region: 'Ratmalana',
      '2024Ach': '18',
      '2024Tar': '132',
      ach: '14%',
      '2023Ach': '120',
      grow: '-84%',
    },
    {
      id: 5,
      region: 'Battaramulla',
      '2024Ach': '18',
      '2024Tar': '132',
      ach: '14%',
      '2023Ach': '120',
      grow: '-84%',
    },
    {
      id: 6,
      region: 'City Office',
      '2024Ach': '18',
      '2024Tar': '132',
      ach: '14%',
      '2023Ach': '120',
      grow: '-84%',
    },
  ];

  const tableData = Data.map(item => [
    item.id.toString() + '. ' + item.region.toString(),
    item['2024Ach'].toString(),
    item['2024Tar'].toString(),
    item.ach.toString(),
    item['2023Ach'].toString(),
    item.grow.toString(),
  ]);
  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title={title + ' Branch'} onPress={() => navigation.goBack()} />
      <View style={{paddingHorizontal: 20}}>
        <Text
          style={{
            fontFamily: Fonts.Roboto.SemiBold,
            color: COLORS.textColor,
            fontSize: 15,
            marginBottom: 15,
          }}>
          Compare this year’s sales with last year’s to track growth and trends.
        </Text>
        <RegionTableComponent
          tableHead={tableHead}
          tableData={tableData}
          columnWidths={columnWidths}
          haveTotal={false}
          touchable={false}
        />
      </View>
    </View>
  );
}

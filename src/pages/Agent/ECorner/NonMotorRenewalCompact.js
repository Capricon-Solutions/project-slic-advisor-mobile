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
import { Styles } from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import { FlatList } from 'react-native';
import ContactListItem from '../../../components/contactListItem';
import DepartmentItem from '../../../components/DepartmentItem';
import { styles } from './styles';
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
const window = Dimensions.get('window');



export default function NonMotorRenewalCompact({ navigation }) {

  const tableHead = ['Due Date', 'Customer Name', 'Policy No', 'NCB Perc', 'Sum Insured', 'Premium Amt', 'Policy Status'];
  const Data = [
    { dueDate: '01/12/2024', name: 'H G R L K RANAVIRA', policyNo: 'VM11112777666009', NCB: '60', sumInsured: '1,135,750', premium: '1,135,750', status: 'Renewed' },
    { dueDate: '01/12/2024', name: 'H G R L K RANAVIRA', policyNo: 'VM11112777666009', NCB: '60', sumInsured: '1,135,750', premium: '1,135,750', status: 'Renewed' },
    { dueDate: '01/12/2024', name: 'H G R L K RANAVIRA', policyNo: 'VM11112777666009', NCB: '60', sumInsured: '1,135,750', premium: '1,135,750', status: 'Renewed' },
    { dueDate: '01/12/2024', name: 'H G R L K RANAVIRA', policyNo: 'VM11112777666009', NCB: '60', sumInsured: '1,135,750', premium: '1,135,750', status: 'Due' },
    { dueDate: '01/12/2024', name: 'H G R L K RANAVIRA', policyNo: 'VM11112777666009', NCB: '60', sumInsured: '1,135,750', premium: '1,135,750', status: 'Due' },
    { dueDate: '01/12/2024', name: 'H G R L K RANAVIRA', policyNo: 'VM11112777666009', NCB: '60', sumInsured: '1,135,750', premium: '1,135,750', status: 'Due' },
    { dueDate: '01/12/2024', name: 'H G R L K RANAVIRA', policyNo: 'VM11112777666009', NCB: '60', sumInsured: '1,135,750', premium: '1,135,750', status: 'Expired' },
    { dueDate: '01/12/2024', name: 'H G R L K RANAVIRA', policyNo: 'VM11112777666009', NCB: '60', sumInsured: '1,135,750', premium: '1,135,750', status: 'Expired' },
    { dueDate: '01/12/2024', name: 'H G R L K RANAVIRA', policyNo: 'VM11112777666009', NCB: '60', sumInsured: '1,135,750', premium: '1,135,750', status: 'Expired' },

  ];
  const tableData = Data?.map(item => [
    item?.dueDate.toString() ?? '',
    item?.name.toString() ?? '',
    // item?.vehicleNo.toString() ?? '',
    item?.policyNo.toString() ?? '',
    item?.NCB.toString() ?? '',
    item?.sumInsured.toString() ?? '',
    item?.premium.toString() ?? '',
    item?.status.toString() ?? '',

  ]);
  const columnWidths = [100, 140, 145, 70, 100, 100, 100];
  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header titleFontSize={16} Title="Non-Motor Renewal Compact" onPress={() => navigation.goBack()} />
      <View style={{ paddingHorizontal: 20 }}>

        <View style={[styles.searchWrap, { marginHorizontal: 0, marginBottom: 3 }]}>
          <TextInput
            style={styles.textInput}
            // onChangeText={v => setSearchText(v)}
            placeholder="11/2024"
          />
          <TouchableOpacity
            // onPress={() => handleSearch()}
            style={styles.searchButton}>
            <Feather name="calendar" color={COLORS.white} size={20} />
          </TouchableOpacity>
        </View>

        <Text style={{
          fontFamily: Fonts.Roboto.Regular,
          fontSize: 14,
          marginVertical: 20,
          color: COLORS.borderColor
        }}>(Click on policy Number to view details)</Text>

        <TableComponentEC
          haveTotal={false}
          tableHead={tableHead}
          tableData={tableData}
          columnWidths={columnWidths}
        />

      </View>


    </View>
  );
}

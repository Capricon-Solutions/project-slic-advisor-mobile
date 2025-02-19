import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './styles';
import LoadingScreen from '../../../components/LoadingScreen';
import TableComponent from '../../../components/TableComponent';
import {useGetBranchesQuery} from '../../../redux/services/contactSlice';
import {useSelector} from 'react-redux';
const window = Dimensions.get('window');

export default function PolicyRenewals({navigation}) {
  const [SelectedType, setSelectedType] = useState(1);

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

  const tableHead2 = [
    'Due Date',
    'Customer Name',
    'Policy No',
    'NCB Perc',
    'Sum Insured',
    'Premium Amt',
    'Policy Status',
  ];

  const motorRenewalsResponse = useSelector(
    state => state.policyRenewals.motorRenewalsResponse.data,
  );

  const nonMotorRenewalsResponse = useSelector(
    state => state.policyRenewals.nonMotorRenewalsResponse.data,
  );

  const tableData = motorRenewalsResponse?.tableData?.map(item => [
    item?.date.toString() ?? '',
    item?.name.toString() ?? '',
    item?.vehicleNo.toString() ?? '',
    item?.policyNo.toString() ?? '',
    item?.ncb.toString() ?? '',
    item?.sum.toString() ?? '',
    item?.premiumAmount.toString() ?? '',
    item?.status.toString() ?? '',
  ]);

  const tableData2 = nonMotorRenewalsResponse?.tableData?.map(item => [
    item?.date.toString() ?? '',
    item?.name.toString() ?? '',
    item?.policyNo.toString() ?? '',
    item?.ncb.toString() ?? '',
    item?.sum.toString() ?? '',
    item?.premiumAmount.toString() ?? '',
    item?.status.toString() ?? '',
  ]);

  const columnWidths = [110, 150, 100, 120, 90, 110, 110, 110];

  const columnWidths2 = [110, 150, 120, 90, 110, 110, 110];

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Policy Renewals" onPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
        <View style={styles.mainWrap}>
          <TouchableOpacity
            onPress={() => setSelectedType(1)}
            style={{
              backgroundColor:
                SelectedType == 1 ? COLORS.primary : COLORS.white,
              borderRadius: 12,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Text
              style={{
                color: SelectedType == 1 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              Motor Renewals
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(2)}
            style={{
              backgroundColor:
                SelectedType == 2 ? COLORS.primary : COLORS.white,
              borderRadius: 12,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: SelectedType == 2 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              non-motor renewals
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrap}>
          <TextInput style={styles.textInput} placeholder="11/2024" />
          <TouchableOpacity style={styles.searchButton}>
            <Feather name="calendar" color={COLORS.white} size={20} />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Regular,
              fontSize: 14,
              marginBottom: 10,
            }}>
            (Click on policy Number to view details)
          </Text>
        </View>

        {/* {isLoading == true ? (
        <LoadingScreen />
      ) : ( */}

        {SelectedType == 1 ? (
          <View>
            <TableComponent
              tableHead={tableHead}
              tableData={tableData}
              columnWidths={columnWidths}
              haveTotal={false}
            />
          </View>
        ) : (
          <View>
            <TableComponent
              tableHead={tableHead2}
              tableData={tableData2}
              columnWidths={columnWidths2}
              haveTotal={false}
            />
          </View>
        )}

        {/* )} */}
      </ScrollView>
    </View>
  );
}

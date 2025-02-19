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
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {useGetBranchesQuery} from '../../../redux/services/contactSlice';
import {useSelector} from 'react-redux';
const window = Dimensions.get('window');

export default function PPWCancellation({navigation}) {
  const {data: branches, isLoading, error} = useGetBranchesQuery();
  const [selectedItem, setSelectedItem] = useState();

  const [SelectedType, setSelectedType] = useState(1);

  const tableHead = [
    'Policy No',
    'Customer Name',
    'Vehicle No',
    'Debit Amount',
    'Payment Date',
    'Due Date',
  ];

  const tableHead2 = [
    'Policy No',
    'Customer Name',
    'Vehicle No',
    'Debit Amount',
    'Payment Date',
    'Cancelled Date',
    'Re-Instate Date',
    'Due Date',
  ];
  // const tableData = [
  //   [
  //     '01/12/2024',
  //     'H G R L K RANAVIRA',
  //     'K L W 4578',
  //     '435345',
  //     'cacsscs',
  //     'cacsscs',
  //     'cacsscs',
  //     'complete',
  //   ],
  //   [
  //     '01/12/2024',
  //     'H G R L K RANAVIRA',
  //     'K L W 4578',
  //     '435345',
  //     'cacsscs',
  //     'cacsscs',
  //     'cacsscs',
  //     'complete',
  //   ],
  //   [
  //     '01/12/2024',
  //     'H G R L K RANAVIRA',
  //     'K L W 4578',
  //     '435345',
  //     'cacsscs',
  //     'cacsscs',
  //     'cacsscs',
  //     'complete',
  //   ],
  //   [
  //     '01/12/2024',
  //     'H G R L K RANAVIRA',
  //     'K L W 4578',
  //     '435345',
  //     'cacsscs',
  //     'cacsscs',
  //     'cacsscs',
  //     'complete',
  //   ],
  //   [
  //     '01/12/2024',
  //     'H G R L K RANAVIRA',
  //     'K L W 4578',
  //     '435345',
  //     'cacsscs',
  //     'cacsscs',
  //     'cacsscs',
  //     'complete',
  //   ],
  //   [
  //     '01/12/2024',
  //     'H G R L K RANAVIRA',
  //     'K L W 4578',
  //     '435345',
  //     'cacsscs',
  //     'cacsscs',
  //     'cacsscs',
  //     'complete',
  //   ],
  //   [
  //     '01/12/2024',
  //     'H G R L K RANAVIRA',
  //     'K L W 4578',
  //     '435345',
  //     'cacsscs',
  //     'cacsscs',
  //     'cacsscs',
  //     'complete',
  //   ],
  //   [
  //     '01/12/2024',
  //     'H G R L K RANAVIRA',
  //     'K L W 4578',
  //     '435345',
  //     'cacsscs',
  //     'cacsscs',
  //     'cacsscs',
  //     'complete',
  //   ],
  //   [
  //     '01/12/2024',
  //     'H G R L K RANAVIRA',
  //     'K L W 4578',
  //     '435345',
  //     'cacsscs',
  //     'cacsscs',
  //     'cacsscs',
  //     'complete',
  //   ],
  // ];
  const columnWidths = [120, 150, 110, 110, 130, 110];
  const columnWidths2 = [120, 150, 110, 110, 130, 110, 120, 110];

  const ppwCancelationReminderResponse = useSelector(
    state => state.ppwCancelation.ppwCancelationReminderResponse.data,
  );

  const ppwCancelationCancelledResponse = useSelector(
    state => state.ppwCancelation.ppwCancelationCancelledResponse.data,
  );

  const tableData = ppwCancelationReminderResponse?.tableData?.map(item => [
    item?.policyNo.toString() ?? '',
    item?.costumorName.toString() ?? '',
    item?.vehicleNo.toString() ?? '',
    item?.debitAmount.toString() ?? '',
    item?.paymentDate.toString() ?? '',
    item?.dueDate.toString() ?? '',
  ]);
  const tableData2 = ppwCancelationCancelledResponse?.tableData?.map(item => [
    item?.policyNo.toString() ?? '',
    item?.costumorName.toString() ?? '',
    item?.vehicleNo.toString() ?? '',
    item?.debitAmount.toString() ?? '',
    item?.paymentDate.toString() ?? '',
    item?.cancelledDate.toString() ?? '',
    item?.reInstateDate.toString() ?? '',
    item?.dueDate.toString() ?? '',
  ]);

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="PPW Cancellation" onPress={() => navigation.goBack()} />

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
              Reminders List
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
              Cancelled list
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={[styles.searchWrap, {flex: 0.6}]}>
            <TextInput style={styles.textInput} placeholder="11/2024" />
            <TouchableOpacity style={styles.searchButton}>
              <Feather name="calendar" color={COLORS.white} size={20} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.4, padding: 2}}>
            <AutocompleteDropdown
              clearOnFocus={true}
              closeOnBlur={true}
              closeOnSubmit={false}
              initialValue={{id: '1'}} // or just '2'
              onSelectItem={setSelectedItem}
              dataSet={[
                {id: '1', title: 'Motor'},
                {id: '2', title: 'Non-Motor'},
              ]}
            />
          </View>
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

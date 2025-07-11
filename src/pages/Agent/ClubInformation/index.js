import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import {Styles} from '../../../theme/Styles';
import Header from '../../../components/Header';
import HeaderBackground from '../../../components/HeaderBackground';
import {styles} from './styles';
import SetTargetModal from '../../../components/SetTargetModal';
import PolicyItem from '../../../components/PolicyItem';
import Button from '../../../components/Button';
import SmallButton from '../../../components/SmallButton';
import {TextInput} from 'react-native-paper';
import SquareTextBox from '../../../components/SquareTextBox';
import SendPaymentLink from '../../../components/SendPaymentLink';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import OutlinedTextBox from '../../../components/OutlinedTextBox';
import TableComponent from '../../../components/TableComponent';
import clubInfoImg from '../../../icons/clubInfo.png';
import {useSelector} from 'react-redux';
import {
  useGetClubQuery,
  useGetNextClubQuery,
} from '../../../redux/services/clubSlice';
import LoadingScreen from '../../../components/LoadingScreen';
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function ClubInformation({navigation}) {
  const userCode = useSelector(state => state.Profile.userCode);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const {
    data: clubInfo,
    isFetching,
    error,
  } = useGetClubQuery(usertype == 2 ? personalCode : userCode);
  const {
    data: nextClubInfo,
    isFetching: isNextFetching,
    error: nextError,
  } = useGetNextClubQuery(usertype == 2 ? personalCode : userCode);
  console.log('userCode', userCode);
  console.log('userCodebbbbbbb', usertype == 2 ? personalCode : userCode);
  console.log('usertype', usertype);
  const clubInfoResponse = clubInfo?.data;
  // const clubInfoResponse = useSelector(
  //   state => state.clubInfo.clubInfoResponse.data,
  // );
  console.log('nextClubInfo 333', nextClubInfo);
  // const nextClubTable = nextClubInfo?.data[0]?.last5Years;
  const nextClubTable = nextClubInfo?.data?.[0]?.last5Years;
  const tableHead = ['Income Year', 'Comm. Income'];

  const columnWidths = [window.width * 0.41, window.width * 0.41];
  console.log('nextClubTable', nextClubInfo?.data?.[0]?.last5Years);
  const tableData = nextClubTable?.map(item => [
    item?.year?.toString() ?? '',
    item?.amount != null
      ? Number(item.amount).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : '0.00',
  ]);
  // console.log("clubInfoResponse", clubInfoResponse);

  // API Binds

  const currentClub = clubInfoResponse?.currentClub || 'Unavailable';
  const clubYear = clubInfoResponse?.clubYear || 'Unavailable';
  const currentClublimit =
    clubInfoResponse?.currentLimit != null
      ? Number(clubInfoResponse.currentLimit).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : 'Unavailable';

  // clubInfoResponse?.currentLimit || 'Unavailable';
  const generalAppointmentDate =
    clubInfoResponse?.genAppointDate || 'Unavailable';
  const generalPersistency = clubInfoResponse?.genPersistancy || 'Unavailable';
  const last5YearAverage = clubInfoResponse?.last5YearAvg
    ? Number(clubInfoResponse.last5YearAvg).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : '0.00';
  const nextClub = clubInfoResponse?.nextClub || 'Unavailable';
  const platinumClub = clubInfoResponse?.platinumClub || 'Unavailable';
  const lastUpdatedDate = clubInfoResponse?.lastUpdatedDate || 'Unavailable';
  const annualIncomeUpTo = clubInfoResponse?.annualIncomeUpTo || 'Unavailable';
  const nextLimit =
    clubInfoResponse?.nextLimit != null
      ? Number(clubInfoResponse.nextLimit).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : 'Unavailable';

  const annualIncomeUpto = tableData?.[0]?.[1] || '0.00';
  console.log('clubInfoResponse', clubInfoResponse);
  return (
    <View style={[Styles.container, {paddingHorizontal: 10}]}>
      <HeaderBackground />

      <SendPaymentLink
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <Header
        Title="Club information"
        onPress={() => navigation.goBack()}
        haveFilters={false}
        haveWhatsapp={false}
        haveMenu={false}
        onButton={() => setModalVisible(true)}
      />
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal: 0}}>
          <View style={{paddingHorizontal: 6}}>
            <View style={[styles.card, {alignItems: 'center'}]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  width: '100%',
                  gap: 5,
                  marginBottom: 5,
                }}>
                <Image
                  style={{height: 26, width: 26}}
                  source={clubInfoImg}></Image>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto.Bold,
                    fontSize: 15,
                    color: COLORS.textColor,
                  }}>
                  Club Year {clubYear?.toString() ?? ''}
                </Text>
              </View>
              <View style={{marginBottom: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    width: '100%',
                  }}>
                  <View style={{flex: 1}}>
                    <OutlinedTextBox
                      Title={'Current Club'}
                      readOnly={true}
                      value={currentClub?.toString() ?? ''}
                    />
                  </View>

                  <View style={{flex: 1}}>
                    <OutlinedTextBox
                      Title={'Current Club’s Limit'}
                      readOnly={true}
                      value={currentClublimit?.toString() ?? ''}
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    width: '100%',
                  }}>
                  <View style={{flex: 1}}>
                    <OutlinedTextBox
                      Title={'General Appt. Date'}
                      readOnly={true}
                      value={generalAppointmentDate?.toString() ?? ''}
                    />
                  </View>

                  <View style={{flex: 1}}>
                    <OutlinedTextBox
                      Title={'Gen. Persistency'}
                      readOnly={true}
                      value={generalPersistency?.toString() ?? ''}
                    />
                  </View>
                </View>

                <OutlinedTextBox
                  Title={'Last 5 year avg. '}
                  readOnly={true}
                  value={last5YearAverage?.toString() ?? ''}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    width: '100%',
                  }}>
                  <View style={{flex: 1}}>
                    <OutlinedTextBox
                      Title={'Next Club'}
                      readOnly={true}
                      value={nextClub?.toString() ?? ''}
                    />
                  </View>

                  <View style={{flex: 1}}>
                    <OutlinedTextBox
                      Title={"Next Club's Limit"}
                      readOnly={true}
                      value={nextLimit?.toString() ?? ''}
                    />
                  </View>
                </View>

                <OutlinedTextBox
                  Title={'Last Updated Date'}
                  readOnly={true}
                  value={lastUpdatedDate?.toString() ?? ''}
                />
                {tableData && (
                  <OutlinedTextBox
                    Title={
                      'Annual income upto ' + lastUpdatedDate?.toString() ?? ''
                    }
                    readOnly={true}
                    value={annualIncomeUpto?.toString() ?? ''}
                  />
                )}
              </View>
              {tableData ? (
                <View style={{flex: 1}}>
                  <TableComponent
                    haveTotal={false}
                    tableHead={tableHead}
                    tableData={tableData}
                    columnWidths={columnWidths}
                  />
                </View>
              ) : (
                <Text
                  style={{
                    color: COLORS.borderColor,
                    fontFamily: Fonts.Roboto.Medium,
                    fontSize: 16,
                    marginVertical: 20,
                  }}>
                  No table data available
                </Text>
              )}

              {/* Important Notice */}
              <View style={styles.noticeContainer}>
                <Text style={styles.noticeTitle}>* Note</Text>
                <Text style={styles.noticeText}>
                  Your club selection data displayed in this page is only a
                  forecast based on primitive data. They could be different from
                  the final club entitlement which is released by Sales Support
                  Division, after processing these data further.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

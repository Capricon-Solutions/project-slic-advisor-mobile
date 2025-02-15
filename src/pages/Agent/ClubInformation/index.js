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
import clubInfo from '../../../icons/clubInfo.png';
import {useSelector} from 'react-redux';
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function ClubInformation({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const clubInfoResponse = useSelector(
    state => state.clubInfo.clubInfoResponse.data,
  );

  const tableHead = ['Total', 'Endorsement'];

  const columnWidths = [window.width * 0.39, window.width * 0.39];

  const tableData = clubInfoResponse?.tableData?.map(item => [
    item?.total.toString() ?? '',
    item?.endorsement.toString() ?? '',
  ]);

  // API Binds

  const currentClub = clubInfoResponse.currentClub;
  const currentClublimit = clubInfoResponse.currentClublimit;
  const generalAppointmentDate = clubInfoResponse.generalAppointmentDate;
  const generalPersistency = clubInfoResponse.generalPersistency;
  const last5YearAverage = clubInfoResponse.last5YearAverage;
  const nextClub = clubInfoResponse.nextClub;
  const platinumClub = clubInfoResponse.platinumClub;
  const lastUpdatedDate = clubInfoResponse.lastUpdatedDate;
  const annualIncomeUpTo = clubInfoResponse.annualIncomeUpTo;

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 0}}>
        <View style={{paddingHorizontal: 10}}>
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
              <Image style={{height: 26, width: 26}} source={clubInfo}></Image>
              <Text
                style={{
                  fontFamily: Fonts.Roboto.Bold,
                  fontSize: 15,
                  color: COLORS.textColor,
                }}>
                Club Year 2025/2026
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
                    value={currentClub?.toString() ?? ''}
                  />
                </View>

                <View style={{flex: 1}}>
                  <OutlinedTextBox
                    Title={'Current Club’s Limit'}
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
                    value={generalAppointmentDate?.toString() ?? ''}
                  />
                </View>

                <View style={{flex: 1}}>
                  <OutlinedTextBox
                    Title={'gen. persistency'}
                    value={generalPersistency?.toString() ?? ''}
                  />
                </View>
              </View>

              <OutlinedTextBox
                Title={'Last 5 year avg. '}
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
                    Title={'Next club'}
                    value={nextClub?.toString() ?? ''}
                  />
                </View>

                <View style={{flex: 1}}>
                  <OutlinedTextBox
                    Title={'Platinum Club'}
                    value={platinumClub?.toString() ?? ''}
                  />
                </View>
              </View>

              <OutlinedTextBox
                Title={'Last Updated Date'}
                value={lastUpdatedDate?.toString() ?? ''}
              />
              <OutlinedTextBox
                Title={'Annual income up to ' + annualIncomeUpTo?.date}
                value={annualIncomeUpTo?.amount?.toString() ?? ''}
              />
            </View>
            <TableComponent
              haveTotal={false}
              tableHead={tableHead}
              tableData={tableData}
              columnWidths={columnWidths}
            />

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
    </View>
  );
}

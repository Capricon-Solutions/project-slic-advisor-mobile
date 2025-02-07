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

// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function ClubInformation({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const tableHead = ['Total', 'Endorsement'];
  const tableData = [
    ['2024', '1,135,750'],
    ['2023', '1,135,750'],
    ['2022', '1,135,750'],
    ['2021', '1,135,750'],
    ['2020', '1,135,750'],
  ];
  const columnWidths = [150, 150];

  return (
    <View style={[Styles.container, {paddingHorizontal: 0}]}>
      <HeaderBackground />

      <SendPaymentLink
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View>
        <Header
          Title="Club information"
          onPress={() => navigation.goBack()}
          haveFilters={false}
          haveWhatsapp={false}
          haveMenu={false}
          onButton={() => setModalVisible(true)}
        />
        <ScrollView style={{paddingHorizontal: 20}}>
          <View style={styles.card}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Bold,
                fontSize: 15,
                color: COLORS.textColor,
              }}>
              Club Year 2025/2026
            </Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                width: '100%',
              }}>
              <View style={{flex: 1}}>
                <OutlinedTextBox
                  Title={'Current Club'}
                  value={'Millionaires Club'}
                />
              </View>

              <View style={{flex: 1}}>
                <OutlinedTextBox
                  Title={'Current Club’s Limit'}
                  value={'1,500,000.00'}
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
                  value={'2001/04/11'}
                />
              </View>

              <View style={{flex: 1}}>
                <OutlinedTextBox Title={'gen. persistency'} value={'82.02%'} />
              </View>
            </View>

            <OutlinedTextBox
              Title={'Last 5 year avg. '}
              value={'3,335,511.31'}
            />

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                width: '100%',
              }}>
              <View style={{flex: 1}}>
                <OutlinedTextBox Title={'Next club'} value={'Platinum Club'} />
              </View>

              <View style={{flex: 1}}>
                <OutlinedTextBox
                  Title={'Platinum Club'}
                  value={'3,750,000.00'}
                />
              </View>
            </View>

            <OutlinedTextBox Title={'Last Updated Date'} value={'2024/10/31'} />
            <OutlinedTextBox
              Title={'Annual income up to 2024/10/31'}
              value={'3,750,000.00'}
            />
          </View>
          <TableComponent
            haveTotal={false}
            tableHead={tableHead}
            tableData={tableData}
            columnWidths={columnWidths}
          />

          {/* Important Notice */}
          <View style={Styles.noticeContainer}>
            <Text style={Styles.noticeTitle}>IMPORTANT</Text>
            <Text style={Styles.noticeText}>
              Please note that the commission income figures shown on this page
              are only based on the businesses issued for the current month.{' '}
              {'\n\n'}
              In particular, debit commission income shown here is based on the
              debit businesses received and not on the debit premiums settled
              during the month. Also, the figures do not include other income
              types such as bonuses, incentives, or ORC commissions. In summary,
              this is only an indicative estimate for you to plan your
              activities. The final figures are subject to change according to
              applicable company policies.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

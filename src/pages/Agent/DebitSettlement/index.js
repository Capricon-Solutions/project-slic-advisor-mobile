import React, { useEffect, useState } from 'react';
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
import { Styles } from '../../../theme/Styles';
import Header from '../../../components/Header';
import HeaderBackground from '../../../components/HeaderBackground';
import { styles } from './styles';
import SetTargetModal from '../../../components/SetTargetModal';
import PolicyItem from '../../../components/PolicyItem';
import Button from '../../../components/Button';
import SmallButton from '../../../components/SmallButton';
import { TextInput } from 'react-native-paper';
import SquareTextBox from '../../../components/SquareTextBox';
import SendPaymentLink from '../../../components/SendPaymentLink';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { useDebitSettlementQuery } from '../../../redux/services/policyDetailsSlice';
import moment from 'moment';
import LoaderKit from 'react-native-loader-kit';

// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function DebitSettlement({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { policyNo } = route.params;
  const {
    data: DebitSettlement,
    error: DebitSettlementError,
    isLoading: DebitSettlementLoading,
    isFetching: DebitSettlementFetching,
  } = useDebitSettlementQuery({
    id: policyNo,
    // id: "VM6125002610000185",
  });

  const [selectedItem, setSelectedItem] = useState(DebitSettlement?.data?.paymentType);

  useEffect(() => {
    console.log("DebitSettlement", DebitSettlement);
  }, [DebitSettlement])

  console.log("policyNo", policyNo);



  return (
    <View style={Styles.container}>
      <HeaderBackground />

      <SendPaymentLink
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <Header
        Title="Debit Settlement/ Payment"
        onPress={() => navigation.goBack()}
        haveFilters={false}
        haveWhatsapp={true}
        haveMenu={false}
        onButton={() => setModalVisible(true)}
      />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <View style={styles.card}>
          <Text
            style={{
              marginBottom: 5,
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.textColor,
            }}>
            Select type
          </Text>
          <AutocompleteDropdown
            clearOnFocus={true}
            closeOnBlur={true}
            showClear={false}
            style={{}}
            textInputProps={{
              autoCorrect: false,
              autoCapitalize: 'none',
              style: {
                color: COLORS.textColor,
              },
            }}
            containerStyle={{}}
            contentContainerStyle={{ color: 'red' }}
            closeOnSubmit={false}
            initialValue={{ id: selectedItem }} // or just '2'
            onSelectItem={setSelectedItem}
            dataSet={[
              { id: 'Debit Settlement', title: 'Debit Settlement' },
              { id: 'Payment', title: 'Payment' },
            ]}
          />
          {/* <Text>{selectedItem}</Text> */}
          <SquareTextBox Title={`LKR ${Number(DebitSettlement?.data?.premiumNetValue || 0).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}`} Label={selectedItem?.id == 1 ? 'Outstanding Due' : 'Renewal Amount'} />
          <SquareTextBox Title={moment(DebitSettlement?.data?.dueDate).format('YYYY/MM/DD')} Label={selectedItem?.id == 1 ? 'Due Date' : 'Renewal Date'} />
          <View style={{ marginTop: 15 }}>
            <Button
              onPress={() => setModalVisible(true)}
              Title={'Send Payment Link'}
            />
          </View>
        </View>
      </ScrollView>
      {DebitSettlementLoading &&

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

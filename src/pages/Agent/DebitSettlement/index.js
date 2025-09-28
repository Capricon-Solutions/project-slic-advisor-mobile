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
import {
  useDebitSettlementQuery,
  useDebitSettlementSmsMutation,
  useDebitSettlementSmsQuery,
} from '../../../redux/services/policyDetailsSlice';
import moment from 'moment';
import LoaderKit from 'react-native-loader-kit';
import { showToast } from '../../../components/ToastMessage';
import SquareTextBoxOutlinedDate from '../../../components/SquareTextBoxOutlinedDate';
import DropdownFilled from '../../../components/DropdownFilled';
import DropdownFilledDebit from '../../../components/DropdownFilledDebit';

// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function DebitSettlement({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { policyNo } = route.params;
  const { phone } = route.params;
  const [mobileNo, setMobileNo] = useState(null);
  const [amount, setAmount] = useState(null);
  const [selectedItem, setSelectedItem] = useState('');

  const {
    data: DebitSettlement,
    error: DebitSettlementError,
    isLoading: DebitSettlementLoading,
    isFetching: DebitSettlementFetching,
  } = useDebitSettlementQuery({
    id: policyNo,
    // id: "VM6125002610000185",
  });
  const [date, setDate] = useState(
    moment(DebitSettlement?.data?.dueDate).format('YYYY/MM/DD'),
  );

  useEffect(() => {
    if (phone) setMobileNo(phone);
    if (
      DebitSettlement?.data?.premiumNetValue &&
      Number(DebitSettlement.data.premiumNetValue) > 0
    ) {
      setAmount(DebitSettlement.data.premiumNetValue);
    }

    if (DebitSettlement?.data?.paymentType) {
      setSelectedItem(DebitSettlement?.data?.paymentType);
    }
  }, [
    phone,
    DebitSettlement?.data?.premiumNetValue,
    DebitSettlement?.data?.paymentType,
  ]);

  const [debitSettlementSms, { isLoading, error }] =
    useDebitSettlementSmsMutation();

  function formatWithCommas(str) {
    if (!str) return '';
    const [integerPart, decimalPart] = str.split('.');
    let intStr = '';
    let count = 0;

    for (let i = integerPart.length - 1; i >= 0; i--) {
      intStr = integerPart[i] + intStr;
      count++;
      if (count % 3 === 0 && i !== 0) {
        intStr = ',' + intStr;
      }
    }

    return decimalPart !== undefined ? `${intStr}.${decimalPart}` : intStr;
  }

  const handleSubmit = async () => {
    if (mobileNo === null || mobileNo === '') {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter the contact number. 🚨',
      });
      return;
    }
    const body = {
      policyNumber: policyNo,
      amount: amount || 0,
      mobileNo: mobileNo,
    };

    try {
      const response = await debitSettlementSms(body).unwrap();
      if (response?.success == true) {
        showToast({
          type: 'success',
          text1: 'Success',
          text2: 'Sms sent successfully',
        });
        setModalVisible(false);
        setTimeout(() => {
          navigation.goBack();
        }, 800);
      }
    } catch (err) {
      showToast({
        type: 'error',
        text1: 'Failed',
        text2: err?.data?.message,
      });
    }
  };

  const validateForm = () => {
    if (!selectedItem || selectedItem === '') {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill in all required fields.',
      });
      return false;
    }

    if (!amount || amount === '' || parseFloat(amount) === 0) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Amount Must Be Greater Than Zero',
      });
      return false;
    }

    return true;
  };

  const handleSendPaymentLink = () => {
    if (!validateForm()) return;
    setModalVisible(true);
  };

  return (
    <View style={Styles.container}>
      <HeaderBackground />

      <SendPaymentLink
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleSubmit={handleSubmit}
        phone={mobileNo}
        loading={isLoading}
        setPhone={setMobileNo}
      />

      <Header
        Title="Debit Settlement/ Payment"
        onPress={() => navigation.goBack()}
        haveFilters={false}
        haveWhatsapp={true}
        haveMenu={false}
        onButton={() => setModalVisible(true)}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.card}>
          <Text
            style={{
              marginBottom: 5,
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.textColor,
            }}>
            Select type
          </Text>
          <DropdownFilledDebit
            // placeholder={'Select'}
            onSelect={v => {
              setSelectedItem(v);
            }}
            search={false}
            cancelable
            Color={COLORS.textInputBackground}
            value={selectedItem}
            dropdownData={[
              { label: 'Debit Settlement', value: 'Debit Settlement' },
              { label: 'Payment', value: 'Payment' },
            ]}
          />

          <SquareTextBox
            keyboardType={'numeric'}
            Title={`LKR ${Number(
              DebitSettlement?.data?.premiumNetValue || 0,
            ).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            value={formatWithCommas(amount)}
            setValue={text => {
              // Remove non-digit characters except decimal point
              let raw = text.replace(/[^0-9.]/g, '');

              // Keep only first decimal point
              const parts = raw.split('.');
              if (parts.length > 2) {
                raw = parts[0] + '.' + parts[1];
              }

              // Limit to 2 decimal places
              if (parts[1]?.length > 2) {
                raw = parts[0] + '.' + parts[1].slice(0, 2);
              }

              setAmount(raw);
            }}
            Label={
              selectedItem?.id === 1 ? 'Outstanding Due' : 'Renewal Amount'
            }
          />

          <SquareTextBoxOutlinedDate
            readOnly={true}
            // Title={StartToDt}
            Label={selectedItem?.id == 1 ? 'Due Date' : 'Renewal Date'}
            setValue={text => setDate(text)}
            keyboardType="numeric"
            value={date}
          />
          <View style={{ marginTop: 15 }}>
            <Button
              onPress={handleSendPaymentLink}
              Title={'Send Payment Link'}
            />
          </View>
        </View>
      </View>
      {DebitSettlementLoading && (
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            width: '100%',
            height: '100%',
          }}>
          <LoaderKit
            style={{ width: 50, height: 50 }}
            name={'LineScalePulseOutRapid'} // Optional: see list of animations below
            color={COLORS.grayText} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
          />
        </View>
      )}
    </View>
  );
}

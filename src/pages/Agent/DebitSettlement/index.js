import React, { useState } from 'react';
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

// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function DebitSettlement({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // API Binds

  // const apiUrl = `http://122.255.4.181:2001/api/debit_settlement/${policyId}`;

  // const headers = {
  //   Authorization: `Bearer ${token}`,
  //   'Content-Type': 'application/json',
  // };

  // const method ='POST';

  // const body = {
  //   type: 'Debit settlement',
  //   Outstanding_due: '36000',
  //   due_date: '2025/02/24',
  //   contact: '0145245875',
  // };
  console.log("selectedItem", selectedItem?.id)
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
            initialValue={{ id: '1' }} // or just '2'
            onSelectItem={setSelectedItem}
            dataSet={[
              { id: '1', title: 'Debit Settlement' },
              { id: '2', title: 'Payment' },
            ]}
          />
          {/* <Text>{selectedItem}</Text> */}
          <SquareTextBox Title={'LKR 360000.00'} Label={selectedItem?.id == 1 ? 'Outstanding Due' : 'Renewal Amount'} />
          <SquareTextBox Title={'2025/01/25'} Label={selectedItem?.id == 1 ? 'Due Date' : 'Renewal Date'} />
          <View style={{ marginTop: 15 }}>
            <Button
              onPress={() => setModalVisible(true)}
              Title={'Send Payment Link'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

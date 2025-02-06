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

// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function DebitSettlement({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <View style={[Styles.container, {paddingHorizontal: 0}]}>
      <HeaderBackground />

      <SendPaymentLink
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View style={{paddingHorizontal: 20}}>
        <Header
          Title="Debit Settlement/ Payment"
          onPress={() => navigation.goBack()}
          haveFilters={false}
          haveWhatsapp={true}
          haveMenu={false}
          onButton={() => setModalVisible(true)}
        />

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
            closeOnSubmit={false}
            // initialValue={{id: '2'}} // or just '2'
            onSelectItem={setSelectedItem}
            dataSet={[
              {id: '1', title: 'Debit Settlement'},
              {id: '2', title: 'Payment'},
            ]}
          />

          <SquareTextBox Title={'LKR 360000.00'} Label={'Outstanding Due'} />
          <SquareTextBox Title={'2025/01/25'} Label={'Due Date'} />
          <View style={{marginTop: 15}}>
            <Button
              onPress={() => setModalVisible(true)}
              Title={'Send Payment Link'}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

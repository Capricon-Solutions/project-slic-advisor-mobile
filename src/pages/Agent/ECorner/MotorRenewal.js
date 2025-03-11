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
import CompetitionIcon from '../../../icons/CompetitionIcon.png'; // Replace with the actual logo path
import * as Progress from 'react-native-progress';
import DuesSummery from '../../../icons/DuesSummery.png'; // Replace with the actual logo path
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Feather from 'react-native-vector-icons/Feather';
import { FlatList } from 'react-native';
import ContactListItem from '../../../components/contactListItem';
import DepartmentItem from '../../../components/DepartmentItem';
import { styles } from './styles';
import LoadingScreen from '../../../components/LoadingScreen';
import {
  useGetBranchesQuery,
  useGetDepartmentQuery,
} from '../../../redux/services/contactSlice';
import { useSelector } from 'react-redux';
import SquareTextBoxOutlined from '../../../components/SquareTextBoxOutlined';
import DropdownComponent from '../../../components/DropdownComponent';
import DropdownComponentNoLabelDashboard from '../../../components/DropdownComponentNoLabelDashboard';
import DropdownComponentNoLabel from '../../../components/DropdownComponentNoLabel';
import SmallButton from '../../../components/SmallButton';
import BPMotorRenewal from '../../../components/ECMotorRenewal';
import ECMotorRenewal from '../../../components/ECMotorRenewal';
import MonthYearPicker from '../../../components/MonthYearPicker';
const window = Dimensions.get('window');

export default function MotorRenewal({ navigation }) {
  const [SelectedType, setSelectedType] = useState(1);
  const motorData = useSelector(state => state.DUES.motorData);
  const nonmotorData = useSelector(state => state.DUES.nonmotorData);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  const dropdownData = Array.from({ length: currentYear - 2019 }, (_, i) => ({
    label: (2020 + i).toString(),
    value: (2020 + i).toString(),
  }));

  const renewalData = [
    { id: '1', name: 'Renewal Item 1' },
    { id: '2', name: 'Renewal Item 2' },
    { id: '3', name: 'Renewal Item 3' },
    { id: '4', name: 'Renewal Item 4' },
    { id: '5', name: 'Renewal Item 5' },
  ];

  return (
    <View style={Styles.container}>
      <MonthYearPicker
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={v => setSelectedDate(v)}
        onSelectText={v => setSelectedDate(v)}
      />
      <HeaderBackground />
      <Header Title="Motor Renewal" onPress={() => navigation.goBack()} />
      <View style={{ paddingHorizontal: 15 }}>
        <View style={styles.searchWrap}>
          <TextInput
            style={styles.textInput}
            // onChangeText={v => setSearchText(v)}
            placeholder="11/2024"
          />
          <TouchableOpacity
            onPress={() => setPickerVisible(true)}
            style={styles.searchButton}>
            <Feather name="calendar" color={COLORS.white} size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.mainWrap}>
          <TouchableOpacity
            onPress={() => setSelectedType(1)}
            style={{
              backgroundColor:
                SelectedType == 1 ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: SelectedType == 1 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              001
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(2)}
            style={{
              backgroundColor:
                SelectedType == 2 ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: SelectedType == 2 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              002
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(3)}
            style={{
              backgroundColor:
                SelectedType == 3 ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: SelectedType == 3 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              003
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(4)}
            style={{
              backgroundColor:
                SelectedType == 4 ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: SelectedType == 4 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              004
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(5)}
            style={{
              backgroundColor:
                SelectedType == 5 ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: SelectedType == 5 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              005
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={renewalData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ECMotorRenewal item={item} />}
          contentContainerStyle={{
            paddingBottom: window.height * 0.25,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

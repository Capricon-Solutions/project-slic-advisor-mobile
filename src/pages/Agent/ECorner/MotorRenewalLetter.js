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
import Octicons from 'react-native-vector-icons/Octicons';
import { FlatList } from 'react-native';
import ContactListItem from '../../../components/contactListItem';
import DepartmentItem from '../../../components/DepartmentItem';
import { styles } from './styles';
import LoadingScreen from '../../../components/LoadingScreen';
import Feather from 'react-native-vector-icons/Feather';

import {
  useGetBranchesQuery,
  useGetDepartmentQuery,
} from '../../../redux/services/contactSlice';
import EconerItems from '../../../components/EconerItems';
import EDocItems from '../../../components/EDocItems';
import ELetterItems from '../../../components/ELetterItems';
const window = Dimensions.get('window');

const data = [
  {
    id: 1,
    type: 'Claim Form',
    conunt: '827',
    download: false,
    Share: false,
  },
  {
    id: 2,
    type: 'Drivers Statement',
    conunt: '827',
    download: false,
    Share: false,
  },
  {
    id: 3,
    type: 'Drivers Statement',
    conunt: '827',
    download: false,
    Share: false,
  },
  {
    id: 4,
    type: 'Drivers Statement',
    conunt: '827',
    download: true,
    Share: true,
  },

];

export default function MotorRenewalLetter({ navigation }) {
  const renderLetterItems = ({ item }) => (
    <ELetterItems item={item} navigation={navigation} />
  );

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Motor Renewal Letter" onPress={() => navigation.goBack()} />
      <View style={{ paddingHorizontal: 5 }}>
        <View style={[styles.searchWrap, { marginHorizontal: 15, marginVertical: 3 }]}>
          <TextInput
            style={styles.textInput}
            // onChangeText={v => setSearchText(v)}
            placeholder="Quick search"
          />
          <TouchableOpacity
            // onPress={() => handleSearch()}
            style={styles.searchButton}>
            <Feather name="search" color={COLORS.white} size={20} />
          </TouchableOpacity>
        </View>
        <View style={[styles.searchWrap, { marginHorizontal: 15, marginBottom: 3 }]}>
          <TextInput
            style={styles.textInput}
            // onChangeText={v => setSearchText(v)}
            placeholder="11/2024"
          />
          <TouchableOpacity
            // onPress={() => handleSearch()}
            style={styles.searchButton}>
            <Feather name="calendar" color={COLORS.white} size={20} />
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              fadeDuration: 1000,
              backgroundColor: 'transparent',
              paddingBottom: window.height * 0.25,
              paddingHorizontal: 15,
            }}
            renderItem={renderLetterItems}
          // keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
}

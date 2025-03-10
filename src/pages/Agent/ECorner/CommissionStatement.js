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
import ELetterItems from '../../../components/ELetterItems';
import DropdownFilled from '../../../components/DropdownFilled';
import Button from '../../../components/Button';
import AlertButton from '../../../components/AlertButton';
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

export default function CommissionStatement({ navigation }) {
  const renderLetterItems = ({ item }) => (
    <ELetterItems item={item} navigation={navigation} />
  );

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Commission Statement" titleFontSize={15} onPress={() => navigation.goBack()} />
      <View style={{ paddingHorizontal: 20 }}>

        <View style={{
          backgroundColor: COLORS.white, borderRadius: 10,
          padding: 20,
          elevation: 5,
          marginVertical: 5
        }}>
          <Text style={{ fontSize: 13, fontFamily: Fonts.Roboto.Medium }}>
            Select the month and year
          </Text>
          <View style={{
            backgroundColor: COLORS.lightBorder,
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
            paddingVertical: 13,
            marginTop: 20,
            alignItems: 'center'
          }}>
            <Text style={{
              fontFamily: Fonts.Roboto.Regular,
              fontSize: 17,
              color: COLORS.black
            }}>November</Text>
            <Text style={{
              fontFamily: Fonts.Roboto.Regular,
              fontSize: 25,
              color: COLORS.black
            }}>|</Text>
            <Text style={{
              fontFamily: Fonts.Roboto.Regular,
              fontSize: 17,
              color: COLORS.black
            }}>2024</Text>
          </View>
        </View>

        {/* //////// */}


        <View style={{
          backgroundColor: COLORS.white, borderRadius: 10,
          padding: 20,
          elevation: 5,
          marginVertical: 10
        }}>
          <Text style={{ fontSize: 13, marginBottom: 5, fontFamily: Fonts.Roboto.Medium }}>
            statement for
          </Text>
          <DropdownFilled
            placeholder={'Select'}
            dropdownData={[
              { label: '905717', value: '1' },
              { label: '403317', value: '2' },
              { label: '565717', value: '3' },
            ]}
          />

          <Text style={{ fontSize: 13, marginTop: 15, marginBottom: 5, fontFamily: Fonts.Roboto.Medium }}>
            Select the document type
          </Text>
          <DropdownFilled
            placeholder={'Select'}
            dropdownData={[
              { label: 'General Cash', value: '1' },

            ]}
          />
          <View style={{ marginTop: 20 }}>
            <AlertButton Title={"Create"} />
          </View>

        </View>
      </View>
    </View>
  );
}

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
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function GeneralPolicyList({navigation}) {
  const PolicyList = [
    {
      id: 1,
      title: 'Motor Comp. Private Car',
      InsuredName: 'TRANS ASIA FREIGHT AND LOGI..',
      PolicyNumber: 'VM11300171000480',
      VehicleNumber: 'KX 4173',
      StartDate: '2025/11/26',
      EndDate: '2025/11/26',
      mobileNumber: '0123456789',
    },
    {
      id: 2,
      title: 'Motor Comp. Private Car',
      InsuredName: 'TRANS ASIA FREIGHT AND LOGI..',
      PolicyNumber: 'VM11300171000480',
      VehicleNumber: 'KX 4173',
      StartDate: '2025/11/26',
      EndDate: '2025/11/26',
      mobileNumber: '0123456789',
    },
    {
      id: 3,
      title: 'Motor Comp. Private Car',
      InsuredName: 'TRANS ASIA FREIGHT AND LOGI..',
      PolicyNumber: 'VM11300171000480',
      VehicleNumber: 'KX 4173',
      StartDate: '2025/11/26',
      EndDate: '2025/11/26',
      mobileNumber: '0123456789',
    },
    {
      id: 4,
      title: 'Motor Comp. Private Car',
      InsuredName: 'TRANS ASIA FREIGHT AND LOGI..',
      PolicyNumber: 'VM11300171000480',
      VehicleNumber: 'KX 4173',
      StartDate: '2025/11/26',
      EndDate: '2025/11/26',
      mobileNumber: '0123456789',
    },
    {
      id: 5,
      title: 'Motor Comp. Private Car',
      InsuredName: 'TRANS ASIA FREIGHT AND LOGI..',
      PolicyNumber: 'VM11300171000480',
      VehicleNumber: 'KX 4173',
      StartDate: '2025/11/26',
      EndDate: '2025/11/26',
      mobileNumber: '0123456789',
    },
    {
      id: 6,
      title: 'Motor Comp. Private Car',
      InsuredName: 'TRANS ASIA FREIGHT AND LOGI..',
      PolicyNumber: 'VM11300171000480',
      VehicleNumber: 'KX 4173',
      StartDate: '2025/11/26',
      EndDate: '2025/11/26',
      mobileNumber: '0123456789',
    },
    {
      id: 7,
      title: 'Motor Comp. Private Car',
      InsuredName: 'TRANS ASIA FREIGHT AND LOGI..',
      PolicyNumber: 'VM11300171000480',
      VehicleNumber: 'KX 4173',
      StartDate: '2025/11/26',
      EndDate: '2025/11/26',
      mobileNumber: '0123456789',
    },
  ];

  const renderPolicyItem = ({item}) => (
    <PolicyItem item={item} navigation={navigation} />
  );

  return (
    <View style={[Styles.container, {paddingHorizontal: 0}]}>
      <HeaderBackground />

      <View style={{paddingHorizontal: 20}}>
        <Header
          Title="General Policy List"
          onPress={() => navigation.goBack()}
          haveFilters={true}
          haveMenu={true}
          onButton={() => setModalVisible(true)}
        />

        <FlatList
          data={PolicyList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            fadeDuration: 1000,
            backgroundColor: 'transparent',
            paddingBottom: window.height * 0.25,
          }}
          renderItem={renderPolicyItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

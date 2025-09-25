import React, {useEffect, useState} from 'react';
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
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import {FlatList} from 'react-native';
import ContactListItem from '../../../components/contactListItem';
import DepartmentItem from '../../../components/DepartmentItem';
import {styles} from './styles';
import LoadingScreen from '../../../components/LoadingScreen';
import {
  useGetBranchesQuery,
  useGetDepartmentQuery,
} from '../../../redux/services/contactSlice';
import EconerItems from '../../../components/EconerItems';
import {useGetGetGogreenDetailsAllQuery} from '../../../redux/services/eCornerSlice';
import {Commands} from 'react-native-webview/lib/RNCWebViewNativeComponent';
import {useSelector} from 'react-redux';
const window = Dimensions.get('window');

export default function ECorner({navigation}) {
  const userCode = useSelector(state => state.Profile.userCode);
  const {data: GogreenDetailsAll} = useGetGetGogreenDetailsAllQuery(userCode);

  useEffect(() => {
    // console.log('GogreenDetailsAll', GogreenDetailsAll);
  }, [GogreenDetailsAll]);

  // console.log('GogreenDetailsAll', GogreenDetailsAll?.data?.[0].kpiTotalUsers);
  const counts = GogreenDetailsAll?.data;
  // console.log('counts', counts);
  const data = [
    {
      id: 1,
      type: 'Motor Renewal',
      page: 'MotorRenewal',
      conunt: counts?.[0]?.kpiTotalEnrolled,
      download: false,
      Share: false,
    },
    {
      id: 2,
      type: 'Motor Renewal Compact',
      page: 'MotorRenewalCompact',
      conunt: counts?.[1]?.kpiTotalEnrolled,
      download: false,
      Share: false,
    },
    {
      id: 3,
      type: 'Non-Motor Renewal Compact',
      page: 'NonMotorRenewalCompact',
      conunt: counts?.[2]?.kpiTotalEnrolled,
      download: false,
      Share: false,
    },
    {
      id: 4,
      type: 'Motor Renewal Letter',
      page: 'MotorRenewalLetter',
      conunt: '0',
      download: true,
      Share: true,
    },
    {
      id: 5,
      type: 'Commission Statement',
      page: 'CommissionStatement',
      conunt: '0',
      download: true,
      Share: false,
    },
    {
      id: 6,
      type: 'E - Documents',
      page: 'EDocument',
      conunt: '0',
      download: true,
      Share: false,
    },
  ];

  const renderEconerItems = ({item}) => (
    <EconerItems item={item} navigation={navigation} />
  );

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="E-Corner" onPress={() => navigation.goBack()} />
      <View style={{paddingHorizontal: 5}}>
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
            renderItem={renderEconerItems}
            // keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
}

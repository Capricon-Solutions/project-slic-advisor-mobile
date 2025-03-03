import React, {useState} from 'react';
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
const window = Dimensions.get('window');

const data = [
  {
    id: 1,
    type: 'Motor Renewal',
    conunt: '827',
    download: false,
    Share: false,
  },
  {
    id: 2,
    type: 'Motor Renewal Compact',
    conunt: '827',
    download: false,
    Share: false,
  },
  {
    id: 3,
    type: 'Non-motor Renewal Compact',
    conunt: '827',
    download: false,
    Share: false,
  },
  {
    id: 4,
    type: 'Motor renewal letter',
    conunt: '827',
    download: true,
    Share: true,
  },
  {
    id: 5,
    type: 'commission statement',
    conunt: '827',
    download: true,
    Share: false,
  },
];

export default function ECorner({navigation}) {
  const renderEconerItems = ({item}) => <EconerItems item={item} />;

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="E-Corner" onPress={() => navigation.goBack()} />
      <View style={{paddingHorizontal: 5}}>
        {/* {isLoading == true ? ( */}
        {/* <LoadingScreen /> */}
        {/* ) : ( */}
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
        {/* )} */}
      </View>
    </View>
  );
}

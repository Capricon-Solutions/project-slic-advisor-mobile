import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
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
import {useGetBranchesQuery} from '../../../redux/services/api';
import LoadingScreen from '../../../components/LoadingScreen';
const window = Dimensions.get('window');

const departments = [
  {
    id: 1,
    name: 'Mr. Saman Priyantha',
    department: 'ICT Department',
    contact: '0762456721',
  },
  {
    id: 2,
    name: 'Mr. Poorna Gamage',
    department: 'ICT Department',
    contact: '0762456721',
  },
  {
    id: 3,
    name: 'Mr. Saman Priyantha',
    department: 'ICT Department',
    contact: '0762456721',
  },
  {
    id: 4,
    name: 'Mr. Kamal Priyantha',
    department: 'ICT Department',
    contact: '0762456721',
  },
  {
    id: 5,
    name: 'Mr. Nimal Priyantha',
    department: 'ICT Department',
    contact: '0762456721',
  },
  {
    id: 6,
    name: 'Mr. Sumal Priyantha',
    department: 'ICT Department',
    contact: '0762456721',
  },
  {
    id: 7,
    name: 'Mr. Kevin gamage',
    department: 'ICT Department',
    contact: '0762456721',
  },
];

export default function Contacts({navigation}) {
  const {data: branches, isLoading, error} = useGetBranchesQuery();

  const [SelectedType, setSelectedType] = useState(1);

  const renderItem = ({item}) => <ContactListItem item={item} />;

  const renderDepartmentItem = ({item}) => <DepartmentItem item={item} />;

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <View style={Styles.container}>
        <HeaderBackground />
        <Header Title="Contacts" onPress={() => navigation.goBack()} />
        <View style={styles.mainWrap}>
          <TouchableOpacity
            onPress={() => setSelectedType(1)}
            style={{
              backgroundColor:
                SelectedType == 1 ? COLORS.primary : COLORS.white,
              borderRadius: 12,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Text
              style={{
                color: SelectedType == 1 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              Branches
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(2)}
            style={{
              backgroundColor:
                SelectedType == 2 ? COLORS.primary : COLORS.white,
              borderRadius: 12,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: SelectedType == 2 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              Department
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrap}>
          <TextInput style={styles.textInput} placeholder="Quick Search" />
          <TouchableOpacity style={styles.searchButton}>
            <Octicons name="search" color={COLORS.white} size={20} />
          </TouchableOpacity>
        </View>

        <View>
          {SelectedType == 1 ? (
            <FlatList
              data={branches?.data}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                fadeDuration: 1000,
                backgroundColor: 'transparent',
                paddingBottom: window.height * 0.25,
              }}
              renderItem={renderItem}
              keyExtractor={item => item?.id?.toString()}
            />
          ) : (
            <FlatList
              data={departments}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                fadeDuration: 1000,
                backgroundColor: 'transparent',
                paddingBottom: window.height * 0.25,
              }}
              renderItem={renderDepartmentItem}
              keyExtractor={item => item.id.toString()}
            />
          )}
        </View>
      </View>
    );
  }
}

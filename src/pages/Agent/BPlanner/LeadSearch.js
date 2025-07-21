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
import LeadSearchItem from '../../../components/LeadSearchItem';
import {useGetLeadsQuery} from '../../../redux/services/plannerSlice';
import {useSelector} from 'react-redux';
const window = Dimensions.get('window');

export default function LeadSearch({navigation}) {
  const userCode = useSelector(state => state.Profile.userCode);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const {data: branches, isLoading, error} = useGetBranchesQuery();
  const {data: departments, isDipLoading, diperror} = useGetDepartmentQuery();
  const {data: Leads} = useGetLeadsQuery(
    {userCode: usertype == 2 ? personalCode : userCode},
    {
      refetchOnMountOrArgChange: false,
    },
  );
  const [SelectedType, setSelectedType] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  console.log('userCode', userCode);
  const SELF = Leads?.data?.filter(lead => lead.leadSource === 'BCON') || [];
  const SLIC = Leads?.data?.filter(lead => lead.leadSource === 'CAMP') || [];

  // Filter both SELF and SLIC based on searchQuery
  // const filteredSELF = SELF.filter(lead =>
  //   lead.customerName.toLowerCase().includes(searchQuery.toLowerCase()),
  // );
  // const filteredSLIC = SLIC.filter(lead =>
  //   lead.customerName.toLowerCase().includes(searchQuery.toLowerCase()),
  // );

  // const filteredSELF = searchQuery
  //   ? SELF.filter(lead =>
  //       lead.customerName.toLowerCase().includes(searchQuery.toLowerCase()),
  //     )
  //   : SELF;

  const filteredSELF = searchQuery
    ? SELF.filter(lead =>
        lead.customerName
          .toLowerCase()
          .split(' ')
          .some(word => word.startsWith(searchQuery.toLowerCase())),
      )
    : SELF;

  // const filteredSLIC = searchQuery
  //   ? SLIC.filter(lead =>
  //       lead.customerName.toLowerCase().includes(searchQuery.toLowerCase()),
  //     )
  //   : SLIC;

  const filteredSLIC = searchQuery
    ? SLIC.filter(lead =>
        lead.customerName
          .toLowerCase()
          .split(' ')
          .some(word => word.startsWith(searchQuery.toLowerCase())),
      )
    : SLIC;
  console.log('filteredSLIC', filteredSLIC);

  const renderDepartmentItem = ({item}) => (
    <LeadSearchItem
      item={item}
      onPress={() => navigation.navigate('LeadInformation', {item: item})}
    />
  );

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Lead Search" onPress={() => navigation.goBack()} />
      <View style={{paddingHorizontal: 20}}>
        <View style={[styles.mainWrap, {marginTop: 10}]}>
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
              SLIC
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
              SELF
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.searchWrap, {marginVertical: 12}]}>
          <TextInput
            style={styles.textInput}
            placeholder="Quick Search"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Octicons name="search" color={COLORS.white} size={20} />
          </TouchableOpacity>
        </View>
        {isLoading == true ? (
          <LoadingScreen />
        ) : (
          <View>
            {SelectedType == 1 ? (
              <FlatList
                data={filteredSLIC}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  fadeDuration: 1000,
                  backgroundColor: 'transparent',
                  paddingBottom: window.height * 0.55,
                }}
                renderItem={renderDepartmentItem}
                // keyExtractor={item => item.id.toString()}
              />
            ) : (
              <FlatList
                data={filteredSELF}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  fadeDuration: 1000,
                  backgroundColor: 'transparent',
                  paddingBottom: window.height * 0.55,
                }}
                renderItem={renderDepartmentItem}
                // keyExtractor={item => item.id.toString()}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
}

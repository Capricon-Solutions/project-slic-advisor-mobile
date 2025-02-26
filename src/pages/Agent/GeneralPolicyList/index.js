import React, {useEffect, useState} from 'react';
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
import PolicyFilter from '../../../components/PolicyFilter';
import {useGetPolicyListQuery} from '../../../redux/services/policyListSlice';
import LoadingScreen from '../../../components/LoadingScreen';
import {PaperProvider} from 'react-native-paper';
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function GeneralPolicyList({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchType, setSearchType] = useState(' ');

  const {
    data: PolicyListResponse,
    isLoading,
    error,
    refetch,
    diperror,
  } = useGetPolicyListQuery({id: 360115, filterText: searchType});

  useEffect(() => {
    refetch(); // Auto re-fetch when searchType changes
    // console.log('searchType', searchType);
    // console.log('PolicyListResponse', PolicyListResponse);
    console.log('error', error);
  }, [searchType]);

  const PolicyList = error ? [] : PolicyListResponse?.data;
  const renderPolicyItem = ({item}) => (
    <PolicyItem item={item} navigation={navigation} />
  );
  const menuItems = [
    {
      id: 1,
      title: 'All',
      onPress: () => setSearchType(''),
    },
    {
      id: 2,
      title: 'Motor Policies',
      onPress: () => setSearchType('Motor'),
    },
    {
      id: 3,
      title: 'Non-Motor Policies',
      onPress: () => setSearchType('NonMotor'),
    },
    {
      id: 4,
      title: 'Premium Pending',
      onPress: () => setSearchType('PremiumsPending'),
    },
    {
      id: 5,
      title: 'Debit Outstanding',
      onPress: () => setSearchType('DebitOutstanding'),
    },
    {
      id: 6,
      title: 'Claim Pending',
      onPress: () => setSearchType('ClaimsPending'),
    },
    {
      id: 7,
      title: 'Reminders Set Policies',
      onPress: () => setSearchType('Flagged'),
    },
    {
      id: 8,
      title: 'Top',
      onPress: () => setSearchType('Top'),
    },
  ];

  return (
    <PaperProvider>
      <View style={[Styles.container, {paddingHorizontal: 0}]}>
        <HeaderBackground />

        <View>
          <Header
            Title="General Policy List"
            onPress={() => navigation.goBack()}
            haveFilters={true}
            onFilterPress={() => setModalVisible(true)}
            haveMenu={true}
            menuItems={menuItems}
          />

          <PolicyFilter
            Name={'Policy Information Search Click'}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          {isLoading == true ? (
            <View
              style={{
                height: window.height * 0.9,

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LoadingScreen />
            </View>
          ) : (
            <View>
              {PolicyList?.length !== 0 ? (
                <FlatList
                  data={PolicyList}
                  showsVerticalScrollIndicator={false}
                  // LoadingScreen={<LoadingScreen />}
                  contentContainerStyle={{
                    fadeDuration: 1000,
                    backgroundColor: 'transparent',
                    paddingBottom: window.height * 0.25,
                    paddingHorizontal: 15,
                  }}
                  renderItem={renderPolicyItem}
                  // keyExtractor={item => item.id.toString()}
                />
              ) : (
                <View
                  style={{
                    height: window.height * 0.9,

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>{searchType} policies not available</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </PaperProvider>
  );
}

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
import {
  useGetPolicyListQuery,
  useSearchPoliciesMutation,
} from '../../../redux/services/policyListSlice';
import LoadingScreen from '../../../components/LoadingScreen';
import {PaperProvider} from 'react-native-paper';
import SearchParams from '../../../redux/SearchParams';
import {useSelector} from 'react-redux';
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function GeneralPolicyList({navigation}) {
  const userCode = useSelector(state => state.Profile.userCode);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchType, setSearchType] = useState('A');
  const [policyValues, setPolicyValues] = useState({
    BusinessType: '',
    status: '',
    PolicyNumber: '',
    VehicleNumber: '',
    StartFromDt: '',
    StartToDt: '',
    MobileNumber: '',
    NicNumber: '',
    BusiRegNo: '',
  });
  const handlePolicyValuesChange = newValues => {
    setPolicyValues(newValues);
  };

  const [PolicyListResponse, {data: PolicyListData, isLoading, error}] =
    useSearchPoliciesMutation();

  const searchData = {
    BusinessType: policyValues.BusinessType,
    PremiumsPending: policyValues.status === 'P' ? true : false,
    ClaimPending: policyValues.status === 'C' ? true : false,
    Flagged: false,
    BadClaims: false,
    DebitOutstanding: policyValues.status === 'D' ? true : false,
    PolicyNumber: policyValues.PolicyNumber,
    VehicleNumber: policyValues.VehicleNumber,
    StartFromDt: policyValues.StartFromDt,
    StartToDt: policyValues.StartToDt,
    TodayReminders: policyValues.status === 'F' ? true : false,
    MobileNumber: policyValues.MobileNumber,
    AgentCode: usertype == 2 ? personalCode : userCode,
    NicNumber: policyValues.NicNumber,
    BusiRegNo: policyValues.BusiRegNo,
  };

  const searchParamMap = {
    A: SearchParams.AllSearch,
    M: SearchParams.MotorSearch,
    G: SearchParams.NonMotorSearch,
    P: SearchParams.premiumPending,
    D: SearchParams.debitOutstanding,
    C: SearchParams.claimPending,
    F: SearchParams.remindersSet,
    Filter: searchData,
  };

  useEffect(() => {
    const selectedSearchParam = {
      ...(searchParamMap[searchType] || SearchParams.AllSearch),
      AgentCode: usertype == 2 ? personalCode : userCode, // override AgentCode
    };
    PolicyListResponse(selectedSearchParam)
      .then(response => {})
      .catch(err => {
        console.log('Error:', err);
      });
  }, [searchType]); // include searchData if it's used in 'Filter'

  useEffect(() => {}, [searchType, PolicyListData]);

  const PolicyList = error ? [] : PolicyListData?.data;
  const renderPolicyItem = ({item}) => (
    <PolicyItem item={item} navigation={navigation} />
  );
  const menuItems = [
    {
      id: 1,
      title: 'All',
      onPress: () => setSearchType('A'),
    },
    {
      id: 2,
      title: 'Motor Policies',
      onPress: () => setSearchType('M'),
    },
    {
      id: 3,
      title: 'Non-Motor Policies',
      onPress: () => setSearchType('G'),
    },
    {
      id: 4,
      title: 'Premium Pending',
      onPress: () => setSearchType('P'),
    },
    {
      id: 5,
      title: 'Debit Outstanding',
      onPress: () => setSearchType('D'),
    },
    {
      id: 6,
      title: 'Claim Pending',
      onPress: () => setSearchType('C'),
    },
    {
      id: 7,
      title: 'Reminders Set Policies',
      onPress: () => setSearchType('F'),
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
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            onPressSearch={() => {
              PolicyListResponse(searchData);
              setModalVisible(false);
            }}
            onPressClear={() => console.log('clear ', policyValues)}
            Name="Policy Filter"
            handlePolicyValuesChange={handlePolicyValuesChange}
            initialValues={policyValues}
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
              {PolicyList?.length > 0 ? (
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
                  maxToRenderPerBatch={50}
                  initialNumToRender={20}
                  // keyExtractor={item => item.id.toString()}
                />
              ) : (
                <View
                  style={{
                    height: window.height * 0.85,

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: COLORS.grayText}}>
                    Policies not available yet.!
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </PaperProvider>
  );
}

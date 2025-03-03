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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularProgress from 'react-native-circular-progress-indicator';

import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import {Styles} from '../../../theme/Styles';
import Header from '../../../components/Header';
import HeaderBackground from '../../../components/HeaderBackground';
import {Avatar} from 'react-native-paper';
import avatar from '../../../images/avatar.png'; // Replace with the actual logo path
import SALES_PERFORMANCE from '../../../icons/SALES_PERFORMANCE.png'; // Replace with the actual logo path
import GENERAL from '../../../icons/GENERAL.png'; // Replace with the actual logo path
import PRODUCT_PORTFOLIO from '../../../icons/PRODUCT_PORTFOLIO.png'; // Replace with the actual logo path
import E_CORNER from '../../../icons/E-CORNER.png'; // Replace with the actual logo path
import CLUB from '../../../icons/CLUB.png'; // Replace with the actual logo path
import B_PLANNER from '../../../icons/B-PLANNER.png'; // Replace with the actual logo path
import IndividualModal from '../../../components/IndividualModal';
import individualPerforamance from '../../../icons/individualPerforamance.png'; // Replace with the actual logo path
import policyRenewal from '../../../icons/policyRenewal.png'; // Replace with the actual logo path

import {styles} from './styles';
// import GeneralModal from '../../../components/GeneralModal';
import BottomModal from '../../../components/BottomModal';
import teamPerformance from '../../../icons/teamPerformance.png'; // Replace with the actual logo path
import Flag from '../../../components/Flag';
import {useSelector} from 'react-redux';
import AgentGrid from '../../../components/AgentGrid';
import RMGrid from '../../../components/RMGrid';
import AgentProgressCard from '../../../components/AgentProgressCard';
import RMProgressCard from '../../../components/RMProgressCard';

const window = Dimensions.get('window');

export default function Dashboard({navigation}) {
  const value = 40; // 40% of the gauge. min=0 max=100
  const [modalVisible, setModalVisible] = useState(false);
  const [generaModalVisible, setgeneraModalVisible] = useState(false);
  const [salesModalVisible, setsalesModalVisible] = useState(false);
  const [flagVisible, setFlagVisible] = useState(false);
  const profileResponse = useSelector(
    state => state.Profile.profileResponse.data,
  );
  const usertype = useSelector(state => state.userType.userType);
  console.log('userType', usertype);
  // API Binds
  const name = profileResponse?.name;
  const regionName = profileResponse?.regionName;
  const designation = profileResponse?.designation;
  const imageUrl = profileResponse?.imageUrl;
  const totalIslandRank = profileResponse?.Summery.totalIslandRank;
  const islandRank = profileResponse?.Summery.islandRank;
  const regionalRank = profileResponse?.Summery.regionalRank;
  const totalNumberofRegions = profileResponse?.Summery.totalNumberofRegions;
  const branchRank = profileResponse?.Summery.branchRank;
  const totalNumberofBranches = profileResponse?.Summery.totalNumberofBranches;

  const GeneralModal = [
    {
      title: 'Policy Details',
      icon: individualPerforamance,
      onPress: () => {
        navigation.navigate('GeneralPolicyList');
        setgeneraModalVisible(false);
      },
    },
    {
      title: 'Policy Renewals',

      icon: policyRenewal,
      onPress: () => {
        navigation.navigate('PolicyRenewals');
        setgeneraModalVisible(false);
      },
    },
    {
      title: 'PPW Cancellation',
      icon: policyRenewal,
      onPress: () => {
        navigation.navigate('PPWCancellation');
        setgeneraModalVisible(false);
      },
    },
  ];

  const SalesModal = [
    {
      title: 'Individual Performance',
      icon: individualPerforamance,
      onPress: () => setModalVisible(true),
    },
    // {
    //   title: 'Team Performance',
    //   icon: teamPerformance,
    //   // onPress: () => setModalVisible(true),
    // },
  ];

  const IndividualPerformanceType =
    usertype == 1
      ? [
          {
            title: 'Individual Statistics',
            icon: individualPerforamance,
            onPress: () => {
              setsalesModalVisible(false);
              setModalVisible(false);
              navigation.navigate('IndividualStatistics');
            },
          },
        ]
      : [
          {
            title: 'My Self',
            icon: individualPerforamance,
            onPress: () => {
              setModalVisible(false);
              navigation.navigate('MyselfPerformance');
            },
          },
          {
            title: 'Team',
            expandable: true,
            subButtons: [
              {
                title: 'Team Statistics',
                onPress: () => {
                  setModalVisible(false);
                  navigation.navigate('TeamStatistics');
                },
              },
              {
                title: 'Current Performance',
                onPress: () => {
                  setModalVisible(false);
                  navigation.navigate('TeamPerformance');
                  console.log('test');
                },
              },
            ],
            icon: policyRenewal,
            onPress: 'expand',
          },
          {
            title: 'Team Member',
            icon: policyRenewal,
            onPress: () => {
              setModalVisible(false);
              navigation.navigate('TeamMemberGrid');
            },
          },
        ];
  const defaultImageUrl = useSelector(state => state.Profile.defaultImageUrl);

  return (
    <View style={[Styles.container, {paddingHorizontal: 0}]}>
      <BottomModal
        Name={'Individual Performance'}
        ButtonList={SalesModal}
        modalVisible={salesModalVisible}
        setModalVisible={setsalesModalVisible}
      />

      <BottomModal
        Name={'General Insurance'}
        modalVisible={generaModalVisible}
        ButtonList={GeneralModal}
        setModalVisible={setgeneraModalVisible}
      />
      <Flag
        Name={'Flag this for quick access?'}
        modalVisible={flagVisible}
        setModalVisible={setFlagVisible}
      />
      <BottomModal
        Name={'Individual Performance'}
        modalVisible={modalVisible}
        ButtonList={IndividualPerformanceType}
        setModalVisible={setModalVisible}
      />
      {/* 
      <IndividualModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      /> */}

      <HeaderBackground />
      {/* <Header
        Title={
          usertype == 1
            ? 'Dashboard'
            : usertype == 2
            ? 'Dashboard'
            : 'Dashboard'
        }
        onPress={() => navigation.goBack()}
      /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={20}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 10,
          paddingTop: 30,
        }}>
        <View style={styles.mainWrap}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            Title={'Sign In'}
            style={styles.profilePicture}>
            <Avatar.Image
              size={window.width * 0.15}
              style={{backgroundColor: 'transparent'}}
              source={{uri: defaultImageUrl}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{flex: 0.6, justifyContent: 'center', paddingLeft: 3}}>
            <Text style={styles.UserName}>{name}</Text>
            <Text style={styles.regionName}>region name - {regionName}</Text>
            {/* <Text style={styles.position}>( {designation})</Text> */}
            <Text style={styles.position}>
              (
              {usertype == 1
                ? 'Advisor'
                : usertype == 2
                ? 'Team Leader'
                : usertype == 3
                ? 'Regional Manager'
                : 'Unknown'}
              )
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            style={styles.notiIcon}>
            <MaterialCommunityIcons
              name="bell-outline"
              color={COLORS.iconDisabled}
              size={window.width * 0.075}
            />
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontFamily: Fonts.Roboto.ExtraBold,
              color: COLORS.black,
              fontSize: window.width * 0.043,
            }}>
            {usertype == 1
              ? 'Advisor Summary'
              : usertype == 2
              ? 'Team Leader Summary'
              : 'Central 1 Region Summary'}
          </Text>
        </View>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('SalesMeter')}
          style={Styles.rankWrap}>
          <View
            style={{
              flex: 0.65,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CircularProgress
              value={islandRank}
              radius={window.height * 0.1}
              duration={2000}
              progressValueColor={COLORS.textColor}
              maxValue={totalIslandRank}
              activeStrokeWidth={20}
              inActiveStrokeWidth={20}
              activeStrokeColor={COLORS.primary}
              inActiveStrokeColor={COLORS.lightBorder}
              valueSuffix={'/' + totalIslandRank}
              titleStyle={{fontWeight: 'bold'}}
              progressValueStyle={{
                fontSize: 25,
                fontFamily: Fonts.Roboto.Bold,
              }}
              valueSuffixStyle={{fontSize: 22, color: COLORS.textColor}}
            />
            <Text
              style={{
                fontSize: window.width * 0.045,
                marginTop: 5,
                fontFamily: Fonts.Roboto.Medium,
                color: COLORS.textColor,
              }}>
              Island Rank
            </Text>
          </View>
          <View
            style={{
              flex: 0.35,
            }}>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CircularProgress
                  value={regionalRank}
                  radius={window.height * 0.045}
                  duration={2000}
                  progressValueColor={COLORS.regionalRank}
                  maxValue={totalNumberofRegions}
                  activeStrokeWidth={12}
                  inActiveStrokeWidth={12}
                  activeStrokeColor={COLORS.regionalRank}
                  inActiveStrokeColor={COLORS.lightBorder}
                  // title={'Progress'}
                  valueSuffix={'/' + totalNumberofRegions}
                  progressValueStyle={{
                    fontSize: window.height * 0.023,
                    fontFamily: Fonts.Roboto.Bold,
                  }}
                  valueSuffixStyle={{
                    fontSize: window.height * 0.018,
                    color: COLORS.regionalRank,
                  }}
                  // titleColor={'red'}
                  titleStyle={{fontWeight: 'bold'}}
                />
                <Text
                  style={{
                    marginTop: 2,
                    fontSize: window.width * 0.03,
                    fontFamily: Fonts.Roboto.Medium,
                    color: COLORS.textColor,
                  }}>
                  Regional Rank
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CircularProgress
                  value={branchRank}
                  radius={window.height * 0.045}
                  duration={2000}
                  progressValueColor={COLORS.branchRank}
                  maxValue={totalNumberofBranches}
                  activeStrokeWidth={12}
                  inActiveStrokeWidth={12}
                  activeStrokeColor={COLORS.branchRank}
                  inActiveStrokeColor={COLORS.lightBorder}
                  // title={'Progress'}
                  valueSuffix={'/' + totalNumberofBranches}
                  progressValueStyle={{
                    fontSize: window.height * 0.023,
                    fontFamily: Fonts.Roboto.Bold,
                  }}
                  valueSuffixStyle={{
                    fontSize: window.height * 0.018,
                    color: COLORS.branchRank,
                  }}
                  // titleColor={'red'}
                  titleStyle={{fontWeight: 'bold'}}
                />
                <Text
                  style={{
                    marginTop: 2,
                    fontSize: window.width * 0.03,
                    fontFamily: Fonts.Roboto.Medium,
                    color: COLORS.textColor,
                  }}>
                  Branch Rank
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity> */}
        {usertype == 1 && (
          <AgentProgressCard
            totalIslandRank={totalIslandRank}
            totalNumberofRegions={totalNumberofRegions}
            totalNumberofBranches={totalNumberofBranches}
            regionalRank={regionalRank}
            branchRank={branchRank}
            islandRank={islandRank}
            onPress={() => navigation.navigate('SalesMeter')}
          />
        )}

        {usertype == 2 && (
          <AgentProgressCard
            totalIslandRank={totalIslandRank}
            totalNumberofRegions={totalNumberofRegions}
            totalNumberofBranches={totalNumberofBranches}
            regionalRank={regionalRank}
            branchRank={branchRank}
            islandRank={islandRank}
            onPress={() => navigation.navigate('SalesMeter')}
          />
        )}

        {usertype == 3 && (
          <RMProgressCard
            totalIslandRank={totalIslandRank}
            totalNumberofRegions={totalNumberofRegions}
            totalNumberofBranches={totalNumberofBranches}
            regionalRank={regionalRank}
            branchRank={branchRank}
            islandRank={islandRank}
            // onPress={() => navigation.navigate('SalesMeter')}
          />
        )}
        {usertype == 3 && (
          <Text
            style={{
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.textColor,
              fontSize: 15,
              marginVertical: 2,
            }}>
            Insurance Categories
          </Text>
        )}
        {usertype == 1 && (
          <AgentGrid
            onSalesClick={() => setModalVisible(true)}
            onGeneralClick={() => setgeneraModalVisible(true)}
            onClubClick={() => navigation.navigate('ClubInformation')}
            onBplannerClick={() => navigation.navigate('BPlanner')}
            onEConnerClick={() => navigation.navigate('ECorner')}
            onProductPortfolioClick={() =>
              navigation.navigate('ProductPortfolio')
            }
          />
        )}

        {usertype == 2 && (
          <AgentGrid
            onSalesClick={() => setModalVisible(true)}
            onGeneralClick={() => setgeneraModalVisible(true)}
            onClubClick={() => navigation.navigate('ClubInformation')}
            onBplannerClick={() => navigation.navigate('BPlanner')}
            onEConnerClick={() => navigation.navigate('ECorner')}
            onProductPortfolioClick={() =>
              navigation.navigate('ProductPortfolio')
            }
          />
        )}

        {usertype == 3 && (
          <RMGrid
            // onRegionSummaryClick={() => setModalVisible(true)}
            onKPISummaryClick={() => navigation.navigate('KPISummary')}
            // onDUESSummaryClick={() => navigation.navigate('ClubInformation')}
            // onClassSummaryClick={() => navigation.navigate('BPlanner')}
            // onCompetitionClick={() => console.log('E-Coner click')}
          />
        )}
      </ScrollView>
    </View>
  );
}

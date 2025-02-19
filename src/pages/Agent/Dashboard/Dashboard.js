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

  const IndividualPerformanceType = [
    {
      title: 'Individual Statistics',
      icon: individualPerforamance,
      onPress: () => {
        setsalesModalVisible(false);
        setModalVisible(false);
        navigation.navigate('IndividualStatistics');
      },
    },
    // {
    //   title: 'Individual performance Comparison',
    //   icon: teamPerformance,
    //   // onPress: () => setModalVisible(true),
    // },
    // {
    //   title: 'Branch sales performance',
    //   icon: teamPerformance,
    //   // onPress: () => setModalVisible(true),
    // },
  ];

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
      <Header Title="Advisor Dashboard" onPress={() => navigation.goBack()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={20}
        contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 20}}>
        <View style={styles.mainWrap}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            Title={'Sign In'}
            style={styles.profilePicture}>
            <Avatar.Image
              size={57}
              style={{backgroundColor: 'transparent'}}
              source={{uri: imageUrl}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{flex: 0.6, justifyContent: 'center', paddingLeft: 3}}>
            <Text style={styles.UserName}>{name}</Text>
            <Text style={styles.regionName}>region name - {regionName}</Text>
            <Text style={styles.position}>( {designation})</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            style={styles.notiIcon}>
            <MaterialCommunityIcons
              name="bell-outline"
              color={COLORS.iconDisabled}
              size={26}
            />
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 14}}>
          <Text
            style={{
              fontFamily: Fonts.Roboto.ExtraBold,
              color: COLORS.black,
              fontSize: window.width * 0.044,
            }}>
            Advisor Summary
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('SalesMeter')}
          style={Styles.rankWrap}>
          <View
            style={{
              flex: 0.65,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <View style={styles.IslandRank}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Bold,
                fontSize: 24,
                color: COLORS.black,
              }}>
              550
            </Text>
            <Text style={{fontSize: 17, fontFamily: Fonts.Roboto.Regular}}>
              Island Rank
            </Text>
          </View> */}
            <CircularProgress
              value={islandRank}
              radius={80}
              duration={2000}
              progressValueColor={COLORS.textColor}
              maxValue={totalIslandRank}
              activeStrokeWidth={20}
              inActiveStrokeWidth={20}
              activeStrokeColor={COLORS.primary}
              inActiveStrokeColor={COLORS.lightBorder}
              // title={'Progress'}
              valueSuffix={'/' + totalIslandRank}
              // titleColor={'red'}
              titleStyle={{fontWeight: 'bold'}}
              progressValueStyle={{
                fontSize: 25,
                fontFamily: Fonts.Roboto.Bold,
              }}
              valueSuffixStyle={{fontSize: 22, color: COLORS.textColor}}
              // titleColor={'red'}
            />
            <Text
              style={{
                fontSize: 18,
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
                  radius={35}
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
                    fontSize: 18,
                    fontFamily: Fonts.Roboto.Bold,
                  }}
                  valueSuffixStyle={{fontSize: 14, color: COLORS.regionalRank}}
                  // titleColor={'red'}
                  titleStyle={{fontWeight: 'bold'}}
                />
                <Text
                  style={{
                    marginTop: 2,
                    fontSize: window.width * 0.035,
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
                  radius={35}
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
                    fontSize: 18,
                    fontFamily: Fonts.Roboto.Bold,
                  }}
                  valueSuffixStyle={{fontSize: 14, color: COLORS.branchRank}}
                  // titleColor={'red'}
                  titleStyle={{fontWeight: 'bold'}}
                />
                <Text
                  style={{
                    marginTop: 2,
                    fontSize: window.width * 0.035,
                    fontFamily: Fonts.Roboto.Medium,
                    color: COLORS.textColor,
                  }}>
                  Branch Rank
                </Text>
              </View>
            </View>
          </View>
          {/* <AnimatedGaugeProgress
                    size={200}
                    width={15}
                    fill={100}
                    rotation={90}
                    cropDegree={90}
                    tintColor="#4682b4"
                    delay={0}
                    backgroundColor="#b0c4de"
                    stroke={[2, 2]} //For a equaly dashed line
                    strokeCap="circle" /> */}
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: window.height * 0.02,
          }}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={Styles.iconGrid}>
            <Image style={Styles.gridIcon} source={SALES_PERFORMANCE}></Image>
            <Text style={Styles.gridText}>SALES PERFORMANCE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setgeneraModalVisible(true)}
            style={Styles.iconGrid}>
            <Image style={Styles.gridIcon} source={GENERAL}></Image>
            <Text style={Styles.gridText}>GENERAL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ClubInformation')}
            style={Styles.iconGrid}>
            <Image style={Styles.gridIcon} source={CLUB}></Image>
            <Text style={Styles.gridText}>CLUB</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 13,
          }}>
          <TouchableOpacity
            // onPress={() => setFlagVisible(true)}
            style={Styles.iconGrid}>
            <Image style={Styles.gridIcon} source={B_PLANNER}></Image>
            <Text style={Styles.gridText}>B-PLANNER</Text>
          </TouchableOpacity>
          <View style={Styles.iconGrid}>
            <Image style={Styles.gridIcon} source={E_CORNER}></Image>
            <Text style={Styles.gridText}>E-CORNER</Text>
          </View>
          <TouchableOpacity
            style={Styles.iconGrid}
            onPress={() => navigation.navigate('ProductPortfolio')}>
            <Image style={Styles.gridIcon} source={PRODUCT_PORTFOLIO}></Image>
            <Text style={Styles.gridText}>PRODUCT PORTFOLIO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

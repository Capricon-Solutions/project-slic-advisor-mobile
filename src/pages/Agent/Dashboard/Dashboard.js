import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

const window = Dimensions.get('window');

export default function Dashboard({navigation}) {
  const value = 40; // 40% of the gauge. min=0 max=100
  const [modalVisible, setModalVisible] = useState(false);
  const [generaModalVisible, setgeneraModalVisible] = useState(false);
  const [salesModalVisible, setsalesModalVisible] = useState(false);

  const GeneralModal = [
    {
      title: 'Policy Details',
      icon: individualPerforamance,
      onPress: () => {
        navigation.navigate('GeneralPolicyList');
        setgeneraModalVisible(false);
      },
    },
    {title: 'Policy Renewals', icon: policyRenewal},
    {title: 'PPW Cancellation', icon: policyRenewal},
  ];

  const SalesModal = [
    {
      title: 'Individual Performance',
      icon: individualPerforamance,
      onPress: () => setModalVisible(true),
    },
    {
      title: 'Team Performance',
      icon: teamPerformance,
      // onPress: () => setModalVisible(true),
    },
  ];

  return (
    <View style={Styles.container}>
      <BottomModal
        Name={'Individual Performance'}
        ButtonList={SalesModal}
        modalVisible={salesModalVisible}
        onPressOne={() => setModalVisible(true)}
        setModalVisible={setsalesModalVisible}
      />

      <BottomModal
        Name={'General Insurance'}
        modalVisible={generaModalVisible}
        ButtonList={GeneralModal}
        onPressOne={() => setModalVisible(true)}
        setModalVisible={setgeneraModalVisible}
      />

      <IndividualModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <HeaderBackground />
      <Header Title="Advisor Dashboard" onPress={() => navigation.goBack()} />

      <View style={styles.mainWrap}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          Title={'Sign In'}
          style={styles.profilePicture}>
          <Avatar.Image size={57} source={avatar} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{flex: 0.6, justifyContent: 'center'}}>
          <Text style={styles.UserName}>Mr. Sanjeewa Atukorale</Text>
          <Text style={styles.regionName}>region name - Central 1</Text>
          <Text style={styles.position}>(Advisor)</Text>
        </TouchableOpacity>

        <View style={styles.notiIcon}>
          <MaterialCommunityIcons
            name="bell-outline"
            color={COLORS.iconDisabled}
            size={26}
          />
        </View>
      </View>

      <View style={{marginTop: 15}}>
        <Text
          style={{
            fontFamily: Fonts.Roboto.Bold,
            color: COLORS.black,
            fontSize: 14,
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
          <View style={styles.IslandRank}>
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
          </View>
        </View>
        <View
          style={{
            flex: 0.35,
          }}>
          <View
            style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.regionalRank}>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto.Bold,
                    fontSize: 12,
                    color: COLORS.black,
                  }}>
                  30/60
                </Text>
              </View>
              <Text style={{fontSize: 13, fontFamily: Fonts.Roboto.Regular}}>
                Regional Rank
              </Text>
            </View>
          </View>
          <View
            style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.branchRank}>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto.Bold,
                    fontSize: 12,
                    color: COLORS.black,
                  }}>
                  30/60
                </Text>
              </View>
              <Text style={{fontSize: 13, fontFamily: Fonts.Roboto.Regular}}>
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
          marginVertical: 13,
        }}>
        <TouchableOpacity
          onPress={() => setsalesModalVisible(true)}
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
        <View style={Styles.iconGrid}>
          <Image style={Styles.gridIcon} source={B_PLANNER}></Image>
          <Text style={Styles.gridText}>B-PLANNER</Text>
        </View>
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
    </View>
  );
}

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
import Button from '../../../components/Button';
import SmallButton from '../../../components/SmallButton';
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function PolicyDetails({navigation}) {
  const DetailLine = ({Title, detail}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 3,
        }}>
        <View
          style={{
            flex: 0.35,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.detailText}>{Title}</Text>
          <Text style={styles.detailText}>:</Text>
        </View>

        <View style={{flex: 0.6}}>
          <Text style={styles.detailText}>{detail}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[Styles.container, {paddingHorizontal: 0}]}>
      <HeaderBackground />

      <View style={{paddingHorizontal: 20}}>
        <Header
          Title="Policy Details"
          onPress={() => navigation.goBack()}
          haveFilters={false}
          haveWhatsapp={true}
          haveMenu={false}
          onButton={() => setModalVisible(true)}
        />

        <View style={styles.card}>
          <DetailLine Title={'Policy Number'} detail={'VM1113001710000480'} />
          <DetailLine
            Title={'Ins. Name'}
            detail={'Dr.Kalahe Hewage Sarananda'}
          />
          <DetailLine
            Title={'Address'}
            detail={'No.36, Wijethunga Mawatha Pilimathalawa'}
          />
          <DetailLine Title={'Mobile No.'} detail={'714425877'} />
          <DetailLine Title={'Started Date'} detail={'2024/11/26'} />
          <DetailLine Title={'End Date'} detail={'2024/11/26'} />
          <DetailLine Title={'Sum Insured'} detail={'Rs. 59,670,000.00'} />
          <DetailLine Title={'CDM Ref. No.'} detail={'500207383'} />
          <DetailLine
            Title={'Add. Covers'}
            detail={
              'Basic Premium Adjustment\nModify Loading\nMultiple Rebate (20%)\nNCB (70%)\nNatural Disaster Cover'
            }
          />
        </View>

        <View style={[styles.card, {marginTop: 10}]}>
          <View>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Regular,
                fontSize: 16,
                marginBottom: 3,
                color: COLORS.textColor,
              }}>
              Vehicle Information
            </Text>
          </View>
          <DetailLine Title={'Vehicle No.'} detail={'KX 4173'} />
          <DetailLine Title={'Make Year'} detail={'2013'} />
          <DetailLine Title={'Make'} detail={'Toyota'} />
          <DetailLine Title={'Chasis No.'} detail={'KSP1302077303'} />
          <DetailLine Title={'Engine No.'} detail={'JKR1302077303'} />
          <DetailLine Title={'Engine Cap.'} detail={'990'} />
        </View>
      </View>

      <View style={{marginHorizontal: window.width * 0.15, marginVertical: 10}}>
        <SmallButton
          onPress={() => navigation.navigate('ClaimHistory')}
          disabledButton={false}
          Title={'View Claim History'}
        />
        <SmallButton Title={'View Premium(NB/Renewal) History'} />
        <SmallButton Title={'Debit Renewal'} />
        <SmallButton Title={'Debit Settlement/ Payment'} />
      </View>
    </View>
  );
}

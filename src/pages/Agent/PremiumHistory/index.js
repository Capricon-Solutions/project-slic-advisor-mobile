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

export default function PremiumHistory({navigation}) {
  const ClaimList = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
  ];

  const DetailLine = ({Title, detail}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 3,
          paddingHorizontal: window.width * 0.1,
        }}>
        <View
          style={{
            flex: 0.45,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.detailText}>{Title}</Text>
          <Text style={styles.detailText}>:</Text>
        </View>

        <View style={{flex: 0.45}}>
          <Text style={styles.detailText}>{detail}</Text>
        </View>
      </View>
    );
  };
  const DetailLineBold = ({Title, detail}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 3,
          paddingHorizontal: window.width * 0.1,
        }}>
        <View
          style={{
            flex: 0.45,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.detailTextBold}>{Title}</Text>
          <Text style={styles.detailTextBold}>:</Text>
        </View>

        <View style={{flex: 0.45}}>
          <Text style={styles.detailTextBold}>{detail}</Text>
        </View>
      </View>
    );
  };

  const Card = ({Title, detail}) => {
    return (
      <View style={styles.card}>
        <View>
          <Text
            style={{
              fontFamily: Fonts.Roboto.SemiBold,
              fontSize: 17,
              marginBottom: 3,
              textAlign: 'center',
              color: COLORS.textColor,
            }}>
            From 2024-02-01 To 2025-01-31
          </Text>
        </View>
        <DetailLine Title={'Basic Premium'} detail={'LKR 45,000.00'} />
        <DetailLine Title={'RCC'} detail={'LKR 45,000.00'} />
        <DetailLine Title={'TCC'} detail={'LKR 45,000.00'} />
        <View style={styles.border}></View>
        <DetailLineBold Title={'Total Premium'} detail={'LKR 85,745.00'} />
        <View style={styles.border}></View>

        <DetailLine Title={'premium Paid'} detail={'LKR 85,745.00'} />
        <DetailLine Title={'No. of Claims'} detail={'0'} />
        <DetailLine Title={'Paid Date'} detail={'2024/03/01'} />
      </View>
    );
  };

  return (
    <View style={[Styles.container, {paddingHorizontal: 0}]}>
      <HeaderBackground />

      <View style={{paddingHorizontal: 20}}>
        <Header
          Title="Premium Payment"
          onPress={() => navigation.goBack()}
          haveFilters={false}
          haveWhatsapp={true}
          haveMenu={false}
          onButton={() => setModalVisible(true)}
        />

        <View>
          <Text
            style={{
              color: COLORS.textColor,
              fontFamily: Fonts.Roboto.Bold,
              fontSize: 16,
              marginVertical: 10,
            }}>
            Premium Payment History for - CBB 2033
          </Text>
        </View>

        <View>
          <FlatList
            data={ClaimList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 8}}
            renderItem={() => <Card />}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
}

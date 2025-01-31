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

export default function ClaimHistory({navigation}) {
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
  const DetailLineBold = ({Title, detail}) => {
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
          <Text style={styles.detailTextBold}>{Title}</Text>
          <Text style={styles.detailTextBold}>:</Text>
        </View>

        <View style={{flex: 0.6}}>
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
              fontFamily: Fonts.Roboto.Bold,
              fontSize: 17,
              marginBottom: 3,
              color: COLORS.primary,
            }}>
            V/CH/I/OI 0/1035796/2023
          </Text>
        </View>
        <DetailLine Title={'Intimated On'} detail={'2023-06-05'} />
        <DetailLine Title={'Voucher'} detail={'Dr.Kalahe Hewage Sarananda'} />
        <DetailLineBold Title={'Date of Loss'} detail={'2023-06-05'} />
        <DetailLine Title={'Reg . Date'} detail={'2023-06-12'} />
        <DetailLine Title={'Payment Type'} detail={'Slip'} />
        <DetailLine Title={'Voucher Status'} detail={'Paid'} />
        <DetailLine Title={'Paid amount'} detail={'LKR 45,000.00'} />
        <DetailLine Title={'Paid Date'} detail={'2023-07-07'} />
        <DetailLine Title={'Voucher No'} detail={'M/23/010/CH/118354'} />
      </View>
    );
  };

  return (
    <View style={[Styles.container, {paddingHorizontal: 0}]}>
      <HeaderBackground />

      <View style={{paddingHorizontal: 20}}>
        <Header
          Title="Claim History"
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
            Claim History for - CBB 2033
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

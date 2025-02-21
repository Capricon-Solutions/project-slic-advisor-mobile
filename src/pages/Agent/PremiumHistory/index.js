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
import {useSelector} from 'react-redux';
import {useGetPremiumHistoryQuery} from '../../../redux/services/policyDetailsSlice';
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function PremiumHistory({navigation}) {
  // const premiumPaymentResponse = useSelector(
  //   state => state.premiumPayment.premiumPaymentResponse.data,
  // );

  const {
    data: PremiumHistory,
    error,
    isLoading,
  } = useGetPremiumHistoryQuery({
    id: 'VM1115003410000506', // Dynamic ID
  });

  const premiumPaymentResponse = PremiumHistory?.data;

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

  const Card = ({item}) => {
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
            From {item.policyStartDate} To {item.policyEndDate}
          </Text>
        </View>
        <DetailLine
          Title={'Basic Premium'}
          detail={
            'LKR ' +
            Number(item.basicPremium)?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }
        />
        <DetailLine
          Title={'RCC'}
          detail={
            'LKR ' +
            Number(item.rcc)?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }
        />
        <DetailLine
          Title={'TCC'}
          detail={
            'LKR ' +
            Number(item.tc)?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }
        />
        <View style={styles.border}></View>
        <DetailLineBold
          Title={'Total Premium'}
          detail={
            'LKR ' +
            Number(item.totalPremium)?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }
        />
        <View style={styles.border}></View>

        <DetailLine
          Title={'premium Paid'}
          detail={
            'LKR ' +
            Number(item.paidPremium)?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }
        />
        <DetailLine Title={'No. of Claims'} detail={item?.claimCount} />
        <DetailLine Title={'Paid Date'} detail={item?.lastPayDate} />
      </View>
    );
  };

  return (
    <View style={Styles.container}>
      <HeaderBackground />

      <Header
        Title="Premium Payment"
        onPress={() => navigation.goBack()}
        haveFilters={false}
        haveWhatsapp={false}
        haveMenu={false}
        onButton={() => setModalVisible(true)}
      />
      <ScrollView
        fadingEdgeLength={20}
        contentContainerStyle={{paddingHorizontal: 17, paddingBottom: 10}}>
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
            data={premiumPaymentResponse}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 8}}
            renderItem={({item}) => <Card item={item} />}
            // keyExtractor={item => item.id.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

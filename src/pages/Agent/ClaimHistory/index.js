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
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function ClaimHistory({navigation}) {
  const claimHistoryResponse = useSelector(
    state => state.claimHistory.claimHistoryResponse.data,
  );
  console.log('claimHistoryResponse', claimHistoryResponse);

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

  const Card = ({item}) => {
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
            {item.policyNumber}
          </Text>
        </View>
        <DetailLine Title={'Intimated On'} detail={item.intimatedOn} />
        <DetailLine Title={'Voucher'} detail={item.voucher} />
        <DetailLineBold Title={'Date of Loss'} detail={item.dateOfLoss} />
        <DetailLine Title={'Reg . Date'} detail={item.regDate} />
        <DetailLine Title={'Payment Type'} detail={item.paymentType} />
        <DetailLine Title={'Voucher Status'} detail={item.voucherStatus} />
        <DetailLine Title={'Paid amount'} detail={'LKR ' + item.amount} />
        <DetailLine Title={'Paid Date'} detail={item.paidDate} />
        <DetailLine Title={'Voucher No'} detail={item.voucherNo} />
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
            data={claimHistoryResponse}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 8}}
            renderItem={({item}) => <Card item={item} />}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
}

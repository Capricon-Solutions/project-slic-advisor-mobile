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
import {useGetClaimHistoryQuery} from '../../../redux/services/policyDetailsSlice';
import LoadingScreen from '../../../components/LoadingScreen';
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function ClaimHistory({navigation, route}) {
  // const claimHistoryResponse = useSelector(
  //   state => state.claimHistory.claimHistoryResponse.data,
  // );
  const {policyNo} = route.params;
  const {
    data: ClaimHistory,
    error,
    isFetching,
  } = useGetClaimHistoryQuery({
    id: policyNo, // Dynamic ID
  });
  const claimHistoryResponse = ClaimHistory?.data;

  console.log('claimHistoryResponse', ClaimHistory);

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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ClaimDetails', {claimId: item.claimNo})
        }
        style={styles.card}>
        <View>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Bold,
              fontSize: 17,
              marginBottom: 3,
              color: COLORS.primary,
            }}>
            {item.claimNo}
          </Text>
        </View>
        <DetailLine Title={'Intimated On'} detail={item.intDate} />
        {/* <DetailLine Title={'Voucher'} detail={item.voucher} /> */}
        <DetailLineBold Title={'Date of Loss'} detail={item.dateOfLoss} />
        <DetailLine Title={'Reg Date'} detail={item.regDate} />
        <DetailLine Title={'Payment Type'} detail={item.payTyp} />
        <DetailLine Title={'Voucher Status'} detail={item.vouSts} />
        <DetailLine
          Title={'Paid Amount'}
          detail={
            'LKR ' +
            (item?.padAmount != null
              ? Number(item.padAmount).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : '0.00')
          }
        />
        <DetailLine Title={'Paid Date'} detail={item.payDate} />
        <DetailLine Title={'Voucher No'} detail={item.vouNo} />
        <DetailLine Title={'Status'} detail={item.status} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={Styles.container}>
      <HeaderBackground />

      <Header
        Title="Claim History"
        onPress={() => navigation.goBack()}
        haveFilters={false}
        haveWhatsapp={false}
        haveMenu={false}
        onButton={() => setModalVisible(true)}
      />

      <ScrollView
        fadingEdgeLength={20}
        contentContainerStyle={{paddingHorizontal: 18, paddingBottom: 10}}>
        <View>
          <Text
            style={{
              color: COLORS.textColor,
              fontFamily: Fonts.Roboto.Bold,
              fontSize: 16,
              marginVertical: 10,
            }}>
            Claim History for - {policyNo}
          </Text>
        </View>

        {isFetching ? (
          <View style={{height: window.height * 0.7}}>
            <LoadingScreen />
          </View>
        ) : (
          <View>
            {claimHistoryResponse ? (
              <FlatList
                data={claimHistoryResponse}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 7}}
                renderItem={({item}) => <Card item={item} />}
                // keyExtractor={item => item.id.toString()}
              />
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: window.height * 0.8,
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto.Bold,
                    fontSize: 16,
                    color: COLORS.warmGray,
                  }}>
                  No Claims
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

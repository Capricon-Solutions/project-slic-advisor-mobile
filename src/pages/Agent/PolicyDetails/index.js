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
import {useGetPolicyDetailsQuery} from '../../../redux/services/policyDetailsSlice';
import LoadingScreen from '../../../components/LoadingScreen';
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function PolicyDetails({navigation, route}) {
  const {policyNo} = route.params; // Extract item from params
  console.log('policyNo', policyNo);
  const {
    data: PolicyDetails,
    error,
    isLoading,
  } = useGetPolicyDetailsQuery({
    id: policyNo, // Dynamic ID
  });
  console.log('PolicyDetails', PolicyDetails);
  const policyDetailsResponse = PolicyDetails?.data;

  const id = policyDetailsResponse?.id;
  const policyNumber = policyDetailsResponse?.policyNumber;
  const insName = policyDetailsResponse?.insuredName;
  const Address = (policyDetailsResponse?.address || [])
    .filter(line => line.trim() !== '')
    .join('\n');
  const phone = policyDetailsResponse?.mobileNumber;
  const startDate = policyDetailsResponse?.startDate;
  const endDate = policyDetailsResponse?.endDate;
  const sumInsured = policyDetailsResponse?.sumInsured;
  const refNo = policyDetailsResponse?.payRefNo;
  const addCovers = policyDetailsResponse?.additionalCovers;
  const vehicleNo = policyDetailsResponse?.vehicleNumber;
  const makeYear = policyDetailsResponse?.makeYear;
  const brand = policyDetailsResponse?.make;
  const chasisNo = policyDetailsResponse?.chassisNo;
  const engineNo = policyDetailsResponse?.engineNo;
  const isCancelled = policyDetailsResponse?.isCancelled;
  const capacity = policyDetailsResponse?.engineCapacity;

  // console.log('PolicyDetails', PolicyDetails);

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
    <View style={Styles.container}>
      <HeaderBackground />

      <Header
        Title="Policy Details"
        onPress={() => navigation.goBack()}
        haveFilters={false}
        haveWhatsapp={true}
        whatsappNo={phone}
        haveCall={true}
        callNo={phone}
        haveMenu={false}
        onButton={() => setModalVisible(true)}
      />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
          <View style={styles.card}>
            {isCancelled && (
              <Text
                style={{
                  color: COLORS.primaryRed,
                  fontFamily: Fonts.Roboto.SemiBold,
                  textAlign: 'right',
                  position: 'absolute',
                  right: 7,
                  top: 5,
                  fontSize: 12,
                }}>
                (Cancelled)
              </Text>
            )}
            <DetailLine Title={'Policy Number'} detail={policyNo} />
            <DetailLine Title={'Ins. Name'} detail={insName} />
            <DetailLine Title={'Address'} detail={Address} />
            <DetailLine Title={'Mobile No.'} detail={phone} />
            <DetailLine Title={'Started Date'} detail={startDate} />
            <DetailLine Title={'End Date'} detail={endDate} />
            <DetailLine Title={'Sum Insured'} detail={sumInsured} />
            <DetailLine Title={'CDM Ref. No.'} detail={refNo} />
            <DetailLine
              Title={'Add. Covers'}
              detail={addCovers?.map((cover, index) => (
                <Text
                  key={index}
                  style={{color: COLORS.grayText, lineHeight: 20}}>
                  {cover.coverTypeName}: {cover.coverValue}
                  {'\n'}
                </Text>
              ))}
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
            <DetailLine Title={'Vehicle No.'} detail={vehicleNo || 'N/A'} />
            <DetailLine Title={'Make Year'} detail={makeYear || 'N/A'} />
            <DetailLine Title={'Make'} detail={brand || 'N/A'} />
            <DetailLine Title={'Chasis No.'} detail={chasisNo || 'N/A'} />
            <DetailLine Title={'Engine No.'} detail={engineNo || 'N/A'} />
            <DetailLine Title={'Engine Cap.'} detail={capacity || 'N/A'} />
          </View>

          <View
            style={{marginHorizontal: window.width * 0.07, marginVertical: 10}}>
            <SmallButton
              onPress={() =>
                navigation.navigate('ClaimHistory', {policyNo: policyNo})
              }
              disabledButton={false}
              Title={'View Claim History'}
            />
            <SmallButton
              onPress={() =>
                navigation.navigate('PendingClaims', {policyNo: policyNo})
              }
              disabledButton={false}
              Title={'Pending Claims'}
            />
            <SmallButton
              onPress={() =>
                navigation.navigate('PremiumHistory', {policyNo: policyNo})
              }
              disabledButton={false}
              Title={'View Premium(NB/Renewal) History'}
            />
            {/* <SmallButton
              // onPress={() =>
              //   navigation.navigate('DebitSettlementRenewal', { policyNo: policyNo })
              // }
              disabledButton={false}
              Title={'Debit Renewal'}
            /> */}
            <SmallButton
              Title={'Debit Settlement/ Payment'}
              onPress={() =>
                navigation.navigate('DebitSettlement', {
                  policyNo: policyNo,
                  phone: phone,
                })
              }
              disabledButton={false}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

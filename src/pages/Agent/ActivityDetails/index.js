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

export default function ActivityDetails({navigation}) {
  const {
    data: PolicyDetails,
    error,
    isLoading,
  } = useGetPolicyDetailsQuery({
    id: 'VM1115003410000506', // Dynamic ID
  });

  const policyDetailsResponse = PolicyDetails?.data;

  const id = policyDetailsResponse?.id;
  const policyNumber = policyDetailsResponse?.policyNumber;
  const insName = policyDetailsResponse?.insuredName;
  const Address = policyDetailsResponse?.address;
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
  const capacity = policyDetailsResponse?.engineCapacity;
  console.log('addCovers', addCovers);
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
        Title="Activity Details"
        onPress={() => navigation.goBack()}
        haveFilters={false}
        // haveWhatsapp={true}
        whatsappNo={phone}
        // haveCall={true}
        callNo={phone}
        haveMenu={false}
        onButton={() => setModalVisible(true)}
      />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
          <View style={styles.card}>
            <Text
              style={{
                color: COLORS.primary,
                fontFamily: Fonts.Roboto.Bold,
                fontSize: 14,
                marginBottom: 5,
              }}>
              Activity Information
            </Text>
            <DetailLine Title={'Activity ID'} detail={'11483'} />
            <DetailLine Title={'Activity Type'} detail={'Appointment'} />
            <DetailLine Title={'Description'} detail={'Appointment'} />
            <DetailLine Title={'Meeting with'} detail={'cust2'} />
            <DetailLine Title={'Activity Date'} detail={'2023-07-07'} />
            <DetailLine Title={'Activity Time'} detail={'10:49:00 PM'} />
            <DetailLine Title={'Event'} detail={'LKR 45,000.00'} />
            <DetailLine Title={'Event Date'} detail={'2023-07-07'} />
          </View>

          <View style={styles.card}>
            <Text
              style={{
                color: COLORS.primary,
                fontFamily: Fonts.Roboto.Bold,
                fontSize: 14,
                marginBottom: 5,
              }}>
              Lead Information
            </Text>
            <DetailLine Title={'Lead Type'} detail={'Motor'} />
            <DetailLine Title={'Name'} detail={'Mrs.Liyoni Dehigolla'} />
            <DetailLine Title={'contact'} detail={'0778249043'} />
            <DetailLine Title={'Email'} detail={'kumudu3055@gmail.com'} />
          </View>

          <View
            style={{marginHorizontal: window.width * 0.07, marginVertical: 15}}>
            <SmallButton
              onPress={() => navigation.goBack()}
              disabledButton={false}
              Title={'Close'}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

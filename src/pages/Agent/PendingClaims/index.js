import React, { useState } from 'react';
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
import { Styles } from '../../../theme/Styles';
import Header from '../../../components/Header';
import HeaderBackground from '../../../components/HeaderBackground';
import { styles } from './styles';
import SetTargetModal from '../../../components/SetTargetModal';
import PolicyItem from '../../../components/PolicyItem';
import Button from '../../../components/Button';
import SmallButton from '../../../components/SmallButton';
import { useSelector } from 'react-redux';
import { useGetClaimHistoryQuery } from '../../../redux/services/policyDetailsSlice';
import LoadingScreen from '../../../components/LoadingScreen';
import TableComponentDoc from '../../../components/TableComponentDoc';
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');
export default function PendingClaims({ navigation, route }) {
  const tableHead = ['Document', 'Status'];
  const Data = [
    {
      id: 1,
      documentName: 'RHS Headlight Cowling',
      status: 'Received'
    },
    {
      id: 2,
      documentName: 'Headlight',
      status: 'Received'
    },

  ]
  const columnWidths = [160, 160];
  const tableData = Data?.map(item => [
    item.documentName,
    item.status,

  ]);
  // const claimHistoryResponse = useSelector(
  //   state => state.claimHistory.claimHistoryResponse.data,
  // );
  const { policyNo } = route.params;
  const {
    data: ClaimHistory,
    error,
    isLoading,
  } = useGetClaimHistoryQuery({
    id: policyNo, // Dynamic ID
  });
  const claimHistoryResponse = ClaimHistory?.data;

  console.log('PendingClaims', ClaimHistory);

  const DetailLine = ({ Title, detail }) => {
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

        <View style={{ flex: 0.6 }}>
          <Text style={styles.detailText}>{detail}</Text>
        </View>
      </View>
    );
  };
  const DetailLineBold = ({ Title, detail }) => {
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

        <View style={{ flex: 0.6 }}>
          <Text style={styles.detailTextBold}>{detail}</Text>
        </View>
      </View>
    );
  };

  const Card = ({ item }) => {
    const [expanded, setExpanded] = useState(false);
    return (
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.card}>
        <View style={{ backgroundColor: COLORS.pendingColor, borderRadius: 100, alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Bold,
              fontSize: 17,
              marginBottom: 3,
              color: COLORS.tableOrange,
            }}>
            Pending
          </Text>
        </View>
        <DetailLine Title={'Policy Number'} detail={item.intDate} />
        <DetailLine Title={'Intimation No.'} detail={item.voucher} />
        <DetailLineBold Title={'Job No.'} detail={item.dateOfLoss} />
        <DetailLine Title={'Ins. Name'} detail={item.intDate} />
        <DetailLine Title={'Date Of Lost'} detail={item.payTyp} />
        <DetailLine Title={'Date Of intimation'} detail={item.vouSts} />
        <DetailLine Title={'Date Of Register'} detail={'LKR ' + item.padAmount} />
        <DetailLine Title={'Estimated liability'} detail={item.payDate} />
        {expanded &&
          <TableComponentDoc
            haveTotal={false}
            tableHead={tableHead}
            tableData={tableData}
            columnWidths={columnWidths}
          />


        }
      </TouchableOpacity>
    );
  };

  return (
    <View style={Styles.container}>
      <HeaderBackground />

      <Header
        Title="Pending Claims"
        onPress={() => navigation.goBack()}
        haveFilters={false}
        haveWhatsapp={false}
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
            marginHorizontal: 20
          }}>
          Claim Details of - {policyNo}
        </Text>
      </View>
      {claimHistoryResponse ? (
        <ScrollView
          fadingEdgeLength={20}
          contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 10 }}>


          {isLoading ? (
            <View style={{ height: window.height * 0.8 }}>
              <LoadingScreen />
            </View>
          ) : (
            <View>
              <FlatList
                data={claimHistoryResponse}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 7 }}
                renderItem={({ item }) => <Card item={item} />}
              // keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
        </ScrollView>
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
  );
}

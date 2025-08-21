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
import {useSelector} from 'react-redux';
import {
  useGetClaimHistoryQuery,
  useGetPendingHistoryQuery,
  useGetPremiumHistoryQuery,
} from '../../../redux/services/policyDetailsSlice';
import LoadingScreen from '../../../components/LoadingScreen';
import TableComponentDoc from '../../../components/TableComponentDoc';
import moment from 'moment';
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');
export default function PendingClaims({navigation, route}) {
  const tableHead = ['Document', 'Status'];
  const Data = [
    {
      id: 1,
      documentName: 'RHS Headlight Cowling',
      status: 'Received',
    },
    {
      id: 2,
      documentName: 'Headlight',
      status: 'Received',
    },
  ];
  const columnWidths = [138, 138];

  // const claimHistoryResponse = useSelector(
  //   state => state.claimHistory.claimHistoryResponse.data,
  // );
  const {policyNo} = route.params;
  // const {
  //   data: ClaimHistory,

  // } = useGetClaimHistoryQuery({
  //   id: policyNo, // Dynamic ID
  // });
  const {
    data: ClaimHistory,
    error,
    isFetching,
  } = useGetPendingHistoryQuery({
    id: policyNo, // Dynamic ID
  });
  const claimHistoryResponse = ClaimHistory?.data;

  console.log('PendingClaims test', ClaimHistory);

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
    const [expanded, setExpanded] = useState(false);
    const tableData = item?.claimDocuments?.map(item => [
      item.documentTypeName,
      item.documentStatus,
    ]);
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={{marginBottom: 2}}
          // onPress={() => setExpanded(!expanded)}
          onPress={() => setExpanded(!expanded)}>
          <View
            style={{
              backgroundColor: COLORS.TopBackColor,
              borderRadius: 100,
              alignItems: 'center',
            }}>
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
          <DetailLine Title={'Policy Number'} detail={item.policyNo} />
          <DetailLine Title={'Intimation No.'} detail={item.intimationNo} />
          <DetailLineBold Title={'Job No.'} detail={item.jobNo} />
          <DetailLine Title={'Ins. Name'} detail={item.name} />

          <DetailLine
            Title={'Date Of Loss'}
            detail={
              item.dateOfLoss
                ? moment(item.dateOfLoss, 'MM/DD/YYYY HH:mm:ss').format(
                    'DD MMM YYYY',
                  )
                : 'N/A'
            }
          />
          <DetailLine
            Title={'Date Of Intimation'}
            detail={
              item.dateOfIntimation
                ? moment(item.dateOfIntimation, 'MM/DD/YYYY HH:mm:ss').format(
                    'DD MMM YYYY',
                  )
                : 'N/A'
            }
          />
          <DetailLine
            Title={'Date Of Register'}
            detail={
              item.dateOfRegister
                ? moment(item.dateOfRegister, 'MM/DD/YYYY HH:mm:ss').format(
                    'DD MMM YYYY',
                  )
                : 'N/A'
            }
          />
          <DetailLine
            Title={'Estimated Liability'}
            detail={
              'LKR ' +
              Number(item.estimatedLiability).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
          />
        </TouchableOpacity>
        {expanded && (
          <TableComponentDoc
            haveTotal={false}
            tableHead={tableHead}
            tableData={tableData}
            columnWidths={columnWidths}
          />
        )}
      </View>
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
            marginHorizontal: 20,
          }}>
          Claim Details of - {policyNo}
        </Text>
      </View>

      <ScrollView
        fadingEdgeLength={20}
        contentContainerStyle={{paddingHorizontal: 18, paddingBottom: 10}}>
        {isFetching ? (
          <View style={{height: window.height * 0.7}}>
            <LoadingScreen />
          </View>
        ) : (
          <View>
            {claimHistoryResponse && claimHistoryResponse.length > 0 ? (
              <FlatList
                data={claimHistoryResponse}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 0}}
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

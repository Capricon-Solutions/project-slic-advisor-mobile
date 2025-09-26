import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import DropdownComponent from '../../../components/DropdownComponent';
import Button from '../../../components/Button';
import AlertButtonWhite from '../../../components/AlertButtonWhite';
import AlertButton from '../../../components/AlertButton';
import Fonts from '../../../theme/Fonts';
import SmallButton from '../../../components/SmallButton';
import SquareTextBoxOutlined from '../../../components/SquareTextBoxOutlined';
import DropdownComponentNoLabel from '../../../components/DropdownComponentNoLabel';
import Octicons from 'react-native-vector-icons/Octicons';
import {styles} from './styles';
import TableComponent from '../../../components/TableComponent';
import TableComponentDoc from '../../../components/TableComponentDoc';
import {
  useClaimDetailsQuery,
  useGetClaimDetailsQuery,
} from '../../../redux/services/policyDetailsSlice';
import TableComponentSalvage from '../../../components/TableComponentSalvage';
import LoadingScreen from '../../../components/LoadingScreen';
const window = Dimensions.get('window');

export default function ClaimDetails({navigation, route}) {
  const {claimId} = route.params;

  const {
    data: ClaimDetails,
    error,
    isFetching,
  } = useGetClaimDetailsQuery({
    id: claimId, // Dynamic ID
  });

  const tableHead = ['Document', 'Status'];
  const Data = ClaimDetails?.data?.documents;
  const comments = ClaimDetails?.data?.comments;
  const salvageItems = ClaimDetails?.data?.salvageItems;
  const salvageLocation = ClaimDetails?.data?.salvageLocation;
  const isEmpty =
    (!Data || Data.length === 0) &&
    (!comments || comments.length === 0) &&
    (!salvageItems || salvageItems.length === 0);
  const DataSalvage = salvageItems;
  const tableData = Data?.map(item => [
    item.documentTypeName,
    item.documentStatus,
  ]);
  const tableDataSalvage = DataSalvage?.map(item => [
    item.itemDescription,
    item.itemStatus,
  ]);
  const columnWidths = [170, 170];
  const [expanded, setExpanded] = useState(1);

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Claim Details" onPress={() => navigation.goBack()} />
      {isFetching ? (
        <View style={{height: window.height * 0.7}}>
          <LoadingScreen />
        </View>
      ) : isEmpty ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.errorBorder,
              fontFamily: Fonts.Roboto.Bold,
            }}>
            Sorry, No Data Found
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          fadingEdgeLength={20}
          contentContainerStyle={{
            paddingHorizontal: 15,
            marginBottom: 20,
            paddingTop: 10,
          }}>
          {/* <TextInput autoFocus placeholder="svsv" /> */}

          {/* Customer Basic Info */}
          {Data?.length > 0 && (
            <View style={styles.leadInfoCard}>
              <TouchableOpacity
                onPress={() =>
                  expanded !== 1 ? setExpanded(1) : setExpanded(0)
                }
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto.Bold,
                    fontSize: 16,
                    color: COLORS.textColor,
                  }}>
                  Document
                </Text>
                <View style={{alignItems: 'center', padding: 3}}>
                  <Octicons
                    name={expanded == 1 ? 'chevron-up' : 'chevron-down'}
                    color={COLORS.black}
                    size={20}
                  />
                </View>
              </TouchableOpacity>
              {expanded == 1 && (
                <View
                  style={{
                    marginTop: 10,
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <TableComponentDoc
                    haveTotal={false}
                    tableHead={tableHead}
                    tableData={tableData}
                    columnWidths={columnWidths}
                  />
                </View>
              )}
            </View>
          )}

          {/* Customer Contact Info */}
          {comments?.length > 0 && (
            <View style={styles.leadInfoCard}>
              <TouchableOpacity
                onPress={() =>
                  expanded !== 2 ? setExpanded(2) : setExpanded(0)
                }
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto.Bold,
                    fontSize: 16,
                    color: COLORS.textColor,
                    marginBottom: 10,
                  }}>
                  Comments
                </Text>
                <View style={{alignItems: 'center', padding: 3}}>
                  <Octicons
                    name={expanded == 2 ? 'chevron-up' : 'chevron-down'}
                    color={COLORS.black}
                    size={20}
                  />
                </View>
              </TouchableOpacity>
              {expanded == 2 && (
                <View>
                  {comments?.map((item, index) => (
                    <View key={index} style={{marginBottom: 10}}>
                      <Text style={{fontSize: 14, color: 'black'}}>
                        {item.comment}
                      </Text>
                      <Text style={{fontSize: 12, color: 'gray'}}>
                        {new Date(item.commentDate).toLocaleString()}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
          {/* expanded !== 1 ? setExpanded(1) : setExpanded(0) */}
          {/* policy Info */}
          {salvageItems?.length > 0 && (
            <View style={styles.leadInfoCard}>
              <TouchableOpacity
                onPress={() =>
                  expanded !== 3 ? setExpanded(3) : setExpanded(0)
                }
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto.Bold,
                    fontSize: 16,
                    color: COLORS.textColor,
                  }}>
                  Salvage{' '}
                </Text>
                <View style={{alignItems: 'center', padding: 3}}>
                  <Octicons
                    name={expanded == 3 ? 'chevron-up' : 'chevron-down'}
                    color={COLORS.black}
                    size={20}
                  />
                </View>
              </TouchableOpacity>
              {expanded == 3 && (
                <View
                  style={{
                    marginTop: 10,
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row', marginVertical: 3}}>
                    <View style={{flex: 0.5}}>
                      <Text
                        style={{
                          fontFamily: Fonts.Roboto.SemiBold,
                          color: COLORS.textColor,
                          fontSize: 14,
                        }}>
                        Garage
                      </Text>
                    </View>
                    <View style={{flex: 0.5}}>
                      <Text
                        style={{
                          fontFamily: Fonts.Roboto.Regular,
                          color: COLORS.textColor,
                          fontSize: 14,
                        }}>
                        {salvageLocation?.garageName}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', marginVertical: 3}}>
                    <View style={{flex: 0.5}}>
                      <Text
                        style={{
                          fontFamily: Fonts.Roboto.SemiBold,
                          color: COLORS.textColor,
                          fontSize: 14,
                        }}>
                        Salvage Yard
                      </Text>
                    </View>
                    <View style={{flex: 0.5}}>
                      <Text
                        style={{
                          fontFamily: Fonts.Roboto.Regular,
                          color: COLORS.textColor,
                          fontSize: 14,
                        }}>
                        {salvageLocation?.yardName}
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 3}}>
                    <View style={{flex: 0.5}}>
                      <Text
                        style={{
                          fontFamily: Fonts.Roboto.SemiBold,
                          color: COLORS.textColor,
                          fontSize: 14,
                        }}>
                        Allocated Branch
                      </Text>
                    </View>
                    <View style={{flex: 0.5}}>
                      <Text
                        style={{
                          fontFamily: Fonts.Roboto.Regular,
                          color: COLORS.textColor,
                          fontSize: 14,
                        }}>
                        {salvageLocation?.branch}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginVertical: 17,
                      borderColor: COLORS.borderColor,
                      borderWidth: 0.5,
                      width: '100%',
                    }}></View>

                  <TableComponentSalvage
                    haveTotal={false}
                    tableHead={tableHead}
                    tableData={tableDataSalvage}
                    columnWidths={columnWidths}
                  />
                </View>
              )}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

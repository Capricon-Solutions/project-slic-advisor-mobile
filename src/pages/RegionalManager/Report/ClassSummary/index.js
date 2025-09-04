import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Styles} from '../../../../theme/Styles';
import HeaderBackground from '../../../../components/HeaderBackground';
import Header from '../../../../components/Header';
import COLORS from '../../../../theme/colors';
import Fonts from '../../../../theme/Fonts';
import KpiSummery from '../../../../icons/KpiSummery.png'; // Replace with the actual logo path
import * as Progress from 'react-native-progress';
import DuesSummery from '../../../../icons/DuesSummery.png'; // Replace with the actual logo path
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoaderKit from 'react-native-loader-kit';

import Octicons from 'react-native-vector-icons/Octicons';
import {FlatList} from 'react-native';
import ContactListItem from '../../../../components/contactListItem';
import DepartmentItem from '../../../../components/DepartmentItem';
import {styles} from './styles';
import LoadingScreen from '../../../../components/LoadingScreen';
import {
  useGetBranchesQuery,
  useGetDepartmentQuery,
} from '../../../../redux/services/contactSlice';
import {useSelector} from 'react-redux';
import {useClassSummeryQuery} from '../../../../redux/services/SummeryApiSlice';
import moment from 'moment';
const window = Dimensions.get('window');

export default function ClassSummary({navigation}) {
  const [SelectedType, setSelectedType] = useState(1);
  const motorData = useSelector(state => state.DUES.motorData);
  const nonmotorData = useSelector(state => state.DUES.nonmotorData);
  const currentMonthNumber = moment().month() + 1; // +1 because Moment.js months are 0-indexed
  const currentMonthName = moment().format('MMMM');
  const previousMonthName = moment().subtract(1, 'months').format('MMMM');
  const profile = useSelector(state => state.Profile.profile);

  const regionName = profile?.user?.region;
  const {
    data: ClassSummery,
    error: ClassSummeryError,
    isLoading: ClassSummeryLoading,
    isFetching: ClassSummeryFetching,
  } = useClassSummeryQuery({
    month: currentMonthNumber,
    regionName: regionName,
  });
  useEffect(() => {
    console.log('ClassSummery', ClassSummery);
  }, [ClassSummery]);

  const DataSet =
    SelectedType == 1
      ? ClassSummery?.data?.monthly
      : ClassSummery?.data?.cumulative;
  const formatCurrency = value => {
    const num = Number(value || 0);
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const AmountFields = ({title, amount, icon}) => {
    return (
      <View style={{paddingHorizontal: 15, paddingVertical: 5}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 0.1, alignItems: 'center'}}>
            <MaterialIcons color={COLORS.primaryGreen} name={icon} size={18} />
          </View>
          <View style={{flex: 0.35}}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Regular,
                color: COLORS.textColor,
                fontSize: 12,
              }}>
              {title}
            </Text>
          </View>
          <View style={{flex: 0.55, alignItems: 'flex-end'}}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Bold,
                color: COLORS.textColor,
                fontSize: 12,
              }}>
              {amount}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Class Summary" onPress={() => navigation.goBack()} />

      <View style={styles.mainWrap}>
        <TouchableOpacity
          onPress={() => setSelectedType(1)}
          style={{
            backgroundColor: SelectedType == 1 ? COLORS.primary : COLORS.white,
            borderRadius: 15,
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <Text
            style={{
              color: SelectedType == 1 ? COLORS.white : COLORS.black,
              fontFamily: Fonts.Roboto.SemiBold,
            }}>
            Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedType(2)}
          style={{
            backgroundColor: SelectedType == 2 ? COLORS.primary : COLORS.white,
            borderRadius: 15,
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: SelectedType == 2 ? COLORS.white : COLORS.black,
              fontFamily: Fonts.Roboto.SemiBold,
            }}>
            Cumulative
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 20}}>
        {/* {isLoading == true ? (
          <LoadingScreen />
        ) : ( */}
        <View>
          <View
            style={{
              borderRadius: 15,
              padding: 10,
              backgroundColor: COLORS.white,
              elevation: 10,
                shadowOpacity: 0.2, // add opacity
            shadowRadius: 3,  // add blur radius
            shadowOffset: {
              width: 0,
              height: 3,
            },
              marginBottom: 20,
              marginTop: 8,
            }}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <View style={{flex: 0.2}}>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 5,
                    backgroundColor: COLORS.lightBorder,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 23, width: 23}}
                    source={DuesSummery}></Image>
                </View>
              </View>
              <View style={{flex: 0.8, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto.SemiBold,
                    color: COLORS.textColor,
                  }}>
                  Class Summary
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: COLORS.lightBorder,
                borderRadius: 6,
                paddingVertical: 2.5,
                marginBottom: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: Fonts.Roboto.SemiBold,
                  color: COLORS.textColor,
                  fontSize: 13,
                }}>
                {SelectedType == 1
                  ? `${currentMonthName} summary`
                  : `January to December summary`}
                {/* : `${previousMonthName} to ${currentMonthName} summary`} */}
              </Text>
            </View>

            <View>
              <AmountFields
                icon={'attach-money'}
                title={'Premium'}
                amount={`LKR ${formatCurrency(DataSet?.totalPremium)}`}
              />
              <AmountFields
                icon={'outlined-flag'}
                title={'Target'}
                amount={`LKR ${formatCurrency(DataSet?.totalTarget)}`}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: COLORS.lightBorder,
              // borderRadius: 6,
              paddingVertical: 2.5,
              marginBottom: 5,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: Fonts.Roboto.SemiBold,
                color: COLORS.textColor,
                fontSize: 13,
              }}>
              {currentMonthName} summary
            </Text>
          </View>

          {/* ///// MOTOR ///// */}
          <View style={{paddingVertical: 5}}>
            <View
              style={{
                backgroundColor: COLORS.white,
                elevation: 10,
                  shadowOpacity: 0.2, // add opacity
            shadowRadius: 3,  // add blur radius
            shadowOffset: {
              width: 0,
              height: 3,
            },
                borderRadius: 10,
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 15,
                  marginVertical: 5,
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  paddingVertical: 1,
                  alignItems: 'center',
                  backgroundColor: COLORS.lightBorder,
                }}>
                <MaterialCommunityIcons
                  color={COLORS.primaryGreen}
                  name="car-outline"
                  size={20}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    fontFamily: Fonts.Roboto.Bold,
                    color: COLORS.textColor,
                    fontSize: 12,
                  }}>
                  Motor
                </Text>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <AmountFields
                  icon={'attach-money'}
                  title={'Premium'}
                  amount={`LKR ${formatCurrency(DataSet?.motorTotalPremium)}`}
                />
                <AmountFields
                  icon={'outlined-flag'}
                  title={'Target'}
                  amount={`LKR ${formatCurrency(DataSet?.motorTotalTarget)}`}
                />
              </View>
            </View>
          </View>

          {/* ///// Fire ///// */}
          <View style={{paddingVertical: 5}}>
            <View
              style={{
                backgroundColor: COLORS.white,
                elevation: 10,
                  shadowOpacity: 0.2, // add opacity
            shadowRadius: 3,  // add blur radius
            shadowOffset: {
              width: 0,
              height: 3,
            },
                borderRadius: 10,
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 15,
                  marginVertical: 5,
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  paddingVertical: 1,
                  alignItems: 'center',
                  backgroundColor: COLORS.lightBorder,
                }}>
                <MaterialCommunityIcons
                  color={COLORS.primaryGreen}
                  name="fire"
                  size={20}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    fontFamily: Fonts.Roboto.Bold,
                    color: COLORS.textColor,
                    fontSize: 12,
                  }}>
                  Fire
                </Text>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <AmountFields
                  icon={'attach-money'}
                  title={'Premium'}
                  amount={`LKR ${formatCurrency(DataSet?.fireTotalPremium)}`}
                />
                <AmountFields
                  icon={'outlined-flag'}
                  title={'Target'}
                  amount={`LKR ${formatCurrency(DataSet?.fireTotalTarget)}`}
                />
              </View>
            </View>
          </View>

          {/* ///// ACCIDENT ///// */}
          <View style={{paddingVertical: 5}}>
            <View
              style={{
                backgroundColor: COLORS.white,
                elevation: 10,
                  shadowOpacity: 0.2, // add opacity
            shadowRadius: 3,  // add blur radius
            shadowOffset: {
              width: 0,
              height: 3,
            },
                borderRadius: 10,
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 15,
                  marginVertical: 5,
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  paddingVertical: 1,
                  alignItems: 'center',
                  backgroundColor: COLORS.lightBorder,
                }}>
                <MaterialCommunityIcons
                  color={COLORS.primaryGreen}
                  name="car-outline"
                  size={20}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    fontFamily: Fonts.Roboto.Bold,
                    color: COLORS.textColor,
                    fontSize: 12,
                  }}>
                  General Accident
                </Text>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <AmountFields
                  icon={'attach-money'}
                  title={'Premium'}
                  amount={`LKR ${formatCurrency(
                    DataSet?.generalAccidentTotalPremium,
                  )}`}
                />
                <AmountFields
                  icon={'outlined-flag'}
                  title={'Target'}
                  amount={`LKR ${formatCurrency(
                    DataSet?.generalAccidentTotalTarget,
                  )}`}
                />
              </View>
            </View>
          </View>

          {/* ///// Marine ///// */}
          <View style={{paddingVertical: 5}}>
            <View
              style={{
                backgroundColor: COLORS.white,
                elevation: 10,
                  shadowOpacity: 0.2, // add opacity
            shadowRadius: 3,  // add blur radius
            shadowOffset: {
              width: 0,
              height: 3,
            },
                borderRadius: 10,
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 15,
                  marginVertical: 5,
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  paddingVertical: 1,
                  alignItems: 'center',
                  backgroundColor: COLORS.lightBorder,
                }}>
                <MaterialCommunityIcons
                  color={COLORS.primaryGreen}
                  name="car-outline"
                  size={20}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    fontFamily: Fonts.Roboto.Bold,
                    color: COLORS.textColor,
                    fontSize: 12,
                  }}>
                  Marine
                </Text>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <AmountFields
                  icon={'attach-money'}
                  title={'Premium'}
                  amount={`LKR ${formatCurrency(DataSet?.marineTotalPremium)}`}
                />
                <AmountFields
                  icon={'outlined-flag'}
                  title={'Target'}
                  amount={`LKR ${formatCurrency(DataSet?.marineTotalTarget)}`}
                />
              </View>
            </View>
          </View>

          {/* ///// Legal ///// */}
          <View style={{paddingVertical: 5}}>
            <View
              style={{
                backgroundColor: COLORS.white,
                elevation: 10,
                  shadowOpacity: 0.2, // add opacity
            shadowRadius: 3,  // add blur radius
            shadowOffset: {
              width: 0,
              height: 3,
            },
                borderRadius: 10,
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 15,
                  marginVertical: 5,
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  paddingVertical: 1,
                  alignItems: 'center',
                  backgroundColor: COLORS.lightBorder,
                }}>
                <MaterialCommunityIcons
                  color={COLORS.primaryGreen}
                  name="car-outline"
                  size={20}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    fontFamily: Fonts.Roboto.Bold,
                    color: COLORS.textColor,
                    fontSize: 12,
                  }}>
                  Legal
                </Text>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <AmountFields
                  icon={'attach-money'}
                  title={'Premium'}
                  amount={`LKR ${formatCurrency(DataSet?.legalTotalPremium)}`}
                />
                <AmountFields
                  icon={'outlined-flag'}
                  title={'Target'}
                  amount={`LKR ${formatCurrency(DataSet?.legalTotalTarget)}`}
                />
              </View>
            </View>
          </View>

          {/* ///// Wci ///// */}
          <View style={{paddingVertical: 5}}>
            <View
              style={{
                backgroundColor: COLORS.white,
                elevation: 10,
                  shadowOpacity: 0.2, // add opacity
            shadowRadius: 3,  // add blur radius
            shadowOffset: {
              width: 0,
              height: 3,
            },
                borderRadius: 10,
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 15,
                  marginVertical: 5,
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  paddingVertical: 1,
                  alignItems: 'center',
                  backgroundColor: COLORS.lightBorder,
                }}>
                <MaterialCommunityIcons
                  color={COLORS.primaryGreen}
                  name="car-outline"
                  size={20}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    fontFamily: Fonts.Roboto.Bold,
                    color: COLORS.textColor,
                    fontSize: 12,
                  }}>
                  WCI
                </Text>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <AmountFields
                  icon={'attach-money'}
                  title={'Premium'}
                  amount={`LKR ${formatCurrency(DataSet?.wciTotalPremium)}`}
                />
                <AmountFields
                  icon={'outlined-flag'}
                  title={'Target'}
                  amount={`LKR ${formatCurrency(DataSet?.wciTotalTarget)}`}
                />
              </View>
            </View>
          </View>

          {/* ///// Esi ///// */}
          <View style={{paddingVertical: 5}}>
            <View
              style={{
                backgroundColor: COLORS.white,
                elevation: 10,
                  shadowOpacity: 0.2, // add opacity
            shadowRadius: 3,  // add blur radius
            shadowOffset: {
              width: 0,
              height: 3,
            },
                borderRadius: 10,
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 15,
                  marginVertical: 5,
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  paddingVertical: 1,
                  alignItems: 'center',
                  backgroundColor: COLORS.lightBorder,
                }}>
                <MaterialCommunityIcons
                  color={COLORS.primaryGreen}
                  name="car-outline"
                  size={20}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    fontFamily: Fonts.Roboto.Bold,
                    color: COLORS.textColor,
                    fontSize: 12,
                  }}>
                  ESI
                </Text>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <AmountFields
                  icon={'attach-money'}
                  title={'Premium'}
                  amount={`LKR ${formatCurrency(DataSet?.esiTotalPremium)}`}
                />
                <AmountFields
                  icon={'outlined-flag'}
                  title={'Target'}
                  amount={`LKR ${formatCurrency(DataSet?.esiTotalTarget)}`}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {ClassSummeryLoading && (
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            width: '100%',
            height: '100%',
          }}>
          <LoaderKit
            style={{width: 50, height: 50}}
            name={'LineScalePulseOutRapid'}
            color={COLORS.grayText}
          />
        </View>
      )}
    </View>
  );
}

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import {Styles} from '../../../theme/Styles';
import Header from '../../../components/Header';
import CircularProgress from 'react-native-circular-progress-indicator';
import {
  Checkbox,
  Avatar,
  Menu,
  Divider,
  PaperProvider,
} from 'react-native-paper';

import HeaderBackground from '../../../components/HeaderBackground';
import trophy from '../../../icons/trophy.png'; // Replace with the actual logo path
import Target from '../../../icons/Target.png'; // Replace with the actual logo path
import SALES_PERFORMANCE from '../../../icons/SALES_PERFORMANCE.png'; // Replace with the actual logo path
import individualPerforamance from '../../../icons/individualPerforamance.png'; // Replace with the actual logo path
import teamPerformance from '../../../icons/teamPerformance.png'; // Replace with the actual logo path
import GENERAL from '../../../icons/GENERAL.png'; // Replace with the actual logo path
import PRODUCT_PORTFOLIO from '../../../icons/PRODUCT_PORTFOLIO.png'; // Replace with the actual logo path
import E_CORNER from '../../../icons/E-CORNER.png'; // Replace with the actual logo path
import CLUB from '../../../icons/CLUB.png'; // Replace with the actual logo path
import B_PLANNER from '../../../icons/B-PLANNER.png'; // Replace with the actual logo path
import IndividualModal from '../../../components/IndividualModal';
import Octicons from 'react-native-vector-icons/Octicons';
import AboutModal from '../../../components/AboutModal';
import TableComponent from '../../../components/TableComponent';
import {styles} from './styles';
import SetTargetModal from '../../../components/SetTargetModal';
import {useSelector} from 'react-redux';
import {useGetDepartmentMutation} from '../../../redux/services/setTargetSlice';
import {
  useGetAgentCurrentMonthAchievementQuery,
  useGetAgentCurrentMonthIncomeQuery,
  useSalesIncomeQuery,
} from '../../../redux/services/SalesMeterApiSlice';
import LoadingScreen from '../../../components/LoadingScreen';
import SalesTableComponent from '../../../components/SalesTableComponent';
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function SalesMeter({navigation}) {
  const userCode = useSelector(state => state.Profile.userCode);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);

  const value = 40; // 40% of the gauge. min=0 max=100
  const [modalVisible, setModalVisible] = useState(false);
  const [target, setTarget] = useState('');
  const [type, setType] = useState('M');
  const salesMeterResponse = useSelector(
    state => state.SalesMeter.SalesMeterResponse.data,
  );
  console.log('usertypevv', usertype);
  const {
    data: CurrentMonthIncome,
    error,
    isLoading,
    isFetching,
  } = useGetAgentCurrentMonthIncomeQuery({
    id: usertype == 2 ? personalCode : userCode,
  });

  const {
    data: CurrentMonthAchievement,
    error: achiveError,
    isLoading: achiveLoading,
    isFetching: achiveFetch,
  } = useGetAgentCurrentMonthAchievementQuery({
    id: usertype == 2 ? personalCode : userCode,
  });
  const {
    data: salesIncome,
    error: salesIncomeError,
    isLoading: salesIncomeLoading,
    isFetching: salesIncomeFetch,
  } = useSalesIncomeQuery({
    id: usertype == 2 ? personalCode : userCode,
  });
  console.log('CurrentMonthAchievement', CurrentMonthAchievement);
  console.log('CurrentMonthIncome', CurrentMonthIncome);
  console.log('salesIncome', salesIncome);
  const filterdData =
    type == 'M'
      ? CurrentMonthAchievement?.data?.monthly
      : CurrentMonthAchievement?.data?.cumulative;
  console.log('filterdData', filterdData);
  const tableHead = ['Type', 'Premium', 'Income'];
  const tableData =
    type == 'M'
      ? CurrentMonthIncome?.data?.monthly.map(item => [
          item?.cashDebit,
          item?.totalPremium?.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          item?.totalCommission?.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        ])
      : CurrentMonthIncome?.data?.cumulative.map(item => [
          item?.cashDebit,
          item?.totalPremium?.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          item?.totalCommission?.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        ]);

  const totalPremiumSum =
    type == 'M'
      ? CurrentMonthIncome?.data?.monthly
          .reduce((sum, item) => sum + (item.totalPremium || 0), 0)
          .toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
      : CurrentMonthIncome?.data?.cumulative
          .reduce((sum, item) => sum + (item.totalPremium || 0), 0)
          .toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

  const totalCommissionSum =
    type == 'M'
      ? CurrentMonthIncome?.data?.monthly
          .reduce((sum, item) => sum + (item.totalCommission || 0), 0)
          .toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
      : CurrentMonthIncome?.data?.cumulative
          .reduce((sum, item) => sum + (item.totalCommission || 0), 0)
          .toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

  tableData?.push(['Total', totalPremiumSum || 0, totalCommissionSum || 0]);
  const columnWidths = [100, 110, 110];

  // API Binds

  const monthlySalePercentage = filterdData?.achievement;
  const monthlySale = salesIncome?.data?.targetAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const lastYearAchievement = filterdData?.totalPremium.toLocaleString(
    'en-US',
    {minimumFractionDigits: 2, maximumFractionDigits: 2},
  );
  const currentYearAchivement = filterdData?.achievement;
  const lastYearTarget = filterdData?.totalTarget.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const currentYearGrowth = filterdData?.growth;
  const lastYear = salesMeterResponse.lastYear;
  const currentYear = salesMeterResponse.currentYear;
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    console.log('filterdData', filterdData);
  }, []);
  const menuItems = [
    {
      title: 'Monthly',
      onPress: () => {
        setType('M');
        // console.log('Profile Pressed');
      },
    },
    {
      title: 'Cumulative',
      onPress: () => {
        setType('C');
        // console.log('Settings Pressed');
      },
    },
  ];
  const closeMenu = () => setVisible(false);

  return (
    <View style={[Styles.container, {paddingHorizontal: 0}]}>
      <HeaderBackground />
      <PaperProvider>
        <SetTargetModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />

        <View>
          <Header
            Title="Sales Meter"
            onPress={() => navigation.goBack()}
            haveButton={true}
            ButtonTitle={'Set Target'}
            disabledButton={type == 'C' ? true : false}
            disabledColor={type == 'C' ? true : false}
            onButton={() => setModalVisible(true)}
          />
        </View>
        {isLoading || achiveLoading ? (
          <LoadingScreen />
        ) : (
          <ScrollView
            fadingEdgeLength={20}
            contentContainerStyle={{paddingHorizontal: 10}}>
            <View
              style={{
                // backgroundColor: 'rgba(246, 246, 246, 1)', // Wrap RGBA in quotes
                marginVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: 220,
                }}>
                <View style={styles.monthlyCardWrap}>
                  <TouchableOpacity
                    onPress={() => setVisible(true)}
                    style={styles.monthlyCard}>
                    <Text style={styles.monthlyText}>
                      {type == 'M' ? 'MONTHLY' : 'CUMULATIVE'}
                    </Text>
                    {/* <Octicons
                        name={'chevron-down'}
                        color={COLORS.white}
                        size={20}
                      /> */}
                    <Menu
                      visible={visible}
                      onDismiss={() => setVisible(false)}
                      anchor={
                        <TouchableOpacity
                          onPress={() => setVisible(true)}
                          style={{marginLeft: 5}}>
                          <View style={{}}>
                            <Octicons
                              name={'chevron-down'}
                              color={COLORS.white}
                              size={20}
                            />
                          </View>
                        </TouchableOpacity>
                      }>
                      {menuItems?.map((item, index) => (
                        <React.Fragment key={index}>
                          <Menu.Item
                            onPress={() => {
                              item.onPress();
                              closeMenu();
                            }}
                            title={item.title}
                          />
                          {index !== menuItems.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </Menu>
                  </TouchableOpacity>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <CircularProgress
                      value={monthlySalePercentage || 0}
                      radius={63}
                      duration={2000}
                      progressValueColor={COLORS.textColor}
                      maxValue={100}
                      activeStrokeWidth={15}
                      inActiveStrokeWidth={15}
                      activeStrokeColor={COLORS.primary}
                      inActiveStrokeColor={COLORS.lightBorder}
                      // title={'Progress'}
                      valueSuffix={'%'}
                      // titleColor={'red'}
                      titleStyle={{fontWeight: 'bold'}}
                    />
                  </View>

                  <View style={styles.monthlyAmount}>
                    {type == 'M' ? (
                      <Text
                        style={{
                          color: COLORS.black,
                          fontSize: window.width * 0.04,
                          fontFamily: Fonts.Roboto.SemiBold,
                        }}>
                        LKR {monthlySale || 0.0}
                      </Text>
                    ) : // <Text
                    //   style={{
                    //     color: COLORS.black,
                    //     fontSize: window.width * 0.04,
                    //     fontFamily: Fonts.Roboto.SemiBold,
                    //   }}>
                    //   LKR {cumulativeSale || 0.0}
                    // </Text>
                    null}
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    margin: 4,
                  }}>
                  <View style={styles.achivemantTopCard}>
                    <View
                      style={{
                        flex: 0.5,
                        flexDirection: 'row',
                        padding: 10,
                      }}>
                      <View
                        style={{
                          flex: 0.26,

                          justifyContent: 'center',
                        }}>
                        <View style={styles.cardIcon}>
                          <Image
                            source={trophy}
                            style={styles.cardiconimage}></Image>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 0.74,
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.cardText}>Achievement</Text>
                          <Text
                            style={[
                              styles.cardText,
                              {fontFamily: Fonts.Roboto.SemiBold},
                            ]}>
                            2025
                          </Text>
                        </View>

                        <Text style={styles.cardValue}>
                          {' '}
                          LKR {lastYearAchievement || 0.0}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        flexDirection: 'row',
                        padding: 10,
                      }}>
                      <View
                        style={{
                          flex: 0.26,
                          justifyContent: 'center',
                        }}>
                        <View style={styles.cardIcon}>
                          <Image
                            source={Target}
                            style={styles.cardiconimage}></Image>
                        </View>
                      </View>

                      <View
                        style={{
                          flex: 0.74,
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.cardText}>Target</Text>
                          <Text
                            style={[
                              styles.cardText,
                              {fontFamily: Fonts.Roboto.SemiBold},
                            ]}>
                            2025
                          </Text>
                        </View>

                        <Text style={styles.cardValue}>
                          {' '}
                          LKR {lastYearTarget || 0.0}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.achivemantBottomCard}>
                    <View
                      style={{
                        flex: 0.5,
                        flexDirection: 'row',
                        padding: 10,
                      }}>
                      <View
                        style={{
                          flex: 0.26,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={styles.cardIcon}>
                          <Image
                            source={trophy}
                            style={styles.cardiconimage}></Image>
                        </View>
                      </View>
                      {/* ///////////////// */}
                      <View
                        style={{
                          flex: 0.74,
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.cardText}>Achievement</Text>
                          <Text
                            style={[
                              styles.cardText,
                              {fontFamily: Fonts.Roboto.SemiBold},
                            ]}>
                            2025
                          </Text>
                        </View>

                        <Text style={styles.cardValue}>
                          {' '}
                          {currentYearAchivement || 0}%
                        </Text>
                      </View>
                      {/* //////////// */}
                    </View>
                    <View
                      style={{
                        flex: 0.5,
                        flexDirection: 'row',
                        padding: 10,
                      }}>
                      <View
                        style={{
                          flex: 0.26,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={styles.cardIcon}>
                          <Image
                            source={Target}
                            style={styles.cardiconimage}></Image>
                        </View>
                      </View>
                      {/* ///////////////// */}
                      <View
                        style={{
                          flex: 0.74,
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.cardText}>Growth</Text>
                          <Text
                            style={[
                              styles.cardText,
                              {fontFamily: Fonts.Roboto.SemiBold},
                            ]}>
                            2025
                          </Text>
                        </View>

                        <Text style={styles.cardValue}>
                          {' '}
                          {currentYearGrowth || 0}%
                        </Text>
                      </View>
                      {/* //////////// */}
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* <Table headers={headers} data={data} /> */}
            {tableData && (
              <View style={{alignItems: 'center', flex: 1}}>
                <SalesTableComponent
                  haveTotal={true}
                  tableHead={tableHead}
                  tableData={tableData}
                  columnWidths={columnWidths}
                />
              </View>
            )}

            {!tableData && (
              <View
                style={{
                  flex: 1,
                  marginVertical: window.height * 0.1,
                  alignItems: 'center',
                }}>
                <Text style={Styles.errorText}>Sorry, No Data found</Text>
              </View>
            )}

            {/* Important Notice */}
            <View style={Styles.noticeContainer}>
              <Text style={Styles.noticeTitle}>IMPORTANT</Text>
              <Text style={Styles.noticeText}>
                Please note that the commission income figures shown on this
                page are only based on the businesses issued for the current
                month. {'\n'}
                In particular, debit commission income shown here is based on
                the debit businesses received and not on the debit premiums
                settled during the month. Also, the figures do not include other
                income types such as bonuses, incentives, or ORC commissions.{' '}
                {'\n'}In summary, this is only an indicative estimate for you to
                plan your activities. The final figures are subject to change
                according to applicable company policies.
              </Text>
            </View>
          </ScrollView>
        )}
      </PaperProvider>
    </View>
  );
}

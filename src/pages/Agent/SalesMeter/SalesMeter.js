import React, { useEffect, useState } from 'react';
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
import { Styles } from '../../../theme/Styles';
import Header from '../../../components/Header';
import CircularProgress from 'react-native-circular-progress-indicator';

import HeaderBackground from '../../../components/HeaderBackground';
import { Avatar } from 'react-native-paper';
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
import { styles } from './styles';
import SetTargetModal from '../../../components/SetTargetModal';
import { useSelector } from 'react-redux';
import { useGetDepartmentMutation } from '../../../redux/services/setTargetSlice';
import { useGetAgentCurrentMonthAchievementQuery, useGetAgentCurrentMonthIncomeQuery, useSalesIncomeQuery } from '../../../redux/services/SalesMeterApiSlice';
import LoadingScreen from '../../../components/LoadingScreen';
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function SalesMeter({ navigation }) {
  const value = 40; // 40% of the gauge. min=0 max=100
  const [modalVisible, setModalVisible] = useState(false);
  const [target, setTarget] = useState('');

  const salesMeterResponse = useSelector(
    state => state.SalesMeter.SalesMeterResponse.data,
  );

  const {
    data: CurrentMonthIncome,
    error,
    isLoading,
    isFetching,
  } = useGetAgentCurrentMonthIncomeQuery({
    id: 905717,
  });

  const {
    data: CurrentMonthAchievement,
    error: achiveError,
    isLoading: achiveLoading,
    isFetching: achiveFetch,
  } = useGetAgentCurrentMonthAchievementQuery({
    id: 905717,
  });
  const {
    data: salesIncome,
    error: salesIncomeError,
    isLoading: salesIncomeLoading,
    isFetching: salesIncomeFetch,
  } = useSalesIncomeQuery({
    id: 905717,
  });


  const tableHead = ['Type', 'Premium', 'Income'];
  const tableData = CurrentMonthIncome?.data.map(item => [
    item.cashDebit,
    item.totalPremium?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    item.totalCommission?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  ]);

  const totalPremiumSum = CurrentMonthIncome?.data.reduce((sum, item) => sum + (item.totalPremium || 0), 0)
    .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const totalCommissionSum = CurrentMonthIncome?.data.reduce((sum, item) => sum + (item.totalCommission || 0), 0)
    .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  tableData?.push(["Total", totalPremiumSum, totalCommissionSum]);
  const columnWidths = [110, 120, 120];

  // API Binds

  const monthlySalePercentage = CurrentMonthAchievement?.data?.achievement;
  const monthlySale = salesIncome?.data?.targetAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const lastYearAchievement = CurrentMonthAchievement?.data?.totalPremium.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const currentYearAchivement = CurrentMonthAchievement?.data?.achievement;
  const lastYearTarget = CurrentMonthAchievement?.data?.totalTarget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const currentYearGrowth = CurrentMonthAchievement?.data?.growth;
  const lastYear = salesMeterResponse.lastYear;
  const currentYear = salesMeterResponse.currentYear;


  useEffect(() => {
    console.log("CurrentMonthAchievement", CurrentMonthAchievement);
  }, [])


  return (
    <View style={[Styles.container, { paddingHorizontal: 0 }]}>
      <HeaderBackground />
      <SetTargetModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View>
        <Header
          Title="Sales meter"
          onPress={() => navigation.goBack()}
          haveButton={true}
          ButtonTitle={'Set Target'}
          onButton={() => setModalVisible(true)}
        />
      </View>
      {isLoading || achiveLoading ? (
        <LoadingScreen />
      ) :
        (
          <ScrollView
            fadingEdgeLength={20}
            contentContainerStyle={{ paddingHorizontal: 10 }}>
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
                  <View style={styles.monthlyCard}>
                    <Text style={styles.monthlyText}>MONTHLY</Text>
                    <Octicons
                      name={'chevron-down'}
                      color={COLORS.white}
                      size={20}
                    />
                  </View>
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress
                      value={monthlySalePercentage}
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
                      titleStyle={{ fontWeight: 'bold' }}
                    />
                  </View>

                  <View style={styles.monthlyAmount}>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: window.width * 0.04,
                        fontFamily: Fonts.Roboto.SemiBold,
                      }}>
                      LKR {monthlySale}
                    </Text>
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
                              { fontFamily: Fonts.Roboto.SemiBold },
                            ]}>
                            2025
                          </Text>
                        </View>

                        <Text style={styles.cardValue}>
                          {' '}
                          LKR {lastYearAchievement}
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
                              { fontFamily: Fonts.Roboto.SemiBold },
                            ]}>
                            2025
                          </Text>
                        </View>

                        <Text style={styles.cardValue}> LKR {lastYearTarget}</Text>
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
                              { fontFamily: Fonts.Roboto.SemiBold },
                            ]}>
                            2025
                          </Text>
                        </View>

                        <Text style={styles.cardValue}>
                          {' '}
                          {currentYearAchivement}%
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
                              { fontFamily: Fonts.Roboto.SemiBold },
                            ]}>
                            2025
                          </Text>
                        </View>

                        <Text style={styles.cardValue}> {currentYearGrowth}%</Text>
                      </View>
                      {/* //////////// */}
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* <Table headers={headers} data={data} /> */}
            <View style={{ alignItems: 'center', flex: 1 }}>
              <TableComponent
                haveTotal={true}
                tableHead={tableHead}
                tableData={tableData}
                columnWidths={columnWidths}
              />
            </View>

            {/* Important Notice */}
            <View style={Styles.noticeContainer}>
              <Text style={Styles.noticeTitle}>IMPORTANT</Text>
              <Text style={Styles.noticeText}>
                Please note that the commission income figures shown on this page
                are only based on the businesses issued for the current month.{' '}
                {'\n'}
                In particular, debit commission income shown here is based on the
                debit businesses received and not on the debit premiums settled
                during the month. Also, the figures do not include other income
                types such as bonuses, incentives, or ORC commissions. {'\n'}In
                summary, this is only an indicative estimate for you to plan your
                activities. The final figures are subject to change according to
                applicable company policies.
              </Text>
            </View>
          </ScrollView>
        )}

    </View>
  );
}

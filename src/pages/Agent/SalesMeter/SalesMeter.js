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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import {Styles} from '../../../theme/Styles';
import Header from '../../../components/Header';
import HeaderBackground from '../../../components/HeaderBackground';
import {Avatar} from 'react-native-paper';
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
import SalesModal from '../../../components/SalesModal';
import IndividualModal from '../../../components/IndividualModal';
import Octicons from 'react-native-vector-icons/Octicons';
import AboutModal from '../../../components/AboutModal';
import TableComponent from '../../../components/TableComponent';
import {styles} from './styles';
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

const window = Dimensions.get('window');

export default function SalesMeter({navigation}) {
  const value = 40; // 40% of the gauge. min=0 max=100
  const [modalVisible, setModalVisible] = useState(false);
  const [generaModalVisible, setgeneraModalVisible] = useState(false);

  const tableHead = ['Type', 'Premium', 'Income'];
  const tableData = [
    ['Gen. Collec. - Cash', '182,205.78', '182,205.78'],
    ['Gen. Collec. - Cash', '182,205.78', '182,205.78'],
    ['Total', '865,179.79', '72,285.66'],
  ];
  const columnWidths = [150, 120, 120];

  return (
    <View style={[Styles.container, {paddingHorizontal: 0}]}>
      <HeaderBackground />
      <SalesModal
        modalVisible={modalVisible}
        onPressOne={() => setgeneraModalVisible(true)}
        setModalVisible={setModalVisible}
      />

      <View style={{paddingHorizontal: 20}}>
        <Header Title="Sales meter" onPress={() => navigation.goBack()} />
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: 'rgba(246, 246, 246, 1)', // Wrap RGBA in quotes
            marginVertical: 10,
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 230,
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
              <View
                style={{
                  alignItems: 'center',
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <View style={styles.monthlyChart}>
                  <Text style={styles.monthlyPercentage}>30%</Text>
                </View>
              </View>
              <View style={styles.monthlyAmount}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 16,
                    fontFamily: Fonts.Roboto.Medium,
                  }}>
                  LKR 11,359,419
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
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={styles.cardIcon}>
                      <Image
                        source={trophy}
                        style={styles.cardiconimage}></Image>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 0.7,
                      justifyContent: 'center',
                    }}>
                    <View style={styles.achivemantSubCard}>
                      <Text style={styles.cardText}>Achievement </Text>

                      <Text
                        style={{
                          fontFamily: Fonts.Roboto.SemiBold,
                          color: COLORS.black,
                        }}>
                        2025
                      </Text>
                    </View>
                    <Text style={styles.cardValue}>LKR 46,614,790</Text>
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
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={styles.cardIcon}>
                      <Image
                        source={Target}
                        style={styles.cardiconimage}></Image>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 0.7,
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.cardText}>
                      Target{' '}
                      <Text style={{fontFamily: Fonts.Roboto.SemiBold}}>
                        2025
                      </Text>
                    </Text>

                    <Text style={styles.cardValue}>LKR 43,492,058</Text>
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
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={styles.cardIcon}>
                      <Image
                        source={trophy}
                        style={styles.cardiconimage}></Image>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 0.7,
                      justifyContent: 'center',
                    }}>
                    <View style={styles.achivemantSubCard}>
                      <Text style={styles.cardText}>Achievement </Text>

                      <Text
                        style={{
                          fontFamily: Fonts.Roboto.SemiBold,
                          color: COLORS.black,
                        }}>
                        2025
                      </Text>
                    </View>
                    <Text style={styles.cardValue}>26%</Text>
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
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={styles.cardIcon}>
                      <Image
                        source={Target}
                        style={styles.cardiconimage}></Image>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 0.7,
                      justifyContent: 'center',
                    }}>
                    <View style={styles.achivemantSubCard}>
                      <Text style={styles.cardText}>Growth </Text>

                      <Text
                        style={{
                          fontFamily: Fonts.Roboto.SemiBold,
                          color: COLORS.black,
                        }}>
                        2025
                      </Text>
                    </View>

                    <Text style={styles.cardValue}>-76%</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* <Table headers={headers} data={data} /> */}
        <TableComponent
          tableHead={tableHead}
          tableData={tableData}
          columnWidths={columnWidths}
        />

        {/* Important Notice */}
        <View style={Styles.noticeContainer}>
          <Text style={Styles.noticeTitle}>IMPORTANT</Text>
          <Text style={Styles.noticeText}>
            Please note that the commission income figures shown on this page
            are only based on the businesses issued for the current month.{' '}
            {'\n\n'}
            In particular, debit commission income shown here is based on the
            debit businesses received and not on the debit premiums settled
            during the month. Also, the figures do not include other income
            types such as bonuses, incentives, or ORC commissions. In summary,
            this is only an indicative estimate for you to plan your activities.
            The final figures are subject to change according to applicable
            company policies.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

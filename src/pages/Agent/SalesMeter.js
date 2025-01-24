import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Modal, TouchableOpacity, ScrollView, } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../theme/colors';
import Fonts from '../../theme/Fonts';
import { Styles } from '../../theme/Styles';
import Header from '../../components/Header';
import HeaderBackground from '../../components/HeaderBackground';
import { Avatar } from 'react-native-paper';
import trophy from '../../icons/trophy.png'; // Replace with the actual logo path
import Target from '../../icons/Target.png'; // Replace with the actual logo path
import SALES_PERFORMANCE from '../../icons/SALES_PERFORMANCE.png'; // Replace with the actual logo path
import individualPerforamance from '../../icons/individualPerforamance.png'; // Replace with the actual logo path
import teamPerformance from '../../icons/teamPerformance.png'; // Replace with the actual logo path
import GENERAL from '../../icons/GENERAL.png'; // Replace with the actual logo path
import PRODUCT_PORTFOLIO from '../../icons/PRODUCT_PORTFOLIO.png'; // Replace with the actual logo path
import E_CORNER from '../../icons/E-CORNER.png'; // Replace with the actual logo path
import CLUB from '../../icons/CLUB.png'; // Replace with the actual logo path
import B_PLANNER from '../../icons/B-PLANNER.png'; // Replace with the actual logo path
import SalesModal from '../../components/SalesModal';
import IndividualModal from '../../components/IndividualModal';
import Octicons from 'react-native-vector-icons/Octicons';
import AboutModal from '../../components/AboutModal';
import TableComponent from '../../components/TableComponent';
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';


const window = Dimensions.get('window');

export default function SalesMeter({ navigation }) {

    const value = 40 // 40% of the gauge. min=0 max=100
    const [modalVisible, setModalVisible] = useState(false);
    const [generaModalVisible, setgeneraModalVisible] = useState(false);


    // const headers = ["Type", "Premium", "Income"];
    // const data = [
    //     { Type: "Gen. Collec. - Cash", Premium: "182,205.78", Income: "15,368.00" },
    //     { Type: "Gen. Collec. - Debit", Premium: "682,974.01", Income: "57,917.66" },
    //     { Type: "Total", Premium: "865,179.79", Income: "72,285.66" },
    // ];


    const tableHead = ["Type", "Premium", "Income"];
    const tableData = [
        ["Gen. Collec. - Cash", "182,205.78", "182,205.78"],
        ["Gen. Collec. - Cash", "182,205.78", "182,205.78"],
        ["Total", "865,179.79", "72,285.66",],
    ];
    const columnWidths = [150, 120, 120];


    return (
        <View style={[Styles.container, { paddingHorizontal: 0 }]}>

            <HeaderBackground />
            <SalesModal modalVisible={modalVisible}
                onPressOne={() => setgeneraModalVisible(true)}
                // onPressTwo={() => setModalVisible(false)}
                setModalVisible={setModalVisible} />
            {/* <IndividualModal modalVisible={generaModalVisible} setModalVisible={setgeneraModalVisible} /> */}





            <View style={{ paddingHorizontal: 20, }}>
                <Header Title="Sales meter"
                    onPress={() => navigation.goBack()}
                />
            </View>
            <ScrollView>

                <View style={{
                    backgroundColor: 'rgba(246, 246, 246, 1)', // Wrap RGBA in quotes
                    marginVertical: 10,
                    padding: 10,


                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 230, }}>
                        <View style={{
                            flex: 0.5, backgroundColor: COLORS.white,
                            elevation: 0,
                            margin: 4,
                            borderRadius: 15,
                        }}>
                            <View style={{
                                backgroundColor: COLORS.primary,
                                height: 24,
                                marginVertical: 12,
                                marginRight: 25,
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row', justifyContent: 'space-around'
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    color: COLORS.white,
                                    fontFamily: Fonts.Roboto.SemiBold
                                }}>MONTHLY</Text>

                                <Octicons name={"chevron-down"} color={COLORS.white} size={20} />

                            </View>
                            <View style={{
                                alignItems: 'center',
                                flex: 1,
                                justifyContent: 'center'
                            }}>
                                <View style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 100,
                                    borderWidth: 10,
                                    borderColor: COLORS.islandRank,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                }}>
                                    <Text style={{
                                        fontFamily: Fonts.Roboto.Bold,
                                        fontSize: 24,
                                        color: COLORS.black,
                                    }}>30%</Text>

                                </View>
                            </View>
                            <View style={{
                                backgroundColor: COLORS.white,
                                height: 24,
                                marginVertical: 12,
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    fontSize: 16,
                                    fontFamily: Fonts.Roboto.Medium
                                }}>LKR 11,359,419</Text>
                            </View>

                        </View>
                        <View style={{
                            flex: 0.5, margin: 4,

                        }}>
                            <View style={{
                                backgroundColor: COLORS.white,
                                elevation: 0,
                                flex: 0.5,
                                marginBottom: 3,
                                borderRadius: 15,
                            }}>
                                <View style={{
                                    flex: 0.5,
                                    flexDirection: "row",
                                    padding: 10,
                                }}>
                                    <View style={{
                                        flex: 0.3,
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}>
                                        <View style={{
                                            backgroundColor: COLORS.primaryGreen,
                                            height: 35,
                                            width: 35,
                                            borderRadius: 4,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Image source={trophy}
                                                style={
                                                    {
                                                        height: 18,
                                                        width: 18
                                                    }}></Image>
                                        </View>
                                    </View>

                                    <View style={{
                                        flex: 0.7,
                                        justifyContent: 'center',

                                    }}>
                                        <View style={{
                                            justifyContent: 'space-between',
                                            flexDirection: 'row',
                                        }}>
                                            <Text style={{
                                                fontSize: 13,
                                                fontFamily: Fonts.Roboto.Regular,
                                                color: COLORS.black
                                            }}>Achievement   </Text>

                                            <Text style={{
                                                fontFamily: Fonts.Roboto.SemiBold,
                                                color: COLORS.black
                                            }}>2025</Text>
                                        </View>
                                        <Text style={{
                                            fontSize: 14,
                                            fontFamily: Fonts.Roboto.Bold,
                                            color: COLORS.black
                                        }}>LKR 46,614,790</Text>

                                    </View>
                                </View>
                                <View style={{
                                    flex: 0.5,
                                    flexDirection: "row",
                                    padding: 10
                                }}>
                                    <View style={{
                                        flex: 0.3,
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}>
                                        <View style={{
                                            backgroundColor: COLORS.primaryGreen,
                                            height: 35,
                                            width: 35,
                                            borderRadius: 4,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Image source={Target}
                                                style={
                                                    {
                                                        height: 18,
                                                        width: 18
                                                    }}></Image>
                                        </View>
                                    </View>

                                    <View style={{
                                        flex: 0.7,
                                        justifyContent: 'center',

                                    }}>
                                        <Text style={{
                                            fontSize: 13,
                                            fontFamily: Fonts.Roboto.Regular,
                                            color: COLORS.black
                                        }}>Target   <Text style={{ fontFamily: Fonts.Roboto.SemiBold }}>2025</Text></Text>

                                        <Text style={{
                                            fontSize: 14,
                                            fontFamily: Fonts.Roboto.Bold,
                                            color: COLORS.black
                                        }}>LKR 43,492,058</Text>

                                    </View>
                                </View>
                            </View>
                            <View style={{
                                backgroundColor: COLORS.white,
                                elevation: 0,
                                // borderWidth: 1,
                                // borderColor: COLORS.lightBorder,
                                flex: 0.5,
                                marginTop: 3,
                                borderRadius: 15,


                            }}>
                                <View style={{
                                    flex: 0.5,
                                    flexDirection: "row",
                                    padding: 10,

                                }}>
                                    <View style={{
                                        flex: 0.3,
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}>
                                        <View style={{
                                            backgroundColor: COLORS.primaryGreen,
                                            height: 35,
                                            width: 35,
                                            borderRadius: 4,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Image source={trophy}
                                                style={
                                                    {
                                                        height: 18,
                                                        width: 18
                                                    }}></Image>
                                        </View>
                                    </View>

                                    <View style={{
                                        flex: 0.7,
                                        justifyContent: 'center',

                                    }}>
                                        <View style={{
                                            justifyContent: 'space-between',
                                            flexDirection: 'row',
                                        }}>
                                            <Text style={{
                                                fontSize: 13,
                                                fontFamily: Fonts.Roboto.Regular,
                                                color: COLORS.black
                                            }}>Achievement   </Text>

                                            <Text style={{
                                                fontFamily: Fonts.Roboto.SemiBold,
                                                color: COLORS.black
                                            }}>2025</Text>
                                        </View>
                                        <Text style={{
                                            fontSize: 14,
                                            fontFamily: Fonts.Roboto.Bold,
                                            color: COLORS.black
                                        }}>26%</Text>

                                    </View>
                                </View>
                                <View style={{
                                    flex: 0.5,
                                    flexDirection: "row",
                                    padding: 10
                                }}>
                                    <View style={{
                                        flex: 0.3,
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}>
                                        <View style={{
                                            backgroundColor: COLORS.primaryGreen,
                                            height: 35,
                                            width: 35,
                                            borderRadius: 4,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Image source={Target}
                                                style={
                                                    {
                                                        height: 18,
                                                        width: 18
                                                    }}></Image>
                                        </View>
                                    </View>

                                    <View style={{
                                        flex: 0.7,
                                        justifyContent: 'center',
                                    }}>

                                        <View style={{
                                            justifyContent: 'space-between',
                                            flexDirection: 'row',
                                        }}>
                                            <Text style={{
                                                fontSize: 13,
                                                fontFamily: Fonts.Roboto.Regular,
                                                color: COLORS.black
                                            }}>Growth   </Text>

                                            <Text style={{
                                                fontFamily: Fonts.Roboto.SemiBold,
                                                color: COLORS.black
                                            }}>2025</Text>
                                        </View>


                                        <Text style={{
                                            fontSize: 14,
                                            fontFamily: Fonts.Roboto.Bold,
                                            color: COLORS.black
                                        }}>-76%</Text>

                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>



                {/* <Table headers={headers} data={data} /> */}
                <TableComponent tableHead={tableHead} tableData={tableData} columnWidths={columnWidths} />


                {/* Important Notice */}
                <View style={Styles.noticeContainer}>
                    <Text style={Styles.noticeTitle}>IMPORTANT</Text>
                    <Text style={Styles.noticeText}>
                        Please note that the commission income figures shown on this page are only based on the businesses
                        issued for the current month. {'\n\n'}
                        In particular, debit commission income shown here is based on the debit businesses received and not
                        on the debit premiums settled during the month. Also, the figures do not include other income types
                        such as bonuses, incentives, or ORC commissions.
                        In summary, this is only an indicative estimate for you to plan your activities. The final figures
                        are subject to change according to applicable company policies.
                    </Text>
                </View>

            </ScrollView>

        </View >
    );
}




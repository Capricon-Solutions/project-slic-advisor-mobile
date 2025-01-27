import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Modal, TouchableOpacity, } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import { Styles } from '../../../theme/Styles';
import Header from '../../../components/Header';
import HeaderBackground from '../../../components/HeaderBackground';
import { Avatar } from 'react-native-paper';
import avatar from '../../../images/avatar.png'; // Replace with the actual logo path
import SALES_PERFORMANCE from '../../../icons/SALES_PERFORMANCE.png'; // Replace with the actual logo path
import GENERAL from '../../../icons/GENERAL.png'; // Replace with the actual logo path
import PRODUCT_PORTFOLIO from '../../../icons/PRODUCT_PORTFOLIO.png'; // Replace with the actual logo path
import E_CORNER from '../../../icons/E-CORNER.png'; // Replace with the actual logo path
import CLUB from '../../../icons/CLUB.png'; // Replace with the actual logo path
import B_PLANNER from '../../../icons/B-PLANNER.png'; // Replace with the actual logo path
import SalesModal from '../../../components/SalesModal';
import IndividualModal from '../../../components/IndividualModal';
import { styles } from './styles';

const window = Dimensions.get('window');

export default function Dashboard({ navigation }) {

    const value = 40 // 40% of the gauge. min=0 max=100
    const [modalVisible, setModalVisible] = useState(false);
    const [generaModalVisible, setgeneraModalVisible] = useState(false);

    return (
        <View style={Styles.container}>

            <SalesModal modalVisible={modalVisible}
                onPressOne={() => setgeneraModalVisible(true)}
                // onPressTwo={() => setModalVisible(false)}
                setModalVisible={setModalVisible} />
            <IndividualModal modalVisible={generaModalVisible} setModalVisible={setgeneraModalVisible} />

            <HeaderBackground />
            <Header Title="Advisor Dashboard"
                onPress={() => navigation.goBack()}
            />

            <View style={styles.mainWrap}>
                <TouchableOpacity onPress={() => navigation.navigate("Profile")}
                    Title={"Sign In"} style={styles.profilePicture}>
                    <Avatar.Image size={57} source={avatar} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={{ flex: 0.6, justifyContent: 'center', }}>
                    <Text style={styles.UserName}>Mr. Sanjeewa Atukorale</Text>
                    <Text style={styles.regionName}>region name - Central 1</Text>
                    <Text style={styles.position}>(Advisor)</Text>

                </TouchableOpacity>

                <View style={styles.notiIcon}>
                    <MaterialCommunityIcons name="bell-outline" color={COLORS.iconDisabled} size={26} />
                </View>

            </View>

            <View style={{ marginTop: 15, }}>
                <Text style={{ fontFamily: Fonts.Roboto.Bold, color: COLORS.black, fontSize: 14 }}>Advisor Summary</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("SalesMeter")} style={Styles.rankWrap}>

                <View style={{
                    flex: 0.65,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={styles.IslandRank}>
                        <Text style={{
                            fontFamily: Fonts.Roboto.Bold,
                            fontSize: 24,
                            color: COLORS.black,
                        }}>550</Text>
                        <Text style={{ fontSize: 17, fontFamily: Fonts.Roboto.Regular }}>Island Rank</Text>

                    </View>

                </View>
                <View style={{
                    flex: 0.35,

                }}>
                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={styles.regionalRank}>
                                <Text style={{
                                    fontFamily: Fonts.Roboto.Bold,
                                    fontSize: 12,
                                    color: COLORS.black,

                                }}>30/60</Text>
                            </View>
                            <Text style={{ fontSize: 13, fontFamily: Fonts.Roboto.Regular }}>Regional Rank</Text>
                        </View>

                    </View>
                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={styles.branchRank}>
                                <Text style={{
                                    fontFamily: Fonts.Roboto.Bold,
                                    fontSize: 12,
                                    color: COLORS.black,
                                }}>30/60</Text>
                            </View>
                            <Text style={{ fontSize: 13, fontFamily: Fonts.Roboto.Regular }}>Branch Rank</Text>

                        </View>

                    </View>

                </View>
                {/* <AnimatedGaugeProgress
                    size={200}
                    width={15}
                    fill={100}
                    rotation={90}
                    cropDegree={90}
                    tintColor="#4682b4"
                    delay={0}
                    backgroundColor="#b0c4de"
                    stroke={[2, 2]} //For a equaly dashed line
                    strokeCap="circle" /> */}
            </TouchableOpacity>


            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 13, }}>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={Styles.iconGrid}>
                    <Image style={Styles.gridIcon} source={SALES_PERFORMANCE}></Image>
                    <Text style={Styles.gridText}>SALES PERFORMANCE</Text>
                </TouchableOpacity>
                <View style={Styles.iconGrid}>
                    <Image style={Styles.gridIcon} source={GENERAL}></Image>
                    <Text style={Styles.gridText}>GENERAL</Text>

                </View>
                <View style={Styles.iconGrid}>
                    <Image style={Styles.gridIcon} source={CLUB}></Image>
                    <Text style={Styles.gridText}>CLUB</Text>

                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 13, }}>
                <View style={Styles.iconGrid}>
                    <Image style={Styles.gridIcon} source={B_PLANNER}></Image>
                    <Text style={Styles.gridText}>B-PLANNER</Text>

                </View>
                <View style={Styles.iconGrid}>
                    <Image style={Styles.gridIcon} source={E_CORNER}></Image>
                    <Text style={Styles.gridText}>E-CORNER</Text>

                </View>
                <View style={Styles.iconGrid}>
                    <Image style={Styles.gridIcon} source={PRODUCT_PORTFOLIO}></Image>
                    <Text style={Styles.gridText}>PRODUCT PORTFOLIO</Text>

                </View>
            </View>

        </View>
    );
}


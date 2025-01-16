import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Modal, TouchableOpacity, } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../theme/colors';
import Fonts from '../../theme/Fonts';
import { Styles } from '../../theme/Styles';
import Header from '../../components/Header';
import HeaderBackground from '../../components/HeaderBackground';
import { Avatar } from 'react-native-paper';
import avatar from '../../images/avatar.png'; // Replace with the actual logo path
import SALES_PERFORMANCE from '../../icons/SALES_PERFORMANCE.png'; // Replace with the actual logo path
import GENERAL from '../../icons/GENERAL.png'; // Replace with the actual logo path
import PRODUCT_PORTFOLIO from '../../icons/PRODUCT_PORTFOLIO.png'; // Replace with the actual logo path
import E_CORNER from '../../icons/E-CORNER.png'; // Replace with the actual logo path
import CLUB from '../../icons/CLUB.png'; // Replace with the actual logo path
import B_PLANNER from '../../icons/B-PLANNER.png'; // Replace with the actual logo path
// import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';


const window = Dimensions.get('window');

export default function Dashboard({ navigation }) {

    const value = 40 // 40% of the gauge. min=0 max=100
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={Styles.container}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                            marginBottom: 15

                        }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.modalTitle}>Sales Performance Type</Text>

                            </View>
                            <TouchableOpacity onPress={() => setModalVisible(false)}
                                style={{
                                    borderRadius: 100,
                                    padding: 2,
                                    height: 27,
                                    width: 27,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: COLORS.lightBorder,
                                }}>
                                <MaterialCommunityIcons name="close" color={COLORS.primaryGreen} size={20} />

                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity style={{
                            flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 18,
                            borderWidth: 1.5,
                            borderRadius: 10,
                            borderColor: COLORS.modalBorder,
                            marginVertical: 10,
                        }}>
                            <View style={{ flex: 0.15, alignItems: 'center' }}>
                                <MaterialCommunityIcons name="close" color={COLORS.primaryGreen} size={20} />

                            </View>

                            <View style={{ flex: 0.85, }}>
                                <Text style={{ fontSize: 15, fontFamily: Fonts.Roboto.Medium, color: COLORS.islandRank }}>Individual Performance</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 18,
                            borderWidth: 1.5,
                            borderRadius: 10,
                            borderColor: COLORS.modalBorder,
                            marginVertical: 10,
                        }}>
                            <View style={{ flex: 0.15, alignItems: 'center' }}>
                                <MaterialCommunityIcons name="close" color={COLORS.primaryGreen} size={20} />

                            </View>

                            <View style={{ flex: 0.85, }}>
                                <Text style={{ fontSize: 15, fontFamily: Fonts.Roboto.Medium, color: COLORS.islandRank }}>Team Performance</Text>
                            </View>
                        </TouchableOpacity>


                    </View>
                </View>
            </Modal>



            <HeaderBackground />
            <Header Title="Advisor Dashboard"
                onPress={() => navigation.goBack()}
            />

            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginVertical: 3 }}>
                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', }}>
                    <Avatar.Image size={57} source={avatar} />
                </View>
                <View style={{ flex: 0.6, justifyContent: 'center', }}>
                    <Text style={{ fontSize: 20, color: '#333', fontFamily: Fonts.Roboto.SemiBold, fontSize: 16 }}>Mr. Sanjeewa Atukorale</Text>
                    <Text style={{ fontSize: 20, color: '#333', fontFamily: Fonts.Roboto.SemiBold, fontSize: 12 }}>region name - Central 1</Text>
                    <Text style={{ fontSize: 20, color: '#333', fontFamily: Fonts.Roboto.Medium, fontSize: 10 }}>(Advisor)</Text>

                </View>

                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'flex-end', }}>
                    <MaterialCommunityIcons name="bell-outline" color={COLORS.iconDisabled} size={26} />

                </View>

            </View>

            <View style={{ marginTop: 15, }}>
                <Text style={{ fontFamily: Fonts.Roboto.Bold, color: COLORS.black, fontSize: 14 }}>Advisor Summary</Text>
            </View>

            <View style={Styles.rankWrap}>

                <View style={{

                    flex: 0.65,
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                    <View style={{
                        width: 160,
                        height: 160,
                        borderRadius: 100,
                        borderWidth: 14,
                        borderColor: COLORS.islandRank,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}>
                        <Text style={{
                            fontFamily: Fonts.Roboto.Bold,
                            fontSize: 24,
                            color: COLORS.black,
                        }}>550</Text>
                        <Text style={{ fontSize: 17, fontFamily: Fonts.Roboto.Regular }}>Island Rank</Text>

                    </View>
                    {/* <Text style={{ fontSize: 17, fontFamily: Fonts.Roboto.Regular }}>Island Rank</Text> */}

                </View>
                <View style={{
                    flex: 0.35,

                }}>
                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                width: 65,
                                height: 65,
                                borderRadius: 100,
                                borderWidth: 8,
                                borderColor: COLORS.regionalRank,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 5,
                            }}>
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
                            <View style={{
                                width: 65,
                                height: 65,
                                borderRadius: 100,
                                borderWidth: 8,
                                borderColor: COLORS.branchRank,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 5,
                            }}>
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
            </View>


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

const styles = StyleSheet.create({
    container: {
        flex: 1,


        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    userName: { fontSize: 16, color: '#333', fontFamily: Fonts.Roboto.SemiBold },
    userRegion: { fontSize: 12, color: '#333', fontFamily: Fonts.Roboto.SemiBold },
    userRole: { fontSize: 10, color: '#333', fontFamily: Fonts.Roboto.Medium },
    sectionTitle: { fontFamily: Fonts.Roboto.Bold, color: COLORS.black, fontSize: 14 },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',

        // backgroundColor: 'rgba(0,0,0,0)',

    },
    modalContainer: {
        width: '100%',
        padding: 25,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 25,
        borderWidth: 1,
        borderColor: COLORS.lightBorder,
    },
    modalTitle: {
        fontSize: 17,
        fontFamily: Fonts.Roboto.Medium,
        color: COLORS.title,
    },
    modalContent: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

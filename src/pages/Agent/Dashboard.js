import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../theme/colors';
import Fonts from '../../theme/Fonts';
import { Styles } from '../../theme/Styles';
import Svg, { Path } from 'react-native-svg';
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


const window = Dimensions.get('window');

export default function Dashboard({ navigation }) {
    return (
        <View style={Styles.container}>
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

            <View style={{ borderRadius: 20, backgroundColor: COLORS.white, height: 220, marginVertical: 20, elevation: 3, marginBottom: 50 }}></View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 13, }}>
                <View style={Styles.iconGrid}>
                    <Image style={Styles.gridIcon} source={SALES_PERFORMANCE}></Image>
                    <Text style={Styles.gridText}>SALES PERFORMANCE</Text>
                </View>
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
});

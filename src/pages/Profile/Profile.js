import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Styles } from '../../theme/Styles';
import HeaderBackground from '../../components/HeaderBackground';
import Header from '../../components/Header';
import COLORS from '../../theme/colors';
import SquareTextBox from '../../components/SquareTextBox';
import SquareTextBoxOutlined from '../../components/SquareTextBoxOutlined';
import Fonts from '../../theme/Fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Avatar } from 'react-native-paper';
import avatar from '../../images/avatar.png'; // Replace with the actual logo path


export default function Profile({ navigation }) {
    return (
        <View style={Styles.container}>
            <HeaderBackground />
            <Header Title="Profile"
                onPress={() => navigation.goBack()} />

            {/* Profile Section */}
            <View style={styles.profileContainer}>
                <View style={styles.imageContainer}>
                    <Avatar.Image size={125} source={avatar} />
                    <TouchableOpacity style={styles.editIcon}>
                        <Feather name="edit-3" color={COLORS.black} size={20} />

                    </TouchableOpacity>
                </View>
                <Text style={styles.profileName}>Mr. Sanjeewa Atukorale</Text>
                <Text style={styles.profileRole}>Advisor</Text>
            </View>

            {/* Profile Form */}
            <View style={styles.formContainer}>

                <View style={{ position: 'absolute', right: 10, top: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: Fonts.Roboto.Bold, fontSize: 25, color: COLORS.primaryGreen }}>•</Text>
                    <Text style={styles.activeStatus}>Active</Text>

                </View>


                <SquareTextBoxOutlined
                    Title={"360017"}
                    Label={"Agent Code"}
                ></SquareTextBoxOutlined>



                <SquareTextBoxOutlined
                    Label={"Personal Code"}
                    Title={"4678990"}
                ></SquareTextBoxOutlined>

                <SquareTextBoxOutlined
                    Label={"NIC Number"}
                    Title={"19890345678V"}
                ></SquareTextBoxOutlined>

                <SquareTextBoxOutlined
                    Label={"E-mail Address"}
                    Title={"sanjeewaatukorale@srilankainsurance.com"}
                ></SquareTextBoxOutlined>

                <SquareTextBoxOutlined
                    Label={"Mobile Number"}
                    Title={"0702566986"}
                ></SquareTextBoxOutlined>

                <SquareTextBoxOutlined
                    Label={"Contact Number"}
                    Title={"(45)345 5233"}
                ></SquareTextBoxOutlined>

            </View>

            {/* Settings & Logout */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.option}>
                    <Octicons name="gear" color={COLORS.primaryGreen} size={20} />
                    <Text style={styles.optionText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.option}>
                    <MaterialCommunityIcons name="logout" color={COLORS.primaryGreen} size={20} />
                    <Text style={styles.optionText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        alignItems: 'center',
    },
    headerBackground: {
        width: '100%',
        height: 120,
        backgroundColor: '#FDEDE5',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: 'absolute',
        top: 0,
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    imageContainer: {
        position: 'relative',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#B8E4E7',
        width: 43,
        height: 43,
        borderWidth: 5,
        borderColor: COLORS.white,
        borderRadius: 100,

        alignItems: 'center',
        justifyContent: 'center',
    },
    editText: {
        fontSize: 12,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
        marginTop: 8,
    },
    profileRole: {
        fontSize: 14,
        color: '#7C7C7C',
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 15,
        position: "relative",
        paddingBottom: 15,
        marginTop: 20,
        elevation: 2,
        marginHorizontal: 10
    },
    inputContainer: {
        marginBottom: 12,
    },
    label: {
        fontSize: 12,
        color: '#6C757D',
    },
    activeStatus: {
        color: COLORS.primaryGreen,
        fontFamily: Fonts.Roboto.Regular,
        fontSize: 10,
        marginLeft: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#F5F5F5',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 14,
        marginTop: 4,
        borderWidth: 1,
        borderColor: COLORS.borderColor
    },
    footer: {
        marginTop: 20,
        width: '90%',
        marginHorizontal: 10
    },
    option: {
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionText: {
        fontSize: 16,
        fontFamily: Fonts.Roboto.SemiBold,
        color: COLORS.black,
        marginLeft: 10
    },
});

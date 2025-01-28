import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {Styles} from '../../theme/Styles';
import HeaderBackground from '../../components/HeaderBackground';
import Header from '../../components/Header';
import COLORS from '../../theme/colors';
import SquareTextBox from '../../components/SquareTextBox';
import SquareTextBoxOutlined from '../../components/SquareTextBoxOutlined';
import Fonts from '../../theme/Fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {Avatar} from 'react-native-paper';
import avatar from '../../images/avatar.png'; // Replace with the actual logo path
import {styles} from './styles';

export default function Profile({navigation}) {
  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <View style={styles.activeWrap}>
            <Text style={styles.activeDot}>•</Text>
            <Text style={styles.activeStatus}>Active</Text>
          </View>

          <SquareTextBoxOutlined
            Title={'360017'}
            Label={'Agent Code'}></SquareTextBoxOutlined>

          <SquareTextBoxOutlined
            Label={'Personal Code'}
            Title={'4678990'}></SquareTextBoxOutlined>

          <SquareTextBoxOutlined
            Label={'NIC Number'}
            Title={'19890345678V'}></SquareTextBoxOutlined>

          <SquareTextBoxOutlined
            Label={'E-mail Address'}
            Title={
              'sanjeewaatukorale@srilankainsurance.com'
            }></SquareTextBoxOutlined>

          <SquareTextBoxOutlined
            Label={'Mobile Number'}
            Title={'0702566986'}></SquareTextBoxOutlined>

          <SquareTextBoxOutlined
            Label={'Contact Number'}
            Title={'(45)345 5233'}></SquareTextBoxOutlined>
        </View>

        {/* Settings & Logout */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.option}>
            <Octicons name="gear" color={COLORS.primaryGreen} size={20} />
            <Text style={styles.optionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.option}>
            <MaterialCommunityIcons
              name="logout"
              color={COLORS.primaryGreen}
              size={20}
            />
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

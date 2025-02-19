import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
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
import {useDispatch, useSelector} from 'react-redux';
import {GetprofileResponse} from '../../redux/services/ProfileSlice';

const window = Dimensions.get('window');

const pictureSize = Math.min(window.width * 0.35, window.height * 0.35); // Use the smaller value

export default function Profile({navigation}) {
  const dispatch = useDispatch;
  const profileResponse = useSelector(
    state => state.Profile.profileResponse.data,
  );

  // API Binds
  const name = profileResponse?.name;
  const regionName = profileResponse?.regionName;
  const designation = profileResponse?.designation;
  const imageUrl = profileResponse?.imageUrl;
  const personalCode = profileResponse?.personalCode;
  const nic = profileResponse?.nic;
  const email = profileResponse?.email;
  const phone = profileResponse?.phone;
  const contact = profileResponse?.contact;
  const totalNumberofBranches = profileResponse?.Summery.totalNumberofBranches;
  const status = profileResponse?.status;
  const agentCode = profileResponse?.agentCode;

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Profile" onPress={() => navigation.goBack()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={20}
        contentContainerStyle={{paddingHorizontal: 13}}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Avatar.Image size={pictureSize} source={{uri: imageUrl}} />
            <TouchableOpacity style={styles.editIcon}>
              <Feather name="edit-3" color={COLORS.black} size={20} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileRole}>{designation}</Text>
        </View>

        {/* Profile Form */}
        <View style={styles.formContainer}>
          <View style={styles.activeWrap}>
            <Text style={styles.activeDot}>•</Text>
            <Text style={styles.activeStatus}>{status}</Text>
          </View>

          <SquareTextBoxOutlined
            Label={'Agent Code'}
            value={agentCode?.toString() ?? ''}
          />

          <SquareTextBoxOutlined
            Label={'Personal Code'}
            value={personalCode?.toString() ?? ''}></SquareTextBoxOutlined>

          <SquareTextBoxOutlined
            Label={'NIC Number'}
            value={nic?.toString() ?? ''}></SquareTextBoxOutlined>

          <SquareTextBoxOutlined
            Label={'E-mail Address'}
            value={email?.toString() ?? ''}></SquareTextBoxOutlined>

          <SquareTextBoxOutlined
            Label={'Mobile Number'}
            value={phone?.toString() ?? ''}></SquareTextBoxOutlined>

          <SquareTextBoxOutlined
            Label={'Contact Number'}
            value={contact?.toString() ?? ''}></SquareTextBoxOutlined>
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

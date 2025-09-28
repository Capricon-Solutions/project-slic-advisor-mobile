import React, { useEffect, useState } from 'react';
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
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import LoaderKit from 'react-native-loader-kit';

import {
  GetprofileResponse,
  SetdefaultImageUrl,
} from '../../redux/services/ProfileSlice';
import { pick, types } from '@react-native-documents/picker';
import RNFS from 'react-native-fs';
import {
  useAddImageMutation,
  useGetImageQuery,
  useGetImageUrlQuery,
  useLazyGetImageUrlQuery,
} from '../../redux/services/profilePicSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

const window = Dimensions.get('window');
const pictureSize = Math.min(window.width * 0.35, window.height * 0.35); // Use the smaller value

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const usertype = useSelector(state => state.userType.userType);
  const userCode = useSelector(state => state.Profile.userCode);
  const profile = useSelector(state => state.Profile.profile);
  const profileResponse = profile?.user;
  const defaultImageUrl = useSelector(state => state.Profile.defaultImageUrl);
  const [image, setImage] = useState();
  const [imageUri, setImageUri] = useState(null);
  const [
    uploadImage,
    { data: uploadedImage, error: uploadError, isLoading: isUploading },
  ] = useAddImageMutation();

  const {
    data: ProfilePic,
    error,
    isLoading,
  } = useGetImageQuery({
    id: userCode,
  });

  const handleUpload = async uri => {
    const agencyCode = userCode;
    const imageFile = uri;
    try {
      const response = await uploadImage({ agencyCode, imageFile }).unwrap();
    } catch (err) {
      console.error('Image upload failed:', err);
    }
  };

  const attachmentPicker = async () => {

    try {
      const [result] = await pick({
        mode: 'open',
        allowMultiSelection: false,
        type: types.images,
        quality: 0.4,
      });
      setImage(result.uri);

      const uri = result;
      handleUpload(uri);
    } catch (err) {
      // see error handling
    }
  };

  // API Binds
  const name = profileResponse?.firstName;

  const regionName = profileResponse?.region;
  const designation = profileResponse?.designation;
  const imageUrl = profileResponse?.imageUrl;
  const personalCode = profileResponse?.personalCode;
  const nic = profileResponse?.nic;
  const email = profileResponse?.email;
  const phone = profileResponse?.mobileNumber;
  const contact = profileResponse?.residentNumber;
  // const totalNumberofBranches = profileResponse?.Summery.totalNumberofBranches;
  const status = profileResponse?.status;
  const agentCode = profileResponse?.userCode;

  const getInitials = name => {
    return name
      ?.split(' ') // Split by space
      .map(word => word.charAt(0).toUpperCase()) // Get first letter and uppercase
      .join(''); // Join them together
  };

  async function handleLogout() {
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('password');
    await AsyncStorage.removeItem('loggedIn');

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'NavigateToAuthStack' }],
      }),
    );
  }

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Profile" onPress={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={20}
        contentContainerStyle={{ paddingHorizontal: 13 }}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            {defaultImageUrl ? (
              <View>
                <Avatar.Image
                  style={{ backgroundColor: COLORS.lightBorder }}
                  size={pictureSize}
                  source={{ uri: defaultImageUrl }}
                />
                {isUploading && (
                  <View
                    style={{
                      borderRadius: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      height: pictureSize,
                      width: pictureSize,
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    }}>
                    <LoaderKit
                      style={{ width: 30, height: 30 }}
                      name={'LineScalePulseOutRapid'} // Optional: see list of animations below
                      color={COLORS.grayText} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
                    />
                  </View>
                )}
              </View>
            ) : (
              <Avatar.Text
                label={getInitials(name)}
                size={pictureSize}
                style={{ backgroundColor: COLORS.primary }}
              />
            )}
            <TouchableOpacity
              disabled={isUploading}
              style={[
                styles.editIcon,
                { backgroundColor: isUploading ? COLORS.modalBorder : '#B8E4E7' },
              ]}
              onPress={() => attachmentPicker()}>
              <Feather name="edit-3" color={COLORS.black} size={20} />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileRole}>
            {usertype == 1
              ? 'Advisor'
              : usertype == 2
                ? 'Team Leader'
                : usertype == 3
                  ? 'Regional Manager'
                  : usertype == 4
                    ? 'Branch Manager'
                    : usertype == 5
                      ? 'Marketing executive'
                      : 'Unknown'}
          </Text>
        </View>

        {/* Profile Form */}
        <View style={styles.formContainer}>
          <View style={styles.activeWrap}>
            <Text style={styles.activeDot}>•</Text>
            <Text style={styles.activeStatus}>{status}</Text>
          </View>

          <SquareTextBoxOutlined
            Label={
              usertype == 3
                ? 'Region Code'
                : usertype == 4
                  ? 'Branch Code'
                  : 'Agent Code'
            }
            value={agentCode?.toString() || 'Unavailable'}
            readOnly={true}
          />
          {usertype !== 4 && (
            <SquareTextBoxOutlined
              Label={'Personal Code'}
              readOnly={true}
              value={
                personalCode?.toString() || 'Unavailable'
              }></SquareTextBoxOutlined>
          )}

          <SquareTextBoxOutlined
            Label={'NIC Number'}
            readOnly={true}
            value={nic?.toString() || 'Unavailable'}></SquareTextBoxOutlined>

          <SquareTextBoxOutlined
            Label={'E-mail Address'}
            readOnly={true}
            value={email?.toString() || 'Unavailable'}></SquareTextBoxOutlined>

          <SquareTextBoxOutlined
            Label={'Mobile Number'}
            readOnly={true}
            value={phone?.toString() || 'Unavailable'}></SquareTextBoxOutlined>

          <SquareTextBoxOutlined
            Label={'Contact Number'}
            readOnly={true}
            value={
              contact?.toString() || 'Unavailable'
            }></SquareTextBoxOutlined>
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
            onPress={() => handleLogout()}
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

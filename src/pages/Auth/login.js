import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Checkbox } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg';
import Logo from '../../icons/Logo.png'; // Replace with the actual logo path
import COLORS from '../../theme/colors';
import SquareTextBox from '../../components/SquareTextBox';
import Button from '../../components/Button';
import Fonts from '../../theme/Fonts';
import HeaderBackground from '../../components/HeaderBackground';
import AboutModal from '../../components/AboutModal';
import { styles } from './styles';
import {
  useChangePasswordMutation,
  useGetHelpQuery,
  useUserLoginMutation,
} from '../../redux/services/loginSlice';
import { showToast } from '../../components/ToastMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import {
  GetprofileResponse,
  SetPersonalCode,
  Setprofile,
  Settoken,
  SetUserCode,
} from '../../redux/services/ProfileSlice';
import { CommonActions } from '@react-navigation/native';
import { GetuserType, SetagentCode } from '../../redux/services/userTypeSlice';
import ForgotPasswordModal from '../../components/ForgotPasswordModal';

const window = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const { data: help, isLoading, error } = useGetHelpQuery();

  useEffect(() => {
    const loadUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedPassword = await AsyncStorage.getItem('password');

        if (storedUsername) {
          setUsername(storedUsername);
          setPassword(storedPassword);
          setRememberMe(true);
        } else {
          setRememberMe(false);
        }
      } catch (error) {
        console.error('Error loading username:', error);
      }
    };

    loadUsername();
  }, []);

  const [userLogin, { isLoading: loginLoading, error: loginError, data }] =
    useUserLoginMutation();

  function navigator() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'NavigateToAppStack' }],
      }),
    );
  }

  function userManagement(response) {
    dispatch(SetUserCode(response?.user?.userCode));
    dispatch(SetPersonalCode(response?.user?.personalCode));
    dispatch(Settoken(response?.token));

    if (response?.user?.userType == 'A') {
      dispatch(GetuserType(1));
      navigator();
    } else if (response?.user?.userType == 'O') {
      dispatch(GetuserType(2));
      navigator();
    } else if (response?.user?.userType == 'M') {
      dispatch(GetuserType(5));
      navigator();
    } else if (response?.user?.userType == 'S') {
      dispatch(GetuserType(4));
      navigator();
    } else if (response?.user?.userType == 'R') {
      dispatch(GetuserType(3));
      navigator();
    } else {
      Alert.alert('User Role Issue', 'Cant find matching user role.');
    }
  }
  const handleSubmit = async () => {
    const body = {
      Username: username,
      Password: password,
    };

    try {
      const response = await userLogin(body).unwrap();
      dispatch(Setprofile(response));
      savePassword(response);
    } catch (err) {
      console.error('Login failed:', err);
      setErrorShow(true);
      showToast({
        type: 'error',
        text1: 'Login Failed',
        text2: err?.data?.error || 'Something went wrong.',
      });
    }
  };

  async function savePassword(response) {
    try {
      if (!rememberMe) {
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('password');

        userManagement(response);
      } else {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        userManagement(response);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      {/* Rectangle with Curved Bottom */}

      <AboutModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={help?.data}
      />

      <ForgotPasswordModal
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
        data={help?.data}
      />

      <HeaderBackground />
      {/* Logo */}
      <Image source={Logo} style={styles.logo} />

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome Back!</Text>
      <Text style={styles.subText}>
        Your dashboard is ready, and your updates {'\n'}are waiting.
      </Text>
      <View style={{ marginVertical: 5, width: '100%' }}>
        <SquareTextBox
          Title={'Username'}
          value={username}
          errorBorder={errorShow}
          setValue={text => {
            if (text.length <= 15) {
              setUsername(text);
              setErrorShow(false);
            }
          }}
        />
      </View>

      <View style={{ marginVertical: 5, width: '100%' }}>
        <SquareTextBox
          Title={'Enter Password '}
          Secure={true}
          value={password}
          errorBorder={errorShow}
          setValue={text => {
            if (text.length <= 15) {
              setPassword(text);
              setErrorShow(false);
            }
          }}></SquareTextBox>
      </View>

      {/* Remember Me and Forgot Password */}
      <View style={[styles.row, {}]}>
        <TouchableOpacity
          onPress={() => {
            setRememberMe(!rememberMe);
          }}
          style={styles.rememberMe}>
          <View style={{ position: 'relative' }}>
            {Platform.OS === 'ios' && (
              <View
                style={{
                  width: 21,
                  height: 21,
                  borderRadius: 2.5,
                  borderWidth: 2.2,
                  borderColor: rememberMe ? COLORS.primary : COLORS.subtext,
                  position: 'absolute',
                  alignSelf: 'center',
                  top: '50%',
                  transform: [{ translateY: -10.5 }],
                }}></View>
            )}

            <Checkbox
              uncheckedColor={COLORS.subtext}
              color={COLORS.primary}
              status={rememberMe ? 'checked' : 'unchecked'}
              onPress={() => {
                setRememberMe(!rememberMe);
              }}
            />
          </View>

          <Text style={styles.checkboxLabel}>Remember Me</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible2(true)}>
          <Text style={styles.forgotPassword}>Forgot Password ?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Button
          isLoading={loginLoading}
          onPress={() => handleSubmit()}
          Title={'SIGN IN'}></Button>
      </View>

      <View>
        <Text style={styles.bottomText}>
          Having trouble logging in?{' '}
          <Text onPress={() => setModalVisible(true)} style={styles.hyperlink}>
            Click here
          </Text>{' '}
          for help.
        </Text>
      </View>
      {/* {errorShow &&
        <View style={{ paddingTop: 10, }}>
          <Text style={{ color: COLORS.primaryRed, fontFamily: Fonts.Roboto.SemiBold, fontSize: 13 }}>
            Invalid credentials. Please try again.
          </Text>
        </View>
      } */}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
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
import { useGetHelpQuery, useUserLoginMutation } from '../../redux/services/loginSlice';
import { showToast } from '../../components/ToastMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { GetprofileResponse, Setprofile } from '../../redux/services/ProfileSlice';
import { CommonActions } from '@react-navigation/native';

// const { width } = Dimensions.get('window');
const window = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const { data: help, isLoading, error } = useGetHelpQuery();

  // Comment this in apk release
  // useEffect(() => {
  //   setTimeout(async () => {
  //     const storedUsername = await AsyncStorage.getItem("username");
  //     const storedPassword = await AsyncStorage.getItem("password");
  //     setUsername(storedUsername);
  //     setPassword(storedPassword);
  //     console.log("username", username);
  //     console.log("password", password);
  //     if (username !== '' && password !== '') {
  //       handleSubmit()
  //     }

  //   }, 2000);
  // }, [username, password])
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate('TypeTest');
  //   }, 500);
  // }, [])



  useEffect(() => {
    const loadUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedPassword = await AsyncStorage.getItem("password");

        console.log("username", storedUsername)
        if (storedUsername) {
          setUsername(storedUsername);
          setPassword(storedPassword);
          setRememberMe(true);
        } else {
          setRememberMe(false);
        }
      } catch (error) {
        console.error("Error loading username:", error);
      }
    };

    loadUsername();

  }, [username]);


  // console.log('help:', help);
  // const handleLogin = () => {
  //   console.log('help:', help);
  //   console.log('Password:', password);
  // };
  const [userLogin, { isLoading: loginLoading, error: loginError, data }] = useUserLoginMutation();

  const handleSubmit = async () => {
    // e.preventDefault(); // Uncomment if you are using it inside a form

    const body = {
      Username: username,
      Password: password,
    };

    console.log("Request body:", body);

    try {
      // Trigger userLogin mutation and get the response
      const response = await userLogin(body).unwrap();

      // Log the API response
      console.log('Login successful! Response:', response?.User);
      dispatch(Setprofile(response));
      savePassword();
      // Handle success (e.g., navigation, storing JWT token, etc.)

    } catch (err) {
      // Handle error (e.g., showing error message)
      console.error('Login failed:', err);
      setErrorShow(true);
      showToast({
        type: 'error',
        text1: 'Failed',
        text2: err?.data?.Message || 'Something went wrong.',
      });

    }
  };

  async function savePassword() {
    try {
      if (!rememberMe) {
        // console.log("save password"),
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("password");
        navigation.navigate('TypeTest');
      } else {
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("password", password);
        // await AsyncStorage.setItem("loggedIn", true);

        navigation.navigate("TypeTest");
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: 'AppStack' }],
        //   })
        // );
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }


  }

  return (
    <View style={styles.container}>
      {/* Rectangle with Curved Bottom */}

      <AboutModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
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
      {/* <Text>{username}</Text> */}
      <View style={{ marginVertical: 5, width: '100%' }}>
        <SquareTextBox Title={'Username'}
          value={username}
          errorBorder={errorShow}
          setValue={text => {
            setUsername(text);

            setErrorShow(false);
          }}></SquareTextBox>
      </View>

      <View style={{ marginVertical: 5, width: '100%' }}>
        <SquareTextBox Title={'Enter Password '}
          Secure={true}
          value={password}
          errorBorder={errorShow}
          setValue={text => {
            setPassword(text);
            setErrorShow(false);
          }}></SquareTextBox>
      </View>

      {/* Remember Me and Forgot Password */}
      <View style={styles.row}>
        <View style={styles.rememberMe}>
          <Checkbox
            uncheckedColor={COLORS.subtext}
            color={COLORS.primary}
            status={rememberMe ? 'checked' : 'unchecked'}
            onPress={() => {
              setRememberMe(!rememberMe);

            }}
          />
          <Text style={styles.checkboxLabel}>Remember Me</Text>
        </View>
        <TouchableOpacity>
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

    </View>
  );
};

export default LoginScreen;

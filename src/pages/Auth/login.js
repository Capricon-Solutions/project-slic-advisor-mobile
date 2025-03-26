import React, { useState } from 'react';
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

// const { width } = Dimensions.get('window');
const window = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { data: help, isLoading, error } = useGetHelpQuery();
  // console.log('help:', help);
  const handleLogin = () => {
    console.log('help:', help);
    console.log('Password:', password);
  };
  const [userLogin, { isLoading: loginLoading, error: loginError, data }] = useUserLoginMutation();

  const handleSubmit = async (e) => {
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
      console.log('Login successful! Response:', response);

      // Handle success (e.g., navigation, storing JWT token, etc.)
      navigation.navigate('TypeTest');
    } catch (err) {
      // Handle error (e.g., showing error message)
      console.error('Login failed:', err);
      showToast({
        type: 'error',
        text1: 'Failed',
        text2: err?.data?.Message || 'Something went wrong.',
      });
    }
  };

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
      <Text>{username}</Text>
      <View style={{ marginVertical: 5, width: '100%' }}>
        <SquareTextBox Title={'Username'}
          setValue={text => setUsername(text)}></SquareTextBox>
      </View>

      <View style={{ marginVertical: 5, width: '100%' }}>
        <SquareTextBox Title={'Enter Password '} Secure={true} setValue={text => setPassword(text)}></SquareTextBox>
      </View>

      {/* Remember Me and Forgot Password */}
      <View style={styles.row}>
        <View style={styles.rememberMe}>
          <Checkbox
            uncheckedColor={COLORS.subtext}
            color={COLORS.primary}
            status={rememberMe ? 'checked' : 'unchecked'}
            onPress={() => setRememberMe(!rememberMe)}
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
    </View>
  );
};

export default LoginScreen;

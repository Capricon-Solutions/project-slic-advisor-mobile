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
import { Styles } from '../../theme/Styles';
import Fonts from '../../theme/Fonts';
import HeaderBackground from '../../components/HeaderBackground';

// const { width } = Dimensions.get('window');
const window = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      {/* Rectangle with Curved Bottom */}

      <HeaderBackground />
      {/* Logo */}
      <Image source={Logo} style={styles.logo} />

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome Back!</Text>
      <Text style={styles.subText}>
        Your dashboard is ready, and your updates {'\n'}are waiting.
      </Text>



      <SquareTextBox
        Title={"Username"}
      ></SquareTextBox>

      <SquareTextBox
        Title={"Enter Password "}
      ></SquareTextBox>

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
          onPress={() => navigation.navigate("AgentNavigator")}
          Title={"SIGN IN"}
        >
        </Button>
      </View>

      <View>
        <Text style={Styles.bottomText}>Having trouble logging in? <Text style={Styles.hyperlink}>Click here</Text> for help.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  topBackground: {
    position: 'absolute',
    paddingTop: 0,
    marginTop: 0,
    top: 0,
  },
  logo: {
    width: 110,
    marginTop: 20,
    height: 110,
    resizeMode: 'contain',
    // marginTop: 0, // Adjust to position the logo below the curve
  },
  welcomeText: {
    fontSize: 25,
    fontFamily: Fonts.Roboto.Bold,
    textAlign: 'center',
    marginTop: 16,
    color: COLORS.title
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.subtitle,
    marginBottom: 10,
    marginTop: 10,
    fontFamily: Fonts.Roboto.SemiBold,
  },
  input: {
    backgroundColor: "red",
    borderRadius: 5,
    paddingLeft: 0,
    fontWeight: 'bold',
    color: "red",
    // marginVertical: 10,
    height: 43,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    marginTop: 10
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  forgotPassword: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.primary,
    // textDecorationLine: 'underline',
  },
  loginButton: {
    width: '85%',
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
});

export default LoginScreen;

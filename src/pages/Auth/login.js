import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {TextInput, Checkbox} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
import Logo from '../../icons/Logo.png'; // Replace with the actual logo path
import COLORS from '../../theme/colors';
import SquareTextBox from '../../components/SquareTextBox';
import Button from '../../components/Button';
import Fonts from '../../theme/Fonts';
import HeaderBackground from '../../components/HeaderBackground';
import AboutModal from '../../components/AboutModal';
import {styles} from './styles';

// const { width } = Dimensions.get('window');
const window = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      {/* Rectangle with Curved Bottom */}

      <AboutModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <HeaderBackground />
      {/* Logo */}
      <Image source={Logo} style={styles.logo} />

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome Back!</Text>
      <Text style={styles.subText}>
        Your dashboard is ready, and your updates {'\n'}are waiting.
      </Text>

      <View style={{marginVertical: 5, width: '100%'}}>
        <SquareTextBox Title={'Username'}></SquareTextBox>
      </View>

      <View style={{marginVertical: 5, width: '100%'}}>
        <SquareTextBox Title={'Enter Password '} Secure={true}></SquareTextBox>
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
      <View style={{width: '100%', alignItems: 'center'}}>
        <Button
          onPress={() => navigation.navigate('AgentNavigator')}
          Title={'Sign In'}></Button>
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

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
import {useDispatch} from 'react-redux';
import {GetuserType} from '../../redux/services/userTypeSlice';

// const { width } = Dimensions.get('window');
const window = Dimensions.get('window');

const TypeTest = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text> Testing purpose</Text>
        <Text
          style={{
            fontFamily: Fonts.Roboto.Bold,
            color: COLORS.primaryGreen,
            fontSize: 18,
            marginVertical: 10,
          }}>
          Select User type
        </Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(GetuserType(1));
            navigation.navigate('AgentNavigator');
          }}
          style={{
            backgroundColor: COLORS.primary,
            height: 30,
            width: 120,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
          }}>
          <Text style={{color: COLORS.white, fontFamily: Fonts.Roboto.Bold}}>
            Agent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(GetuserType(2));
            navigation.navigate('AgentNavigator');
          }}
          style={{
            backgroundColor: COLORS.primaryGreen,
            height: 30,
            width: 120,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
          }}>
          <Text style={{color: COLORS.white, fontFamily: Fonts.Roboto.Bold}}>
            Team Leader
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TypeTest;

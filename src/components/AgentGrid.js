import * as React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  Image,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
import Fonts from '../theme/Fonts';
import Button from './Button';
import SmallButton from './SmallButton';
import {Checkbox, Menu, Divider, PaperProvider} from 'react-native-paper';
import SALES_PERFORMANCE from '../icons/SALES_PERFORMANCE.png'; // Replace with the actual logo path
import GENERAL from '../icons/GENERAL.png'; // Replace with the actual logo path
import PRODUCT_PORTFOLIO from '../icons/PRODUCT_PORTFOLIO.png'; // Replace with the actual logo path
import E_CORNER from '../icons/E-CORNER.png'; // Replace with the actual logo path
import CLUB from '../icons/CLUB.png'; // Replace with the actual logo path
import B_PLANNER from '../icons/B-PLANNER.png'; // Replace with the actual logo path
// import { useSelector } from "react-redux";
const window = Dimensions.get('window');

export default function AgentGrid({}) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: window.height * 0.01,
        }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={Styles.iconGrid}>
          <Image style={Styles.gridIcon} source={SALES_PERFORMANCE}></Image>
          <Text style={Styles.gridText}>SALES PERFORMANCE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setgeneraModalVisible(true)}
          style={Styles.iconGrid}>
          <Image style={Styles.gridIcon} source={GENERAL}></Image>
          <Text style={Styles.gridText}>GENERAL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ClubInformation')}
          style={Styles.iconGrid}>
          <Image style={Styles.gridIcon} source={CLUB}></Image>
          <Text style={Styles.gridText}>CLUB</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('BPlanner')}
          // BPlanner
          style={Styles.iconGrid}>
          <Image style={Styles.gridIcon} source={B_PLANNER}></Image>
          <Text style={Styles.gridText}>B-PLANNER</Text>
        </TouchableOpacity>
        <View style={Styles.iconGrid}>
          <Image style={Styles.gridIcon} source={E_CORNER}></Image>
          <Text style={Styles.gridText}>E-CORNER</Text>
        </View>
        <TouchableOpacity
          style={Styles.iconGrid}
          onPress={() => navigation.navigate('ProductPortfolio')}>
          <Image style={Styles.gridIcon} source={PRODUCT_PORTFOLIO}></Image>
          <Text style={Styles.gridText}>PRODUCT PORTFOLIO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

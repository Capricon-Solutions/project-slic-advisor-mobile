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
import RegionSummery from '../icons/RegionSummery.png'; // Replace with the actual logo path
import KpiSummery from '../icons/KpiSummery.png'; // Replace with the actual logo path
import DuesSummery from '../icons/DuesSummery.png'; // Replace with the actual logo path
import ClassSummery from '../icons/ClassSummery.png'; // Replace with the actual logo path
import Competition from '../icons/Competition.png'; // Replace with the actual logo path
// import B_PLANNER from '../icons/B-PLANNER.png'; // Replace with the actual logo path
// import { useSelector } from "react-redux";
const window = Dimensions.get('window');

export default function RMGrid({
  onSalesClick,
  onGeneralClick,
  onClubClick,
  onBplannerClick,
  onEConnerClick,
  onProductPortfolioClick,
}) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: window.height * 0.01,
        }}>
        <TouchableOpacity onPress={onSalesClick} style={Styles.iconGrid}>
          <Image style={Styles.gridIcon} source={RegionSummery}></Image>
          <Text style={Styles.gridText}>Region{'\n'}Summary</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onGeneralClick} style={Styles.iconGrid}>
          <Image style={Styles.gridIcon} source={KpiSummery}></Image>
          <Text style={Styles.gridText}>KPI{'\n'}Summary</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClubClick} style={Styles.iconGrid}>
          <Image style={Styles.gridIcon} source={DuesSummery}></Image>
          <Text style={Styles.gridText}>DUES{'\n'}Summary</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 10,
        }}>
        <TouchableOpacity
          onPress={onBplannerClick}
          // BPlanner
          style={Styles.iconGrid}>
          <Image style={Styles.gridIcon} source={ClassSummery}></Image>
          <Text style={Styles.gridText}>Class{'\n'}Summary</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onEConnerClick} style={Styles.iconGrid}>
          <Image style={Styles.gridIcon} source={Competition}></Image>
          <Text style={Styles.gridText}>Competition</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={Styles.iconGrid}
          onPress={onProductPortfolioClick}>
          <Image style={Styles.gridIcon} source={PRODUCT_PORTFOLIO}></Image>
          <Text style={Styles.gridText}>PRODUCT PORTFOLIO</Text>
        </TouchableOpacity> */}
        <View style={[Styles.iconGrid, {elevation: 0}]}></View>
      </View>
    </View>
  );
}

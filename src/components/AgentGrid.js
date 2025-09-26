import * as React from 'react';
import {TouchableOpacity, Dimensions, Text, View, Image} from 'react-native';

import {Styles} from '../theme/Styles';
import SALES_PERFORMANCE from '../icons/SALES_PERFORMANCE.png'; // Replace with the actual logo path
import GENERAL from '../icons/GENERAL.png'; // Replace with the actual logo path
import PRODUCT_PORTFOLIO from '../icons/PRODUCT_PORTFOLIO.png'; // Replace with the actual logo path
import E_CORNER from '../icons/E-CORNER.png'; // Replace with the actual logo path
import CLUB from '../icons/CLUB.png'; // Replace with the actual logo path
import B_PLANNER from '../icons/B-PLANNER.png'; // Replace with the actual logo path
const window = Dimensions.get('window');

export default function AgentGrid({
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
          <Image style={Styles.gridIcon} source={SALES_PERFORMANCE}></Image>
          <Text style={Styles.gridText}>SALES PERFORMANCE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onGeneralClick} style={Styles.iconGrid}>
          <Image style={Styles.gridIcon} source={GENERAL}></Image>
          <Text style={Styles.gridText}>GENERAL</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClubClick} style={Styles.iconGrid}>
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
          onPress={onBplannerClick}
          // BPlanner
          style={Styles.iconGrid}>
          <Image style={Styles.gridIcon} source={B_PLANNER}></Image>
          <Text style={Styles.gridText}>B-PLANNER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onEConnerClick} style={Styles.iconGrid}>
          <Image style={Styles.gridIcon} source={E_CORNER}></Image>
          <Text style={Styles.gridText}>E-CORNER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.iconGrid}
          onPress={onProductPortfolioClick}>
          <Image style={Styles.gridIcon} source={PRODUCT_PORTFOLIO}></Image>
          <Text style={Styles.gridText}>PRODUCT PORTFOLIO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
import CircularProgress from 'react-native-circular-progress-indicator';

import Button from './Button';
import SmallButton from './SmallButton';
import {Checkbox, Menu, Divider, PaperProvider} from 'react-native-paper';
import RegionSummery from '../icons/RegionSummery.png'; // Replace with the actual logo path
import KpiSummery from '../icons/KpiSummery.png'; // Replace with the actual logo path
import DuesSummery from '../icons/DuesSummery.png'; // Replace with the actual logo path
import ClassSummery from '../icons/ClassSummery.png'; // Replace with the actual logo path
import Competition from '../icons/Competition.png'; // Replace with the actual logo path
import DropdownComponentNoLabel from './DropdownComponentNoLabel';
import DropdownComponentNoLabelDashboard from './DropdownComponentNoLabelDashboard';
// import B_PLANNER from '../icons/B-PLANNER.png'; // Replace with the actual logo path
// import { useSelector } from "react-redux";
const window = Dimensions.get('window');

export default function RMProgressCard({
  onPress,
  islandRank,
  totalIslandRank,
  totalNumberofRegions,
  totalNumberofBranches,
  branchRank,
  regionalRank,
  onSalesClick,
  onGeneralClick,
  onClubClick,
  onBplannerClick,
  onEConnerClick,
  onProductPortfolioClick,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={Styles.rankWrap}>
      <View
        style={{
          flex: 0.6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CircularProgress
          value={islandRank}
          radius={window.height * 0.1}
          duration={2000}
          progressValueColor={COLORS.textColor}
          maxValue={totalIslandRank}
          activeStrokeWidth={20}
          inActiveStrokeWidth={20}
          activeStrokeColor={COLORS.primary}
          inActiveStrokeColor={COLORS.lightBorder}
          valueSuffix={'/' + totalIslandRank}
          titleStyle={{fontWeight: 'bold'}}
          progressValueStyle={{
            fontSize: 25,
            fontFamily: Fonts.Roboto.Bold,
          }}
          valueSuffixStyle={{fontSize: 22, color: COLORS.textColor}}
        />
        {/* <Text
          style={{
            fontSize: window.width * 0.045,
            marginTop: 5,
            fontFamily: Fonts.Roboto.Medium,
            color: COLORS.textColor,
          }}>
          Island Rank
        </Text> */}
      </View>
      <View
        style={{
          flex: 0.4,
          alignItems: 'center',
          paddingHorizontal: 5,
        }}>
        <View
          style={{
            width: '90%',
            flex: 0.3,
            justifyContent: 'center',
          }}>
          <DropdownComponentNoLabelDashboard
            mode={'modal'}
            BorderColor={COLORS.textColor}
            // initialValue={BusinessType}
            placeholder="Monthly"
            // onSelect={value => setSelectedBType(value)}
            dropdownData={[
              {label: 'Monthly', value: 'Monthly'},
              {label: 'Cumulative', value: 'Cumulative'},
            ]}
          />
        </View>
        <View
          style={{
            width: '90%',
            flex: 0.35,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: COLORS.textColor,
              fontFamily: Fonts.Roboto.SemiBold,
              fontSize: 12,
              textAlign: 'center',
            }}>
            Achievement
          </Text>
          <Text
            style={{
              color: COLORS.textColor,
              fontFamily: Fonts.Roboto.SemiBold,
              fontSize: 11,
              textAlign: 'center',
            }}>
            LKR 10,847,358.18
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

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
import LoaderKit from 'react-native-loader-kit';

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

export default function AgentProgressCard({
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
  loading,
}) {
  return loading ? (
    <View
      style={[
        Styles.rankWrap,
        {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <LoaderKit
        style={{width: 50, height: 50}}
        name={'LineScalePulseOutRapid'} // Optional: see list of animations below
        color={COLORS.grayText} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
      />
    </View>
  ) : (
    <TouchableOpacity onPress={onPress} style={Styles.rankWrap}>
      <View
        style={{flex: 0.65, justifyContent: 'center', alignItems: 'center'}}>
        <CircularProgress
          value={islandRank || 0}
          radius={window.height * 0.1}
          duration={2000}
          progressValueColor={COLORS.textColor}
          maxValue={totalIslandRank}
          activeStrokeWidth={20}
          inActiveStrokeWidth={20}
          activeStrokeColor={COLORS.primary}
          inActiveStrokeColor={COLORS.lightBorder}
          valueSuffix={`/${totalIslandRank || 0}`}
          titleStyle={{fontWeight: 'bold'}}
          progressValueStyle={{fontSize: 20, fontFamily: Fonts.Roboto.Bold}}
          valueSuffixStyle={{fontSize: 20, color: COLORS.textColor}}
        />
        <Text
          style={{
            fontSize: window.width * 0.045,
            marginTop: 5,
            fontFamily: Fonts.Roboto.Medium,
            color: COLORS.textColor,
          }}>
          Island Rank
        </Text>
      </View>

      <View style={{flex: 0.35}}>
        {/* Regional Rank */}
        <View
          style={{flex: 0.5, justifyContent: 'flex-end', alignItems: 'center'}}>
          <CircularProgress
            value={regionalRank || 0}
            radius={window.height * 0.045}
            duration={2000}
            progressValueColor={COLORS.regionalRank}
            maxValue={totalNumberofRegions || 0}
            activeStrokeWidth={12}
            inActiveStrokeWidth={12}
            activeStrokeColor={COLORS.regionalRank}
            inActiveStrokeColor={COLORS.lightBorder}
            valueSuffix={`/${totalNumberofRegions || 0}`}
            progressValueStyle={{
              fontSize: window.height * 0.02,
              fontFamily: Fonts.Roboto.Bold,
            }}
            valueSuffixStyle={{
              fontSize: window.height * 0.016,
              color: COLORS.regionalRank,
              fontFamily: Fonts.Roboto.SemiBold,
            }}
            titleStyle={{fontWeight: 'bold'}}
          />
          <Text
            style={{
              marginTop: 2,
              fontSize: window.width * 0.03,
              fontFamily: Fonts.Roboto.Medium,
              color: COLORS.textColor,
            }}>
            Regional Rank
          </Text>
        </View>

        {/* Branch Rank */}
        <View
          style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress
            value={branchRank || 0}
            radius={window.height * 0.045}
            duration={2000}
            progressValueColor={COLORS.branchRank}
            maxValue={totalNumberofBranches || 0}
            activeStrokeWidth={12}
            inActiveStrokeWidth={12}
            activeStrokeColor={COLORS.branchRank}
            inActiveStrokeColor={COLORS.lightBorder}
            valueSuffix={`/${totalNumberofBranches || 0}`}
            progressValueStyle={{
              fontSize: window.height * 0.02,
              fontFamily: Fonts.Roboto.Bold,
            }}
            valueSuffixStyle={{
              fontSize: window.height * 0.016,
              color: COLORS.branchRank,
              fontFamily: Fonts.Roboto.SemiBold,
            }}
            titleStyle={{fontWeight: 'bold'}}
          />
          <Text
            style={{
              marginTop: 2,
              fontSize: window.width * 0.03,
              fontFamily: Fonts.Roboto.Medium,
              color: COLORS.textColor,
            }}>
            Branch Rank
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

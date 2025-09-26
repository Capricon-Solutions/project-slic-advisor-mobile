import * as React from 'react';
import {TouchableOpacity, Dimensions, Text, View} from 'react-native';

import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
import Fonts from '../theme/Fonts';
import CircularProgress from 'react-native-circular-progress-indicator';
import LoaderKit from 'react-native-loader-kit';

const window = Dimensions.get('window');

export default function AgentProgressCard({
  onPress,
  islandRank,
  totalIslandRank,
  totalNumberofRegions,
  totalNumberofBranches,
  branchRank,
  regionalRank,

  loading,
}) {
  const isDataIncomplete =
    !totalIslandRank || !totalNumberofRegions || !totalNumberofBranches;

  if (loading) {
    return (
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
          name={'LineScalePulseOutRapid'}
          color={COLORS.grayText}
        />
      </View>
    );
  }
  return (
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
          strokeLinecap="butt"
          inActiveStrokeWidth={20}
          activeStrokeColor={COLORS.primary}
          inActiveStrokeColor={COLORS.lightBorder}
          valueSuffix={`/${totalIslandRank || 0}`}
          titleStyle={{fontWeight: 'bold'}}
          progressValueStyle={{fontSize: 19, fontFamily: Fonts.Roboto.Bold}}
          valueSuffixStyle={{fontSize: 19, color: COLORS.textColor}}
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
            strokeLinecap="butt"
            activeStrokeColor={COLORS.regionalRank}
            inActiveStrokeColor={COLORS.lightBorder}
            valueSuffix={`/${totalNumberofRegions || 0}`}
            progressValueStyle={{
              fontSize: window.height * 0.018,
              fontFamily: Fonts.Roboto.Bold,
            }}
            valueSuffixStyle={{
              fontSize: window.height * 0.014,
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
            strokeLinecap="butt"
            inActiveStrokeWidth={12}
            activeStrokeColor={COLORS.branchRank}
            inActiveStrokeColor={COLORS.lightBorder}
            valueSuffix={`/${totalNumberofBranches || 0}`}
            progressValueStyle={{
              fontSize: window.height * 0.018,
              fontFamily: Fonts.Roboto.Bold,
            }}
            valueSuffixStyle={{
              fontSize: window.height * 0.014,
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

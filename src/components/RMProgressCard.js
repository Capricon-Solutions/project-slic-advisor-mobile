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
  Data,
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
  const [selectedType, setSelectedType] = React.useState('M');
  const DataSet = selectedType == 'M' ? Data?.monthly : Data?.cumulative;

  const calculateFontSize = (value, target) => {
    const valueDigits = value?.toString().length || 0;
    const targetDigits = target?.toString().length || 0;
    const totalDigits = targetDigits;
    // Base font size when digits are low
    let fontSize = 22;

    // Adjust font size based on total digits
    if (totalDigits <= 5) fontSize = 17;
    if (totalDigits >= 5) fontSize = 16;
    if (totalDigits >= 6) fontSize = 15;
    if (totalDigits >= 7) fontSize = 14;
    if (totalDigits >= 8) fontSize = 13;
    if (totalDigits >= 9) fontSize = 12;
    if (totalDigits >= 10) fontSize = 11;

    return fontSize;
  };
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
    <View onPress={onPress} style={Styles.rankWrap}>
      <View
        style={{
          flex: 0.6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CircularProgress
            value={DataSet?.achPresentage || 0}
            radius={window.height * 0.11}
            duration={2000}
            progressValueColor={COLORS.textColor}
            maxValue={100}
            showProgressValue={false}
            activeStrokeWidth={14}
            inActiveStrokeWidth={20}
            activeStrokeColor={COLORS.primary}
            inActiveStrokeColor={COLORS.lightBorder}
            valueSuffix={'/' + DataSet?.target || 0}
            titleStyle={{fontWeight: 'bold'}}
            progressValueStyle={{
              fontSize: calculateFontSize(
                DataSet?.achievement,
                DataSet?.target,
              ),
              fontFamily: Fonts.Roboto.Bold,
            }}
            valueSuffixStyle={{
              fontSize: calculateFontSize(
                DataSet?.achievement,
                DataSet?.target,
              ),
              color: COLORS.textColor,
            }}
          />

          {/* Centered Text */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              pointerEvents: 'none', // Allows touch events to pass through to CircularProgress
            }}>
            <Text
              style={{
                color: COLORS.textColor,
                fontSize: 13,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              Target
            </Text>
            <Text
              style={{
                color: COLORS.textColor,
                fontFamily: Fonts.Roboto.SemiBold,
                fontSize: calculateFontSize(
                  DataSet?.achievement,
                  DataSet?.target,
                ),
              }}>
              {' '}
              LKR{' '}
              {Number(DataSet?.target || 0).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>

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
            onSelect={value => setSelectedType(value)}
            dropdownData={[
              {label: 'Monthly', value: 'M'},
              {label: 'Cumulative', value: 'C'},
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
            LKR{' '}
            {(DataSet?.achievement || 0).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>
    </View>
  );
}

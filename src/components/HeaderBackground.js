import * as React from 'react';
import {TouchableOpacity, Dimensions, Text, View, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Svg, {Path} from 'react-native-svg';

import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
import Fonts from '../theme/Fonts';
const window = Dimensions.get('window');

// import { useSelector } from "react-redux";

export default function HeaderBackground({Title}) {
  return (
    <Svg
      height="35%" // Use 25% of the screen height
      width={window.width * 1} // Full width of the screen
      // viewBox={`0 0 ${window.width} 200`} // Dynamically set viewBox height
      style={Styles.topBackground}>
      <Path
        fill={COLORS.TopBackColor}
        d={`
					M0,0 
					H${window.width} 
					V230
					Q${window.width / 2},290 0,230 
					Z
				`}
      />
    </Svg>
  );
}

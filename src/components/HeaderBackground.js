import * as React from 'react';
import {Dimensions} from 'react-native';

import Svg, {Path} from 'react-native-svg';

import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
const window = Dimensions.get('window');

export default function HeaderBackground({Title}) {
  return (
    <Svg
      height="35%" // Use 25% of the screen height
      width={window.width} // Full width of the screen
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

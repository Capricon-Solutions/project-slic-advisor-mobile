import * as React from 'react';
import {TouchableOpacity, Dimensions, Text, View, Image} from 'react-native';

import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
import {TouchableRipple} from 'react-native-paper';

// import { useSelector } from "react-redux";

export default function Button({
  Title,
  onPress,
  disabledColor,
  disabledButton,
}) {
  return (
    <TouchableRipple
      disabled={disabledButton}
      onPress={onPress}
      style={[
        Styles.buttonStyle,
        {
          backgroundColor:
            disabledColor == true ? COLORS.textInputBackground : COLORS.primary,
        },
      ]}>
      <Text style={Styles.buttonText}>{Title}</Text>
    </TouchableRipple>
  );
}

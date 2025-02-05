import * as React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';

import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
import {TouchableRipple} from 'react-native-paper';
import Fonts from '../theme/Fonts';

// import { useSelector } from "react-redux";

export default function AlertButton({
  Title,
  onPress,
  disabledColor,
  disabledButton,
}) {
  return (
    <TouchableOpacity
      disabled={disabledButton}
      onPress={onPress}
      style={[
        styles.buttonStyle,
        {
          backgroundColor:
            disabledColor == true ? COLORS.textInputBackground : COLORS.primary,
        },
      ]}>
      <Text style={styles.buttonText}>{Title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 6,
    width: '100%',
    height: 36,
    justifyContent: 'center',
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14.5,
    fontFamily: Fonts.Roboto.Regular,
  },
});

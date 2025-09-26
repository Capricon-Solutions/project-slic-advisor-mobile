import * as React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import COLORS from '../theme/colors';

import Fonts from '../theme/Fonts';

export default function AlertButtonWhite({
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
            disabledColor == true ? COLORS.textInputBackground : COLORS.white,
        },
      ]}>
      <Text style={styles.buttonText}>{Title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.warmGray,
    paddingHorizontal: 15,
    height: 36,
    justifyContent: 'center',
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.textColor,
    fontSize: 14.5,
    fontFamily: Fonts.Roboto.Regular,
  },
});

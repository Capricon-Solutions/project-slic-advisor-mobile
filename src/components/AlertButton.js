import * as React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import COLORS from '../theme/colors';

import Fonts from '../theme/Fonts';
import LoaderKit from 'react-native-loader-kit';

export default function AlertButton({
  Title,
  onPress,
  disabledColor,
  isLoading,
  disabledButton,
}) {
  return (
    <TouchableOpacity
      disabled={disabledButton || isLoading}
      onPress={onPress}
      style={[
        styles.buttonStyle,
        {
          backgroundColor:
            disabledColor == true ? COLORS.warmGray : COLORS.primary,
        },
      ]}>
      {isLoading == true ? (
        <LoaderKit
          style={{width: 25, height: 25}}
          name={'BallPulse'} // Optional: see list of animations below
          color={COLORS.white} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
        />
      ) : (
        <Text style={styles.buttonText}>{Title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 6,
    paddingHorizontal: 15,
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

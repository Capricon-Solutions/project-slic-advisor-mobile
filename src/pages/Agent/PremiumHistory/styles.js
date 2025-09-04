import {StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
  detailText: {
    fontFamily: Fonts.Roboto.Regular,
    color: COLORS.grayText,
    fontSize: 13,
  },
  detailTextBold: {
    fontFamily: Fonts.Roboto.Bold,
    color: COLORS.textColor,
    fontSize: 13,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    elevation: 5,
      shadowOpacity: 0.2, // add opacity
            shadowRadius: 3,  // add blur radius
            shadowOffset: {
              width: 0,
              height: 3,
            },
    padding: 15,
    paddingHorizontal: window.width * 0.02,
    marginVertical: 8,
      shadowOpacity: 0.2, // add opacity
    shadowRadius: 3,  // add blur radius
     shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  border: {
    borderTopWidth: 1,
    borderColor: COLORS.primary,
    marginHorizontal: window.width * 0.09,
    marginVertical: 2,
  },
});

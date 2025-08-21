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
    color: COLORS.grayText,
    fontSize: 13,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    elevation: 9,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 8,
  },
});

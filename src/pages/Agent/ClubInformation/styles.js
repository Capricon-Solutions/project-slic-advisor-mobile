import {StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    elevation: 5,
    padding: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    marginVertical: 30,
  },
  noticeContainer: {
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 8,
    marginTop: 16,
    // marginHorizontal: 20,
  },
  noticeTitle: {
    color: COLORS.importantRed,
    fontSize: 12,
    fontFamily: Fonts.Roboto.SemiBold,
  },
  noticeText: {
    color: '#333',
    marginTop: 4,
    lineHeight: 15,
    fontSize: 12,
    color: COLORS.importantRed,
    fontFamily: Fonts.Roboto.SemiBold,
  },
});

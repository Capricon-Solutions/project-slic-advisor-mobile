import {StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
  mainWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    marginTop: 20,
  },
  searchWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
    flex: 1,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginVertical: 20,
    paddingLeft: 10,
    height: 44,
  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.Roboto.Regular,
    color: COLORS.grayText,
    alignSelf: 'center',
    fontSize: 12,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 11,
    paddingVertical: 5,
    paddingHorizontal: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

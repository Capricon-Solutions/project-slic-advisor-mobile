import { StyleSheet, Dimensions } from 'react-native';
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
    marginTop: 5,
    marginBottom: 10
  },
  searchWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginVertical: 7,
    paddingLeft: 10,
    height: 44,
  },
  motorRenewalCardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3
  },
  motorRenewalCardItemLeft: {

    fontFamily: Fonts.Roboto.Bold,
    color: COLORS.textColor,
    fontSize: 12
  },
  motorRenewalCardItemRight: {
    fontFamily: Fonts.Roboto.Regular,
    color: COLORS.textColor,
    fontSize: 12
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
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

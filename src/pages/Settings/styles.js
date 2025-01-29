import {StyleSheet, Dimensions} from 'react-native';
import Fonts from '../../theme/Fonts';
import COLORS from '../../theme/colors';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
  },
  topics: {
    fontFamily: Fonts.Roboto.Bold,
    color: COLORS.text,
    fontSize: 17,
    marginTop: 10,
  },
  conditionsWrap: {
    backgroundColor: COLORS.lightGreen,
    width: '62%',
    borderRadius: 11,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  condIconWrap: {
    margin: 2,
  },
  condText: {
    fontFamily: Fonts.Roboto.Medium,
    fontSize: 12,
    color: COLORS.textColor,
  },
});

import {StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
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
    paddingHorizontal: window.width * 0.05,
    marginBottom: 15,
    marginVertical: 30,
      shadowOpacity: 0.2, // add opacity
    shadowRadius: 3,  // add blur radius
     shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

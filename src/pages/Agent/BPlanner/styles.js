import { StyleSheet, Dimensions } from 'react-native';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
  // container: {
  //     flex: 1,
  //     backgroundColor: COLORS.background,
  //     paddingHorizontal: 20,
  // },
  smallButton: {
    backgroundColor: '#00796B',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 17,

    alignItems: 'center',
    gap: 3,
    height: 30,
    borderRadius: 6,
  },
  leadInfoCard: {
    backgroundColor: COLORS.white,
    elevation: 10,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  orangeButton: {
    backgroundColor: COLORS.primaryOrange,
    height: 30,
    width: 30,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    borderRadius: 6,
  },
  grayButton: {
    backgroundColor: COLORS.warmGray,
    height: 30,
    width: 30,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    borderRadius: 6,
  },
  smallButtonText: {
    color: '#fff',
    fontSize: window.width * 0.03,
    fontFamily: Fonts.Roboto.Medium,
  },
  closeButton: {
    position: 'absolute',
    top: 13,
    right: 13,
    borderRadius: 15,
    padding: 2,
    backgroundColor: COLORS.lightBorder,
  },
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
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrap: {
    padding: 15,

    backgroundColor: COLORS.trainingCard,
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});

import {StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';

const window = Dimensions.get('window');
const squareSize = Math.min(window.width * 0.09, window.height * 0.09); // Use the smaller value

export const styles = StyleSheet.create({
  monthlyCard: {
    backgroundColor: COLORS.primary,
    height: 24,
    marginVertical: 12,
    marginRight: 25,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  monthlyText: {
    fontSize: 14,
    color: COLORS.white,
    fontFamily: Fonts.Roboto.SemiBold,
  },
  monthlyChart: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: COLORS.islandRank,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  monthlyPercentage: {
    fontFamily: Fonts.Roboto.Bold,
    fontSize: 24,
    color: COLORS.black,
  },
  monthlyAmount: {
    backgroundColor: COLORS.white,
    height: 24,
    marginVertical: '3%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achivemantSubCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardText: {
    fontSize: window.width * 0.032,
    fontFamily: Fonts.Roboto.Regular,
    color: COLORS.black,
  },
  cardIcon: {
    backgroundColor: COLORS.primaryGreen,
    height: squareSize,
    width: squareSize,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardiconimage: {
    height: 18,
    width: 18,
  },
  cardValue: {
    fontSize: window.width * 0.034,
    fontFamily: Fonts.Roboto.Bold,
    color: COLORS.black,
  },
  monthlyCardWrap: {
    flex: 0.5,
    backgroundColor: COLORS.white,
    elevation: 0,
    margin: 4,
    borderRadius: 15,
  },
  achivemantTopCard: {
    backgroundColor: COLORS.white,
    elevation: 0,
    flex: 0.5,
    marginBottom: 3,
    borderRadius: 15,
  },
  achivemantBottomCard: {
    backgroundColor: COLORS.white,
    elevation: 0,
    flex: 0.5,
    marginTop: 3,
    borderRadius: 15,
  },
});

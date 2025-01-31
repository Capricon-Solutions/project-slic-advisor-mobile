import {StyleSheet, Dimensions} from 'react-native';
import COLORS from './colors';
import Fonts from './Fonts';

const window = Dimensions.get('window');

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  // Login

  imageBackground: {
    flex: 1,
    padding: window.width * 0.055,
    height: Dimensions.get('window').height,
  },
  checkboxContainer: {
    borderWidth: 2,
    borderColor: 'red', // Default border color
    borderRadius: 4,
  },
  checkedBorder: {
    borderColor: 'green', // Border color when checked
  },

  // Login page
  textInput: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 5,
    paddingLeft: 0,
    fontWeight: 'bold',
    color: COLORS.textInputText,
    height: 50,
  },
  topBackground: {
    position: 'absolute',
    paddingTop: 0,
    marginTop: 0,
    top: 0,
  },
  squaretextInput: {
    borderColor: COLORS.borderColor,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    color: COLORS.textInputColor,
    height: 45,
    marginTop: 5,
    width: '100%',
  },
  bottomText: {
    fontSize: 12,
    fontFamily: Fonts.Roboto.SemiBold,
  },
  blackButton: {
    marginVertical: 6,
    backgroundColor: 'black',
    flexDirection: 'row',
    height: 40,
    width: 220,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackButtonText: {
    color: 'white',
    fontSize: 12.5,
  },
  forgotPasswordText: {
    color: COLORS.forgotPasswordText,
    fontSize: 12.5,
  },
  hyperlink: {
    color: COLORS.primary,
  },
  underlineStyleHighLighted: {
    borderColor: COLORS.primaryColor,
  },

  underlineStyleBase: {
    width: window.width * 0.135,
    height: window.width * 0.135,
    borderWidth: 0,
    fontFamily: Fonts.Bold,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderRadius: 8,
    fontSize: window.width * 0.048,
    color: COLORS.primaryColor,
  },
  buttonStyle: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 8,
    width: '100%',
    height: 45,
    fontFamily: Fonts.Roboto.Bold,
    justifyContent: 'center',
    marginVertical: 10,
    alignItems: 'center',
  },
  smallButtonStyle: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: 8,
    width: '100%',
    height: 38,
    fontFamily: Fonts.Roboto.Bold,
    justifyContent: 'center',
    marginVertical: 8,
    alignItems: 'center',
  },
  squarebuttonStyle: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 6,
    height: 45,
    fontStyle: 'normal',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    marginVertical: 15,
  },
  addPlantButtonStyle: {
    backgroundColor: COLORS.lightGreen,
    borderRadius: 5,
    height: 43,
    width: 195,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.Roboto.Bold,
  },

  // Dashboard

  iconGrid: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
    height: 100,
    width: 100,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridText: {
    fontSize: 10,
    textAlign: 'center',
    color: COLORS.primary,
    fontFamily: Fonts.Roboto.Regular,
    marginTop: 5,
  },
  gridIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  rankWrap: {
    borderRadius: 20,
    backgroundColor: COLORS.white,
    height: 227,
    marginVertical: 20,
    elevation: 3,
    marginBottom: 40,
    overflow: 'hidden',
    flexDirection: 'row',
  },

  // contact List Item

  itemcontentBorder: {
    marginBottom: 10,
    borderTopWidth: 1,
    borderColor: COLORS.lightBorder,
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
  },
  itemcontentTitile: {
    fontFamily: Fonts.Roboto.Medium,
    fontSize: 14,
    color: COLORS.title,
    marginBottom: 6,
  },
  itemcontentdata: {
    fontFamily: Fonts.Roboto.Regular,
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 3,
  },
  contactlistWrap: {
    backgroundColor: COLORS.white,
    marginVertical: 8,
    alignItems: 'center',
    paddingHorizontal: 18,
    justifyContent: 'space-between',
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  departmentListWrap: {
    backgroundColor: COLORS.background,
    marginVertical: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: '#000',
    height: 111,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // borderWidth: 1,
    // borderColor: COLORS.lightBorder,
    elevation: 3,
  },
  noticeContainer: {
    backgroundColor: COLORS.yellow,
    padding: 20,
    borderRadius: 8,
    marginTop: 16,
    marginHorizontal: 20,
  },
  noticeTitle: {
    color: COLORS.importantRed,
    fontSize: 12,
    fontFamily: Fonts.Roboto.Regular,
  },
  noticeText: {
    color: '#333',
    marginTop: 4,
    fontSize: 12,
    color: COLORS.black,
    fontFamily: Fonts.Roboto.Regular,
  },
});

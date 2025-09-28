import { StyleSheet, Dimensions, Platform } from 'react-native';
import COLORS from './colors';
import Fonts from './Fonts';

const window = Dimensions.get('window');
const squareSize = Math.min(window.width * 0.233, window.height * 0.133); // Use the smaller value
const textSize = Math.min(window.width * 0.024, window.height * 0.024); // Use the smaller value
const iconSize = Math.min(window.width * 0.06, window.height * 0.06); // Use the smaller value
export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Login
  customTheme: {
    colors: {
      primary: COLORS.ashBlue, // Text color for the input
      background: 'white', // Background color in light mode
      surface: 'white', // Surface color
      text: COLORS.ashBlue, // Text color in input
      placeholder: COLORS.ashBlue, // Placeholder text color
      outline: COLORS.lightBorder, // Outline color
    },
  },
  errorText: {
    textAlign: 'center',
    fontFamily: Fonts.Roboto.Bold,
    color: COLORS.primaryRed,
    fontSize: 16,
  },
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
    color: COLORS.textColor,
    height: 48,
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
    height: 43,
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
    marginVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 7,
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
    fontSize: window.width * 0.0358,
    fontFamily: Fonts.Roboto.SemiBold,
  },
  smallbuttonText: {
    color: 'white',
    fontSize: window.width * 0.034,
    fontFamily: Fonts.Roboto.SemiBold,
  },
  // Dashboard

  iconGrid: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
    height: squareSize,
    width: squareSize,
    padding: 5,
    elevation: 7,
    shadowOpacity: 0.2, // add opacity
    shadowRadius: 3, // add blur radius
    shadowOffset: {
      width: 0,
      height: 3,
    },
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridText: {
    fontSize: textSize,
    textAlign: 'center',
    color: COLORS.primary,
    fontFamily: Fonts.Roboto.Medium,
    marginTop: 5,
  },
  gridIcon: {
    height: iconSize,
    width: iconSize,
    resizeMode: 'contain',
  },
  rankWrap: {
    borderRadius: 20,
    backgroundColor: COLORS.white,
    height: window.height * 0.29,
    marginVertical: window.height * 0.02,
    elevation: 10,
    shadowOpacity: 0.2, // add opacity
    shadowRadius: 3, // add blur radius
    shadowOffset: {
      width: 0,
      height: 3,
    },
    // overflow: 'hidden',
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
    color: COLORS.grayText,
    marginBottom: 3,
    marginLeft: 3,
  },
  itemcontactdata: {
    fontFamily: Fonts.Roboto.Regular,
    fontSize: 13,
    color: COLORS.primaryGreen,
    marginBottom: 3,
    marginLeft: 5,
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
    shadowOpacity: 0.2, // add opacity
    shadowRadius: 3, // add blur radius
    shadowOffset: {
      width: 0,
      height: 3,
    },
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

    elevation: 3,
    shadowOpacity: 0.2, // add opacity
    shadowRadius: 3, // add blur radius
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  leadSearchListWrap: {
    backgroundColor: COLORS.background,
    marginVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: '#000',
    height: 100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    shadowOpacity: 0.2, // add opacity
    shadowRadius: 3, // add blur radius
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  noticeContainer: {
    backgroundColor: COLORS.yellow,
    padding: 15,
    borderRadius: 8,
    marginVertical: 16,
    marginHorizontal: 5,
  },
  noticeTitle: {
    color: COLORS.importantRed,
    fontSize: 12,
    fontFamily: Fonts.Roboto.SemiBold,
  },
  noticeText: {
    color: '#333',
    marginTop: 4,
    fontSize: 12,
    color: COLORS.black,
    fontFamily: Fonts.Roboto.Medium,
  },
});

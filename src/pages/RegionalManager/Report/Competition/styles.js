import { StyleSheet, Dimensions } from 'react-native';
import COLORS from '../../../../theme/colors';
import Fonts from '../../../../theme/Fonts';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
  mainWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  searchWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
    borderWidth: 1,
    borderColor: COLORS.warmGray,
    borderRadius: 10,
    backgroundColor: COLORS.calenderInput,
    marginVertical: 20,
    paddingLeft: 10,
    height: 44,

  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.Roboto.Medium,
    color: COLORS.textColor,
    backgroundColor: COLORS.calenderInput,
    alignSelf: 'center',
    fontSize: 12,
  },
  searchButton: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

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
  headerBackground: {
    width: '100%',
    height: 120,
    backgroundColor: '#FDEDE5',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    top: 0,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#B8E4E7',
    width: 43,
    height: 43,
    borderWidth: 5,
    borderColor: COLORS.white,
    borderRadius: 100,

    alignItems: 'center',
    justifyContent: 'center',
  },
  editText: {
    fontSize: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 8,
  },
  profileRole: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    position: 'relative',
    paddingBottom: 15,
    marginTop: 20,
    elevation: 2,
    marginHorizontal: 10,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#6C757D',
  },
  activeStatus: {
    color: COLORS.primaryGreen,
    fontFamily: Fonts.Roboto.Regular,
    fontSize: 10,
    marginLeft: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#F5F5F5',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    marginTop: 4,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  footer: {
    marginTop: 20,
    width: '90%',
    marginHorizontal: 10,
  },
  option: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontFamily: Fonts.Roboto.SemiBold,
    color: COLORS.black,
    marginLeft: 10,
  },
  activeWrap: {
    position: 'absolute',
    right: 10,
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    fontFamily: Fonts.Roboto.Bold,
    fontSize: 25,
    color: COLORS.primaryGreen,
  },
});

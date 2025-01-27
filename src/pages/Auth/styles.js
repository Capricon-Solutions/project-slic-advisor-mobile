import {StyleSheet, Dimensions} from 'react-native';
import Fonts from '../../theme/Fonts';
import COLORS from '../../theme/colors';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  topBackground: {
    position: 'absolute',
    paddingTop: 0,
    marginTop: 0,
    top: 0,
  },
  logo: {
    width: 110,
    marginTop: 20,
    height: 110,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 25,
    fontFamily: Fonts.Roboto.Bold,
    textAlign: 'center',
    marginTop: 16,
    color: COLORS.title,
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.subtitle,
    marginBottom: 10,
    marginTop: 10,
    fontFamily: Fonts.Roboto.SemiBold,
  },
  input: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingLeft: 0,
    fontWeight: 'bold',
    color: 'red',
    height: 43,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    marginTop: 10,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  forgotPassword: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.primary,
  },
  loginButton: {
    width: '85%',
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
});

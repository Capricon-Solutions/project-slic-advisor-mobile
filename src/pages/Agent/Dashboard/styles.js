import {StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';

const window = Dimensions.get('window');

export const styles = StyleSheet.create({
  mainWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userName: {fontSize: 16, color: '#333', fontFamily: Fonts.Roboto.SemiBold},
  userRegion: {fontSize: 12, color: '#333', fontFamily: Fonts.Roboto.SemiBold},
  userRole: {fontSize: 10, color: '#333', fontFamily: Fonts.Roboto.Medium},
  sectionTitle: {
    fontFamily: Fonts.Roboto.Bold,
    color: COLORS.black,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',

    // backgroundColor: 'rgba(0,0,0,0)',
  },
  modalContainer: {
    width: '100%',
    padding: 25,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 25,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
  },
  modalTitle: {
    fontSize: 17,
    fontFamily: Fonts.Roboto.Medium,
    color: COLORS.title,
  },
  modalContent: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  profilePicture: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  UserName: {
    fontSize: window.width * 0.041,
    color: '#333',
    fontFamily: Fonts.Roboto.SemiBold,
  },
  regionName: {
    fontSize: 20,
    color: '#333',
    fontFamily: Fonts.Roboto.SemiBold,
    fontSize: window.width * 0.03,
  },
  position: {
    fontSize: 20,
    color: '#333',
    fontFamily: Fonts.Roboto.Medium,
    fontSize: window.width * 0.027,
  },
  notiIcon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  IslandRank: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderWidth: 14,
    borderColor: COLORS.islandRank,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  regionalRank: {
    width: 65,
    height: 65,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: COLORS.regionalRank,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  branchRank: {
    width: 65,
    height: 65,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: COLORS.branchRank,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
});

import * as React from 'react';
import {
  TouchableOpacity,
  Animated,
  Dimensions,
  Text,
  View,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors'; // Update with your color theme file
import Fonts from '../theme/Fonts'; // Update with your fonts file
import avatar from '../images/avatar.png'; // Replace with the actual logo path
import LoaderKit from 'react-native-loader-kit';
import Contacts from '../icons/Contacts.png'; // Replace with the actual logo path
import {ActivityIndicator} from 'react-native-paper';
const window = Dimensions.get('window');

export default function DownloadScreen({isDownloading, downloadProgress}) {
  if (!isDownloading) return null;
  return (
    <View
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        position: 'absolute',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        height: '100%',
        width: '100%',
      }}>
      {downloadProgress == 0 ? (
        <LoaderKit
          style={{width: 65, height: 65, marginBottom: 30}}
          animationSpeedMultiplier={0.6}
          name={'BallSpinFadeLoader'} // Optional: see list of animations below
          color={COLORS.grayText} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
        />
      ) : (
        <View style={{width: '100%'}}>
          <View style={styles.fullprogressBarContainer}>
            <View
              style={[
                styles.fullprogressBar,
                {width: `${downloadProgress * 100}%`},
              ]}
            />
          </View>
          <Text style={styles.fullprogressText}>
            {Math.round(downloadProgress * 100)}% Downloaded
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fullprogressBarContainer: {
    height: 8,
    width: '100%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 3,
  },
  fullprogressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  fullprogressText: {
    fontSize: 14,
    alignSelf: 'center',
    color: COLORS.textColor,
    marginTop: 3,
    fontFamily: Fonts.Roboto.Bold,
  },
});

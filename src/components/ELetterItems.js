import * as React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  Image,
  Linking,
  StyleSheet,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import Fonts from '../theme/Fonts';
import {useSelector} from 'react-redux';
import {showToast} from './ToastMessage';

const window = Dimensions.get('window');

export default function ELetterItems({item, navigation}) {
  const [downloadProgress, setDownloadProgress] = React.useState(0);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const token = useSelector(state => state.Profile.token);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      console.log('Requesting storage permission...');
      try {
        if (Platform.Version < 29) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message: 'App needs access to your storage to download files.',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            },
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          // Android 10+ doesn't require explicit permission for private storage
          return true;
        }
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true; // iOS or other platforms
  };

  // Download and open PDF
  const downloadAndOpenPDF = async path => {
    console.log('Downloading PDF from path:', path);
    if (!path) {
      console.warn('No path provided for PDF download');
      return;
    }
    try {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        // Alert.alert(
        //   'Permission Denied',
        //   'Storage permission is required to download and view the file.',
        // );
        showToast({
          type: 'error',
          text1: 'Permission Denied',
          text2:
            'Storage permission is required to download and view the file.',
        });
        return;
      }
      setIsDownloading(true);
      setDownloadProgress(0);
      // const pdfUrl = `https://gisalesappapi.slicgeneral.com/api/print/${path}`;
      const pdfUrl = path;
      const localFilePath = `${RNFS.DocumentDirectoryPath}/${path}`;
      console.log('Starting download from:', pdfUrl);
      const apiKey = '12345abcde67890fghijklmnoprstuvwxz'; // Replace with your actual API key
      const downloadOptions = {
        fromUrl: pdfUrl,
        toFile: localFilePath,
        headers: {
          'x-api-key': apiKey,
          Authorization: `Bearer ${token}`,
        },
        progress: res => {
          const progress = res.bytesWritten / res.contentLength;
          setDownloadProgress(progress);
        },
        progressDivider: 10,
      };

      const download = RNFS.downloadFile(downloadOptions);
      console.log('Download started:', download);
      const result = await download.promise;
      // Linking.openURL(localFilePath).catch();
      console.log('Download completed:', result.statusCode);

      if (result.statusCode === 200) {
        // ToastAndroid.show(`File saved to ${localFilePath}`, ToastAndroid.LONG);
        await FileViewer.open(localFilePath, {showOpenWithDialog: true});
        console.log('PDF opened successfully!');
      } else {
        throw new Error(
          `Download failed with status code ${result.statusCode}`,
        );
      }
    } catch (error) {
      console.error('Download/Open error:', error);
      // Alert.alert('Error', 'Failed to download or open the PDF file.');
      showToast({
        type: 'error',
        text1: 'Download Error',
        text2: 'Failed to download or open the PDF file.',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontFamily: Fonts.Roboto.SemiBold,
            fontSize: 13,
            color: COLORS.textColor,
          }}>
          {item?.customerName}
        </Text>
        <View
          style={{
            backgroundColor: COLORS.grassGreen,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            padding: 5,
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 10,
              fontFamily: Fonts.Roboto.Bold,
            }}>
            {item?.policyStatus}
          </Text>
        </View>
      </View>

      <View>
        <View style={styles.subLine}>
          <View style={{flex: 0.7}}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Regular,
                fontSize: 13,
                marginBottom: 2,
                color: COLORS.textColor,
              }}>
              {item?.policyNo}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Regular,
                fontSize: 13,
                marginVertical: 2,
                color: COLORS.textColor,
              }}>
              {item?.vehicleNo}
            </Text>
            <View style={styles.subDatamargin}>
              <Text
                style={{
                  fontFamily: Fonts.Roboto.Bold,
                  fontSize: 13,
                  color: COLORS.textColor,
                }}>
                Due date
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Roboto.Regular,
                  fontSize: 13,
                  color: COLORS.textColor,
                }}>
                {item?.dueDate}
              </Text>
            </View>
            <View style={styles.subDatamargin}>
              <Text
                style={{
                  fontFamily: Fonts.Roboto.Bold,
                  fontSize: 13,
                  color: COLORS.textColor,
                }}>
                Premium amount
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Roboto.Regular,
                  fontSize: 13,
                  color: COLORS.textColor,
                }}>
                {Number(item?.premiumAmount || 0).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 0.3,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            {item?.path && (
              <TouchableOpacity
                onPress={() => downloadAndOpenPDF(item?.path)}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 8,
                  backgroundColor: COLORS.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: COLORS.white,
                }}>
                <Feather name="download" color={COLORS.black} size={17} />
              </TouchableOpacity>
            )}
            {item?.path && (
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 8,
                  backgroundColor: COLORS.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: COLORS.white,
                }}>
                <Ionicons
                  name="share-social-sharp"
                  color={COLORS.black}
                  size={16}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {isDownloading && (
          <View style={{width: '100%', marginTop: 5}}>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {width: `${downloadProgress * 100}%`},
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(downloadProgress * 100)}% Downloaded
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    marginTop: 15,

    padding: 10,
    justifyContent: 'space-between',
    elevation: 10,
    borderRadius: 10,
    shadowColor: '#000',

    // height: 111,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  subLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  subDatamargin: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 2,
  },
  progressBarContainer: {
    height: 5,
    width: '100%',
    backgroundColor: COLORS.lightGray,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 3,
    marginTop: -3,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.textColor,
    fontFamily: Fonts.Roboto.Regular,
  },
});

import * as React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  Image,
  Linking,
  StyleSheet,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import ReactNativeBlobUtil from 'react-native-blob-util';

import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
import Fonts from '../theme/Fonts';
import VisitsIcon from './../icons/Visits.png';
import {useSelector} from 'react-redux';
import {showToast} from './ToastMessage';
const window = Dimensions.get('window');

export default function EDocItems({item, navigation, onPress}) {
  const [downloadProgress, setDownloadProgress] = React.useState(0);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const token = useSelector(state => state.Profile.token);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const apiLevel = Platform.Version;

        if (apiLevel >= 29) {
          // Scoped storage — permission not required
          // console.log('API 29+ detected. Skipping storage permission.');
          return true;
        }

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download files.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );

        // console.log('Permission result:', granted);

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }

    return true; // iOS or other platforms
  };

  // Download and open PDF
  // const downloadAndOpenPDF = async path => {
  //   try {
  //     const hasPermission = await requestStoragePermission();
  //     if (!hasPermission) {
  //       // Alert.alert(
  //       //   'Permission Denied',
  //       //   'Storage permission is required to download and view the file.',
  //       // );
  //       showToast({
  //         type: 'error',
  //         text1: 'Permission Denied',
  //         text2:
  //           'Storage permission is required to download and view the file.',
  //       });
  //       return;
  //     }
  //     setIsDownloading(true);
  //     setDownloadProgress(0);
  //     const pdfUrl = `https://gisalesappapi.slicgeneral.com/api/print/${path}`;
  //     const localFilePath = `${RNFS.DocumentDirectoryPath}/${path}`;
  //     console.log('Starting download from:', pdfUrl);
  //     const apiKey = '12345abcde67890fghijklmnoprstuvwxz'; // Replace with your actual API key
  //     const downloadOptions = {
  //       fromUrl: pdfUrl,
  //       toFile: localFilePath,
  //       headers: {
  //         'x-api-key': apiKey,
  //         Authorization: `Bearer ${token}`,
  //       },
  //       progress: res => {
  //         const progress = res.bytesWritten / res.contentLength;
  //         setDownloadProgress(progress);
  //       },
  //       progressDivider: 10,
  //     };

  //     const download = RNFS.downloadFile(downloadOptions);
  //     console.log('Download started:', download);
  //     const result = await download.promise;
  //     // Linking.openURL(localFilePath).catch();
  //     console.log('Download completed:', result.statusCode);

  //     if (result.statusCode === 200) {
  //       // ToastAndroid.show(`File saved to ${localFilePath}`, ToastAndroid.LONG);
  //       await FileViewer.open(localFilePath, {showOpenWithDialog: true});
  //       console.log('PDF opened successfully!');
  //     } else {
  //       throw new Error(
  //         `Download failed with status code ${result.statusCode}`,
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Download/Open error:', error);
  //     showToast({
  //       type: 'error',
  //       text1: 'Download Error',
  //       text2: 'Failed to download or open the PDF file.',
  //     });
  //     // Alert.alert('Error', 'Failed to download or open the PDF file.');
  //   } finally {
  //     setIsDownloading(false);
  //   }
  // };
  const downloadAndOpenPDF = async path => {
    try {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
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

      const pdfUrl = `https://gisalesappapi.slicgeneral.com/api/print/${path}`;
      let fileName = path.endsWith('.pdf') ? path : `${path}.pdf`;
      const localFilePath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;

      // console.log('Starting download from:', pdfUrl);

      const apiKey = '12345abcde67890fghijklmnoprstuvwxz';

      const res = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: localFilePath,
      })
        .fetch('GET', pdfUrl, {
          Authorization: `Bearer ${token}`,
          'x-api-key': apiKey,
        })
        .progress({count: 10}, (received, total) => {
          const progress = received / total;
          setDownloadProgress(progress);
          // console.log('Progress:', progress);
        });

      // console.log('Download completed:', res.path());

      await FileViewer.open(res.path(), {
        showOpenWithDialog: true,
        displayName: 'Your PDF Report',
        mimeType: 'application/pdf',
      });

      // console.log('PDF opened successfully!');
    } catch (error) {
      console.error('Download/Open error:', error);
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
    <TouchableOpacity
      onPress={() => downloadAndOpenPDF(item?.path)}
      style={styles.container}>
      <View
        style={{
          flex: 0.15,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            borderRadius: 100,
            height: 46,
            width: 46,
            backgroundColor: COLORS.tableSubHeader,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons
            name="car"
            color={COLORS.iconDisabled}
            size={29}
          />
        </View>
      </View>
      <View
        style={{
          flex: 0.7,
          paddingLeft: 10,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <View>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.textColor,
              fontSize: window.width * 0.035,
              marginBottom: 8,
            }}>
            {item?.docName}
          </Text>
        </View>

        {isDownloading ? (
          <View style={{width: '100%'}}>
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
        ) : (
          <View
            style={{
              backgroundColor: COLORS.grassGreen,
              paddingVertical: 3,
              paddingHorizontal: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 6,
            }}>
            <Feather name="download" color={COLORS.white} size={13} />
            <Text
              style={{
                fontSize: 9.5,
                fontFamily: Fonts.Roboto.Bold,
                color: COLORS.white,
                marginLeft: 8,
              }}>
              Download as PDF
            </Text>
          </View>
        )}
      </View>
      <View
        style={{
          flex: 0.15,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isDownloading ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <View
            style={{
              borderRadius: 8,
              height: 32,
              width: 32,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name="download"
              color={COLORS.white}
              size={25}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    marginTop: 15,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    elevation: 10,
    borderRadius: 10,
    shadowColor: '#000',
    flexDirection: 'row',
    shadowOpacity: 0.2, // add opacity
    shadowRadius: 3, // add blur radius
    shadowOffset: {
      width: 0,
      height: 3,
    },
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

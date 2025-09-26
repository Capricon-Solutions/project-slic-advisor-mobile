import * as React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import COLORS from '../theme/colors';

import FileViewer from 'react-native-file-viewer';
import Fonts from '../theme/Fonts';
import {useSelector} from 'react-redux';
import {showToast} from './ToastMessage';
import Share from 'react-native-share'; // Ensure this is installed and imported
import ReactNativeBlobUtil from 'react-native-blob-util';
import {API_KEY} from '@env';

export default function ELetterItems({item, navigation}) {
  const [downloadProgress, setDownloadProgress] = React.useState(0);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const token = useSelector(state => state.Profile.token);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      // console.log('Requesting storage permission...');
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

      showToast({
        type: 'success',
        text1: 'Download Started',
        text2: 'Please wait until download and open the file.',
      });

      setIsDownloading(true);
      setDownloadProgress(0);

      let fileName = path.split('/').pop()?.split('?')[0] || 'file.pdf';
      if (!fileName.endsWith('.pdf')) {
        fileName += '.pdf';
      }

      const localFilePath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;

      const apiKey = API_KEY;

      const res = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: localFilePath,
      })
        .fetch('GET', path, {
          Authorization: `Bearer ${token}`,
          'x-api-key': apiKey,
        })
        .progress({count: 10}, (received, total) => {
          const progress = received / total;
          setDownloadProgress(progress);
        });

      setIsDownloading(false);

      await FileViewer.open(res.path(), {
        showOpenWithDialog: true,
        displayName: 'Your PDF Report',
        mimeType: 'application/pdf',
      });
    } catch (error) {
      console.error('Download/Open error:', error);
      showToast({
        type: 'error',
        text1: 'Download Error',
        text2: 'Failed to download or open the PDF file.',
      });
      setIsDownloading(false);
    }
  };

  const sharePDF = async (pdfUrl, fileName, token, apiKey) => {
    try {
      // Extract and sanitize file name
      fileName = pdfUrl.split('/').pop()?.split('?')[0] || 'file.pdf';
      if (!fileName.endsWith('.pdf')) {
        fileName += '.pdf';
      }

      const downloadDir = ReactNativeBlobUtil.fs.dirs.DownloadDir;
      const localFilePath = `${downloadDir}/${fileName}`;

      setIsDownloading(true);
      setDownloadProgress(0);

      const res = await ReactNativeBlobUtil.config({
        fileCache: true,
        appendExt: 'pdf',
        path: localFilePath,
      })
        .fetch('GET', pdfUrl, {
          Authorization: `Bearer ${token}`,
          'x-api-key': apiKey,
        })
        .progress({count: 10}, (received, total) => {
          const progress = received / total;
          setDownloadProgress(progress);
        });

      // console.log('Sanitized file path:', res.path());
      setIsDownloading(false);
      await Share.open({
        url: `file://${res.path()}`,
        type: 'application/pdf',
        filename: fileName,
        title: fileName,
        failOnCancel: false,
      });
    } catch (error) {
      console.error('Error sharing PDF:', error);
      setIsDownloading(false);
      showToast({
        type: 'error',
        text1: 'Share Error',
        text2: 'Unable to share the PDF file.',
      });
    }
  };

  return (
    <View style={styles.container}>
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
                onPress={() => sharePDF(item?.path, null, token, API_KEY)}
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
    </View>
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

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3, // add opacity
    shadowRadius: 4.84, // add blur radius
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

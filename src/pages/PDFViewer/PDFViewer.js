import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {WebView} from 'react-native-webview';
import RNFS from 'react-native-fs';

const PDFViewer = ({route}) => {
  const {url, fileName} = route.params;
  const [loading, setLoading] = useState(false);

  // Request storage permission (Android)
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to download files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS does not require permission
  };

  // Function to download PDF
  const downloadPDF = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Storage permission is required to download the file.',
      );
      return;
    }

    setLoading(true);
    const filePath = `${RNFS.DocumentDirectoryPath}/${
      fileName || 'downloaded.pdf'
    }`;

    RNFS.downloadFile({fromUrl: url, toFile: filePath})
      .promise.then(() => {
        Alert.alert('Download Complete', `File saved to ${filePath}`);
      })
      .catch(error => {
        console.error(error);
        Alert.alert(
          'Download Failed',
          'There was an error downloading the file.',
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <WebView
          source={{uri: url}}
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
          }}
          startInLoadingState
          renderLoading={() => <ActivityIndicator size="large" />}
        />
      </View>

      {/* Download Button */}
      <TouchableOpacity
        onPress={() => downloadPDF()}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: 'green',
          padding: 10,
          borderRadius: 5,
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          {loading ? 'Downloading...' : 'Download'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PDFViewer;

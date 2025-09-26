import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import FileViewer from 'react-native-file-viewer';
import {Linking} from 'react-native';
import RNFS from 'react-native-fs'; // File system for downloads
import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';
import Logo from '../icons/Logo.png'; // Replace with the actual logo path

export default function OtherListItem({item, onPress}) {
  const [loading, setLoading] = useState(false);
  const [Progress, setProgress] = useState(0);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
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
          // From Android 10 onwards, writing to app's private folder doesn't need permission
          return true;
        }
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  const openDocument = async url => {
    if (!url) {
      return;
    }

    const fileName = url.split('/').pop();
    const localFilePath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;

    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Storage permission is required to download files.',
      );
      return;
    }

    try {
      setLoading(true);
      setProgress(0);

      const res = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: localFilePath,
      })
        .fetch('GET', url)
        .progress({count: 10}, (received, total) => {
          const progress = received / total;
          setProgress(progress * 100); // percent
        });

      setLoading(false);

      ToastAndroid.show(
        `Download Complete: File saved to ${localFilePath}`,
        ToastAndroid.LONG,
      );

      // Open with FileViewer (better than Linking for local files)
      await FileViewer.open(res.path(), {
        showOpenWithDialog: true,
      });
    } catch (error) {
      console.error('Download/Open error:', error);
      setLoading(false);
      Alert.alert(
        'Download Failed',
        'There was an error downloading the file.',
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: COLORS.background,
        marginVertical: 8,
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        marginHorizontal: 5,
        borderRadius: 10,
        shadowColor: '#000',
        height: 95,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        shadowOpacity: 0.2, // add opacity
        shadowRadius: 3, // add blur radius
        shadowOffset: {
          width: 0,
          height: 3,
        },
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          width: '100%',
          paddingVertical: 10,
          paddingLeft: 0,
        }}>
        <View
          style={{
            marginLeft: 5,
            justifyContent: 'space-evenly',
            flex: 0.2,
            height: '100%',
            borderRadius: 5,
            paddingHorizontal: 4,
            backgroundColor: COLORS.lightBlue,
          }}>
          <Image
            style={{height: '100%', width: '100%', resizeMode: 'contain'}}
            source={item?.imageUrl ? {uri: item.imageUrl} : Logo}
          />
        </View>

        <View
          style={{
            marginLeft: 5,

            justifyContent: 'space-evenly',
            flex: 0.55,
          }}>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.black,
              fontSize: 14,
            }}>
            {item.productName}
          </Text>
          <Text
            numberOfLines={3}
            style={{
              fontFamily: Fonts.Roboto.Regular,
              color: COLORS.black,
              fontSize: 11,
              textAlign: 'left',
              marginTop: 5,
            }}>
            {item.shortDesc}
          </Text>
        </View>

        <View style={{flex: 0.25}}>
          <TouchableOpacity
            disabled={loading}
            onPress={() => openDocument(item.documentUrl)}
            style={{
              backgroundColor: loading ? COLORS.warmGray : COLORS.primaryGreen,
              borderRadius: 8,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 5,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontFamily: Fonts.Roboto.Regular,
              }}>
              {loading ? `${Progress.toFixed(0)}%` : 'Download'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

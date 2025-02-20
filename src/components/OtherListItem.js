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
        if (Platform.Version < 33) {
          // Android 13+ doesn't need WRITE_EXTERNAL_STORAGE
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message: 'This app needs access to storage to download files.',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            },
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Storage permission granted');
            return true;
          } else {
            console.log('Storage permission denied');
            return false;
          }
        } else {
          console.log('No need to request storage permission on Android 13+');
          return true;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS doesn't require storage permission for downloads
  };

  const openDocument = async url => {
    if (!url) {
      console.log('No document URL available');
      return;
    }

    const fileName = url.split('/').pop(); // Extract file name from URL
    const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Storage permission is required to download files.',
      );
      return;
    } else {
      setLoading(true);
    }

    RNFS.downloadFile({
      fromUrl: url,
      toFile: localFilePath,
      progress: res => {
        console.log(
          `Download progress: ${(res.bytesWritten / res.contentLength) * 100}%`,
        );
        const progressPercent = (res.bytesWritten / res.contentLength) * 100;
        setProgress(progressPercent);
      },
    })
      .promise.then(() => {
        setLoading(false);
        // Alert.alert('Download Complete', `File saved to ${localFilePath}`);
        ToastAndroid.show(
          `Download Complete: File saved to ${localFilePath}`,
          ToastAndroid.LONG,
        );

        Linking.openURL(url).catch(err =>
          console.error("Couldn't open URL", err),
        );
      })
      .catch(error => {
        console.error('Download failed', error);
        setLoading(false);
        Alert.alert(
          'Download Failed',
          'There was an error downloading the file.',
        );
      });
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
          style={{marginLeft: 5, justifyContent: 'space-evenly', flex: 0.55}}>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.black,
              fontSize: 14,
            }}>
            {item.productName}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Regular,
              color: COLORS.black,
              fontSize: 11,
              textAlign: 'left',
              marginTop: 5,
            }}>
            {item.description}
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

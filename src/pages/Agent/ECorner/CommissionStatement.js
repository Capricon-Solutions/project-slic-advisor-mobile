import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  ToastAndroid,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import ELetterItems from '../../../components/ELetterItems';
import DropdownFilled from '../../../components/DropdownFilled';
import Button from '../../../components/Button';
import AlertButton from '../../../components/AlertButton';
import {useGetcommissionStatementMutation} from '../../../redux/services/eCornerSlice';
import {Linking} from 'react-native';
import RNFS from 'react-native-fs'; // File system for downloads
import MonthYearPicker from '../../../components/MonthYearPicker';
import MonthYearPickerSingle from '../../../components/MonthYearPickerSingle';
import moment from 'moment';
import {showToast} from '../../../components/ToastMessage';
import {useSelector} from 'react-redux';
import MonthYearPickerSinglePast from '../../../components/MonthYearPickerSinglePast';
const window = Dimensions.get('window');

const data = [
  {
    id: 1,
    type: 'Claim Form',
    conunt: '827',
    download: false,
    Share: false,
  },
  {
    id: 2,
    type: 'Drivers Statement',
    conunt: '827',
    download: false,
    Share: false,
  },
  {
    id: 3,
    type: 'Drivers Statement',
    conunt: '827',
    download: false,
    Share: false,
  },
  {
    id: 4,
    type: 'Drivers Statement',
    conunt: '827',
    download: true,
    Share: true,
  },
];

export default function CommissionStatement({navigation}) {
  const [loading, setLoading] = useState(false);
  const [Progress, setProgress] = useState(0);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCode, setSelectedCode] = useState(null);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const userCode = useSelector(state => state.Profile.userCode);

  const [
    GetCommissionStatement,
    {data: newActivity, isLoading, error: errorEvents},
  ] = useGetcommissionStatementMutation();
  const renderLetterItems = ({item}) => (
    <ELetterItems item={item} navigation={navigation} />
  );
  const handleType = value => {
    setSelectedType(value);
  };
  const handleCode = value => {
    setSelectedCode(value);
  };
  const handlegetCommission = async () => {
    try {
      console.log('test values', {selectedDate, selectedType, selectedCode});
      const response = await GetCommissionStatement({
        selectedDate,
        selectedType,
        selectedCode,
      });
      console.log('response?.data?.success ', response);
      if (response?.data?.success == false) {
        // Alert.alert('Error', response?.data?.message || 'Something went wrong');
        showToast({
          type: 'error',
          text1: 'Failed',
          text2: response?.data?.message || 'Something went wrong',
        });
        return;
      } else {
        const url = response?.data?.data;
        console.log('url', url);
        openDocument(url);
      }
      console.log('Activity Created:', response);
    } catch (err) {
      console.error('Error creating activity:', err);
    }
  };

  // const requestStoragePermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       if (Platform.Version < 29) {
  //         // Android 13+ doesn't need WRITE_EXTERNAL_STORAGE
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //           {
  //             title: 'Storage Permission Required',
  //             message: 'This app needs access to storage to download files.',
  //             buttonPositive: 'OK',
  //             buttonNegative: 'Cancel',
  //           },
  //         );

  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           console.log('Storage permission granted');
  //           return true;
  //         } else {
  //           console.log('Storage permission denied');
  //           return false;
  //         }
  //       } else {
  //         console.log('No need to request storage permission on Android 13+');
  //         return true;
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //       return false;
  //     }
  //   }
  //   return true; // iOS doesn't require storage permission for downloads
  // };

  // const openDocument = async url => {
  //   if (!url) {
  //     console.log('No document URL available');
  //     return;
  //   }

  //   const fileName = url.split('/').pop(); // Extract file name from URL
  //   const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  //   const hasPermission = await requestStoragePermission();
  //   if (!hasPermission) {
  //     Alert.alert(
  //       'Permission Denied',
  //       'Storage permission is required to download files.',
  //     );
  //     return;
  //   } else {
  //     setLoading(true);
  //   }

  //   RNFS.downloadFile({
  //     fromUrl: url,
  //     toFile: localFilePath,
  //     progress: res => {
  //       console.log(
  //         `Download progress: ${(res.bytesWritten / res.contentLength) * 100}%`,
  //       );
  //       const progressPercent = (res.bytesWritten / res.contentLength) * 100;
  //       setProgress(progressPercent);
  //     },
  //   })
  //     .promise.then(() => {
  //       setLoading(false);
  //       // Alert.alert('Download Complete', `File saved to ${localFilePath}`);
  //       ToastAndroid.show(
  //         `Download Complete: File saved to ${localFilePath}`,
  //         ToastAndroid.LONG,
  //       );
  //       console.log('urlurlurlurlurl', url);
  //       Linking.openURL(url).catch(err =>
  //         console.error("Couldn't open URL", err),
  //       );
  //     })
  //     .catch(error => {
  //       console.error('Download failed', error);
  //       setLoading(false);
  //       Alert.alert(
  //         'Download Failed',
  //         'There was an error downloading the file.',
  //       );
  //     });
  // };
  // const requestStoragePermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       if (Platform.Version < 29) {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //           {
  //             title: 'Storage Permission Required',
  //             message: 'This app needs access to storage to download files.',
  //             buttonPositive: 'OK',
  //             buttonNegative: 'Cancel',
  //           },
  //         );

  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           console.log('✅ Storage permission granted');
  //           return true;
  //         } else {
  //           console.log('❌ Storage permission denied');
  //           return false;
  //         }
  //       } else {
  //         console.log('ℹ️ No storage permission needed on Android 10+');
  //         return true;
  //       }
  //     } catch (err) {
  //       console.warn('⚠️ Permission error:', err);
  //       return false;
  //     }
  //   }
  //   // iOS and other platforms
  //   return true;
  // };

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
        // ToastAndroid.show(
        //   `Download Complete: File saved to ${localFilePath}`,
        //   ToastAndroid.LONG,
        // );

        Linking.openURL(url).catch(err =>
          console.error("Couldn't open URL", err),
        );
      })
      .catch(error => {
        console.error('Download failed', error);
        setLoading(false);
        Linking.openURL(url).catch(err =>
          console.error("Couldn't open URL", err),
        );
        // Alert.alert(
        //   'Download Failed',
        //   'There was an error downloading the file.',
        // );
      });
  };
  // const openDocument = async url => {
  //   if (!url) {
  //     console.log('❌ No document URL available');
  //     return;
  //   }

  //   const fileName = url.split('/').pop(); // Extract file name
  //   const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  //   const hasPermission = await requestStoragePermission();
  //   if (!hasPermission) {
  //     Alert.alert(
  //       'Permission Denied',
  //       'Storage permission is required to download files.',
  //     );
  //     return;
  //   }

  //   setLoading(true);

  //   RNFS.downloadFile({
  //     fromUrl: url,
  //     toFile: localFilePath,
  //     progress: res => {
  //       const progressPercent = (res.bytesWritten / res.contentLength) * 100;
  //       console.log(`📥 Download progress: ${progressPercent.toFixed(2)}%`);
  //       setProgress(progressPercent);
  //     },
  //   })
  //     .promise.then(() => {
  //       setLoading(false);
  //       ToastAndroid.show(
  //         `✅ Download Complete: File saved to ${localFilePath}`,
  //         ToastAndroid.LONG,
  //       );

  //       // Try to open the downloaded file
  //       Linking.openURL(`file://${localFilePath}`).catch(err => {
  //         console.error("❌ Couldn't open file:", err);
  //       });
  //     })
  //     .catch(error => {
  //       console.error('❌ Download failed', error);
  //       setLoading(false);
  //       Alert.alert(
  //         'Download Failed',
  //         'There was an error downloading the file.',
  //       );
  //     });
  // };

  useEffect(() => {
    console.log('selectedDate', selectedDate);
    const formattedYear = moment(selectedDate, 'YYYY/MM').format('YYYY');
    const formattedMonth = moment(selectedDate, 'YYYY/MM').format('MMMM');
    console.log('formattedYear', formattedYear);
    console.log('formattedMonth', formattedMonth);
  }, [selectedDate]);

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header
        Title="Commission Statement"
        titleFontSize={15}
        onPress={() => navigation.goBack()}
      />

      <MonthYearPickerSinglePast
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={v => setSelectedDate(v)}
        onSelectText={v => setSelectedDate(v)}
      />

      <View style={{paddingHorizontal: 20}}>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 10,
            padding: 20,
            elevation: 5,
            marginVertical: 5,
          }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: Fonts.Roboto.Medium,
              color: COLORS.grayText,
            }}>
            Select the month and year
          </Text>
          <TouchableOpacity
            onPress={() => setPickerVisible(true)}
            style={{
              backgroundColor: COLORS.lightBorder,
              borderRadius: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 10,
              paddingVertical: 13,
              marginTop: 20,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Regular,
                fontSize: 17,
                color: COLORS.black,
              }}>
              {' '}
              {selectedDate
                ? moment(selectedDate, 'YYYY/MM').format('MMMM')
                : 'Month'}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Regular,
                fontSize: 25,
                color: COLORS.black,
              }}>
              |
            </Text>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Regular,
                fontSize: 17,
                color: COLORS.black,
              }}>
              {selectedDate
                ? moment(selectedDate, 'YYYY/MM').format('YYYY')
                : 'Year'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* //////// */}

        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 10,
            padding: 20,
            elevation: 5,
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 13,
              marginBottom: 5,
              fontFamily: Fonts.Roboto.Medium,
              color: COLORS.grayText,
            }}>
            statement for
          </Text>
          <DropdownFilled
            placeholder={'Select'}
            onSelect={handleCode}
            value={selectedCode}
            dropdownData={[
              {label: '360115', value: '360115'},
              {label: '905717', value: '905717'},
              {label: '71482', value: '71482'},
            ]}
          />

          <Text
            style={{
              fontSize: 13,
              marginTop: 15,
              marginBottom: 5,
              fontFamily: Fonts.Roboto.Medium,
              color: COLORS.grayText,
            }}>
            Select the document type
          </Text>
          <DropdownFilled
            placeholder={'Select'}
            onSelect={handleType} // Pass the handleSelect function as a prop
            value={selectedType}
            dropdownData={[
              {label: 'General Cash', value: 'general_cash'},
              {label: 'General Orc', value: 'general_orc'},
            ]}
          />
          <View style={{marginTop: 20}}>
            <AlertButton
              disabledButton={
                loading || !selectedDate || !selectedType || !selectedCode
              }
              disabledColor={
                loading || !selectedDate || !selectedType || !selectedCode
              }
              onPress={() => handlegetCommission()}
              Title={loading ? `${Progress.toFixed(0)}%` : 'Create'}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

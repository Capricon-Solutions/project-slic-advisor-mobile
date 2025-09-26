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
import FileViewer from 'react-native-file-viewer';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {API_KEY} from '@env';
import {showToast} from '../../../components/ToastMessage';
import {useSelector} from 'react-redux';
import MonthYearPickerSinglePast from '../../../components/MonthYearPickerSinglePast';
const window = Dimensions.get('window');

export default function CommissionStatement({navigation}) {
  const [loading, setLoading] = useState(false);
  const [Progress, setProgress] = useState(0);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCode, setSelectedCode] = useState(null);
  const token = useSelector(state => state.Profile.token);

  const [
    GetCommissionStatement,
    {data: newActivity, isLoading, error: errorEvents},
  ] = useGetcommissionStatementMutation();

  const handleType = value => {
    setSelectedType(value);
  };
  const handleCode = value => {
    setSelectedCode(value);
  };

  const handlegetCommission = async () => {
    try {
      // console.log('test values', {selectedDate, selectedType, selectedCode});
      const response = await GetCommissionStatement({
        selectedDate,
        selectedType,
        selectedCode,
      });
      // console.log('response?.data?.success ', response);
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
        openDocument(url);
      }
    } catch (err) {
      console.error('Error creating activity:', err);
    }
  };

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

  const openDocument = async url => {
    try {
      // console.log('Opening document from URL:', url);
      if (!url) return;

      let fileName = url.split('/').pop() || 'document.pdf';
      if (!fileName.endsWith('.pdf')) fileName += '.pdf';
      const localFilePath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;

      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Denied',
          'Storage permission is required to download files.',
        );
        return;
      }

      setLoading(true);
      const apiKey = API_KEY;

      // 🔹 Quick HEAD/GET to check if response is JSON error
      const checkRes = await fetch(url, {
        headers: {
          'x-api-key': apiKey,
          Authorization: `Bearer ${token}`,
        },
      });
      const contentType = checkRes.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        const errorData = await checkRes.json();
        showToast({
          type: 'error',
          text1: 'Request Failed',
          text2: errorData?.message || 'No data found for this request',
        });
        return; // 🚫 stop here, don’t download
      }

      // 🔹 Use BlobUtil for reliable download + progress
      const res = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: localFilePath,
      })
        .fetch('GET', url, {
          'x-api-key': apiKey,
          Authorization: `Bearer ${token}`,
        })
        .progress({count: 10}, (received, total) => {
          const percent = (received / total) * 100;
          // console.log(`Download progress: ${percent.toFixed(2)}%`);
          setProgress(percent);
        });

      // console.log('Download completed:', res.path());

      await FileViewer.open(res.path(), {
        showOpenWithDialog: true,
        showAppsSuggestions: true,
        displayName: 'Your PDF Report',
        mimeType: 'application/pdf',
      });

      // console.log('File opened successfully');
    } catch (err) {
      console.error('openDocument error:', err);

      if (/No app associated/i.test(err?.message)) {
        showToast({
          type: 'error',
          text1: 'No PDF viewer found',
          text2: 'Install a PDF reader and try again.',
        });
      } else {
        showToast({
          type: 'error',
          text1: 'File Error',
          text2: err?.message || 'Could not download or open the file.',
        });
      }
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };
  useEffect(() => {
    const formattedYear = moment(selectedDate, 'YYYY/MM').format('YYYY');
    const formattedMonth = moment(selectedDate, 'YYYY/MM').format('MMMM');
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
            shadowOpacity: 0.2, // add opacity
            shadowRadius: 3, // add blur radius
            shadowOffset: {
              width: 0,
              height: 3,
            },
            marginVertical: 5,
          }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: Fonts.Roboto.Medium,
              color: COLORS.grayText,
            }}>
            Select the Month and Year
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

        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 10,
            padding: 20,
            elevation: 5,
            shadowOpacity: 0.2, // add opacity
            shadowRadius: 3, // add blur radius
            shadowOffset: {
              width: 0,
              height: 3,
            },
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 13,
              marginBottom: 5,
              fontFamily: Fonts.Roboto.Medium,
              color: COLORS.grayText,
            }}>
            Statement For
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
            Select the Document Type
          </Text>
          <DropdownFilled
            placeholder={'Select'}
            search={false}
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

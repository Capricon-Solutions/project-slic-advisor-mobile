import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import {FlatList} from 'react-native';
import ContactListItem from '../../../components/contactListItem';
import DepartmentItem from '../../../components/DepartmentItem';
import {styles} from './styles';
import LoadingScreen from '../../../components/LoadingScreen';
import Feather from 'react-native-vector-icons/Feather';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {
  useGetBranchesQuery,
  useGetDepartmentQuery,
} from '../../../redux/services/contactSlice';
import EconerItems from '../../../components/EconerItems';
import EDocItems from '../../../components/EDocItems';
import ELetterItems from '../../../components/ELetterItems';
import TableComponent from '../../../components/TableComponent';
import TableComponentEC from '../../../components/TableComponentEC';
import MonthYearPicker from '../../../components/MonthYearPicker';
import {useGetnonMotorRenewalsListQuery} from '../../../redux/services/policyRenewalsSlice';
import moment from 'moment';
import TableComponentPR from '../../../components/TableComponentPR';
import {useSelector} from 'react-redux';
import {showToast} from '../../../components/ToastMessage';
import ReactNativeBlobUtil from 'react-native-blob-util';

import DownloadScreen from '../../../components/DownloadScreen';
const window = Dimensions.get('window');

export default function NonMotorRenewalCompact({navigation}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const userCode = useSelector(state => state.Profile.userCode);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const lastMonthStart = moment()
    .subtract(3, 'month')
    .startOf('month')
    .format('YYYY-MM-DD');
  const currentMonthEnd = moment().endOf('month').format('YYYY-MM-DD');
  const [fromDate, toDate] = selectedDate
    ? selectedDate.split(' to ')
    : [lastMonthStart, currentMonthEnd];

  const {
    data: motorRenewalsList,
    error,
    isFetching,
    refetch,
  } = useGetnonMotorRenewalsListQuery({
    id: usertype == 2 ? personalCode : userCode, // Dynamic ID
    fromDate: fromDate,
    toDate: toDate,
  });
  const motorRenewalsResponse = motorRenewalsList?.data;
  console.log('motorRenewalsResponse', motorRenewalsResponse);
  const tableHead = [
    'Due Date',
    'Customer Name',
    'Policy No',
    // 'NCB Perc',
    'Policy Type',
    'Sum Insured',
    'Premium Amt',
    'Policy Status',
  ];
  const tableData = motorRenewalsResponse?.nonMotorRenewals?.map(item => [
    item?.policyEndDate?.toString() ?? '',
    item?.customerName?.toString() ?? '',
    // item?.vehicleNo?.toString() ?? '',
    item?.policyNumber?.toString() ?? '',
    item?.policyType?.toString() ?? '',
    // item?.ncbPerc?.toString() ?? '',
    item?.sumInsured != null
      ? Number(item.sumInsured).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : '0.00',
    item?.totalAmount != null
      ? Number(item.totalAmount).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : '0.00',
    item?.isPaid?.toString() ?? '',
  ]);
  const columnWidths = [100, 175, 200, 70, 130, 130, 100];
  const [isPickerVisible, setPickerVisible] = useState(false);

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
  // const downloadAndOpenPDF = async path => {
  //   console.log('test');
  //   try {
  //     const hasPermission = await requestStoragePermission();
  //     if (!hasPermission) {
  //       showToast({
  //         type: 'error',
  //         text1: 'Permission Denied',
  //         text2:
  //           'Storage permission is required to download and view the file.',
  //       });
  //       return;
  //     }
  //     showToast({
  //       type: 'success',
  //       text1: 'Download Started',
  //       text2: 'Please wait until download and open the file.',
  //     });
  //     setIsDownloading(true);
  //     setDownloadProgress(0);
  //     const pdfUrl = motorRenewalsList?.data?.path;
  //     let fileName = pdfUrl.split('/').pop();

  //     if (!fileName.endsWith('.pdf')) {
  //       fileName += '.pdf';
  //     }
  //     const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  //     console.log('Starting download from:', pdfUrl);
  //     const apiKey = '12345abcde67890fghijklmnoprstuvwxz';
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
  //       // await FileViewer.open(localFilePath, {showOpenWithDialog: true});
  //       await FileViewer.open(localFilePath, {
  //         showOpenWithDialog: true,
  //         displayName: 'Your PDF Report',
  //         mimeType: 'application/pdf',
  //       });
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
    // console.log('test');
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

      const pdfUrl = motorRenewalsList?.data?.path; // or use the `path` param if preferred
      let fileName = pdfUrl.split('/').pop() || 'file.pdf';
      if (!fileName.endsWith('.pdf')) {
        fileName += '.pdf';
      }

      const localFilePath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;
      const apiKey = '12345abcde67890fghijklmnoprstuvwxz';

      // console.log('Starting download from:', pdfUrl);

      const res = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: localFilePath,
      })
        .fetch('GET', pdfUrl, {
          'x-api-key': apiKey,
          Authorization: `Bearer ${token}`,
        })
        .progress({count: 10}, (received, total) => {
          const progress = received / total;
          // console.log('progress', progress);
          setDownloadProgress(progress);
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
    <View style={Styles.container}>
      <MonthYearPicker
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelect={v => setSelectedDate(v)}
        onSelectText={v => setSelectedDate(v)}
      />
      <HeaderBackground />
      <Header
        titleFontSize={16}
        Title="Non-Motor Renewal Compact"
        onPress={() => navigation.goBack()}
        havePdf={motorRenewalsList?.data?.path ? true : false}
        onPDF={() => downloadAndOpenPDF()}
      />

      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <View
            style={[styles.searchWrap, {marginHorizontal: 0, marginBottom: 3}]}>
            <TextInput
              style={styles.textInput}
              value={fromDate + ' - ' + toDate}
              // onChangeText={v => setSearchText(v)}
              placeholder="11/2024"
            />
            <TouchableOpacity
              onPress={() => setPickerVisible(true)}
              style={styles.searchButton}>
              <Feather name="calendar" color={COLORS.white} size={20} />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontFamily: Fonts.Roboto.SemiBold,
              fontSize: 14,
              marginVertical: 20,
              color: COLORS.borderColor,
            }}>
            (Click on Policy Number to View Details)
          </Text>
          {isFetching == true ? (
            <LoadingScreen />
          ) : (
            <TableComponentPR
              haveTotal={false}
              tableHead={tableHead}
              navigation={navigation}
              clickableColumns={[2]}
              tableData={tableData}
              columnWidths={columnWidths}
            />
          )}
        </View>
      </ScrollView>
      <DownloadScreen
        isDownloading={isDownloading}
        downloadProgress={downloadProgress}
      />
    </View>
  );
}

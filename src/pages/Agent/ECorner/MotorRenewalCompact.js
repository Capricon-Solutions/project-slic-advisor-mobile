import React, { useEffect, useState } from 'react';
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
import { Styles } from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import { FlatList } from 'react-native';
import ContactListItem from '../../../components/contactListItem';
import DepartmentItem from '../../../components/DepartmentItem';
import { styles } from './styles';
import LoadingScreen from '../../../components/LoadingScreen';
import Feather from 'react-native-vector-icons/Feather';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { API_KEY } from '@env';
import {
  useGetBranchesQuery,
  useGetDepartmentQuery,
} from '../../../redux/services/contactSlice';
import ReactNativeBlobUtil from 'react-native-blob-util';

import EconerItems from '../../../components/EconerItems';
import EDocItems from '../../../components/EDocItems';
import ELetterItems from '../../../components/ELetterItems';
import TableComponent from '../../../components/TableComponent';
import TableComponentEC from '../../../components/TableComponentEC';
import MonthYearPicker from '../../../components/MonthYearPicker';
import { useGetmotorRenewalsListQuery } from '../../../redux/services/policyRenewalsSlice';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { showToast } from '../../../components/ToastMessage';
import DownloadScreen from '../../../components/DownloadScreen';
const window = Dimensions.get('window');

export default function MotorRenewalCompact({ navigation }) {
  const userCode = useSelector(state => state.Profile.userCode);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
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
  } = useGetmotorRenewalsListQuery({
    id: usertype == 2 ? personalCode : userCode, // Dynamic ID
    fromDate: fromDate,
    toDate: toDate,
  });
  const motorRenewalsResponse = motorRenewalsList?.data?.motorRenewals;


  const tableHead = [
    'Due Date',
    'Customer Name',
    'Vehicle No',
    'Policy No',
    'NCB Perc',
    'Sum Insured',
    'Premium Amt',
    'Policy Status',
  ];

  const tableData = motorRenewalsResponse?.map(item => [
    item?.dueDate?.toString() ?? '',
    item?.customerName?.toString() ?? '',
    item?.vehicleNo?.toString() ?? '',
    item?.policyNo?.toString() ?? '',
    item?.ncbPerc?.toString() ?? '',
    item?.sumInsured != null
      ? Number(item.sumInsured).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      : '0.00',
    item?.premiumAmount != null
      ? Number(item.premiumAmount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      : '0.00',
    item?.policyStatus?.toString() ?? '',
  ]);
  const columnWidths = [100, 140, 100, 200, 70, 100, 100, 100];

  const [downloadProgress, setDownloadProgress] = React.useState(0);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const token = useSelector(state => state.Profile.token);

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

      // Use the incoming path or motorRenewalsList fallback
      const pdfUrl = path || motorRenewalsList?.data?.path;

      let fileName = pdfUrl.split('/').pop() || 'file.pdf';
      if (!fileName.endsWith('.pdf')) {
        fileName += '.pdf';
      }

      const localFilePath = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`;
      const apiKey = API_KEY;


      const res = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: localFilePath,
      })
        .fetch('GET', pdfUrl, {
          'x-api-key': apiKey,
          Authorization: `Bearer ${token}`,
        })
        .progress({ count: 10 }, (received, total) => {
          const progress = received / total;
          setDownloadProgress(progress);
        });


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
        Title="Motor Renewal Compact"
        onPress={() => navigation.goBack()}
        havePdf={motorRenewalsList?.data?.path ? true : false}
        onPDF={() => downloadAndOpenPDF()}
      />
      <ScrollView>
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={[styles.searchWrap, { marginHorizontal: 0, marginBottom: 3 }]}>
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
            <TableComponentEC
              haveTotal={false}
              tableHead={tableHead}
              tableData={tableData}
              navigation={navigation}
              clickableColumns={[3]}
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

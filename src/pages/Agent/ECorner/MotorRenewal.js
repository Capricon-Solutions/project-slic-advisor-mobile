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
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import CompetitionIcon from '../../../icons/CompetitionIcon.png'; // Replace with the actual logo path
import * as Progress from 'react-native-progress';
import DuesSummery from '../../../icons/DuesSummery.png'; // Replace with the actual logo path
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native';
import ContactListItem from '../../../components/contactListItem';
import DepartmentItem from '../../../components/DepartmentItem';
import {styles} from './styles';
import LoadingScreen from '../../../components/LoadingScreen';
import {
  useGetBranchesQuery,
  useGetDepartmentQuery,
} from '../../../redux/services/contactSlice';
import {useSelector} from 'react-redux';
import SquareTextBoxOutlined from '../../../components/SquareTextBoxOutlined';
import DropdownComponent from '../../../components/DropdownComponent';
import DropdownComponentNoLabelDashboard from '../../../components/DropdownComponentNoLabelDashboard';
import DropdownComponentNoLabel from '../../../components/DropdownComponentNoLabel';
import SmallButton from '../../../components/SmallButton';
import BPMotorRenewal from '../../../components/ECMotorRenewal';
import ECMotorRenewal from '../../../components/ECMotorRenewal';
import MonthYearPicker from '../../../components/MonthYearPicker';
import {
  useGetmotorRenewalsListQuery,
  useGetprintMotorRenewalsListQuery,
} from '../../../redux/services/policyRenewalsSlice';
import moment from 'moment';
import {downloadFile} from 'react-native-fs';
import {showToast} from '../../../components/ToastMessage';
import DownloadScreen from '../../../components/DownloadScreen';
const window = Dimensions.get('window');

export default function MotorRenewal({navigation}) {
  const userCode = useSelector(state => state.Profile.userCode);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const [SelectedType, setSelectedType] = useState(1);
  const motorData = useSelector(state => state.DUES.motorData);
  const nonmotorData = useSelector(state => state.DUES.nonmotorData);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const currentYear = new Date().getFullYear();
  const lastMonthStart = moment()
    .subtract(3, 'month')
    .startOf('month')
    .format('YYYY-MM-DD');
  const currentMonthEnd = moment().endOf('month').format('YYYY-MM-DD');
  const [fromDate, toDate] = selectedDate
    ? selectedDate.split(' to ')
    : [lastMonthStart, currentMonthEnd];

  // const {
  //   data: motorRenewalsList,
  //   error,
  //   isFetching,
  //   refetch,
  // } = useGetprintMotorRenewalsListQuery({
  //   id: userCode, // Dynamic ID
  //   fromDate: fromDate,
  //   toDate: toDate,
  // });

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

  useEffect(() => {
    refetch;
  }, [fromDate]);

  console.log('motorRenewalsList', motorRenewalsList);
  const dropdownData = Array.from({length: currentYear - 2019}, (_, i) => ({
    label: (2020 + i).toString(),
    value: (2020 + i).toString(),
  }));

  const renewalData = [
    {id: '1', name: 'Renewal Item 1'},
    {id: '2', name: 'Renewal Item 2'},
    {id: '3', name: 'Renewal Item 3'},
    {id: '4', name: 'Renewal Item 4'},
    {id: '5', name: 'Renewal Item 5'},
  ];

  const [downloadProgress, setDownloadProgress] = React.useState(0);
  const [isDownloading, setIsDownloading] = React.useState(true);
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
    console.log('test');
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
      const pdfUrl = motorRenewalsList?.data?.path;
      let fileName = pdfUrl.split('/').pop();

      if (!fileName.endsWith('.pdf')) {
        fileName += '.pdf';
      }
      const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      console.log('Starting download from:', pdfUrl);
      const apiKey = '12345abcde67890fghijklmnoprstuvwxz';
      const downloadOptions = {
        fromUrl: pdfUrl,
        toFile: localFilePath,
        headers: {
          'x-api-key': apiKey,
          Authorization: `Bearer ${token}`,
        },
        progress: res => {
          const progress = res.bytesWritten / res.contentLength;
          console.log('progress', progress);
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
        // await FileViewer.open(localFilePath, {showOpenWithDialog: true});
        await FileViewer.open(localFilePath, {
          showOpenWithDialog: true,
          displayName: 'Your PDF Report',
          mimeType: 'application/pdf',
        });
        console.log('PDF opened successfully!');
      } else {
        throw new Error(
          `Download failed with status code ${result.statusCode}`,
        );
      }
    } catch (error) {
      console.error('Download/Open error:', error);
      showToast({
        type: 'error',
        text1: 'Download Error',
        text2: 'Failed to download or open the PDF file.',
      });
      // Alert.alert('Error', 'Failed to download or open the PDF file.');
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
        Title="Motor Renewal"
        onPress={() => navigation.goBack()}
        havePdf={true}
        onPDF={() => downloadAndOpenPDF()}
      />

      <View style={{paddingHorizontal: 15}}>
        <View style={styles.searchWrap}>
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
        <View style={styles.mainWrap}>
          <TouchableOpacity
            onPress={() => setSelectedType(1)}
            style={{
              backgroundColor:
                SelectedType == 1 ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: SelectedType == 1 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              001
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(2)}
            style={{
              backgroundColor:
                SelectedType == 2 ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: SelectedType == 2 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              002
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(3)}
            style={{
              backgroundColor:
                SelectedType == 3 ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: SelectedType == 3 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              003
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(4)}
            style={{
              backgroundColor:
                SelectedType == 4 ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: SelectedType == 4 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              004
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => setSelectedType(5)}
            style={{
              backgroundColor:
                SelectedType == 5 ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: SelectedType == 5 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              005
            </Text>
          </TouchableOpacity> */}
        </View>
        {isFetching ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',

              height: window.height * 0.7,
            }}>
            <LoadingScreen />
          </View>
        ) : (
          <FlatList
            data={motorRenewalsList?.data?.motorRenewals}
            keyExtractor={item => item.id}
            renderItem={({item}) => <ECMotorRenewal item={item} />}
            contentContainerStyle={{
              paddingBottom: 250,
            }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <DownloadScreen
        isDownloading={isDownloading}
        downloadProgress={downloadProgress}
      />
    </View>
  );
}

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
  Linking,
  Platform,
  Alert,
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
// import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import Share from 'react-native-share'; // For handling file sharing to browsers

import FileViewer from 'react-native-file-viewer';
import {
  useGetBranchesQuery,
  useGetDepartmentQuery,
} from '../../../redux/services/contactSlice';
import EconerItems from '../../../components/EconerItems';
import EDocItems from '../../../components/EDocItems';
import {useGetEDocumentQuery} from '../../../redux/services/eCornerSlice';
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

export default function EDocument({navigation}) {
  const {data: EDocument, isLoading} = useGetEDocumentQuery();
  const [SelectedType, setSelectedType] = useState(1);

  console.log('EDocument', EDocument);
  const renderDocItems = ({item}) => (
    <EDocItems item={item} navigation={navigation} />
  );

  const downloadAndOpenPDF = async path => {
    try {
      const pdfUrl = `https://gisalesappapi.slicgeneral.com/api/print/${path}`;
      const localFilePath = `${RNFS.DocumentDirectoryPath}/${path}`;

      const options = {
        fromUrl: pdfUrl,
        toFile: localFilePath,
        headers: {
          'X-API-KEY': '12345abcde67890fghijklmnoprstuvwxz',
        },
      };

      // Download the file
      await RNFS.downloadFile(options).promise;

      // Open the downloaded file
      await FileViewer.open(localFilePath, {showOpenWithDialog: true});
      console.log('PDF opened successfully!');
    } catch (error) {
      console.error('Download/Open Error:', error);
    }
  };

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="E-Document" onPress={() => navigation.goBack()} />
      {/* <TouchableOpacity style={{ backgroundColor: 'red', height: 30, width: 30 }} onPress={() => downloadAndOpenPDF()}></TouchableOpacity> */}
      <View style={{paddingHorizontal: 5}}>
        <View style={[styles.searchWrap, {marginHorizontal: 15}]}>
          <TextInput
            style={styles.textInput}
            // onChangeText={v => setSearchText(v)}
            placeholder="Motor"
          />
          <TouchableOpacity
            // onPress={() => handleSearch()}
            style={styles.searchButton}>
            <Feather name="search" color={COLORS.white} size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.mainWrap}>
          <TouchableOpacity
            onPress={() => setSelectedType(1)}
            style={{
              backgroundColor:
                SelectedType == 1 ? COLORS.primary : COLORS.white,
              borderRadius: 12,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Text
              style={{
                color: SelectedType == 1 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              Motor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(2)}
            style={{
              backgroundColor:
                SelectedType == 2 ? COLORS.primary : COLORS.white,
              borderRadius: 12,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: SelectedType == 2 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              Non-Motor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(3)}
            style={{
              backgroundColor:
                SelectedType == 3 ? COLORS.primary : COLORS.white,
              borderRadius: 12,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: SelectedType == 3 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              Claims
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            paddingHorizontal: 15,
            fontFamily: Fonts.Roboto.Bold,
            color: COLORS.textColor,
            fontSize: 15,
            marginTop: 5,
          }}>
          {SelectedType == 1
            ? 'Motor'
            : SelectedType == 2
            ? 'Non-Motor'
            : 'Claims'}{' '}
          Documents
        </Text>
        <View>
          {isLoading ? (
            <View
              style={{
                position: 'absolute',
                // backgroundColor: 'red',
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LoadingScreen />
            </View>
          ) : (
            <FlatList
              data={
                SelectedType == 1
                  ? EDocument?.data?.motor
                  : SelectedType == 2
                  ? EDocument?.data?.nonMotor
                  : EDocument?.data?.claims
              }
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                fadeDuration: 1000,
                backgroundColor: 'transparent',
                paddingBottom: window.height * 0.25,
                paddingHorizontal: 15,
              }}
              renderItem={renderDocItems}
              // keyExtractor={item => item.id.toString()}
            />
          )}
        </View>
      </View>
    </View>
  );
}

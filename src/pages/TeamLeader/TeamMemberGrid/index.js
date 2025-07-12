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
  StatusBar,
} from 'react-native';
import {Styles} from '../../../theme/Styles';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import Button from '../../../components/Button';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Orientation from 'react-native-orientation-locker';
import Header from '../../../components/Header';
import OutlinedTextBox from '../../../components/OutlinedTextBox';
import LandscapeHeader from '../../../components/LandscapeHeader';
import Building from './../../../icons/Building.png';
import HorizontalReportTable from '../../../components/HorizontalReportTable';
import {
  useRmReportQuery,
  useTeamLeaderReportQuery,
  useTeamMemberReportQuery,
} from '../../../redux/services/ReportApiSlice';
import DropdownComponent from '../../../components/DropdownComponent';
import LoaderKit from 'react-native-loader-kit';
import OutlinedTextView from '../../../components/OutlinedTextView';

const window = Dimensions.get('window');
const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

export default function TeamMemberGrid({navigation, route}) {
  const {Title = ''} = route.params || {};
  const userCode = useSelector(state => state.Profile.userCode);

  const branchCode = useSelector(
    state => state.Profile.profile.user.branchCode,
  );
  console.log('branchCode', branchCode);
  const [value, setValue] = useState('nop');
  const [isFocus, setIsFocus] = useState(false);
  const [SelectedType, setSelectedType] = useState('G');
  const [SelectedMonth, setSelectedMonth] = useState(0);
  const tableHead = [
    'Team Member',
    'Renewal',
    'NB',
    'Refunds',
    'Endorsements',
    'Total',
  ];
  const columnWidths = [150, 120, 120, 160, 120, 120];
  const [isLandscape, setIsLandscape] = useState(false);
  const IndividualStatResponse = useSelector(
    state => state.teamStat.reportResponse.data,
  );
  const {
    data: TeamLeaderReport,
    error: TeamLeaderReportError,
    // isLoading: TeamLeaderReportLoading,
    isFetching: TeamLeaderReportLoading,
  } = useTeamMemberReportQuery({
    // branch: 26,
    userCode: userCode,
    year: new Date().getFullYear(),
    dept: SelectedType,
    startMonth: SelectedMonth == '00' ? '01' : SelectedMonth,
    endMonth: SelectedMonth == '00' ? '12' : SelectedMonth,
    // endMonth:
    //   SelectedMonth == '00'
    //     ? '12'
    //     : String(parseInt(SelectedMonth, 10) + 1).padStart(2, '0'),

    type: value,
  });
  console.log('TeamLeaderReport', TeamLeaderReport);

  const tableData = TeamLeaderReport?.data?.map(item => [
    item?.teamMember?.toString() ?? '',

    item?.renewal?.toLocaleString() ?? '0.00',
    item?.nb?.toLocaleString() ?? '0.00',
    // item?.refundPpw?.toString() ?? '',
    {
      ppw: item?.refundPpw?.toLocaleString() ?? '0.00',
      other: item?.refundOther?.toLocaleString() ?? '0.00',
    },
    item?.endorsement?.toLocaleString() ?? '0.00',
    (
      item?.renewal +
      item?.nb +
      item?.refundPpw +
      item?.refundOther +
      item?.endorsement
    ).toLocaleString() ?? '0.00',
  ]);

  const toggleOrientation = () => {
    if (isLandscape) {
      Orientation.lockToPortrait(); // Lock screen to portrait mode
    } else {
      Orientation.lockToLandscape(); // Lock screen to landscape mode
    }
    setIsLandscape(!isLandscape);
  };

  const agentList =
    TeamLeaderReport && TeamLeaderReport.data
      ? TeamLeaderReport.data.map(item => ({
          label: item.teamLeader,
          value: item.teamLeader,
        }))
      : [];

  const dropdownOptions = [{label: 'All', value: 'All'}, ...agentList];

  return (
    <View style={Styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      {/* <HeaderBackground /> */}
      <View style={{paddingHorizontal: isLandscape ? 20 : 0}}>
        {isLandscape == true ? (
          <LandscapeHeader
            haveSearch={false}
            Title={'Team Member Report'}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <Header
            Title={'Team Member Report'}
            onPress={() => navigation.goBack()}
            haveFilters={false}
            haveWhatsapp={false}
            haveMenu={false}
          />
        )}
      </View>
      {/* <Text style={{ color: 'black' }}>nin</Text> */}
      <View
        style={{
          justifyContent: 'flex-end',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          paddingRight: 20,
        }}>
        <TouchableOpacity
          onPress={toggleOrientation}
          style={{flexDirection: 'row', gap: 5}}>
          <Text
            style={{
              color: COLORS.textColor,
              fontFamily: Fonts.Roboto.Bold,
            }}>
            {isLandscape ? 'List View' : 'Grid view'}
          </Text>
          {isLandscape ? (
            <MaterialIcons color={COLORS.primary} name="list-alt" size={20} />
          ) : (
            <MaterialCommunityIcons
              color={COLORS.primary}
              name="view-grid-outline"
              size={20}
            />
          )}
        </TouchableOpacity>
      </View>
      {isLandscape == true ? (
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          style={{}}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginVertical: 5,
            }}>
            <View style={{flex: 0.19, marginHorizontal: 2}}>
              <DropdownComponent
                label={'View Details'}
                mode={'modal'}
                onValueChange={setValue}
                dropdownData={[{label: 'NOP', value: '1'}]}
              />
            </View>
            <View style={{flex: 0.2, marginHorizontal: 2}}>
              <DropdownComponent
                label={'Type'}
                mode={'modal'}
                onValueChange={setSelectedType}
                dropdownData={[
                  {label: 'General Cumulative', value: 'G'},
                  {label: 'Motor Monthly', value: 'M'},
                ]}
              />
            </View>
            <View style={{flex: 0.18, marginHorizontal: 2}}>
              <DropdownComponent
                label={'Month'}
                mode={'modal'}
                onValueChange={setSelectedMonth}
                dropdownData={[
                  {label: 'Cumulative', value: '00'},
                  {label: 'January', value: '01'},
                  {label: 'February', value: '02'},
                  {label: 'March', value: '03'},
                  {label: 'April', value: '04'},
                  {label: 'May', value: '05'},
                  {label: 'June', value: '06'},
                  {label: 'July', value: '07'},
                  {label: 'August', value: '08'},
                  {label: 'September', value: '09'},
                  {label: 'October', value: '10'},
                  {label: 'November', value: '11'},
                  {label: 'December', value: '12'},
                ]}
              />
            </View>
            {/* <View style={{ flex: 0.19, marginHorizontal: 2 }}>
              <DropdownComponent
                label={'Agent'}
                mode={'modal'}
                dropdownData={dropdownOptions}
              />
            </View> */}
            <View style={{flex: 0.13, marginHorizontal: 2}}>
              <Button Title={'Apply'} />
            </View>
          </View>
          {tableData?.length == 0 ? (
            <View
              style={{
                flex: 1,
                marginTop: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={Styles.errorText}>Sorry, No Data found</Text>
            </View>
          ) : (
            <HorizontalReportTable
              onPress={() => navigation.navigate('PolicyDetails')}
              haveTotal={false}
              tableHead={tableHead}
              tableData={tableData}
              columnWidths={columnWidths}
            />
          )}
          {/* <HorizontalReportTable
            onPress={() => navigation.navigate('PolicyDetails')}
            haveTotal={false}
            tableHead={tableHead}
            tableData={tableData}
            columnWidths={columnWidths}
          /> */}
        </ScrollView>
      ) : (
        <FlatList
          data={TeamLeaderReport?.data}
          initialNumToRender={4}
          renderToHardwareTextureAndroid={true}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            padding: 10,
            paddingBottom: window.height * 0.25,
          }}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                height: window.height * 0.7,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {!TeamLeaderReportLoading && (
                <Text style={Styles.errorText}>Sorry, No Data found</Text>
              )}
            </View>
          }
          renderItem={({item}) => (
            <View
              style={{
                borderRadius: 15,
                backgroundColor: COLORS.white,
                elevation: 10,
                margin: 10,
                padding: 15,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* <Fontisto color={COLORS.primaryGreen} name="person" size={23} /> */}
                <Image
                  style={{height: 17, width: 17}}
                  source={Building}></Image>
                <Text
                  style={{
                    marginLeft: 10,
                    fontFamily: Fonts.Roboto.Bold,
                    fontSize: 14,
                    color: COLORS.textColor,
                  }}>
                  {item?.teamMember?.toString() ?? ''}
                </Text>
              </View>

              {/* First Row */}
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  gap: 10,
                  width: '100%',
                }}>
                <View style={{flex: 1}}>
                  {/* <OutlinedTextBox
                    Title={'Renewal'}
                    readOnly={true}
                    value={
                      item?.renewal !== null && item?.renewal !== undefined
                        ? Number(item?.renewal).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : ''
                    }
                  /> */}
                  <OutlinedTextView
                    Title={'Renewal'}
                    value={
                      item?.renewal !== null && item?.renewal !== undefined
                        ? Number(item?.renewal).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : ''
                    }
                  />
                </View>

                <View style={{flex: 1}}>
                  {/* <OutlinedTextBox
                    Title={'NB'}
                    readOnly={true}
                    value={
                      item?.renewal !== null && item?.nb !== undefined
                        ? Number(item?.nb).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : ''
                    }
                  /> */}
                  <OutlinedTextView
                    Title={'NB'}
                    value={
                      item?.renewal !== null && item?.nb !== undefined
                        ? Number(item?.nb).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : ''
                    }
                  />
                </View>
              </View>

              {/* Second Row */}
              <View style={{flexDirection: 'row', gap: 10, width: '100%'}}>
                <View style={{flex: 1}}>
                  {/* <OutlinedTextBox
                    Title={'PPW'}
                    readOnly={true}
                    value={
                      item.renewal !== null && item?.refundPpw !== undefined
                        ? Number(item.refundPpw).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : ''
                    }
                  /> */}
                  <OutlinedTextView
                    Title={'PPW'}
                    value={
                      item.renewal !== null && item?.refundPpw !== undefined
                        ? Number(item.refundPpw).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : ''
                    }
                  />
                </View>

                <View style={{flex: 1}}>
                  {/* <OutlinedTextBox
                    Title={'Others'}
                    readOnly={true}
                    value={
                      item?.renewal !== null && item?.refundOther !== undefined
                        ? Number(item.refundOther).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : ''
                    }
                  /> */}
                  <OutlinedTextView
                    Title={'Others'}
                    value={
                      item?.renewal !== null && item?.refundOther !== undefined
                        ? Number(item.refundOther).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : ''
                    }
                  />
                </View>
              </View>

              {/* Third Row */}
              <View>
                {/* <OutlinedTextBox
                  Title={'Endorsement'}
                  readOnly={true}
                  value={
                    item.renewal !== null && item.endorsement !== undefined
                      ? Number(item?.endorsement)?.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : ''
                  }
                /> */}
                {/* <View style={{marginTop: 10}}>
                  <View
                    style={{
                      height: 47,
                      borderColor: COLORS.warmGray,
                      borderWidth: 1,

                      borderRadius: 10,
                      justifyContent: 'center',
                      paddingLeft: 10,
                    }}>
                    <Text style={{color: COLORS.ashBlue}}>
                      {item.renewal !== null && item.endorsement !== undefined
                        ? Number(item?.endorsement)?.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : ''}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: COLORS.ashBlue,
                      fontSize: 12,
                      position: 'absolute',
                      top: -10,
                      paddingHorizontal: 5,
                      backgroundColor: COLORS.white,
                      left: 10,
                    }}>
                    Endorsement
                  </Text>
                </View> */}
                <OutlinedTextView
                  Title={'Endorsement'}
                  value={
                    item.renewal !== null && item?.endorsement !== undefined
                      ? Number(item?.endorsement)?.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : ''
                  }
                />
              </View>

              <View>
                {/* <OutlinedTextBox
                  Title={'Total'}
                  readOnly={true}
                  value={
                    (
                      item?.renewal +
                      item?.nb +
                      item?.refundPpw +
                      item?.refundOther +
                      item?.endorsement
                    ).toLocaleString() ?? '0.00'
                  }
                /> */}
                <OutlinedTextView
                  Title={'Total'}
                  value={
                    (
                      item?.renewal +
                      item?.nb +
                      item?.refundPpw +
                      item?.refundOther +
                      item?.endorsement
                    ).toLocaleString() ?? '0.00'
                  }
                />
              </View>
            </View>
          )}
        />
      )}
      {TeamLeaderReportLoading && (
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            width: '100%',
            height: '100%',
          }}>
          <LoaderKit
            style={{width: 50, height: 50}}
            name={'LineScalePulseOutRapid'}
            color={COLORS.grayText}
          />
        </View>
      )}
    </View>
  );
}

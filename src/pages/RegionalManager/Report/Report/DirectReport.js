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
  StatusBar,
} from 'react-native';
import {Styles} from '../../../../theme/Styles';
import {FlatList} from 'react-native';
import {styles} from './styles';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';
import HorizontalTeamMemberTable from '../../../../components/HorizontalTeamMemberTable';
import DropdownComponent from '../../../../components/DropdownComponent';
import SmallButton from '../../../../components/SmallButton';
import Button from '../../../../components/Button';
import COLORS from '../../../../theme/colors';
import Fonts from '../../../../theme/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Orientation from 'react-native-orientation-locker';
import Header from '../../../../components/Header';
import OutlinedTextBox from '../../../../components/OutlinedTextBox';
import LandscapeHeader from '../../../../components/LandscapeHeader';
import Building from './../../../../icons/Building.png';
import HorizontalReportTable from '../../../../components/HorizontalReportTable';
import {
  useDirectReportQuery,
  useRmReportQuery,
} from '../../../../redux/services/ReportApiSlice';
import ReportFilter from '../../../../components/ReportFilter';
import LoaderKit from 'react-native-loader-kit';
import OutlinedTextView from '../../../../components/OutlinedTextView';

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

export default function DirectReport({navigation, route}) {
  const {Title = ''} = route.params || {};
  const profile = useSelector(state => state.Profile.profile);
  const profileResponse = profile?.user;
  const regionName = profileResponse?.branchCode;
  const [value, setValue] = useState(1);
  const [SelectedType, setSelectedType] = useState('ALL');
  const [selectedMonth, setSelectedmonth] = useState('00');
  const [type, setType] = useState();
  const [branch, setBranch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const tableHead = [
    'Branch',
    'Renewal',
    'NB',
    'Refunds',
    'Endorsements',
    'Total',
  ];
  const columnWidths = [150, 145, 130, 160, 135, 135];
  const [isLandscape, setIsLandscape] = useState(false);

  const IndividualStatResponse = useSelector(
    state => state.teamStat.reportResponse.data,
  );
  const {
    data: RmReport,
    error: RmReportError,
    isLoading: RmReportLoading,
    refetch,
    isFetching: RmReportFetching,
  } = useDirectReportQuery({
    branch: regionName,
    startMonth: selectedMonth === 0 ? 1 : selectedMonth,
    endMonth: selectedMonth === 0 ? 12 : selectedMonth,
    year: new Date().getFullYear(),
    type: SelectedType,
    value: value,
  });
  // const tableData = RmReport?.data?.map(item => [
  //   item?.branch?.toString() ?? '',

  //   item?.renewal?.toString() ?? '',
  //   item?.nb?.toString() ?? '',
  //   // item?.refundPpw?.toString() ?? '',
  //   {
  //     ppw: item?.refundPpw?.toString() ?? '',
  //     other: item?.refundOther?.toString() ?? '',
  //   },
  //   item?.endorsement?.toString() ?? '',
  //   item?.total?.toString() ?? '',
  // ]);

  const tableData = RmReport?.data?.map(item => [
    item?.direct?.toString() ?? '',
    value == 1
      ? item?.renewal?.toLocaleString() ?? ''
      : item?.nopRenewal?.toLocaleString() ?? '',
    value == 1
      ? item?.nb?.toLocaleString() ?? ''
      : item?.nopNew?.toLocaleString() ?? '',
    // item?.refundPpw?.toString() ?? '',
    {
      ppw:
        value == 1
          ? item?.refundPpw?.toLocaleString() ?? ''
          : item?.nopPpw?.toLocaleString() ?? '',
      other:
        value == 1
          ? item?.refundOther?.toLocaleString() ?? ''
          : item?.nopOtherRefund?.toLocaleString() ?? '',
    },
    value == 1
      ? item?.endorsement?.toLocaleString() ?? ''
      : item?.nopEndorsements?.toLocaleString() ?? '',

    value == 1
      ? (
          item?.renewal +
          item?.refundPpw +
          item?.nb +
          item?.refundOther +
          item?.endorsement
        ).toLocaleString() ?? ''
      : (
          item?.nopRenewal +
          item?.nopPpw +
          item?.nopNew +
          item?.nopOtherRefund +
          item?.nopEndorsements
        ).toLocaleString() ?? '',
  ]);

  const branchList =
    RmReport && RmReport.data
      ? RmReport.data.map(item => ({
          label: item.direct,
          value: item.direct,
        }))
      : [];

  // {
  //   "branch": 412,
  //   "renewal": "Athurugiriya",
  //   "nb": 8252093.38,
  //   "refundPpw": 12022791.43,
  //   "refundOther": 2303109.63,
  //   "endorsement": 0,
  //   "total": 0,
  // }

  const dropdownOptions = [{label: 'All', value: 'All'}, ...branchList];
  useEffect(() => {
    const isValid = dropdownOptions.some(option => option.value === branch);
    if (!isValid && branch !== '') {
      setBranch(''); // Reset to default value if invalid
    }
  }, [branch, dropdownOptions]);
  console.log('RmReport', RmReport);

  const toggleOrientation = () => {
    if (isLandscape) {
      Orientation.lockToPortrait(); // Lock screen to portrait mode
    } else {
      Orientation.lockToLandscape(); // Lock screen to landscape mode
    }
    setIsLandscape(!isLandscape);
  };

  return (
    <View style={Styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <ReportFilter
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        dropdownOptions={dropdownOptions}
        lastTitle={'Branch'}
        onPressSearch={() => {
          // PolicyListResponse(searchData);
          setModalVisible(false);
          refetch();
        }}
        initialValues={{
          type: SelectedType,
          month: selectedMonth,
          view: value,
          branch: branch,
        }}
        onPressClear={() => console.log('clear ', policyValues)}
        Name="Report Filter"
        onViewDetailsChange={value => setValue(value)}
        onTypeChange={value => setSelectedType(value)}
        onMonthChange={value => setSelectedmonth(value)}
        onBranchChange={value => setBranch(value)}
      />

      {/* <HeaderBackground /> */}
      <View style={{paddingHorizontal: isLandscape ? 20 : 0}}>
        {isLandscape == true ? (
          <LandscapeHeader
            haveSearch={false}
            Title={Title + ' Report'}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <Header
            Title={Title + ' Report'}
            onPress={() => navigation.goBack()}
            haveFilters={false}
            haveWhatsapp={false}
            haveMenu={false}
          />
        )}
      </View>
      <View
        style={{
          justifyContent: isLandscape == false ? 'space-between' : 'flex-end',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          paddingRight: 20,
        }}>
        {isLandscape == false && (
          <View style={{alignItems: 'flex-end', marginHorizontal: 20}}>
            <TouchableOpacity
              style={{flexDirection: 'row', gap: 5}}
              onPress={() => setModalVisible(true)}>
              <Text
                style={{
                  color: COLORS.textColor,
                  fontFamily: Fonts.Roboto.Bold,
                  // fontSize: 13
                }}>
                Filter By
              </Text>
              <MaterialIcons
                name="filter-list"
                size={20}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        )}
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
        <View
          style={{
            flex: 1,
            paddingHorizontal: 1,
            paddingTop: 0,
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              // marginVertical: 5,
            }}>
            <View style={{flex: 0.19, marginHorizontal: 2}}>
              <DropdownComponent
                label={'View Details'}
                mode={'modal'}
                value={value}
                search={false}
                nonClearable={true}
                onValueChange={setValue}
                dropdownData={[
                  {label: 'Value', value: 1},
                  {label: 'NOP', value: 2},
                ]}
              />
            </View>
            <View style={{flex: 0.2, marginHorizontal: 2}}>
              <DropdownComponent
                label={'Type'}
                mode={'modal'}
                search={false}
                nonClearable={SelectedType == 'ALL' ? true : false}
                value={SelectedType}
                onValueChange={value => {
                  setSelectedType(value ?? 'ALL');
                  if (value == 'G') {
                    setSelectedmonth('00'); // Reset month to '00' if type is 'G'
                  } else if (value == 'M') {
                    setSelectedmonth(null); // Set month to '01' if type is 'M
                  }
                  // 👈 If value is null, use 'ALL'
                }}
                dropdownData={[
                  {label: 'General Cumulative', value: 'G'},
                  {label: 'Motor Monthly', value: 'M'},
                ]}
              />
            </View>
            <View style={{flex: 0.18, marginHorizontal: 2}}>
              {/* <DropdownComponent
                label={'Month'}
                mode={'modal'}
                value={selectedMonth}
                nonClearable={true}
                // onValueChange={setSelectedMonth}
                onValueChange={value => {
                  setSelectedmonth(value ?? '00'); // 👈 If value is null, use 'ALL'
                }}
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
              /> */}
              <DropdownComponent
                label={'Month'}
                mode={'modal'}
                search={true}
                disabled={SelectedType == 'G'} // Disable if type is 'G'
                value={selectedMonth}
                nonClearable={true}
                // onValueChange={setSelectedMonth}
                onValueChange={value => {
                  setSelectedmonth(value ?? '00'); // 👈 If value is null, use 'ALL'
                }}
                dropdownData={
                  SelectedType == 'M'
                    ? [
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
                      ]
                    : SelectedType == 'G'
                    ? [{label: 'Cumulative', value: '00'}]
                    : [
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
                      ]
                }
              />
            </View>
            <View style={{flex: 0.19, marginHorizontal: 2}}>
              <DropdownComponent
                label={'Branch'}
                mode={'modal'}
                value={branch}
                dropdownData={dropdownOptions}
                onValueChange={value => setBranch(value)} // ✅ Captures selection
              />
            </View>
            <View style={{flex: 0.13, marginHorizontal: 10}}>
              <Button Title={'Apply'} />
            </View>
          </View>
          <HorizontalReportTable
            onPress={() => navigation.navigate('PolicyDetails')}
            haveTotal={false}
            tableHead={tableHead}
            tableData={tableData}
            columnWidths={columnWidths}
          />
        </View>
      ) : (
        <FlatList
          data={RmReport?.data}
          initialNumToRender={2}
          keyExtractor={item => item.id}
          contentContainerStyle={{padding: 10}}
          ListEmptyComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: window.height * 0.7,
              }}>
              {!RmReportFetching && (
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.errorBorder,
                    fontFamily: Fonts.Roboto.SemiBold,
                  }}>
                  Sorry, No Data Found
                </Text>
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
                  {item?.direct?.toString() ?? ''}
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
                  <OutlinedTextView
                    Title={'Renewal'}
                    value={
                      value == 1
                        ? item?.renewal != null
                          ? Number(item.renewal).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : ''
                        : item?.nopRenewal != null
                        ? Number(item.nopRenewal).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : ''
                    }
                  />
                </View>

                <View style={{flex: 1}}>
                  <OutlinedTextView
                    Title={'NB'}
                    value={
                      value == 1
                        ? item?.nb != null
                          ? Number(item.nb).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : ''
                        : item?.nopNew != null
                        ? Number(item.nopNew).toLocaleString('en-US')
                        : ''
                    }
                  />
                </View>
              </View>

              {/* Second Row */}
              <View style={{flexDirection: 'row', gap: 10, width: '100%'}}>
                <View style={{flex: 1}}>
                  <OutlinedTextView
                    Title={'PPW'}
                    value={
                      value == 1
                        ? item?.refundPpw != null
                          ? Number(item.refundPpw).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : ''
                        : item?.nopPpw != null
                        ? Number(item.nopPpw).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : ''
                    }
                  />
                </View>

                <View style={{flex: 1}}>
                  <OutlinedTextView
                    Title={'Others'}
                    value={
                      value == 1
                        ? item?.refundOther != null
                          ? Number(item.refundOther).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : ''
                        : item?.nopOtherRefund != null
                        ? Number(item.nopOtherRefund).toLocaleString('en-US', {
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
                <OutlinedTextView
                  Title={'Endorsement'}
                  value={
                    value == 1
                      ? item?.endorsement != null
                        ? Number(item.endorsement).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : ''
                      : item?.nopEndorsements != null
                      ? Number(item.nopEndorsements).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : ''
                  }
                />
              </View>

              <View>
                <OutlinedTextView
                  Title={'Total'}
                  value={Number(
                    value == 1
                      ? (item?.renewal ?? 0) +
                          (item?.nb ?? 0) +
                          (item?.refundPpw ?? 0) +
                          (item?.refundOther ?? 0) +
                          (item?.endorsement ?? 0)
                      : (item?.nopRenewal ?? 0) +
                          (item?.nopPpw ?? 0) +
                          (item?.nopNew ?? 0) +
                          (item?.nopOtherRefund ?? 0) +
                          (item?.nopEndorsements ?? 0),
                  ).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}

                  // value={
                  //   value == 1
                  //     ? (
                  //         (item?.renewal ?? 0) +
                  //         (item?.nb ?? 0) +
                  //         (item?.refundPpw ?? 0) +
                  //         (item?.refundOther ?? 0) +
                  //         (item?.endorsement ?? 0)
                  //       ).toLocaleString()
                  //     : (
                  //         (item?.nopRenewal ?? 0) +
                  //         (item?.nopPpw ?? 0) +
                  //         (item?.nb ?? 0) +
                  //         (item?.nopOtherRefund ?? 0) +
                  //         (item?.nopEndorsements ?? 0)
                  //       ).toLocaleString()
                  // }
                />
              </View>
            </View>
          )}
        />
      )}
      {RmReportFetching && (
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

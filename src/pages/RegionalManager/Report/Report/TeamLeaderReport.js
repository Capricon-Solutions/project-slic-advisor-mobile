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
import {Styles} from '../../../../theme/Styles';
import {FlatList} from 'react-native';
import {styles} from './styles';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';
import HorizontalMargedTableComponent from '../../../../components/HorizontalMargedTableComponent';
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
  useRmReportQuery,
  useTeamLeaderReportQuery,
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

export default function TeamLeaderReport({navigation, route}) {
  const {Title = ''} = route.params || {};

  const [value, setValue] = useState(null);
  const [SelectedType, setSelectedType] = useState(1);
  const [selectedMonth, setSelectedmonth] = useState(new Date().getMonth() + 1);
  const [type, setType] = useState();
  const [branch, setBranch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const tableHead = [
    'Team Leader',
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
    isLoading: TeamLeaderReportLoading,
    isFetching: TeamLeaderReportFetching,
  } = useTeamLeaderReportQuery({
    branch: branch,
    type: type,
    month: selectedMonth,
    type: SelectedType,
    value: value,
  });
  const tableData = TeamLeaderReport?.data?.map(item => [
    item?.direct?.toString() ?? '',

    item?.renewal?.toString() ?? '',
    item?.nb?.toString() ?? '',
    // item?.refundPpw?.toString() ?? '',
    {
      ppw: item?.refundPpw?.toString() ?? '',
      other: item?.refundOther?.toString() ?? '',
    },
    item?.endorsement?.toString() ?? '',
    item?.total?.toString() ?? '',
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
          label: item.direct,
          value: item.direct,
        }))
      : [];

  const dropdownOptions = [{label: 'All', value: 'All'}, ...agentList];

  return (
    <View style={Styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <ReportFilter
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        dropdownOptions={dropdownOptions}
        lastTitle={'Agent'}
        onPressSearch={() => {
          // PolicyListResponse(searchData);
          setModalVisible(false);
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
      {/* <Text style={{ color: 'black' }}>nin</Text> */}
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
                dropdownData={[{label: 'NOP', value: '1'}]}
              />
            </View>
            <View style={{flex: 0.2, marginHorizontal: 2}}>
              <DropdownComponent
                label={'Type'}
                mode={'modal'}
                dropdownData={[
                  {label: 'General Cumulative', value: '1'},
                  {label: 'Motor Monthly', value: '2'},
                ]}
              />
            </View>
            <View style={{flex: 0.18, marginHorizontal: 2}}>
              <DropdownComponent
                label={'Month'}
                mode={'modal'}
                dropdownData={[
                  {label: 'Cumulative', value: '0'},
                  {label: 'January', value: '1'},
                  {label: 'February', value: '2'},
                  {label: 'March', value: '3'},
                  {label: 'April', value: '4'},
                  {label: 'May', value: '5'},
                  {label: 'June', value: '6'},
                  {label: 'July', value: '7'},
                  {label: 'August', value: '8'},
                  {label: 'September', value: '9'},
                  {label: 'October', value: '10'},
                  {label: 'November', value: '11'},
                  {label: 'December', value: '12'},
                ]}
                selectedValue={selectedMonth}
                onValueChange={value => setSelectedmonth(value)}
              />
            </View>
            <View style={{flex: 0.19, marginHorizontal: 2}}>
              <DropdownComponent
                label={'Agent'}
                mode={'modal'}
                dropdownData={dropdownOptions}
                onValueChange={value => setBranch(value)} // ✅ Captures selection
              />
            </View>
            <View style={{flex: 0.13, marginHorizontal: 2}}>
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
        </ScrollView>
      ) : (
        <FlatList
          data={TeamLeaderReport?.data}
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
              {!TeamLeaderReportFetching && (
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
                <OutlinedTextView
                  Title={'Endorsement'}
                  value={
                    item.renewal !== null && item.endorsement !== undefined
                      ? Number(item?.endorsement)?.toLocaleString('en-US', {
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
                  value={
                    item?.renewal !== null && item?.total !== undefined
                      ? Number(item.total)?.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : ''
                  }
                />
              </View>
            </View>
          )}
        />
      )}
      {TeamLeaderReportFetching && (
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

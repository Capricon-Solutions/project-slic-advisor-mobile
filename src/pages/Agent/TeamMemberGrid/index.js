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
import ContactListItem from '../../../components/contactListItem';
import DepartmentItem from '../../../components/DepartmentItem';
import {styles} from './styles';
import {Dropdown} from 'react-native-element-dropdown';
import LandscapeHeader from '../../../components/LandscapeHeader';
import {useSelector} from 'react-redux';
import HorizontalMargedTableComponent from '../../../components/HorizontalMargedTableComponent';
import HorizontalTeamMemberTable from '../../../components/HorizontalTeamMemberTable';
import DropdownComponent from '../../../components/DropdownComponent';
import SmallButton from '../../../components/SmallButton';
import Button from '../../../components/Button';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Orientation from 'react-native-orientation-locker';
import Header from '../../../components/Header';
import OutlinedTextBox from '../../../components/OutlinedTextBox';

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

export default function TeamMemberGrid({navigation}) {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [SelectedType, setSelectedType] = useState(1);
  const tableHead = ['', 'Renewals', 'NB', 'Refunds', 'Endorsements', 'Total'];
  const columnWidths = [150, 145, 130, 160, 135, 135];
  const [isLandscape, setIsLandscape] = useState(false);
  // const tableData = [
  //   ['Region 1', 10, 5, 8, 3, 18, 8],
  //   ['Region 2', 7, 2, 6, 4, 13, 6],
  //   ['Region 3', 9, 4, 5, 2, 14, 6],
  //   ['Region 4', 6, 3, 7, 5, 13, 8],
  //   ['Total', 32, 14, 26, 14, 58, 28],
  // ];

  const agentsData = [
    {
      id: '1',
      name: 'Agent 01',
      renewal: '500,000',
      nb: '500,000',
      ppw: '500,000',
      others: '0',
      endorsement: '0',
      total: '850,000',
    },
  ];

  const IndividualStatResponse = useSelector(
    state => state.teamStat.teamMemberResponse.data,
  );

  const tableData = IndividualStatResponse?.tableData?.map(item => [
    item?.first.toString() ?? '',

    item?.Renewal.toString() ?? '',
    item?.NB.toString() ?? '',
    item?.Refund,
    item?.Endorsement.toString() ?? '',
    item?.Total.toString() ?? '',
  ]);
  const renderItem = ({item}) => <ContactListItem item={item} />;

  const renderDepartmentItem = ({item}) => <DepartmentItem item={item} />;

  const handleLoad = (from, to) => {
    console.log('Selected From:', from);
    console.log('Selected To:', to);
  };
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

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
      {/* <HeaderBackground /> */}
      <View style={{paddingHorizontal: isLandscape ? 20 : 0}}>
        {isLandscape == true ? (
          <LandscapeHeader
            haveSearch={false}
            Title="Team Member"
            onPress={() => navigation.goBack()}
          />
        ) : (
          <Header
            Title="Team Member"
            onPress={() => navigation.goBack()}
            haveFilters={false}
            haveWhatsapp={false}
            haveMenu={false}
          />
        )}
      </View>
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
            <View style={{flex: 0.18, marginHorizontal: 2}}>
              <DropdownComponent
                label={'View Details'}
                mode={'modal'}
                dropdownData={[
                  {label: 'Item 1', value: '1'},
                  {label: 'Item 2', value: '2'},
                ]}
              />
            </View>
            <View style={{flex: 0.25, marginHorizontal: 2}}>
              <DropdownComponent
                label={'General Monthly'}
                mode={'modal'}
                dropdownData={[
                  {label: 'Item 1', value: '1'},
                  {label: 'Item 2', value: '2'},
                  {label: 'Item 3', value: '3'},
                  {label: 'Item 4', value: '4'},
                ]}
              />
            </View>
            <View style={{flex: 0.2, marginHorizontal: 2}}>
              <DropdownComponent
                label={'Month'}
                mode={'modal'}
                dropdownData={[
                  {label: 'Item 1', value: '1'},
                  {label: 'Item 2', value: '2'},
                  {label: 'Item 3', value: '3'},
                  {label: 'Item 4', value: '4'},
                  {label: 'Item 5', value: '5'},
                  {label: 'Item 6', value: '6'},
                  {label: 'Item 7', value: '7'},
                  {label: 'Item 8', value: '8'},
                ]}
              />
            </View>
            <View style={{flex: 0.13, marginHorizontal: 2}}>
              <Button Title={'Apply'} />
            </View>
          </View>
          <HorizontalTeamMemberTable
            onPress={() => navigation.navigate('PolicyDetails')}
            haveTotal={false}
            tableHead={tableHead}
            tableData={tableData}
            columnWidths={columnWidths}
          />
        </ScrollView>
      ) : (
        <FlatList
          data={IndividualStatResponse?.tableData}
          initialNumToRender={2}
          keyExtractor={item => item.id}
          contentContainerStyle={{padding: 10}}
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
                <Fontisto color={COLORS.primaryGreen} name="person" size={23} />
                <Text
                  style={{
                    marginLeft: 10,
                    fontFamily: Fonts.Roboto.Bold,
                    fontSize: 14,
                    color: COLORS.textColor,
                  }}>
                  {item.first}
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
                  <OutlinedTextBox Title={'Renewal'} value={item.Renewal} />
                </View>

                <View style={{flex: 1}}>
                  <OutlinedTextBox Title={'NB'} value={item.NB} />
                </View>
              </View>

              {/* Second Row */}
              <View style={{flexDirection: 'row', gap: 10, width: '100%'}}>
                <View style={{flex: 1}}>
                  <OutlinedTextBox Title={'PPW'} value={item.Refund.ppw} />
                </View>

                <View style={{flex: 1}}>
                  <OutlinedTextBox Title={'Others'} value={item.Refund.other} />
                </View>
              </View>

              {/* Third Row */}
              <View>
                <OutlinedTextBox
                  Title={'Endorsement'}
                  value={item.Endorsement}
                />
              </View>

              <View>
                <OutlinedTextBox Title={'Total'} value={item.Total} />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

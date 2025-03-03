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

export default function Report({navigation}) {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [SelectedType, setSelectedType] = useState(1);
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

  const tableData = IndividualStatResponse?.tableData?.map(item => [
    item?.first.toString() ?? '',

    item?.Renewal.toString() ?? '',
    item?.NB.toString() ?? '',
    item?.Refund,
    item?.Endorsement.toString() ?? '',
    item?.Total.toString() ?? '',
  ]);

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
            Title="Report"
            onPress={() => navigation.goBack()}
          />
        ) : (
          <Header
            Title="Report"
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
            <View style={{flex: 0.12, marginHorizontal: 2}}>
              <DropdownComponent
                label={'Branch'}
                mode={'modal'}
                dropdownData={[
                  {label: 'Branch', value: '1'},
                  {label: 'All', value: '2'},
                ]}
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

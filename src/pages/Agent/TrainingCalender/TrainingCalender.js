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
import TableComponent from '../../../components/TableComponent';
import DateRangePicker from '../../../components/DateRangePicker';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import SmallButton from '../../../components/SmallButton';

const window = Dimensions.get('window');

LocaleConfig.locales['fr'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  today: 'Today',
};

LocaleConfig.defaultLocale = 'fr';

export default function TrainingCalender({navigation}) {
  const [selectedItem, setSelectedItem] = useState();
  const [selected, setSelected] = useState({
    '2025-02-01': {selected: true, marked: true, selectedColor: 'blue'},
    '2025-02-02': {marked: true},
    '2025-02-03': {selected: true, marked: true, selectedColor: 'blue'},
  });

  return (
    <View style={{height: window.height * 1}}>
      <View style={Styles.container}>
        <HeaderBackground />
        <Header Title="Training Calender" onPress={() => navigation.goBack()} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.Roboto.SemiBold,
              color: COLORS.textColor,
            }}>
            Select User Type
          </Text>
          <View style={{width: '45%'}}>
            <AutocompleteDropdown
              clearOnFocus={true}
              closeOnBlur={true}
              closeOnSubmit={false}
              // initialValue={{id: '2'}} // or just '2'
              onSelectItem={setSelectedItem}
              dataSet={[
                {id: '1', title: 'Myself'},
                {id: '2', title: 'Marketing executive'},
                {id: '2', title: 'Team Leader'},
                {id: '2', title: 'All'},
              ]}
            />
          </View>
        </View>

        <View
          style={{
            borderRadius: 15,
            backgroundColor: COLORS.white,
            padding: 5,
          }}>
          <Calendar
            onDayPress={day => {
              setSelected(day.dateString);
            }}
            style={{
              borderColor: 'gray',
              height: 350,
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: COLORS.primary,
              selectedDayTextColor: 'white',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#dd99ee',
            }}
            markedDates={selected}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.Roboto.SemiBold,
              fontSize: 14,
              color: COLORS.textColor,
            }}>
            Monday, 22/January/2025
          </Text>
          <View>
            {/* <SmallButton Title={'View Training List'} /> */}
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => onLoad(fromDate, toDate)}>
              <Text style={styles.smallButtonText}>View Training List</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Medium,
              fontSize: 14,
              color: COLORS.grayText,
              textAlign: 'center',
            }}>
            NO EVENTS FOR THE SELECTED DATE
          </Text>
        </View>
      </View>
    </View>
  );
}

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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import {styles} from './styles';

import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import SmallButton from '../../../components/SmallButton';
import NotAttending from '../../../components/NotAttending';
import {
  Checkbox,
  Button,
  Menu,
  Divider,
  PaperProvider,
} from 'react-native-paper';
import ActivityCard from '../../../components/ActivityCard';

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

export default function BPlanner({navigation}) {
  const [selectedItem, setSelectedItem] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [calenderVisible, setCalenderVisible] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const [selected, setSelected] = useState({
    '2025-02-01': {selected: true, marked: true, selectedColor: 'blue'},
    '2025-02-02': {marked: true},
    '2025-02-03': {selected: true, marked: true, selectedColor: 'blue'},
  });

  const [activities, setActivities] = useState([
    {
      id: 11483,
      status: 'Appointment',
      date: 'January 17, 2025',
      time: '10:00 AM - 12:00 PM',
      checked: false,
    },
    {
      id: 11484,
      status: 'Pending',
      date: 'January 18, 2025',
      time: '2:00 PM - 4:00 PM',
      checked: false,
    },
    {
      id: 11485,
      status: 'Completed',
      date: 'January 19, 2025',
      time: '1:00 PM - 3:00 PM',
      checked: false,
    },
  ]);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleCheckboxToggle = index => {
    setActivities(prev =>
      prev.map((item, i) =>
        i === index ? {...item, checked: !item.checked} : item,
      ),
    );
  };
  const menuItems = [
    {
      id: 1,
      title: 'Lead Creation',
      onPress: () => navigation.navigate('LeadCreation'),
    },
    {
      id: 1,
      title: 'Monthly Plan',
      onPress: () => navigation.navigate('MonthlyPlan'),
    },
    {
      id: 1,
      title: 'Show/ Hide Calendar',
      onPress: () => setCalenderVisible(!calenderVisible),
    },
  ];
  const isAnyItemSelected = activities.some(activity => activity.checked);

  return (
    <PaperProvider>
      <View style={Styles.container}>
        <NotAttending
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <View style={[Styles.container, {overflow: 'scroll'}]}>
          <HeaderBackground />
          <Header
            haveFilters={true}
            onFilterPress={() => navigation.navigate('LeadSearch')}
            haveMenu={true}
            menuItems={menuItems}
            Title="B Planner"
            onPress={() => navigation.goBack()}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            fadingEdgeLength={20}
            contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 10}}
            style={{}}>
            {calenderVisible && (
              <View
                style={{
                  borderRadius: 15,
                  backgroundColor: COLORS.white,
                  padding: 5,
                  elevation: 5,
                  marginVertical: 15,
                }}>
                <Calendar
                  onDayPress={day => {
                    setSelected(day.dateString);
                  }}
                  style={{
                    borderColor: 'gray',
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
            )}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <View>
                {/* <SmallButton Title={'View Training List'} /> */}
                <TouchableOpacity
                  style={styles.smallButton}
                  // onPress={() => navigation.navigate('TrainingList')}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    color={COLORS.white}
                    size={20}
                  />
                  <Text style={styles.smallButtonText}>Event Creationt</Text>
                </TouchableOpacity>
              </View>
              <View>
                {/* <SmallButton Title={'View Training List'} /> */}
                <TouchableOpacity
                  style={styles.smallButton}
                  // onPress={() => navigation.navigate('TrainingList')}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    color={COLORS.white}
                    size={20}
                  />
                  <Text style={styles.smallButtonText}>Activity Creation</Text>
                </TouchableOpacity>
              </View>
              {isAnyItemSelected && (
                <View>
                  {/* <SmallButton Title={'View Training List'} /> */}
                  <TouchableOpacity
                    style={styles.orangeButton}
                    // onPress={() => navigation.navigate('TrainingList')}
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      color={COLORS.white}
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
              )}

              <View>
                {/* <SmallButton Title={'View Training List'} /> */}
                <TouchableOpacity
                  style={styles.orangeButton}
                  // onPress={() => navigation.navigate('TrainingList')}
                >
                  <MaterialCommunityIcons
                    name="arrow-up"
                    color={COLORS.white}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text
                style={{
                  fontFamily: Fonts.Roboto.SemiBold,
                  color: COLORS.textColor,
                  fontSize: 14,
                  marginVertical: 10,
                }}>
                Monday, 22/January/2025
              </Text>
            </View>

            {activities.map((activity, index) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onPress={() => navigation.navigate('ActivityDetails')}
                index={index}
                handleCheckboxToggle={handleCheckboxToggle}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </PaperProvider>
  );
}

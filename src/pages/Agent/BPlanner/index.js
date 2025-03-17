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
} from 'react-native';
import { Styles } from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import LoaderKit from 'react-native-loader-kit'
import { styles } from './styles';

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
import EventCreation from '../../../components/EventCreation';
import ActivityCreation from '../../../components/ActivityCreation';
import { useGetEventsAndActivitiessQuery, useGetLeadsQuery } from '../../../redux/services/plannerSlice';

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

export default function BPlanner({ navigation }) {
  const [selectedItem, setSelectedItem] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [calenderVisible, setCalenderVisible] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [selected, setSelected] = useState({
    '2025-02-01': { selected: true, marked: true, selectedColor: 'blue' },
    '2025-02-02': { marked: true },
    '2025-02-03': { selected: true, marked: true, selectedColor: 'blue' },
  });
  const date = "2025-03-17";
  const { data: PlannerActivities, isFetching, error } = useGetEventsAndActivitiessQuery({ date });
  // const { data: Leads, error: leadError } = useGetLeadsQuery();
  const { data: Leads } = useGetLeadsQuery({ date }, { refetchOnMountOrArgChange: false });

  const [LeadList, setLeadList] = useState([]);
  const updatedActivities = PlannerActivities?.data?.plannerActivities?.map(activity => ({ ...activity, checked: false }));
  const [activities, setActivities] = useState(updatedActivities);
  useEffect(() => {
    setActivities(updatedActivities);

  }, [isFetching])
  useEffect(() => {
    console.log("Leads", Leads);

    setLeadList(Leads?.data);
    console.log("LeadList", LeadList);
  }, [Leads])

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleCheckboxToggle = index => {
    setActivities(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item,
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
  const isAnyItemSelected = activities?.some(activity => activity.checked);

  return (
    <PaperProvider>
      <View style={Styles.container}>
        <NotAttending
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <EventCreation
          modalVisible={eventModalVisible}
          setModalVisible={setEventModalVisible}
        />
        <ActivityCreation
          modalVisible={activityModalVisible}
          setModalVisible={setActivityModalVisible}
          leadsData={LeadList}
        />
        <View style={[Styles.container, { overflow: 'scroll' }]}>
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
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
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
                  onPress={() => setEventModalVisible(true)}>
                  {/* <MaterialCommunityIcons
                    name="plus"
                    color={COLORS.white}
                    size={20}
                  /> */}
                  <Text style={styles.smallButtonText}>Event Creation</Text>
                </TouchableOpacity>
              </View>
              <View>
                {/* <SmallButton Title={'View Training List'} /> */}
                <TouchableOpacity
                  style={styles.smallButton}
                  onPress={() => setActivityModalVisible(true)}>
                  {/* <MaterialCommunityIcons
                    name="plus"
                    color={COLORS.white}
                    size={20}
                  /> */}
                  <Text style={styles.smallButtonText}>Activity Creation</Text>
                </TouchableOpacity>
              </View>
              {/* {isAnyItemSelected && ( */}
              <View>
                {/* <SmallButton Title={'View Training List'} /> */}
                <TouchableOpacity
                  disabled={!isAnyItemSelected}
                  style={isAnyItemSelected ? styles.orangeButton : styles.grayButton}
                // onPress={() => navigation.navigate('TrainingList')}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    color={COLORS.white}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
              {/* )} */}

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
            {isFetching ? (
              <View style={{
                alignItems: 'center', flex: 1, height: window.height * 0.3,
                justifyContent: 'center'
              }}>
                <LoaderKit
                  style={{ width: 50, height: 50 }}
                  name={'BallPulse'} // Optional: see list of animations below
                  color={COLORS.primary} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
                />
              </View>
            ) :
              (
                <View>


                  {activities?.map((activity, index) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      onPress={() => navigation.navigate('ActivityDetails')}
                      index={index}
                      handleCheckboxToggle={handleCheckboxToggle}
                    />
                  ))}
                </View>
              )}


          </ScrollView>
        </View>
      </View>
    </PaperProvider>
  );
}

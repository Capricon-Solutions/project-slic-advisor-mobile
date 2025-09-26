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
} from 'react-native';
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import LoaderKit from 'react-native-loader-kit';
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
import EventCreation from '../../../components/EventCreation';
import ActivityCreation from '../../../components/ActivityCreation';
import {
  useActivityDeleteMutation,
  useEventDeleteMutation,
  useGetEventsAndActivitiessQuery,
  useGetLeadsQuery,
} from '../../../redux/services/plannerSlice';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {showToast} from '../../../components/ToastMessage';
import {useSelector} from 'react-redux';

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
  const userCode = useSelector(state => state.Profile.userCode);
  const [selectedItem, setSelectedItem] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [calenderVisible, setCalenderVisible] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [activities, setActivities] = useState(updatedActivities);

  useEffect(() => {
    setSelected({
      [moment().format('YYYY-MM-DD')]: {
        selected: true,
        marked: true,
        selectedColor: 'blue', // Change this color if needed
      },
    });
  }, []);

  const [selected, setSelected] = useState(() => {
    return (
      activities?.reduce((acc, item) => {
        const date = item.activityDate?.split('T')[0];
        acc[date] = {
          selected: false,
          marked: true,
          selectedColor: 'blue',
          markedColor: 'red',
        };
        return acc;
      }, {}) || {}
    ); // Ensure an empty object if activities is undefined/null
  });

  const date = selectedDate;

  const {
    data: PlannerActivities,
    isFetching,
    refetch,
    error,
  } = useGetEventsAndActivitiessQuery({
    date,
    userCode: usertype == 2 ? personalCode : userCode,
  });
  const {data: Leads} = useGetLeadsQuery(
    {date, userCode: usertype == 2 ? personalCode : userCode},
    {refetchOnMountOrArgChange: false},
  );
  useEffect(() => {
    refetch();
  }, [selectedDate]);

  const [
    DeleteActivity,
    {data: newActivity, isLoading: isDeleting, error: deleteError},
  ] = useActivityDeleteMutation();

  const [
    DeleteEvent,
    {data, isLoading: isEventDeleting, error: deleteEventError},
  ] = useEventDeleteMutation();

  const [LeadList, setLeadList] = useState([]);

  const updatedActivities = [
    ...(PlannerActivities?.data?.plannerActivities?.map(activity => ({
      ...activity,
      checked: false,
      type: 'Activity', // Adding type for activities
    })) || []),
    ...(PlannerActivities?.data?.plannerEvents?.map(event => ({
      ...event,
      checked: false,
      type: 'Event', // Adding type for events
    })) || []),
  ];
  updatedActivities.sort((a, b) => {
    const dateA = Date.parse(a.creationDate); // Ensure the date is parsed correctly
    const dateB = Date.parse(b.creationDate); // Ensure the date is parsed correctly

    return dateA - dateB; // Sort by creationDate
  });
  useEffect(() => {
    setActivities(updatedActivities);
  }, [isFetching]);
  useEffect(() => {
    if (Leads?.data && Array.isArray(Leads.data)) {
      setLeadList(Leads.data);
    } else {
      setLeadList([]); // fallback to empty array if no data
    }
  }, [Leads]);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleCheckboxToggle = index => {
    setActivities(prev =>
      prev.map((item, i) => {
        if (i === index) {
          // Toggle the clicked item
          return {...item, checked: !item.checked};
        } else {
          // Uncheck all other items
          return {...item, checked: false};
        }
      }),
    );
  };
  const handleActivityDelete = async () => {
    const checkedActivities = activities
      .filter(item => item.checked) // Get items where checked is true
      .map(item => ({
        activityId: item.activityId || item.eventId,
        type: item.type,
      })); // Extract both activityId and type

    try {
      if (checkedActivities[0].type == 'Event') {
        const response = await DeleteEvent({
          activityId: checkedActivities[0].activityId,
          userCode: usertype == 2 ? personalCode : userCode,
        });
        // console.log('Event Deleted:', response);
        if (response?.data?.success === true) {
          showToast({
            type: 'success',
            text1: 'Deleted',
            text2: 'Event deleted Successfully.',
          });
        } else {
          showToast({
            type: 'error',
            text1: 'Failed',
            text2: 'Failed to delete item 🚨',
          });
        }
      } else {
        const response = await DeleteActivity({
          activityId: checkedActivities[0].activityId,
          userCode: usertype == 2 ? personalCode : userCode,
        });
        showToast({
          type: 'success',
          text1: 'Deleted',
          text2: 'Activity deleted Successfully.',
        });
      }
    } catch (err) {
      console.error('Error deleting activity:', err);
      showToast({
        type: 'error',
        text1: 'Failed',
        text2: 'Failed to delete item 🚨',
      });
    }
  };
  const menuItems = [
    {
      id: 1,
      title: 'Lead Creation',
      onPress: () =>
        navigation.navigate('LeadCreation', {eventDate: selectedDate}),
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
          onEventCreated={date => {
            setSelectedDate(date);
            setSelected({
              [date]: {
                selected: true,
                marked: true,
                selectedColor: 'blue', // Change this color if needed
              },
            });
          }}
        />
        <ActivityCreation
          modalVisible={activityModalVisible}
          setModalVisible={setActivityModalVisible}
          leadsData={LeadList}
          onActivityCreated={date => {
            setSelectedDate(date);
            setSelected({
              [date]: {
                selected: true,
                marked: true,
                selectedColor: 'blue', // Change this color if needed
              },
            });
          }}
        />
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
                shadowOpacity: 0.2, // add opacity
                shadowRadius: 3, // add blur radius
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                marginVertical: 15,
              }}>
              <Calendar
                onDayPress={day => {
                  setSelectedDate(day.dateString);
                  setSelected({
                    [day.dateString]: {
                      selected: true,
                      marked: true,
                      selectedColor: 'blue', // Change this color if needed
                    },
                  });
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
                style={
                  isAnyItemSelected ? styles.orangeButton : styles.grayButton
                }
                onPress={() => {
                  handleActivityDelete();
                }}>
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
                onPress={() => setCalenderVisible(!calenderVisible)}>
                <MaterialCommunityIcons
                  name={calenderVisible ? 'arrow-up' : 'arrow-down'}
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
              {/* Monday, 22/January/2025 */}
              {moment(selectedDate, 'YYYY-MM-DD').format('dddd, DD/MMMM/YYYY')}
            </Text>
          </View>
          {isFetching ? (
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                height: calenderVisible
                  ? window.height * 0.2
                  : window.height * 0.7,
                justifyContent: 'center',
              }}>
              <LoaderKit
                style={{width: 35, height: 35}}
                name={'BallPulse'} // Optional: see list of animations below
                color={COLORS.warmGray} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
              />
            </View>
          ) : (
            <View>
              {activities?.length > 0 ? (
                <View>
                  {activities?.map((activity, index) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      onPress={() =>
                        navigation.navigate('ActivityDetails', {
                          item: activity,
                        })
                      }
                      index={index}
                      handleCheckboxToggle={handleCheckboxToggle}
                    />
                  ))}
                </View>
              ) : (
                <View style={{alignItems: 'center', marginTop: 40}}>
                  <Text
                    style={{
                      color: COLORS.grayText,
                      fontFamily: Fonts.Roboto.Regular,
                      fontSize: 14,
                    }}>
                    {' '}
                    Events and Activities not available
                  </Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
        {/* </View> */}
      </View>
    </PaperProvider>
  );
}

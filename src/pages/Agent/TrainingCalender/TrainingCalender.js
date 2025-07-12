import React, {useCallback, useEffect, useState} from 'react';
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
import NotAttending from '../../../components/NotAttending';
import Button from '../../../components/Button';
import DropdownComponentNoLabel from '../../../components/DropdownComponentNoLabel';
import DropdownFilled from '../../../components/DropdownFilled';
import {Getpath} from '../../../redux/services/NavControllerSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  useApproveTrainingMutation,
  useGetTrainingListQuery,
} from '../../../redux/services/trainingSlice';

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
  const userCode = useSelector(state => state.Profile.userCode);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const [selectedItem, setSelectedItem] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [trainingType, setTrainingType] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedTrainings, setSelectedTrainings] = useState([]);
  const [type, setType] = useState('A');
  const [selectedId, setSelectedId] = useState(0);
  const dispatch = useDispatch();
  const today = new Date().toISOString().split('T')[0];

  useFocusEffect(
    useCallback(() => {
      dispatch(Getpath(0));
    }, []),
  );

  const {
    data: TrainingList,
    isFetching,
    refetch,
    error,
  } = useGetTrainingListQuery({
    type,
    userCode: usertype == 2 ? personalCode : userCode,
  });

  const [approveTraining, {isLoading: isApproving, error: approveError}] =
    useApproveTrainingMutation();

  useEffect(() => {
    console.log('TrainingList', TrainingList);
  }, [TrainingList]);

  useEffect(() => {
    if (TrainingList?.data) {
      // Transform the API data to create marked dates
      const dates = {};
      TrainingList.data.forEach(item => {
        const dateStr = item.trainDate.split('T')[0]; // Get just the date part
        dates[dateStr] = {marked: true, dotColor: COLORS.primary};
      });
      setMarkedDates(dates);
    }
  }, [TrainingList]);

  const handleDayPress = day => {
    const dateStr = day.dateString;
    setSelectedDate(dateStr);

    // Find trainings for the selected date
    const selectedDateData = TrainingList?.data?.find(
      item => item.trainDate.split('T')[0] === dateStr,
    );

    if (selectedDateData) {
      setSelectedTrainings(selectedDateData.trainingsListForDate);
    } else {
      setSelectedTrainings([]);
    }

    // First, clear any existing selections
    const updatedMarkedDates = {...markedDates};

    // Remove selection from all dates
    Object.keys(updatedMarkedDates).forEach(date => {
      if (updatedMarkedDates[date].selected) {
        delete updatedMarkedDates[date].selected;
        delete updatedMarkedDates[date].selectedColor;
      }
    });

    // Add selection to the new date
    updatedMarkedDates[dateStr] = {
      ...updatedMarkedDates[dateStr],
      selected: true,
      selectedColor: COLORS.primary,
    };

    setMarkedDates(updatedMarkedDates);
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = dateString => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={Styles.container}>
      <NotAttending
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedId={selectedId}
      />
      <View style={[Styles.container, {overflow: 'scroll'}]}>
        <HeaderBackground />
        <Header Title="Training Calender" onPress={() => navigation.goBack()} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          fadingEdgeLength={20}
          contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 10}}
          style={{}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Fonts.Roboto.SemiBold,
                color: COLORS.textColor,
              }}>
              Select User Type
            </Text>
            <View style={{width: '60%', marginLeft: 20}}>
              <DropdownFilled
                Color={COLORS.white}
                BorderColor={COLORS.textColor}
                initialValue={type}
                search={false}
                placeholder="Select Training Type"
                onSelect={value => setType(value)}
                dropdownData={[
                  {label: 'All', value: 'A'},
                  {label: 'Motor', value: 'M'},
                  {label: 'Non-Motor', value: 'G'},
                ]}
              />
            </View>
          </View>

          <View
            style={{
              borderRadius: 15,
              backgroundColor: COLORS.white,
              padding: 5,
              elevation: 5,
              marginVertical: 15,
            }}>
            <Calendar
              onDayPress={handleDayPress}
              style={{
                borderColor: 'gray',
              }}
              current={today}
              // today={"15/06/2021"}
              markedDates={markedDates}
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
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.SemiBold,
                fontSize: 14,
                color: COLORS.textColor,
              }}>
              {selectedDate ? formatDate(selectedDate) : 'Select a date'}
            </Text>
            <View>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => navigation.navigate('TrainingList')}>
                <Text style={styles.smallButtonText}>View Training List</Text>
              </TouchableOpacity>
            </View>
          </View>

          {selectedTrainings.length === 0 ? (
            <View>
              <Text
                style={{
                  fontFamily: Fonts.Roboto.Medium,
                  fontSize: 14,
                  marginVertical: 25,
                  color: COLORS.grayText,
                  textAlign: 'center',
                }}>
                {selectedDate
                  ? 'No events for the selected date'
                  : 'Please select a date to view trainings'}
              </Text>
            </View>
          ) : (
            <>
              <View>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto.SemiBold,
                    color: COLORS.textColor,
                    fontSize: 14,
                    marginVertical: 3,
                  }}>
                  Upcoming Training Sessions
                </Text>
              </View>

              {selectedTrainings.map((training, index) => (
                <View key={index} style={styles.cardWrap}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: COLORS.primary,
                        fontFamily: Fonts.Roboto.Bold,
                        fontSize: 14,
                      }}>
                      {training.topic}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        // Remove this training from the list
                        setSelectedTrainings(prev =>
                          prev.filter((_, i) => i !== index),
                        );
                      }}
                      style={{
                        right: 13,
                        borderRadius: 15,
                        padding: 2,
                        backgroundColor: COLORS.lightBorder,
                      }}>
                      <MaterialCommunityIcons
                        name="close"
                        color={COLORS.primaryGreen}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flex: 0.6}}>
                      <Text
                        style={{
                          color: COLORS.textColor,
                          fontFamily: Fonts.Roboto.Bold,
                          fontSize: 16,
                        }}>
                        {training.description}
                      </Text>

                      <Text
                        style={{
                          color: COLORS.grayText,
                          fontFamily: Fonts.Roboto.Medium,
                          fontSize: 13,
                        }}>
                        Session Method : Online
                      </Text>

                      <Text
                        style={{
                          color: COLORS.grayText,
                          fontFamily: Fonts.Roboto.Medium,
                          fontSize: 13,
                        }}>
                        Session Type :{' '}
                        {training.trainType === 'G' ? 'General' : 'Motor'}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 3,
                        }}>
                        <Feather
                          name="calendar"
                          color={COLORS.grayText}
                          size={16}
                        />
                        <Text
                          style={{
                            color: COLORS.textColor,
                            fontFamily: Fonts.Roboto.Medium,
                            fontSize: 13,
                            marginLeft: 5,
                          }}>
                          {formatDate(training.trainDate)}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: 3,
                        }}>
                        <Feather
                          name="clock"
                          color={COLORS.grayText}
                          size={16}
                        />
                        <Text
                          style={{
                            color: COLORS.textColor,
                            fontFamily: Fonts.Roboto.Medium,
                            fontSize: 13,
                            marginLeft: 5,
                          }}>
                          {formatTime(training.trainDate)}
                        </Text>
                      </View>
                    </View>
                    <View style={{flex: 0.4, alignItems: 'center', padding: 3}}>
                      <View
                        style={{
                          width: '90%',
                          paddingHorizontal: 10,
                          marginVertical: 10,
                        }}>
                        <SmallButton
                          Title={'Done'}
                          onPress={() => {
                            console.log(' training.trainId', training.trainId);
                            // Call the approveTraining mutation with the training ID
                            approveTraining({id: training.trainId, userCode})
                              .unwrap()
                              .then(() => {
                                // On success, remove the training from the list
                                setSelectedTrainings(prev =>
                                  prev.filter((_, i) => i !== index),
                                );
                              })
                              .catch(error => {
                                console.error(
                                  'Failed to approve training:',
                                  error,
                                );
                                // You might want to show an error message to the user here
                              });
                          }}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(true);
                          setSelectedId(training.trainId);
                        }}>
                        <Text
                          style={{
                            color: COLORS.primary,
                            fontSize: 14,
                            fontFamily: Fonts.Roboto.SemiBold,
                          }}>
                          Can't Attend?
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {/* <View style={{ flex: 0.4, alignItems: 'center', padding: 3 }}>
                      <View
                        style={{
                          width: '90%',
                          paddingHorizontal: 10,
                          marginVertical: 10
                        }}>
                        <SmallButton
                          Title={'Done'}
                          onPress={() => {
                            setSelectedTrainings(prev =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}>
                        <Text
                          style={{
                            color: COLORS.primary,
                            fontSize: 14,
                            fontFamily: Fonts.Roboto.SemiBold,
                          }}>
                          Can't Attend?
                        </Text>
                      </TouchableOpacity>
                    </View> */}
                  </View>
                </View>
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

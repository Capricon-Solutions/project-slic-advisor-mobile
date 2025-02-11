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
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState({
    '2025-02-01': {selected: true, marked: true, selectedColor: 'blue'},
    '2025-02-02': {marked: true},
    '2025-02-03': {selected: true, marked: true, selectedColor: 'blue'},
  });

  return (
    <View style={{height: window.height * 1}}>
      <NotAttending
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={[Styles.container, {overflow: 'scroll', marginBottom: 110}]}>
        <HeaderBackground />
        <Header Title="Training Calender" onPress={() => navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Fonts.Roboto.SemiBold,
                color: COLORS.textColor,
              }}>
              Select User Type
            </Text>
            <View style={{width: '50%', marginLeft: 10}}>
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
              elevation: 5,
              marginHorizontal: 5,
              marginVertical: 15,
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
                onPress={() => navigation.navigate('TrainingList')}>
                <Text style={styles.smallButtonText}>View Training List</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Medium,
                fontSize: 14,
                marginVertical: 25,
                color: COLORS.grayText,
                textAlign: 'center',
              }}>
              NO EVENTS FOR THE SELECTED DATE
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontFamily: Fonts.Roboto.SemiBold,
                color: COLORS.textColor,
                fontSize: 14,
              }}>
              Upcoming Training Sessions
            </Text>
          </View>

          <View
            style={{
              padding: 18,
              paddingRight: 10,
              backgroundColor: COLORS.trainingCard,
              marginVertical: 20,
              borderRadius: 10,
              marginBottom: 10,
            }}>
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
                Motor Claims Training
              </Text>

              <TouchableOpacity
                onPress={() => console.log('clicked')}
                style={{
                  right: 13,
                  borderRadius: 15,
                  padding: 2,
                  backgroundColor: COLORS.lightBorder,
                }}>
                <MaterialCommunityIcons
                  name="close"
                  color={COLORS.primaryGreen}
                  size={24}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flex: 0.6}}>
                <Text
                  style={{
                    color: COLORS.textColor,
                    fontFamily: Fonts.Roboto.Bold,
                    fontSize: 16,
                  }}>
                  Mr. John Smith
                </Text>
                <Text
                  style={{
                    color: COLORS.grayText,
                    fontFamily: Fonts.Roboto.Medium,
                    fontSize: 13,
                  }}>
                  Session Type: Online.
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 3,
                  }}>
                  <Feather name="calendar" color={COLORS.grayText} size={16} />
                  <Text
                    style={{
                      color: COLORS.textColor,
                      fontFamily: Fonts.Roboto.Medium,
                      fontSize: 13,
                      marginLeft: 5,
                    }}>
                    January 17, 2025
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 3,
                  }}>
                  <Feather name="clock" color={COLORS.grayText} size={16} />
                  <Text
                    style={{
                      color: COLORS.textColor,
                      fontFamily: Fonts.Roboto.Medium,
                      fontSize: 13,
                      marginLeft: 5,
                    }}>
                    10:00 AM - 12:00 PM.
                  </Text>
                </View>
              </View>

              <View style={{flex: 0.4, alignItems: 'center', padding: 3}}>
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 10,
                  }}>
                  <Button Title={'View Details'} />
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
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
            </View>
          </View>

          <View
            style={{
              padding: 18,
              paddingRight: 10,
              backgroundColor: COLORS.trainingCard,
              marginVertical: 20,
              borderRadius: 10,
              marginBottom: 10,
            }}>
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
                Motor Claims Training
              </Text>

              <TouchableOpacity
                onPress={() => console.log('clicked')}
                style={{
                  right: 13,
                  borderRadius: 15,
                  padding: 2,
                  backgroundColor: COLORS.lightBorder,
                }}>
                <MaterialCommunityIcons
                  name="close"
                  color={COLORS.primaryGreen}
                  size={24}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flex: 0.6}}>
                <Text
                  style={{
                    color: COLORS.textColor,
                    fontFamily: Fonts.Roboto.Bold,
                    fontSize: 16,
                  }}>
                  Mr. John Smith
                </Text>
                <Text
                  style={{
                    color: COLORS.grayText,
                    fontFamily: Fonts.Roboto.Medium,
                    fontSize: 13,
                  }}>
                  Session Type: Online.
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 3,
                  }}>
                  <Feather name="calendar" color={COLORS.grayText} size={16} />
                  <Text
                    style={{
                      color: COLORS.textColor,
                      fontFamily: Fonts.Roboto.Medium,
                      fontSize: 13,
                      marginLeft: 5,
                    }}>
                    January 17, 2025
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 3,
                  }}>
                  <Feather name="clock" color={COLORS.grayText} size={16} />
                  <Text
                    style={{
                      color: COLORS.textColor,
                      fontFamily: Fonts.Roboto.Medium,
                      fontSize: 13,
                      marginLeft: 5,
                    }}>
                    10:00 AM - 12:00 PM.
                  </Text>
                </View>
              </View>

              <View style={{flex: 0.4, alignItems: 'center', padding: 3}}>
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 10,
                  }}>
                  <Button Title={'View Details'} />
                </View>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 14,
                    fontFamily: Fonts.Roboto.SemiBold,
                  }}>
                  Can't Attend?
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

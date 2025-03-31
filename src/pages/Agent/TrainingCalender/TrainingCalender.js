import React, { useCallback, useState } from 'react';
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
import { FlatList } from 'react-native';
import ContactListItem from '../../../components/contactListItem';
import DepartmentItem from '../../../components/DepartmentItem';
import { styles } from './styles';
import TableComponent from '../../../components/TableComponent';
import DateRangePicker from '../../../components/DateRangePicker';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
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
import { Getpath } from '../../../redux/services/NavControllerSlice';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

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

export default function TrainingCalender({ navigation }) {
  const [selectedItem, setSelectedItem] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [itemOne, setItemOne] = useState(true);
  const [itemTwo, setItemTwo] = useState(true);
  const [trainingType, setTrainingType] = useState();
  const [selected, setSelected] = useState({
    '2025-02-01': { selected: true, marked: true, selectedColor: 'blue' },
    '2025-02-02': { marked: true },
    '2025-02-03': { selected: true, marked: true, selectedColor: 'blue' },
  });
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(Getpath(0));

    }, [])
  );

  return (
    <View style={Styles.container}>
      <NotAttending
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={[Styles.container, { overflow: 'scroll' }]}>
        <HeaderBackground />
        <Header Title="Training Calender" onPress={() => navigation.goBack()} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          fadingEdgeLength={20}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
          style={{}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Fonts.Roboto.SemiBold,
                color: COLORS.textColor,
              }}>
              Select User Type
            </Text>
            <View style={{ width: '60%', marginLeft: 20 }}>
              {/* <AutocompleteDropdown
                clearOnFocus={true}
                closeOnBlur={true}
                closeOnSubmit={false}
                onSelectItem={setSelectedItem}
                dataSet={[
                  {id: '1', title: 'Myself'},
                  {id: '2', title: 'Marketing executive'},
                  {id: '2', title: 'Team Leader'},
                  {id: '2', title: 'All'},
                ]}
              /> */}
              <DropdownFilled
                Color={COLORS.white}
                BorderColor={COLORS.textColor}
                initialValue={trainingType}
                placeholder="Select Training Type"
                onSelect={value => setTrainingType(value)}
                dropdownData={[
                  { label: 'All', value: 'A' },
                  { label: 'Motor', value: 'M' },
                  { label: 'Non-Motor', value: 'G' },
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
              No events for the selected date
            </Text>
          </View>

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

          {itemOne &&

            <View style={styles.cardWrap}>
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
                  onPress={() => setItemOne(false)}
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
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 0.6 }}>
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
                    Session Method : Online
                  </Text>

                  <Text
                    style={{
                      color: COLORS.grayText,
                      fontFamily: Fonts.Roboto.Medium,
                      fontSize: 13,
                    }}>
                    Session Type : General
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

                <View style={{ flex: 0.4, alignItems: 'center', padding: 3 }}>
                  <View
                    style={{
                      width: '90%',
                      paddingHorizontal: 10,
                      marginVertical: 10
                    }}>
                    <SmallButton Title={'Done'}
                      onPress={() => setItemOne(false)} />
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
                </View>
              </View>
            </View>
          }
          {itemTwo &&


            <View style={styles.cardWrap}>
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
                  onPress={() => setItemTwo(false)}
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
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 0.6 }}>
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
                    Session Method : Online
                  </Text>

                  <Text
                    style={{
                      color: COLORS.grayText,
                      fontFamily: Fonts.Roboto.Medium,
                      fontSize: 13,
                    }}>
                    Session Type : General
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

                <View style={{ flex: 0.4, alignItems: 'center', padding: 3 }}>
                  <View
                    style={{
                      width: '90%',
                      paddingHorizontal: 10,
                      marginVertical: 10
                    }}>
                    <SmallButton
                      onPress={() => setItemTwo(false)} Title={'Done'} />
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
                </View>
              </View>
            </View>
          }

          {(itemOne == false && itemTwo == false) && (
            <View>
              <Text
                style={{
                  fontFamily: Fonts.Roboto.Medium,
                  fontSize: 14,
                  marginVertical: 25,
                  color: COLORS.grayText,
                  textAlign: 'center',
                }}>
                No Training sessions for the selected date
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

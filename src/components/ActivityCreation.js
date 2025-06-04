import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Animated,
  Dimensions,
  Text,
  View,
  Image,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors'; // Update with your color theme file
import Fonts from '../theme/Fonts'; // Update with your fonts file
import avatar from '../images/avatar.png'; // Replace with the actual logo path
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Contacts from '../icons/Contacts.png'; // Replace with the actual logo path
import SquareTextBox from './SquareTextBox';
import Button from './Button';
import AlertButton from './AlertButton';
import AlertButtonWhite from './AlertButtonWhite';
import DropdownFilled from './DropdownFilled';
import MonthYearPicker from './MonthYearPicker';
import moment from 'moment';
import {useActivityCreationMutation} from '../redux/services/plannerSlice';
import {showToast, ToastMessage} from './ToastMessage';
import {useSelector} from 'react-redux';

export default function ActivityCreation({
  modalVisible,
  setModalVisible,
  leadsData,
  onActivityCreated,
}) {
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current;

  const [ActivityCreate, {data, isLoading, error}] =
    useActivityCreationMutation();

  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const userCode = useSelector(state => state.Profile.userCode);

  const [selectedLead, setSelectedLead] = useState();
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
  const [meetWith, setMeetWith] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  // const [selectedTime, setSelectedTime] = useState(null);
  const body = {
    leadId: selectedLead,
    activityType: selectedType,
    meetingWith: meetWith,
    closedPolicyNo: '',
    activityDate: selectedDate,
    quotationNo: '',
    proposalNo: '',
    description: description,
  };
  // useEffect(() => {
  //   console.log('test', {
  //     selectedLead,
  //     selectedType,
  //     description,
  //     meetWith,
  //     selectedDate,
  //   });
  // }, []);

  const validateForm = () => {
    if (
      !selectedLead ||
      !selectedType ||
      !description ||
      !meetWith ||
      !selectedDate
    ) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill in all required fields. 🚨',
      });
      return false;
    }
    return true;
  };

  const handleActivityCreate = async () => {
    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await ActivityCreate({body, userCode});
      showToast({
        type: 'success',
        text1: 'Activity Created',
        text2: 'Your activity has been created successfully!',
      });
      setTimeout(() => {
        onActivityCreated(moment(selectedDate).format('YYYY-MM-DD'));
        setModalVisible(false);
      }, 2000);
      console.log('Activity Created:', response);
    } catch (err) {
      console.error('Error creating activity:', err);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  // const showTimePicker = () => {
  //   setTimePickerVisibility(true);
  // };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', moment(date).format('DD-MM-YYYY'));
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  // const handleTimeConfirm = date => {
  //   setSelectedTime(moment(date).format('HH:mm A'));
  //   hideTimePicker();
  // };

  React.useEffect(() => {
    if (modalVisible) {
      Animated.timing(backgroundOpacity, {
        toValue: 0.2,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [modalVisible]);

  function hide() {
    Animated.timing(backgroundOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setTimeout(() => setModalVisible(false), 300);
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <TouchableOpacity
        onPress={() => {
          hide();
        }}
        activeOpacity={1}
        style={{flex: 1}}>
        <Animated.View
          style={[
            styles.modalOverlay,
            {
              backgroundColor: backgroundOpacity.interpolate({
                inputRange: [0, 0.2],
                outputRange: ['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.2)'],
              }),
            },
          ]}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            style={{backgroundColor: 'red'}}
            datePickerModeAndorid={'spinner'}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          {/* <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          /> */}
          {/* <MonthYearPicker
            visible={isPickerVisible}
            onClose={() => setPickerVisible(false)}
            onSelect={v => setSelectedDate(v)}
            onSelectText={v => setSelectedDate(v)}
          /> */}
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={() => hide()}
                style={styles.closeButton}>
                <MaterialCommunityIcons
                  name="close"
                  color={COLORS.primaryGreen}
                  size={24}
                />
              </TouchableOpacity>
              <View style={{width: '100%', marginBottom: 15}}>
                <Text style={styles.modalTitle}>Activity Creation</Text>
              </View>
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    marginBottom: 5,
                    marginTop: 5,
                    fontSize: 12.5,
                    fontFamily: Fonts.Roboto.Medium,
                    color: COLORS.ashBlue,
                  }}>
                  Lead
                </Text>
                {/* <DropdownFilled
                  placeholder={'Select Lead'}
                  dropdownData={[
                    { label: 'Appointment', value: '1' },
                    { label: 'Pending', value: '2' },
                    { label: 'Complete', value: '3' },
                  ]}
                /> */}
                <DropdownFilled
                  // mode={"modal"}
                  placeholder={'Select Lead'}
                  dropdownData={leadsData?.map(item => ({
                    label: item.customerName,
                    value: item.leadId,
                  }))}
                  // dropdownData={[
                  //   {label: 'John Doe', value: '1'},
                  //   {label: 'Jane Smith', value: '2'},
                  //   {label: 'Michael Johnson', value: '3'},
                  // ]}
                  onSelect={v => setSelectedLead(v)}
                  // onSelect={v => console.log('v', v)}
                />
              </View>
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    marginBottom: 5,
                    marginTop: 5,
                    fontSize: 12.5,
                    fontFamily: Fonts.Roboto.Medium,
                    color: COLORS.ashBlue,
                  }}>
                  Activity Type
                </Text>
                <DropdownFilled
                  placeholder={'Select Activity Type'}
                  dropdownData={[
                    {label: 'Appointment', value: 'A'},
                    {label: 'Meeting', value: 'M'},
                    {label: 'Presentation', value: 'P'},
                    {label: 'Quatation', value: 'Q'},
                    {label: 'Proposal', value: 'S'},
                    {label: 'Closed', value: 'C'},
                    {label: 'Reject', value: 'R'},
                  ]}
                  onSelect={v => setSelectedType(v)}
                />
              </View>
              <SquareTextBox
                LabelColor={COLORS.ashBlue}
                Label={'Event Description *'}
                Title={'Description'}
                setValue={text => setDescription(text)}
              />
              <SquareTextBox
                LabelColor={COLORS.ashBlue}
                Label={'Meeting With *'}
                Title={'Meeting With'}
                setValue={text => setMeetWith(text)}
              />
              <TouchableOpacity
                onPress={() => showDatePicker()}
                style={{flexDirection: 'row', position: 'relative'}}>
                <SquareTextBox
                  LabelColor={COLORS.ashBlue}
                  Label={'Date *'}
                  readOnly={true}
                  value={selectedDate}
                  Title={'DD/MM/YYYY'}
                />

                <TouchableOpacity
                  onPress={() =>
                    // setPickerVisible(true)
                    showDatePicker()
                  }
                  style={[
                    styles.searchButton,
                    {
                      position: 'absolute',
                      bottom: 15,
                      right: 15,
                    },
                  ]}>
                  <Feather name="calendar" color={COLORS.primary} size={20} />
                </TouchableOpacity>
              </TouchableOpacity>
              {/* <View style={{flexDirection: 'row', position: 'relative'}}>
                <SquareTextBox
                  LabelColor={COLORS.ashBlue}
                  Label={'Time *'}
                  Title={'12 : 00 Am'}
                  value={selectedTime}
                />
                <TouchableOpacity
                  onPress={() =>
                    // setPickerVisible(true)
                    showTimePicker()
                  }
                  style={[
                    styles.searchButton,
                    {
                      position: 'absolute',
                      bottom: 15,
                      right: 15,
                    },
                  ]}>
                  <Feather name="clock" color={COLORS.primary} size={20} />
                </TouchableOpacity>
              </View> */}

              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: 15,
                  justifyContent: 'space-evenly',
                }}>
                <View style={{flex: 0.35}}>
                  <AlertButton
                    onPress={() => {
                      handleActivityCreate();
                    }}
                    isLoading={isLoading}
                    Title={'Submit'}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableOpacity>
      <ToastMessage />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    padding: 25,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    elevation: 10,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    borderRadius: 15,
    padding: 2,
    backgroundColor: COLORS.lightBorder,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 35,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: Fonts.Roboto.Bold,
    color: COLORS.black,

    textAlign: 'left',
  },
  contactText: {
    fontSize: 14,
    fontFamily: Fonts.Roboto.Regular,
    color: COLORS.black,
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  contactDetails: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: Fonts.Roboto.Regular,
    color: COLORS.black,
  },
  note: {
    marginTop: 20,
    fontSize: 12,
    fontFamily: Fonts.Roboto.Bold,
    color: COLORS.black,
    textAlign: 'center',
  },
});

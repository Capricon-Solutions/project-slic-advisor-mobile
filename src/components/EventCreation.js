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
import LoaderKit from 'react-native-loader-kit';

import Contacts from '../icons/Contacts.png'; // Replace with the actual logo path
import SquareTextBox from './SquareTextBox';
import Button from './Button';
import AlertButton from './AlertButton';
import AlertButtonWhite from './AlertButtonWhite';
import MonthYearPicker from './MonthYearPicker';
import {useEventCreationMutation} from '../redux/services/plannerSlice';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {showToast, ToastMessage} from './ToastMessage';
import {useSelector} from 'react-redux';

export default function EventCreation({
  modalVisible,
  setModalVisible,
  onEventCreated,
}) {
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current;
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const userCode = useSelector(state => state.Profile.userCode);
  const [selectedDate, setSelectedDate] = useState(null);
  const [description, setDescription] = useState('');
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const body = {
    eventDesc: description,
    eventDate: selectedDate,
    creationType: 'AGENT',
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', moment(date).format('DD-MM-YYYY'));
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };
  const [EventCreate, {data, isLoading, error}] = useEventCreationMutation();

  const validateForm = () => {
    if (!description || !selectedDate) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill in all required fields. 🚨',
      });
      return false;
    }
    return true;
  };

  const handleEventCreate = async () => {
    if (!validateForm()) return; // Stop if validation fails

    try {
      // console.log('Creating event with body:', body);
      const response = await EventCreate({
        body,
        userCode: usertype == 2 ? personalCode : userCode,
      });

      // console.log('Activity Created test', response);
      showToast({
        type: 'success',
        text1: 'Event Created',
        text2: 'Your event has been created successfully!',
      });

      setTimeout(() => {
        onEventCreated(moment(selectedDate).format('YYYY-MM-DD'));
        setSelectedDate(null);
        setDescription('');
        setModalVisible(false);
      }, 900);
    } catch (err) {
      console.error('Error creating activity:', err);
    }
  };

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
            minimumDate={new Date()}
            onCancel={hideDatePicker}
          />
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
                <Text style={styles.modalTitle}>Event Creation</Text>
              </View>
              <TouchableOpacity
                style={{flexDirection: 'row', position: 'relative'}}
                onPress={() => showDatePicker(true)}>
                <SquareTextBox
                  Label={'Date *'}
                  readOnly={true}
                  value={selectedDate}
                  Title={'DD/MM/YYYY'}
                />
                <TouchableOpacity
                  onPress={() => showDatePicker(true)}
                  style={[
                    styles.searchButton,
                    {
                      position: 'absolute',
                      bottom: 14,
                      right: 15,
                    },
                  ]}>
                  <Feather name="calendar" color={COLORS.primary} size={20} />
                </TouchableOpacity>
              </TouchableOpacity>
              <SquareTextBox
                Label={'Event Description *'}
                Title={'Description'}
                value={description}
                setValue={text => setDescription(text)}
              />

              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: 15,
                  justifyContent: 'space-evenly',
                }}>
                <View style={{flex: 0.35}}>
                  <AlertButton
                    onPress={() => handleEventCreate()}
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
    shadowOpacity: 0.2, // add opacity
    shadowRadius: 3, // add blur radius
    shadowOffset: {
      width: 0,
      height: 3,
    },
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

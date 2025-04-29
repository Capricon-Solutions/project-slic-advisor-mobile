import * as React from 'react';
import {
  TouchableOpacity,
  Animated,
  Dimensions,
  Text,
  View,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors'; // Update with your color theme file
import Fonts from '../theme/Fonts'; // Update with your fonts file
import avatar from '../images/avatar.png'; // Replace with the actual logo path

import Contacts from '../icons/Contacts.png'; // Replace with the actual logo path
import SquareTextBox from './SquareTextBox';
import Button from './Button';
import AlertButton from './AlertButton';
import AlertButtonWhite from './AlertButtonWhite';
import { useNotAttendingMutation } from '../redux/services/trainingSlice';
import { showToast, ToastMessage } from './ToastMessage';
import { useSelector } from 'react-redux';

export default function NotAttending({ modalVisible, setModalVisible, selectedId }) {
  const userCode = useSelector(state => state.Profile.userCode);
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current;
  const [reason, setReason] = React.useState('');
  const [additionalComments, setAdditionalComments] = React.useState('');
  const [notAttending, { isLoading: notAttendingLoading, error: notAttendingError }] = useNotAttendingMutation();

  function notAttendingApi() {
    if (!reason.trim()) {
      showToast({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill in all required fields. 🚨',
      });
      return;
    }
    const body = {
      agentCode: userCode,
      trainId: selectedId,
      reason,
      additionalComments,
    };

    notAttending(body)
      .unwrap()
      .then(() => {
        // Success - close the modal
        setReason('');
        setAdditionalComments('');
        hide();

      })
      .catch((err) => {
        // Handle error if needed
        console.error('Not attending error:', err);
      });
  }


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
      <TouchableOpacity onPress={() => {
        hide();
      }} activeOpacity={1} style={{ flex: 1 }}>
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

          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => hide()} style={styles.closeButton}>
              <MaterialCommunityIcons
                name="close"
                color={COLORS.primaryGreen}
                size={24}
              />
            </TouchableOpacity>
            <View style={{ width: '100%', marginBottom: 15 }}>
              <Text style={styles.modalTitle}>Reason for Not Attending?</Text>
            </View>

            <SquareTextBox
              Label={'Reasons *'}
              Title={'What is the reasons'}
              value={reason}
              error={!reason.trim()}

              setValue={text => setReason(text)}
            />

            <SquareTextBox
              Label={'Additional Comments '}
              Title={'Explain Why'}
              value={additionalComments}
              setValue={text => setAdditionalComments(text)}
            />

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: 15,
                justifyContent: 'space-evenly',
              }}>
              <View style={{ flex: 0.35 }}>
                <AlertButton Title={'Confirm'} isLoading={notAttendingLoading} onPress={() => notAttendingApi()} />
              </View>
            </View>
          </View>
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

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

export default function SendPaymentLink({
  modalVisible,
  setModalVisible,
  handleSubmit,
  loading,
  phone,
  setPhone,
}) {
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current;
  const [mobileNumberError, setMobileNumberError] = useState('');

  // const isValidSriLankanNumber = number => {
  //   const cleaned = number.replace(/[^0-9]/g, '');

  //   // If it's empty, skip validation (considered optional)
  //   if (cleaned.length === 0) return true;

  //   // Must be either valid local or international format
  //   const localPattern = /^(07\d{8}|0\d{9})$/;
  //   const intlPattern = /^94\d{9}$/;

  //   return localPattern.test(cleaned) || intlPattern.test(cleaned);
  // };

  const isValidSriLankanNumber = number => {
    const cleaned = number.replace(/[^0-9+]/g, '');

    // Normalize to numeric-only without + sign
    let normalized = cleaned;
    if (normalized.startsWith('+94')) {
      normalized = normalized.replace('+94', '94');
    } else if (normalized.startsWith('0')) {
      normalized = '94' + normalized.substring(1);
    } else if (/^[7|1|2]\d{8}$/.test(normalized)) {
      // If it's missing leading 0 but starts with valid digit
      normalized = '94' + normalized;
    }

    // Patterns
    const mobilePattern = /^947[0-9]{8}$/;
    const landlinePattern = /^94(1\d{8}|2\d{8})$/; // landlines like 011xxxxxxx or 021xxxxxxx

    return mobilePattern.test(normalized) || landlinePattern.test(normalized);
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
        // onPress={() => {
        //   setModalVisible(false);
        // }}
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
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => hide()} style={styles.closeButton}>
              <MaterialCommunityIcons
                name="close"
                color={COLORS.primaryGreen}
                size={24}
              />
            </TouchableOpacity>
            <View style={{width: '100%', marginBottom: 15}}>
              <Text style={styles.modalTitle}>Send Payment Link</Text>
            </View>

            {/* <SquareTextBox Label={'Contact Number'} Title={phone} /> */}
            {/* <SquareTextBox
              Label={'Contact Number'}
              Title={'Enter phone number'} // placeholder
              value={phone}                // value to display
              setValue={setPhone}          // updater function to allow editing
              keyboardType="phone-pad"
            /> */}
            <SquareTextBox
              Label={'Contact Number'}
              Title={'Enter phone number'}
              value={phone}
              errorBorder={mobileNumberError}
              // setValue={v => {
              //   const cleaned = v.replace(/[^0-9]/g, ''); // Remove non-digit characters
              //   if (cleaned.length <= 12) {
              //     setPhone(cleaned);
              //   }
              // }}
              setValue={text => {
                const formatted = text.replace(/[^0-9+]/g, '').slice(0, 12);
                setPhone(formatted);
                if (
                  // formatted.length >= 9 &&
                  !isValidSriLankanNumber(formatted)
                ) {
                  setMobileNumberError('Invalid Sri Lankan mobile number');
                } else {
                  setMobileNumberError('');
                }
              }}
              keyboardType="phone-pad"
            />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: 15,
                justifyContent: 'space-evenly',
              }}>
              {/* <View style={{ flex: 0.35 }}>
                <AlertButtonWhite Title={'Update'} />
              </View> */}
              <View style={{flex: 0.35}}>
                <AlertButton
                  isLoading={loading}
                  disabledColor={mobileNumberError ? true : false}
                  disabledButton={mobileNumberError ? true : false}
                  Title={'Confirm'}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
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

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
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors'; // Update with your color theme file
import Fonts from '../theme/Fonts'; // Update with your fonts file
import avatar from '../images/avatar.png'; // Replace with the actual logo path

import Contacts from '../icons/Contacts.png'; // Replace with the actual logo path
import {TextInput} from 'react-native-paper';
import Button from './Button';
import {useSetTargetMutation} from '../redux/services/SalesMeterApiSlice';
import {showToast, ToastMessage} from './ToastMessage';
import moment from 'moment';
import {useSelector} from 'react-redux';

const window = Dimensions.get('window');

export default function SetTargetModal({modalVisible, setModalVisible}) {
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current;
  const [inputValue, setInputValue] = React.useState(null);
  const userCode = useSelector(state => state.Profile.userCode);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  // const [setTarget, {data, isLoading, error}] = useSetTargetMutation(); // Use the correct mutation hook
  const [setTarget, {data, isLoading, error}] = useSetTargetMutation();
  // const handlePostRequest = () => {
  //   setTarget({
  //     agentCode: 2147483647,
  //     yearMonth: '02/2025',
  //     target: inputValue,
  //   });
  // };
  const currentDate = new Date();
  const yearMonth = `${currentDate.getFullYear()}/${String(
    currentDate.getMonth() + 1,
  ).padStart(2, '0')}`;
  const currentTargetDate = moment().format('YYYY/MMMM');
  // console.log('userCode', userCode);
  const body = {
    agentCode: usertype == 2 ? personalCode : userCode,
    yearMonth: yearMonth,
    target: inputValue,
  };
  // console.log('body', body);
  const handlePostRequest = async () => {
    if (!inputValue) {
      showToast({
        type: 'error',
        text1: 'No Target',
        text2: 'Enter your target 🚨',
      });
      return;
    }
    try {
      const response = await setTarget({body}).unwrap(); // Unwraps the Promise to get response directly
      setInputValue(null);
      setModalVisible(false);
      // console.log('Response:', response.success); // Handle success response
      if (response.success === true) {
        showToast({
          type: 'success',
          text1: 'Successful',
          text2: response.message,
        });
        setInputValue(null); // Clear input value after successful submission
      } else {
        showToast({
          type: 'error',
          text1: 'Unsuccesssfull ',
          text2: response.message,
        });
      }
    } catch (err) {
      console.error('Error:', err); // Handle error response
      showToast({
        type: 'error',
        text1: 'Unsuccessfull ',
        text2: err?.data?.Message,
      });
    }
  };

  // Usage example

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

  // Helper: linear-time thousand-separator (no backtracking / no complex regex)
  function formatWithThousandSeparators(str) {
    if (!str) return '';
    const parts = str.split('.');
    let intPart = parts[0];
    const decPart = parts[1] ?? '';

    // handle optional leading minus if you ever want it (not used here)
    const sign = intPart.startsWith('-') ? '-' : '';
    if (sign) intPart = intPart.slice(1);

    // Reverse-chunk approach (linear)
    let rev = '';
    for (let i = intPart.length - 1, cnt = 0; i >= 0; i--, cnt++) {
      rev = intPart[i] + rev;
      if ((cnt + 1) % 3 === 0 && i !== 0) rev = ',' + rev;
    }

    return decPart ? `${sign}${rev}.${decPart}` : `${sign}${rev}`;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <TouchableOpacity
        onPress={() => hide()}
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
          {/* Prevent touches inside the modal from triggering the background click */}
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Set your target for {currentTargetDate}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setInputValue(null);
                  hide();
                }}
                style={styles.closeButton}>
                <MaterialCommunityIcons
                  name="close"
                  color={COLORS.primaryGreen}
                  size={24}
                />
              </TouchableOpacity>

              <Text
                style={{
                  marginTop: 20,
                  marginBottom: 5,
                  fontSize: 15,
                  fontFamily: Fonts.Roboto.Regular,
                  color: COLORS.textColor,
                }}>
                Enter your target
              </Text>

              <TextInput
                mode="outlined"
                keyboardType="numeric"
                activeOutlineColor={COLORS.primary}
                outlineColor="transparent"
                textColor={COLORS.textColor}
                // show formatted value (commas inserted by safe function)
                value={formatWithThousandSeparators(inputValue)}
                onChangeText={text => {
                  // QUICK GUARDS (prevent huge inputs)
                  const MAX_TOTAL_LENGTH = 30; // absolutely forbid >30 chars (tunable)
                  const MAX_INT_DIGITS = 10; // your existing requirement
                  const MAX_DECIMAL_DIGITS = 6; // optional: limit decimal precision

                  if (!text) {
                    setInputValue('');
                    return;
                  }

                  // remove all but digits and dot (linear, safe)
                  let sanitized = text.replace(/[^0-9.]/g, '');

                  // ensure at most one dot
                  const dotIndex = sanitized.indexOf('.');
                  if (dotIndex !== -1) {
                    // keep first dot only, remove others
                    sanitized =
                      sanitized.slice(0, dotIndex + 1) +
                      sanitized.slice(dotIndex + 1).replace(/\./g, '');
                  }

                  // enforce max total length (early cutoff protects from huge input)
                  if (sanitized.length > MAX_TOTAL_LENGTH) {
                    sanitized = sanitized.slice(0, MAX_TOTAL_LENGTH);
                  }

                  // split to integer and decimal parts and apply limits
                  const [rawInt, rawDec = ''] = sanitized.split('.');
                  const integerPart = rawInt.slice(0, MAX_INT_DIGITS);
                  const decimalPart = rawDec.slice(0, MAX_DECIMAL_DIGITS);

                  const finalValue = decimalPart
                    ? `${integerPart}.${decimalPart}`
                    : integerPart;

                  setInputValue(finalValue);
                }}
                style={{
                  backgroundColor: COLORS.lightBorder,
                  marginBottom: 15,
                  textAlign: 'center',
                  fontFamily: Fonts.Roboto.Bold,
                  fontWeight: '700',
                }}
              />

              <View style={{paddingHorizontal: window.width * 0.05}}>
                <Button
                  Title={'Set Target'}
                  onPress={() => {
                    handlePostRequest();
                  }}
                />
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
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    elevation: 10,
    shadowOpacity: 0.2, // add opacity
    shadowRadius: 3, // add blur radius
    shadowOffset: {
      width: 0,
      height: 3,
    },
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    paddingVertical: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 13,
    right: 13,
    borderRadius: 15,
    padding: 2,
    backgroundColor: COLORS.lightBorder,
  },
  modalTitle: {
    fontSize: 17,
    textAlign: 'left',
    // marginTop: 15,
    fontFamily: Fonts.Roboto.Bold,
    color: COLORS.textColor,
  },
});

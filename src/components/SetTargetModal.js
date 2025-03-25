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
import { TextInput } from 'react-native-paper';
import Button from './Button';
import { useSetTargetMutation } from '../redux/services/SalesMeterApiSlice';
import { showToast, ToastMessage } from './ToastMessage';

const window = Dimensions.get('window');

export default function SetTargetModal({ modalVisible, setModalVisible }) {
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current;
  const [inputValue, setInputValue] = React.useState(null);

  // const [setTarget, {data, isLoading, error}] = useSetTargetMutation(); // Use the correct mutation hook
  const [setTarget, { data, isLoading, error }] = useSetTargetMutation();
  // const handlePostRequest = () => {
  //   setTarget({
  //     agentCode: 2147483647,
  //     yearMonth: '02/2025',
  //     target: inputValue,
  //   });
  // };
  const currentDate = new Date();
  const yearMonth = `${currentDate.getFullYear()}/${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

  const body = {

    "agentCode": 905717,
    "yearMonth": yearMonth,
    "target": inputValue

  }
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
      const response = await setTarget({ body }).unwrap(); // Unwraps the Promise to get response directly
      setModalVisible(false);
      console.log('Response:', response); // Handle success response
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

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity
        onPress={() => hide()}
        activeOpacity={1}
        style={{ flex: 1 }}
      >
        <Animated.View
          style={[
            styles.modalOverlay,
            {
              backgroundColor: backgroundOpacity.interpolate({
                inputRange: [0, 0.2],
                outputRange: ['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.2)'],
              }),
            },
          ]}
        >
          {/* Prevent touches inside the modal from triggering the background click */}
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Set your target for 2025/December
              </Text>
              <TouchableOpacity onPress={() => hide()} style={styles.closeButton}>
                <MaterialCommunityIcons
                  name="close"
                  color={COLORS.primaryGreen}
                  size={24}
                />
              </TouchableOpacity>

              <Text style={{
                marginTop: 20,
                marginBottom: 5, fontSize: 15, fontFamily: Fonts.Roboto.Regular,
                color: COLORS.textColor
              }}>
                Enter your target
              </Text>

              <TextInput
                mode="outlined"
                keyboardType="numeric"
                activeOutlineColor={COLORS.primary}
                outlineColor="transparent"
                value={inputValue} // Controlled component
                onChangeText={text => setInputValue(text)} // Store input value
                style={{
                  backgroundColor: COLORS.lightBorder,
                  marginBottom: 15,
                  textAlign: 'center',
                  fontFamily: Fonts.Roboto.Bold,
                  fontWeight: '700',
                }}
              />

              <View style={{ paddingHorizontal: window.width * 0.05 }}>
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

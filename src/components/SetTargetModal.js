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
import {TextInput} from 'react-native-paper';
import Button from './Button';

const window = Dimensions.get('window');

export default function SetTargetModal({modalVisible, setModalVisible}) {
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current;

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

          <Text style={styles.modalTitle}>
            SET YOUR TARGET FOR 2025/DECEMBER
          </Text>

          <TextInput
            mode="flat"
            style={{
              backgroundColor: 'transparent',
              marginBottom: 15,
              textAlign: 'center',
              fontFamily: Fonts.Roboto.Bold,
              fontWeight: '700',
            }}></TextInput>
          <View style={{paddingHorizontal: window.width * 0.2}}>
            <Button
              Title={'Set Target'}
              onPress={() => setModalVisible(false)}></Button>
          </View>
        </View>
      </Animated.View>
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
    paddingVertical: 40,
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
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
    fontFamily: Fonts.Roboto.Medium,
    color: COLORS.textColor,
  },
});

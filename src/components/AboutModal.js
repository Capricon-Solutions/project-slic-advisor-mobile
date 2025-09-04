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
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors'; // Update with your color theme file
import Fonts from '../theme/Fonts'; // Update with your fonts file
import avatar from '../images/avatar.png'; // Replace with the actual logo path

import Contacts from '../icons/Contacts.png'; // Replace with the actual logo path

export default function AboutModal({ modalVisible, setModalVisible, data }) {
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
  const handleCall = phoneNumber => {
    const phoneURL = `tel:${phoneNumber}`;
    Linking.openURL(phoneURL).catch(err =>
      console.error('Failed to make a call:', err),
    );
  };

  const handleEmail = (email, subject = '', body = '') => {
    const emailURL = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(emailURL).catch(err =>
      console.error('Failed to send email:', err)
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(false);
        }}
        activeOpacity={1}
        style={{ flex: 1 }}>
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
            <Image source={Contacts} style={styles.avatar} />
            <Text style={styles.modalTitle}>Get Access To GI Sales Connect</Text>
            <Text style={styles.contactText}>Please Contact: {data?.name}</Text>
            <View style={{ width: '70%', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => handleCall(data?.telephone)}
                style={styles.contactItem}>
                <MaterialCommunityIcons
                  name="phone"
                  size={20}
                  color={COLORS.primaryGreen}
                />
                <Text style={styles.contactDetails}>
                  Phone - {data?.telephone}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleEmail(data?.email)} style={styles.contactItem}>
                <MaterialCommunityIcons
                  name="email"
                  size={20}
                  color={COLORS.primaryGreen}
                />
                <Text style={styles.contactDetails}>Email - {data?.email}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.note}>
              <Text style={{ color: COLORS.errorBorder }}>Note:</Text> Send the
              Request With Your Agency Code
            </Text>
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
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    elevation: 10,
     shadowOpacity: 0.2, // add opacity
    shadowRadius: 3,  // add blur radius
    shadowOffset: {
      width: 0,
      height: 3,
    },
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    alignItems: 'center',
    paddingVertical: 50,
  },
  closeButton: {
    position: 'absolute',
    top: 13,
    right: 13,
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
    fontSize: 22,
    fontFamily: Fonts.Roboto.Bold,
    color: COLORS.black,
    marginBottom: 10,
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

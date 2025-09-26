import * as React from 'react';
import {
  TouchableOpacity,
  Animated,
  Text,
  View,
  Modal,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';

import AlertButton from './AlertButton';
import AlertButtonWhite from './AlertButtonWhite';
import {TextInput} from 'react-native-paper';

export default function Flag({
  modalVisible,
  ButtonList,
  setModalVisible,
  Name,
}) {
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (modalVisible) {
      // Animate to visible
      Animated.timing(backgroundOpacity, {
        toValue: 0.2,
        duration: 1000,
        useNativeDriver: false, // Required for animating styles like backgroundColor
      }).start();
    } else {
      // Animate to hidden
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [modalVisible]);

  function hide() {
    if (modalVisible) {
      // Animate to visible
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false, // Required for animating styles like backgroundColor
      }).start();
      setTimeout(() => {
        setModalVisible(false);
      }, 300);
    } else {
      // Animate to hidden
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.modalTitle}>{Name}</Text>
            </View>
            <TouchableOpacity
              onPress={() => hide()}
              style={{
                borderRadius: 100,
                padding: 2,
                height: 27,
                width: 27,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.lightBorder,
              }}>
              <MaterialCommunityIcons
                name="close"
                color={COLORS.primaryGreen}
                size={20}
              />
            </TouchableOpacity>
          </View>

          <TextInput
            mode="outlined"
            label="Comment"
            placeholder="Enter your comment"
            style={{marginVertical: 3}}
            textColor={COLORS.ashBlue}
            outlineStyle={{borderRadius: 10}}
            outlineColor={COLORS.lightBorder}
            activeOutlineColor={COLORS.primary}
          />

          <TextInput
            mode="outlined"
            label="Remind me On"
            placeholder="14/01 /2025"
            style={{marginVertical: 3}}
            textColor={COLORS.ashBlue}
            outlineStyle={{borderRadius: 10}}
            outlineColor={COLORS.lightBorder}
            activeOutlineColor={COLORS.primary}
            right={
              <TextInput.Icon
                size={20}
                color={COLORS.primaryGreen}
                icon={'calendar-blank-outline'}
              />
            }
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 10,
              marginTop: 5,
            }}>
            <View style={{flex: 0.25}}>
              <AlertButtonWhite Title={'Clear'} />
            </View>
            <View style={{flex: 0.25}}>
              <AlertButton Title={'Flag'} />
            </View>
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
    width: '100%',
    padding: 25,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 25,
    shadowOpacity: 0.2, // add opacity
    shadowRadius: 3, // add blur radius
    shadowOffset: {
      width: 0,
      height: 3,
    },
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
  },
  modalTitle: {
    fontSize: 17,
    fontFamily: Fonts.Roboto.Medium,
    color: COLORS.title,
  },
});

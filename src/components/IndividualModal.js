import * as React from 'react';
import {
  TouchableOpacity,
  Animated,
  Text,
  View,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';
import individualPerforamance from '../icons/individualPerforamance.png'; // Replace with the actual logo path

export default function IndividualModal({modalVisible, setModalVisible}) {
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
      animationType="slide"
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
              <Text style={styles.modalTitle}>Sales Performance Type</Text>
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
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 18,
              borderWidth: 1.5,
              borderRadius: 10,
              borderColor: COLORS.modalBorder,
              marginVertical: 10,
            }}>
            <View style={{flex: 0.15, alignItems: 'center'}}>
              <Image
                source={individualPerforamance}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            </View>

            <View style={{flex: 0.85}}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: Fonts.Roboto.Medium,
                  color: COLORS.islandRank,
                }}>
                Individual Statistics
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 18,
              borderWidth: 1.5,
              borderRadius: 10,
              borderColor: COLORS.modalBorder,
              marginVertical: 10,
            }}>
            <View style={{flex: 0.15, alignItems: 'center'}}>
              <Image
                source={individualPerforamance}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            </View>

            <View style={{flex: 0.85}}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: Fonts.Roboto.Medium,
                  color: COLORS.islandRank,
                }}>
                Individual performance Comparison
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 18,
              borderWidth: 1.5,
              borderRadius: 10,
              borderColor: COLORS.modalBorder,
              marginVertical: 10,
            }}>
            <View style={{flex: 0.15, alignItems: 'center'}}>
              <Image
                source={individualPerforamance}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            </View>

            <View style={{flex: 0.85}}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: Fonts.Roboto.Medium,
                  color: COLORS.islandRank,
                }}>
                Branch sales performance
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    padding: 25,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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

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
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
import Fonts from '../theme/Fonts';
import SquareTextBox from './SquareTextBox';
import SquareTextBoxOutlined from './SquareTextBoxOutlined';
import SmallButton from './SmallButton';
import AlertButton from './AlertButton';
import AlertButtonWhite from './AlertButtonWhite';

export default function PolicyFilter({
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

          <View
            style={{borderTopWidth: 0.5, borderColor: COLORS.warmGray}}></View>

          <SquareTextBox Title={'All'} Label={'Business Type'} />
          <SquareTextBox Title={'Search by Type'} Label={'Policy Status'} />
          <SquareTextBox Title={''} Label={'Policy Number'} />

          <Text style={{marginTop: 10}}>Vehicle Number</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <View style={{flex: 1}}>
              <SquareTextBoxOutlined
                borderColor={COLORS.warmGray}
                Title={'XXX'}
              />
            </View>
            <View style={{flex: 1}}>
              <SquareTextBoxOutlined
                borderColor={COLORS.warmGray}
                Title={'9999'}
              />
            </View>
          </View>

          <Text style={{marginTop: 10}}>Start Date</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 10,
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <SquareTextBoxOutlined
                borderColor={COLORS.warmGray}
                Title={'2024/05/31'}
              />
            </View>
            <Text>TO</Text>
            <View style={{flex: 1}}>
              <SquareTextBoxOutlined
                borderColor={COLORS.warmGray}
                Title={'2024/06/31'}
              />
            </View>
          </View>

          <SquareTextBox
            LabelColor={COLORS.ashBlue}
            Title={''}
            Label={'Mobile Number'}
          />
          <SquareTextBox Title={''} Label={'NIC Number'} />
          <SquareTextBox Title={''} Label={'Bus. Reg. No'} />

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
              <AlertButton Title={'Search'} />
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
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
  },
  modalTitle: {
    fontSize: 17,
    fontFamily: Fonts.Roboto.Medium,
    color: COLORS.title,
  },
});

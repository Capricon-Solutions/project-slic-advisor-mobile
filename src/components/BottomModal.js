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
const window = Dimensions.get('window');

export default function BottomModal({
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

  const PolicyItem = ({title, icon, subButtons, onPress, expandable}) => {
    const [visible, setVisible] = React.useState(false);
    return (
      <View
        style={{
          borderWidth: 1.5,
          borderRadius: 10,
          borderColor: COLORS.modalBorder,
          paddingVertical: 18,

          marginVertical: 10,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onPress={() => {
            console.log(onPress.Value);
            if (onPress === 'expand') {
              console.log(onPress);
              setVisible(!visible);
            } else if (typeof onPress === 'function') {
              onPress();
            }
          }}>
          <View style={{flex: 0.15, alignItems: 'center'}}>
            <Image
              source={icon}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          </View>

          <View style={{flex: 0.7}}>
            <Text
              style={{
                fontSize: window.width * 0.038,
                fontFamily: Fonts.Roboto.Medium,
                color: COLORS.islandRank,
              }}>
              {title}
            </Text>
          </View>
          <View style={{flex: 0.15}}>
            {expandable && (
              <TouchableOpacity
                onPress={() => setVisible(!visible)}
                style={{alignItems: 'center'}}>
                <Octicons
                  name={visible == true ? 'chevron-up' : 'chevron-down'}
                  color={COLORS.black}
                  size={20}
                />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
        {visible && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              paddingTop: 15,
            }}>
            {subButtons?.map((button, index) => (
              <TouchableOpacity
                key={index}
                onPress={button.onPress}
                style={{
                  borderWidth: 1,
                  flex: 0.43,
                  paddingVertical: 10,
                  borderColor: COLORS.primary,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: window.width * 0.031,
                    color: COLORS.primary,
                    fontFamily: Fonts.Roboto.Medium,
                  }}>
                  {button.title}
                </Text>
              </TouchableOpacity>
            ))}
            {/* <View
              style={{
                borderWidth: 1,
                flex: 0.4,
                padding: 10,
                borderColor: COLORS.primary,
                borderRadius: 5,
              }}>
              <Text style={{textAlign: 'center'}}>Team Statistics</Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                flex: 0.4,
                padding: 10,
                borderColor: COLORS.primary,
                borderRadius: 5,
              }}>
              <Text style={{textAlign: 'center'}}>Team Statistics</Text>
            </View> */}
          </View>
        )}
      </View>
    );
  };

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

          <View>
            {ButtonList?.map((item, index) => (
              <PolicyItem
                key={index}
                title={item?.title}
                icon={item?.icon}
                expandable={item?.expandable}
                subButtons={item?.subButtons}
                onPress={item?.onPress}
              />
            ))}
          </View>
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
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
  },
  modalTitle: {
    fontSize: 17,
    fontFamily: Fonts.Roboto.Medium,
    color: COLORS.title,
  },
});

import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler'; // Import Swipeable
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors';
import {
  useDeleteNotificationMutation,
  useReadNotificationMutation,
} from '../redux/services/NotificationSlice';
import moment from 'moment';
import Fonts from '../theme/Fonts';

export default function NotificationItem({item, navigation, onDelete}) {
  const [readNotification] = useReadNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const handleReadNotification = async () => {
    await readNotification({notificationId: [item?.notificationId]}); // API call
    navigation.navigate('PolicyDetails', {policyNo: item.policyNo});
  };

  const handleDeleteNotification = async () => {
    console.log('test', item.policyNo);
    await deleteNotification({notificationId: [item?.notificationId]}); // API call
    // navigation.navigate('PolicyDetails', { policyNo: item.policyNo });
  };

  const renderRightActions = (progress, dragX) => {
    const translateX = dragX.interpolate({
      inputRange: [0, 100], // You can adjust this range
      outputRange: [0, 100], // Define how far the button moves
      extrapolate: 'clamp', // Prevents going out of bounds
    });
    // return (
    //   <View style={style.deleteButton}>
    //     <TouchableOpacity
    //       onPress={() => onDelete(item.notificationId)} // Trigger delete action
    //       style={style.deleteButtonContent}>
    //       <MaterialCommunityIcons name="trash-can" size={25} color={COLORS.white} />
    //     </TouchableOpacity>
    //   </View>
    // );
    return (
      <Animated.View style={[style.deleteButton, {transform: [{translateX}]}]}>
        <TouchableOpacity
          onPress={() => handleDeleteNotification()} // Trigger delete action
          style={style.deleteButtonContent}>
          <MaterialCommunityIcons
            name="trash-can"
            size={25}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        onPress={() => handleReadNotification()}
        style={[
          style.cardWrap,
          {
            elevation: 5,
            shadowOpacity: 0.2, // add opacity
            shadowRadius: 3, // add blur radius
            shadowOffset: {
              width: 0,
              height: 3,
            },
            marginVertical: 10,
            marginHorizontal: 5,
          },
        ]}>
        <View
          style={[
            style.leftBorder,
            {
              backgroundColor:
                item.isRead == true ? COLORS.warmGray : COLORS.primaryGreen,
            },
          ]}></View>
        <View style={{flex: 0.95}}>
          <View style={{padding: 10}}>
            <View style={style.topline}>
              <View style={{flex: 0.63}}>
                <Text style={style.topic} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
              <View style={{flex: 0.37, alignItems: 'flex-end'}}>
                <Text style={style.date}>
                  {moment(item.eventDate).format('DD MMM YYYY, hh:mm A')}
                </Text>
              </View>
            </View>

            <Text style={style.name}>{item.name}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={style.name}>{item.policyNo}</Text>
              <Text style={style.name}>{item.type}</Text>
            </View>

            <Text style={style.name}>
              Claim Initiated on{' '}
              {moment(item.intimatedDate).format('DD MMM YYYY')}
            </Text>

            <Text style={style.name}>{item.phone}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const style = StyleSheet.create({
  cardWrap: {
    flexDirection: 'row',
    // marginVertical: 7,
    borderRadius: 20,
    overflow: 'visible',
    backgroundColor: COLORS.white,

    // marginHorizontal: 5,
  },
  leftBorder: {
    flex: 0.05,
    backgroundColor: COLORS.primaryGreen,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  },
  topic: {
    fontFamily: Fonts.Roboto.Bold,
    color: COLORS.textColor,
    fontSize: 16,
  },
  date: {
    fontSize: Platform.OS === 'ios' ? 10 : 9,
    color: COLORS.textColor,
    fontFamily: Fonts.Roboto.Regular,
  },
  topline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 11,
    color: COLORS.textColor,
    fontFamily: Fonts.Roboto.Medium,
    marginVertical: 3,
  },
  deleteButton: {
    backgroundColor: COLORS.primaryRed,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  deleteButtonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,

    padding: 20,
  },
});

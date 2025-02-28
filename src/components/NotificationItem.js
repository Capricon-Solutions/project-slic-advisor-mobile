import * as React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
import Fonts from '../theme/Fonts';
import moment from 'moment';
import {useReadNotificationMutation} from '../redux/services/NotificationSlice';

export default function NotificationItem({item, navigation}) {
  const [readNotification] = useReadNotificationMutation();

  const handleReadNotification = async () => {
    await readNotification({notificationId: [item?.notificationId]}); // API call
    navigation.navigate('PolicyDetails', {policyNo: item.policyNo});
  };
  return (
    <TouchableOpacity
      onPress={() => handleReadNotification()}
      style={style.cardWrap}>
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
            <Text style={style.topic}>{item.title}</Text>
            <Text style={style.date}>
              {moment(item.eventDate).format('DD MMM YYYY, hh:mm A')}
            </Text>
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
            Claim Intimated on{' '}
            {moment(item.intimatedDate).format('DD MMM YYYY')}
          </Text>

          <Text style={style.name}>{item.phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  cardWrap: {
    flexDirection: 'row',
    marginVertical: 7,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    elevation: 5,
    marginHorizontal: 5,
  },
  leftBorder: {
    flex: 0.05,
    backgroundColor: COLORS.primaryGreen,
  },
  topic: {
    fontFamily: Fonts.Roboto.Bold,
    color: COLORS.textColor,
    fontSize: 16,
  },
  date: {
    fontSize: 10,
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
});

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

export default function NotificationItem({item}) {
  return (
    <View style={style.cardWrap}>
      <View style={style.leftBorder}></View>
      <View style={{flex: 0.9}}>
        <View style={{padding: 10}}>
          <View style={style.topline}>
            <Text style={style.topic}>{item.Title}</Text>
            <Text style={style.date}>{item.date}</Text>
          </View>

          <Text style={style.name}>{item.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={style.name}>{item.plicyNo}</Text>
            <Text style={style.name}>{item.type}</Text>
          </View>

          <Text style={style.name}>
            Claim Intimated on {item.intimated_date}
          </Text>

          <Text style={style.name}>{item.phone}</Text>
        </View>
      </View>
    </View>
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
    flex: 0.1,
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

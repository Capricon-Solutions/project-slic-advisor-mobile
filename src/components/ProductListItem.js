import * as React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  Image,
  Linking,
} from 'react-native';

import Octicons from 'react-native-vector-icons/Octicons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
import Fonts from '../theme/Fonts';

export default function ProductListItem({item}) {
  const handleCall = phoneNumber => {
    // Open the phone dialer with the contact number
    const phoneURL = `tel:${phoneNumber}`;
    Linking.openURL(phoneURL).catch(err =>
      console.error('Failed to make a call:', err),
    );
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.background,
        marginVertical: 8,
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        marginHorizontal: 5,
        borderRadius: 10,
        shadowColor: '#000',
        height: 85,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // borderWidth: 1,
        // borderColor: COLORS.lightBorder,
        elevation: 3,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          width: '100%',
          paddingVertical: 10,
          paddingLeft: 0,
        }}>
        <View
          style={{
            marginLeft: 5,
            justifyContent: 'space-evenly',
            flex: 0.2,
            height: '100%',
            borderRadius: 5,
            paddingHorizontal: 4,
            backgroundColor: COLORS.lightBlue,
            // height: '100%',
          }}>
          <Image
            style={{height: '100%', width: '100%', resizeMode: 'contain'}}
            source={item.icon}></Image>
        </View>

        <View
          style={{
            marginLeft: 5,
            justifyContent: 'space-evenly',
            flex: 0.75,
          }}>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.black,
              fontSize: 14,
            }}>
            {item.name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleCall(item.contact)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
            padding: 7,
          }}>
          <Octicons
            name={'chevron-right'}
            color={COLORS.primaryGreen}
            size={28}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

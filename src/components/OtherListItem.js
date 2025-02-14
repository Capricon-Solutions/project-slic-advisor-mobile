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
import SmallButton from './SmallButton';
import Logo from '../icons/Logo.png'; // Replace with the actual logo path

export default function OtherListItem({item}) {
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

        height: 95,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
            source={item?.imageUrl ? {uri: item.imageUrl} : Logo}
          />
        </View>

        <View
          style={{
            marginLeft: 5,
            justifyContent: 'space-evenly',
            flex: 0.55,
          }}>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.black,
              fontSize: 14,
            }}>
            {item.productName}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Regular,
              color: COLORS.black,
              fontSize: 11,
              textAlign: 'left',
              marginTop: 5,
            }}>
            {item.description}
          </Text>
        </View>
        <View style={{flex: 0.23}}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primaryGreen,
              borderRadius: 8,
              // width: '100%',
              height: 30,
              fontFamily: Fonts.Roboto.Bold,
              justifyContent: 'center',
              marginVertical: 8,
              alignItems: 'center',
              paddingHorizontal: 5,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontFamily: Fonts.Roboto.Regular,
              }}>
              {'Download'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

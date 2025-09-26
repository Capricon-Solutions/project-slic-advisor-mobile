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
import Logo from '../icons/Logo.png'; // Replace with the actual logo path

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
import Fonts from '../theme/Fonts';

export default function ProductListItem({item, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: COLORS.background,
        marginBottom: 10,
        marginTop: 5,
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

        elevation: 3,
        shadowOpacity: 0.2, // add opacity
        shadowRadius: 3, // add blur radius
        shadowOffset: {
          width: 0,
          height: 3,
        },
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
            flex: 0.75,
          }}>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.black,
              fontSize: 14,
            }}>
            {item.productName}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onPress}
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
    </TouchableOpacity>
  );
}

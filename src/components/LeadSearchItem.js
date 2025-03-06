import * as React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  Image,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors';
import { Styles } from '../theme/Styles';
import Fonts from '../theme/Fonts';

export default function LeadSearchItem({ item, onPress }) {
  const handleCall = phoneNumber => {
    // Open the phone dialer with the contact number
    const phoneURL = `tel:${phoneNumber}`;
    Linking.openURL(phoneURL).catch(err =>
      console.error('Failed to make a call:', err),
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={Styles.leadSearchListWrap}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
          width: '100%',
          paddingVertical: 15,
          paddingLeft: 10,
        }}>
        <View
          style={{
            marginLeft: 5,
            justifyContent: 'space-evenly',
            flex: 0.9,
            height: '100%',
          }}>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.black,
              fontSize: 15,
            }}>
            Mrs.Liyoni Dehigolla
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.primary,
              fontSize: 13.5,
            }}>
            Campaign
          </Text>

          <View
            style={{
              flexDirection: 'row',
              gap: 15,
            }}>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="car"
                style={{}}
                color={COLORS.grayText}
                size={20}
              />
              <Text
                style={{
                  color: COLORS.textColor,
                  fontSize: 12,
                  fontFamily: Fonts.Roboto.Medium,
                }}>
                Motor Business
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="phone"
                style={{}}
                color={COLORS.grayText}
                size={18}
              />
              <Text
                style={{
                  color: COLORS.textColor,
                  fontSize: 12,
                  fontFamily: Fonts.Roboto.Medium,
                }}>
                (76) 025 9060
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity
            onPress={() => handleCall(item.contactNo1)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
              height: 28,
              width: 28,
              justifyContent: 'center',
              backgroundColor: COLORS.primary,
              padding: 7,
            }}>
            <MaterialCommunityIcons
              name="phone-outline"
              style={{}}
              color={COLORS.white}
              size={14}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

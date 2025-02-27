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
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
import Fonts from '../theme/Fonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';
import motor from '../icons/motor.png'; // Replace with the actual logo path
import {TextInput} from 'react-native-paper';
import Button from './Button';

export default function PolicyItem({item, navigation}) {
  const [visible, setVisible] = React.useState(false);
  const handleCall = phoneNumber => {
    // Open the phone dialer with the contact number
    const phoneURL = `tel:${phoneNumber}`;
    Linking.openURL(phoneURL).catch(err =>
      console.error('Failed to make a call:', err),
    );
  };
  return (
    <View style={Styles.contactlistWrap}>
      <TouchableOpacity
        onPress={() => setVisible(!visible)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 55,
          width: '100%',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            {/* <Octicons name="search" color={COLORS.primary} size={20} /> */}
            <FontAwesome5 name="car" color={COLORS.primary} size={24} />
          </View>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Medium,
              color: COLORS.black,
              marginLeft: 10,
            }}>
            {item.policyNo}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Octicons
            name={visible == true ? 'chevron-up' : 'chevron-down'}
            color={COLORS.black}
            size={20}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      {visible && (
        <View
          style={{
            width: '100%',
            backgroundColor: COLORS.white,
            paddingBottom: 5,
            paddingTop: 0,
          }}>
          <TextInput
            mode="outlined"
            label="Insured Name"
            readOnly
            style={{marginVertical: 3}}
            textColor={COLORS.ashBlue}
            outlineStyle={{borderRadius: 10}}
            outlineColor={COLORS.lightBorder}
            value={item.customerName}
          />

          <TextInput
            mode="outlined"
            label="Policy Number"
            readOnly
            style={{marginVertical: 3}}
            textColor={COLORS.ashBlue}
            outlineStyle={{borderRadius: 10}}
            outlineColor={COLORS.lightBorder}
            value={item.policyNo}
          />

          <TextInput
            mode="outlined"
            label="Vehicle Number"
            readOnly
            style={{marginVertical: 3}}
            textColor={COLORS.ashBlue}
            outlineStyle={{borderRadius: 10}}
            outlineColor={COLORS.lightBorder}
            value={item.vehicleNo}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <View style={{flex: 0.48}}>
              <TextInput
                mode="outlined"
                label="Start"
                readOnly
                style={{marginVertical: 3}}
                textColor={COLORS.ashBlue}
                outlineStyle={{borderRadius: 10}}
                outlineColor={COLORS.lightBorder}
                value={moment(item.startDate).format('YYYY/MM/DD')} // Formats to 2025/11/26
              />
            </View>
            <View style={{flex: 0.48}}>
              <TextInput
                mode="outlined"
                label="End"
                readOnly
                style={{marginVertical: 3}}
                textColor={COLORS.ashBlue}
                outlineStyle={{borderRadius: 10}}
                outlineColor={COLORS.lightBorder}
                value={moment(item.endDate).format('YYYY/MM/DD')} // Formats to 2025/11/26
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: COLORS.lightBorder,
                flex: 1,
                height: 40,
                marginRight: 4,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="star-outline"
                color={COLORS.primary}
                size={24}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `whatsapp://send?text=Hello&phone=${item.telephone}`,
                )
              }
              style={{
                borderWidth: 1,
                borderColor: COLORS.lightBorder,
                flex: 1,
                height: 40,
                marginRight: 4,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="whatsapp"
                color={COLORS.primary}
                size={24}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleCall(item.telephone)}
              style={{
                borderWidth: 1,
                borderColor: COLORS.lightBorder,
                flex: 1,
                height: 40,
                marginRight: 4,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="phone-outline"
                color={COLORS.primary}
                style={{transform: [{rotate: '90deg'}]}} // Rotate 90 degrees
                size={22}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 8,
                width: 130,
                height: 40,
                fontFamily: Fonts.Roboto.Bold,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate('PolicyDetails', {policyNo: item.policyNo})
              }>
              <Text style={Styles.buttonText}>Go to Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

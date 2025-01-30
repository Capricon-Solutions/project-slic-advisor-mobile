import * as React from 'react';
import {TouchableOpacity, Dimensions, Text, View, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
import Fonts from '../theme/Fonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import motor from '../icons/motor.png'; // Replace with the actual logo path
import {TextInput} from 'react-native-paper';
import Button from './Button';

export default function PolicyItem({item}) {
  const [visible, setVisible] = React.useState(false);

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
            {item.title}
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
          radOnly
          style={{marginVertical: 3}}
          textColor={COLORS.ashBlue}
          outlineStyle={{borderRadius: 10}}
          outlineColor={COLORS.lightBorder}
          value={item.InsuredName}
        />

        <TextInput
          mode="outlined"
          label="Policy Number"
          radOnly
          style={{marginVertical: 3}}
          textColor={COLORS.ashBlue}
          outlineStyle={{borderRadius: 10}}
          outlineColor={COLORS.lightBorder}
          value={item.PolicyNumber}
        />

        <TextInput
          mode="outlined"
          label="Vehicle Number"
          radOnly
          style={{marginVertical: 3}}
          textColor={COLORS.ashBlue}
          outlineStyle={{borderRadius: 10}}
          outlineColor={COLORS.lightBorder}
          value={item.VehicleNumber}
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
              radOnly
              style={{marginVertical: 3}}
              textColor={COLORS.ashBlue}
              outlineStyle={{borderRadius: 10}}
              outlineColor={COLORS.lightBorder}
              value={item.StartDate}
            />
          </View>
          <View style={{flex: 0.48}}>
            <TextInput
              mode="outlined"
              label="End"
              radOnly
              style={{marginVertical: 3}}
              textColor={COLORS.ashBlue}
              outlineStyle={{borderRadius: 10}}
              outlineColor={COLORS.lightBorder}
              value={item.EndDate}
            />
          </View>
        </View>
        {visible && (
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.lightBorder,
                width: 46,
                height: 40,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="star-outline"
                color={COLORS.primary}
                size={24}
              />
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.lightBorder,
                width: 46,
                height: 40,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="whatsapp"
                color={COLORS.primary}
                size={24}
              />
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.lightBorder,
                width: 46,
                height: 40,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="phone-outline"
                color={COLORS.primary}
                size={22}
              />
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 8,
                width: 131,
                height: 40,
                fontFamily: Fonts.Roboto.Bold,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={Styles.buttonText}>Go to Policy</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

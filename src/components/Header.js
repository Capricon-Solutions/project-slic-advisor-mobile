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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
import Fonts from '../theme/Fonts';
import Button from './Button';
import SmallButton from './SmallButton';

// import { useSelector } from "react-redux";
const window = Dimensions.get('window');

export default function Header({
  Title,
  onPress,
  ButtonTitle,
  haveButton,
  onFilterPress,
  onButton,
  haveFilters,
  haveMenu,
  haveCall,
  haveWhatsapp,
}) {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: window.height * 0.09,
        marginTop: 5,
        marginHorizontal: 20,
      }}>
      <View style={{justifyContent: 'center', flex: 0.25}}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: window.width * 0.1,
            width: window.width * 0.1,
            borderRadius: 13,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons
            name="chevron-left"
            color={COLORS.black}
            size={25}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.5, alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: Fonts.Roboto.Bold,
            fontSize: 17,
            color: COLORS.title,
          }}>
          {Title}
        </Text>
      </View>
      <View
        style={{
          flex: 0.25,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        {haveButton && (
          <View style={{width: '100%'}}>
            <SmallButton Title={ButtonTitle} onPress={onButton}></SmallButton>
          </View>
        )}

        {haveFilters && (
          <View>
            <TouchableOpacity
              onPress={onFilterPress}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.white,
                height: 36,
                width: 36,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Octicons name="search" color={COLORS.white} size={18} />
            </TouchableOpacity>
          </View>
        )}

        {haveCall && (
          <View>
            <View
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.white,
                height: 36,
                width: 36,
                marginHorizontal: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="phone-outline"
                color={COLORS.white}
                size={18}
              />
            </View>
          </View>
        )}

        {haveWhatsapp && (
          <View>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'whatsapp://send?text=hello&phone=xxxxxxxxxxxxx',
                )
              }
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                borderWidth: 1,
                marginHorizontal: 2,
                borderColor: COLORS.white,
                height: 36,
                width: 36,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="whatsapp"
                color={COLORS.white}
                size={18}
              />
            </TouchableOpacity>
          </View>
        )}
        {haveMenu && (
          <View style={{marginLeft: 5}}>
            <View style={{}}>
              <MaterialIcons name="more-vert" color={COLORS.black} size={27} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

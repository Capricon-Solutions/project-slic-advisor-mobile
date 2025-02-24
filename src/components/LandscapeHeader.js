import * as React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  Image,
  TextInput,
  Linking,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../theme/colors';
import Feather from 'react-native-vector-icons/Feather';
import {Styles} from '../theme/Styles';
import Fonts from '../theme/Fonts';
import Button from './Button';
import SmallButton from './SmallButton';

// import { useSelector } from "react-redux";
const window = Dimensions.get('window');

export default function LandscapeHeader({
  Title,
  onPress,
  ButtonTitle,
  haveButton,
  haveSearch,
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
        height: 70,
        marginTop: 5,
      }}>
      <View style={{justifyContent: 'center', flex: 0.07}}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: 40,
            width: 40,
            borderRadius: 13,
            borderWidth: 1,
            borderColor: COLORS.warmGray,
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
      <View style={{flex: 0.3, alignItems: 'flex-start'}}>
        <Text
          style={{
            fontFamily: Fonts.Roboto.Bold,
            fontSize: 18,
            color: COLORS.title,
          }}>
          {Title}
        </Text>
      </View>
      <View
        style={{
          flex: 0.6,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {haveButton && (
          <View>
            <SmallButton Title={ButtonTitle} onPress={onButton}></SmallButton>
          </View>
        )}

        {haveFilters && (
          <View>
            <View
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
            </View>
          </View>
        )}

        {haveSearch && (
          <View style={styles.searchWrap}>
            <TextInput style={styles.textInput} placeholder="11/2024" />
            <TouchableOpacity style={styles.searchButton}>
              <Feather name="calendar" color={COLORS.primaryGreen} size={20} />
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

const styles = StyleSheet.create({
  mainWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    marginTop: 20,
  },
  searchWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.warmGray,
    borderRadius: 10,
    backgroundColor: COLORS.calenderInput,
    marginVertical: 20,
    paddingLeft: 10,
    height: 44,
  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.Roboto.Medium,
    color: COLORS.textColor,
    backgroundColor: COLORS.calenderInput,
    alignSelf: 'center',
    fontSize: 12,
  },
  searchButton: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
import Feather from 'react-native-vector-icons/Feather';

import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';
import VisitsIcon from './../icons/Visits.png';
const window = Dimensions.get('window');

export default function EconerItems({item, navigation, GogreenDetailsAll}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.page)}
      style={styles.container}>
      <View
        style={{
          flex: 0.15,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            borderRadius: 100,
            height: 46,
            width: 46,
            backgroundColor: COLORS.tableSubHeader,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons
            name="car"
            color={COLORS.iconDisabled}
            size={29}
          />
        </View>
      </View>
      <View
        style={{
          flex: 0.7,
          paddingLeft: 10,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <View>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.textColor,
              fontSize: window.width * 0.036,
              marginBottom: 8,
            }}>
            {item?.type}
          </Text>
        </View>

        {item?.download || item?.Share ? (
          <View
            style={{
              backgroundColor: COLORS.grassGreen,
              paddingVertical: 3,
              paddingHorizontal: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 6,
            }}>
            <Feather name="download" color={COLORS.white} size={13} />
            <Text
              style={{
                fontSize: 10,
                fontFamily: Fonts.Roboto.Bold,
                color: COLORS.white,
                marginLeft: 8,
              }}>
              {item?.download && item?.Share
                ? 'Download or Share'
                : item?.download
                ? 'Download'
                : item?.Share
                ? 'Share'
                : ''}
            </Text>
          </View>
        ) : item?.conunt > 0 ? (
          <View
            style={{
              backgroundColor: COLORS.grassGreen,
              paddingVertical: 3,
              paddingHorizontal: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: 6,
            }}>
            <Image source={VisitsIcon} style={{height: 12, width: 12}} />
            <Text
              style={{
                fontSize: 10,
                fontFamily: Fonts.Roboto.Bold,
                color: COLORS.white,
                marginLeft: 8,
              }}>
              {item?.conunt}
            </Text>
          </View>
        ) : null}
      </View>
      <View
        style={{
          flex: 0.15,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            borderRadius: 8,
            height: 32,
            width: 32,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialCommunityIcons
            name="arrow-right"
            color={COLORS.white}
            size={25}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    marginTop: 15,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    elevation: 10,
    borderRadius: 10,
    shadowColor: '#000',
    flexDirection: 'row',
    shadowOpacity: 0.2, // add opacity
    shadowRadius: 3, // add blur radius
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

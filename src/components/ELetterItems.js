import * as React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  Image,
  Linking,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import COLORS from '../theme/colors';
import {Styles} from '../theme/Styles';
import Fonts from '../theme/Fonts';
const window = Dimensions.get('window');

export default function ELetterItems({item, navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontFamily: Fonts.Roboto.SemiBold,
            fontSize: 13,
            color: COLORS.textColor,
          }}>
          {item?.customerName}
        </Text>
        <View
          style={{
            backgroundColor: COLORS.grassGreen,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            padding: 5,
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 10,
              fontFamily: Fonts.Roboto.Bold,
            }}>
            {item?.policyStatus}
          </Text>
        </View>
      </View>

      <View>
        <View style={styles.subLine}>
          <View style={{flex: 0.7}}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Regular,
                fontSize: 13,
                marginBottom: 2,
                color: COLORS.textColor,
              }}>
              {item?.policyNo}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Regular,
                fontSize: 13,
                marginVertical: 2,
                color: COLORS.textColor,
              }}>
              {item?.vehicleNo}
            </Text>
            <View style={styles.subDatamargin}>
              <Text
                style={{
                  fontFamily: Fonts.Roboto.Bold,
                  fontSize: 13,
                  color: COLORS.textColor,
                }}>
                Due date
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Roboto.Regular,
                  fontSize: 13,
                  color: COLORS.textColor,
                }}>
                {item?.dueDate}
              </Text>
            </View>
            <View style={styles.subDatamargin}>
              <Text
                style={{
                  fontFamily: Fonts.Roboto.Bold,
                  fontSize: 13,
                  color: COLORS.textColor,
                }}>
                Premium amount
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Roboto.Regular,
                  fontSize: 13,
                  color: COLORS.textColor,
                }}>
                {Number(item?.premiumAmount || 0).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>
          </View>

          {/* <View style={{ flex: 0.3, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{
              height: 30, width: 30, borderRadius: 8,
              backgroundColor: COLORS.primary, justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: COLORS.white
            }}>
              <Feather
                name="download"
                color={COLORS.black}
                size={17}
              />
            </View>

            <View style={{
              height: 30, width: 30, borderRadius: 8,
              backgroundColor: COLORS.primary, justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: COLORS.white
            }}>
              <Ionicons
                name="share-social-sharp"
                color={COLORS.black}
                size={16}
              />
            </View>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    marginTop: 15,

    padding: 10,
    justifyContent: 'space-between',
    elevation: 10,
    borderRadius: 10,
    shadowColor: '#000',

    // height: 111,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  subLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  subDatamargin: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 2,
  },
});

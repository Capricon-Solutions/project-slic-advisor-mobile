import * as React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';
const window = Dimensions.get('window');

// export default function ECMotorRenewal({item, navigation}) {
const ECMotorRenewal = React.memo(({item, navigation}) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)}
      style={{
        padding: 10,
        backgroundColor: COLORS.white,
        elevation: 10,
        shadowOpacity: 0.2, // add opacity
        shadowRadius: 3, // add blur radius
        shadowOffset: {
          width: 0,
          height: 3,
        },
        borderRadius: 12,
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 10,
      }}>
      <View
        style={{
          backgroundColor: COLORS.grassGreen,
          marginBottom: 5,
          alignItems: 'center',
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 3,
        }}>
        <View></View>
        <Text
          style={{
            color: COLORS.white,
            fontFamily: Fonts.Roboto.SemiBold,
            marginVertical: 1,
          }}>
          {item?.policyStatus}{' '}
          {`LKR ${new Intl.NumberFormat('en-LK', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(item?.premiumAmount || 0)}`}
        </Text>
        <View>
          <MaterialCommunityIcons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            color={COLORS.white}
            size={24}
          />
        </View>
      </View>
      <View style={styles.motorRenewalCardItem}>
        <View style={{flex: 0.3}}>
          <Text style={styles.motorRenewalCardItemLeft}>Policy No</Text>
        </View>
        <View style={{flex: 0.7}}>
          <Text style={styles.motorRenewalCardItemRight}>
            {item?.policyNo || 'Unavailable'}
          </Text>
        </View>
      </View>

      <View style={styles.motorRenewalCardItem}>
        <View style={{flex: 0.3}}>
          <Text style={styles.motorRenewalCardItemLeft}>Vehicle No</Text>
        </View>
        <View style={{flex: 0.7}}>
          <Text style={styles.motorRenewalCardItemRight}>
            {item?.vehicleNo || 'Unavailable'}
          </Text>
        </View>
      </View>

      <View style={styles.motorRenewalCardItem}>
        <View style={{flex: 0.3}}>
          <Text style={styles.motorRenewalCardItemLeft}>Premium</Text>
        </View>
        <View style={{flex: 0.7}}>
          <Text style={styles.motorRenewalCardItemRight}>
            {`LKR ${new Intl.NumberFormat('en-LK', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(item?.premiumAmount || 0)}`}
          </Text>
        </View>
      </View>
      <View style={styles.motorRenewalCardItem}>
        <View style={{flex: 0.3}}>
          <Text style={styles.motorRenewalCardItemLeft}>Total Paid Claims</Text>
        </View>
        <View style={{flex: 0.7}}>
          <Text style={styles.motorRenewalCardItemRight}>
            {`LKR ${new Intl.NumberFormat('en-LK', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(item?.sumIns || 0)}`}
          </Text>
        </View>
      </View>
      <View style={styles.motorRenewalCardItem}>
        <View style={{flex: 0.3}}>
          <Text style={styles.motorRenewalCardItemLeft}>Due Date</Text>
        </View>
        <View style={{flex: 0.7}}>
          <Text style={styles.motorRenewalCardItemRight}>
            {item?.dueDate || 'Unavailable'}
          </Text>
        </View>
      </View>

      {expanded && (
        <View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: COLORS.lightBorder,
              marginVertical: 2,
            }}></View>
          <View style={styles.motorRenewalCardItem}>
            <View style={{flex: 0.3}}>
              <Text style={styles.motorRenewalCardItemLeft}>Name </Text>
            </View>
            <View style={{flex: 0.7}}>
              <Text style={styles.motorRenewalCardItemRight}>
                {item?.customerName || 'Unavailable'}
              </Text>
            </View>
          </View>
          <View style={styles.motorRenewalCardItem}>
            <View style={{flex: 0.3}}>
              <Text style={styles.motorRenewalCardItemLeft}>Address</Text>
            </View>
            <View style={{flex: 0.7}}>
              <Text style={styles.motorRenewalCardItemRight}>
                {item?.address || 'Unavailable'}
              </Text>
            </View>
          </View>
          <View style={styles.motorRenewalCardItem}>
            <View style={{flex: 0.3}}>
              <Text style={styles.motorRenewalCardItemLeft}>Contacts Tel</Text>
            </View>
            <View style={{flex: 0.7}}>
              <Text style={styles.motorRenewalCardItemRight}>
                {item?.mobileNo || 'Unavailable'}
              </Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
});
export default ECMotorRenewal;
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  motorRenewalCardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  motorRenewalCardItemLeft: {
    fontFamily: Fonts.Roboto.Bold,
    color: COLORS.textColor,
    fontSize: 12,
  },
  motorRenewalCardItemRight: {
    fontFamily: Fonts.Roboto.Regular,
    color: COLORS.textColor,
    fontSize: 12,
  },
});

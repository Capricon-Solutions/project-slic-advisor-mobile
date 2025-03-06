import * as React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  Image,
  Linking,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import COLORS from '../theme/colors';
import { Styles } from '../theme/Styles';
import Fonts from '../theme/Fonts';
import VisitsIcon from './../icons/Visits.png';
const window = Dimensions.get('window');

export default function ECMotorRenewal({ item, navigation }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)} style={{
        padding: 10, backgroundColor: COLORS.white,
        elevation: 10,
        borderRadius: 12,
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 10
      }}>
      <View style={{
        backgroundColor: COLORS.grassGreen, marginBottom: 5,
        alignItems: 'center',
        borderRadius: 5
      }}>
        <Text style={{
          color: COLORS.white, fontFamily: Fonts.Roboto.SemiBold,
          marginVertical: 1
        }}>Pending claims LKR 18,052.81</Text>

      </View>
      <View style={styles.motorRenewalCardItem}>
        <View style={{ flex: 0.3, }}>
          <Text style={styles.motorRenewalCardItemLeft}>Policy No</Text>
        </View>
        <View style={{ flex: 0.7, }}>
          <Text style={styles.motorRenewalCardItemRight}>A/11/0438130/010/P</Text>
        </View>
      </View>

      <View style={styles.motorRenewalCardItem}>
        <View style={{ flex: 0.3, }}>
          <Text style={styles.motorRenewalCardItemLeft}>Vehicle No</Text>
        </View>
        <View style={{ flex: 0.7, }}>
          <Text style={styles.motorRenewalCardItemRight}>HT 4174</Text>
        </View>
      </View>

      <View style={styles.motorRenewalCardItem}>
        <View style={{ flex: 0.3, }}>
          <Text style={styles.motorRenewalCardItemLeft}>Premium</Text>
        </View>
        <View style={{ flex: 0.7, }}>
          <Text style={styles.motorRenewalCardItemRight}>LKR 18,052.81</Text>
        </View>
      </View>
      <View style={styles.motorRenewalCardItem}>
        <View style={{ flex: 0.3, }}>
          <Text style={styles.motorRenewalCardItemLeft}>Total paid claims</Text>
        </View>
        <View style={{ flex: 0.7, }}>
          <Text style={styles.motorRenewalCardItemRight}>LKR 18,052.81</Text>
        </View>
      </View>
      <View style={styles.motorRenewalCardItem}>
        <View style={{ flex: 0.3, }}>
          <Text style={styles.motorRenewalCardItemLeft}>Due Date</Text>
        </View>
        <View style={{ flex: 0.7, }}>
          <Text style={styles.motorRenewalCardItemRight}>02-Mar-2025</Text>
        </View>
      </View>

      {expanded &&
        <View>
          <View style={styles.motorRenewalCardItem}>
            <View style={{ flex: 0.3, }}>
              <Text style={styles.motorRenewalCardItemLeft}>Name </Text>
            </View>
            <View style={{ flex: 0.7, }}>
              <Text style={styles.motorRenewalCardItemRight}>Mr. N SOMARATNA.</Text>
            </View>
          </View>
          <View style={styles.motorRenewalCardItem}>
            <View style={{ flex: 0.3, }}>
              <Text style={styles.motorRenewalCardItemLeft}>Address</Text>
            </View>
            <View style={{ flex: 0.7, }}>
              <Text style={styles.motorRenewalCardItemRight}>No.36, Wijethunga Mawatha Gampaha</Text>
            </View>
          </View>
          <View style={styles.motorRenewalCardItem}>
            <View style={{ flex: 0.3, }}>
              <Text style={styles.motorRenewalCardItemLeft}>contacts Tel</Text>
            </View>
            <View style={{ flex: 0.7, }}>
              <Text style={styles.motorRenewalCardItemRight}>0702056655</Text>
            </View>
          </View>
        </View>

      }
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
    // height: 111,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  motorRenewalCardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3
  },
  motorRenewalCardItemLeft: {

    fontFamily: Fonts.Roboto.Bold,
    color: COLORS.textColor,
    fontSize: 12
  },
  motorRenewalCardItemRight: {
    fontFamily: Fonts.Roboto.Regular,
    color: COLORS.textColor,
    fontSize: 12
  },
});

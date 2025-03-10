import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Styles } from '../../theme/Styles';
import HeaderBackground from '../../components/HeaderBackground';
import Header from '../../components/Header';
import COLORS from '../../theme/colors';
import SquareTextBox from '../../components/SquareTextBox';
import SquareTextBoxOutlined from '../../components/SquareTextBoxOutlined';
import Fonts from '../../theme/Fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Avatar } from 'react-native-paper';
import avatar from '../../images/avatar.png'; // Replace with the actual logo path
import { styles } from './styles';
import Button from '../../components/Button';
const window = Dimensions.get('window');
export default function Settings({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={Styles.container}>
        {/* <HeaderBackground /> */}
        <Header Title="Change Password" onPress={() => navigation.goBack()} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          fadingEdgeLength={20}
          contentContainerStyle={{ paddingHorizontal: 20 }}>
          <View>
            <Text style={styles.topics}>Set a new password</Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: window.width * 0.035,
                fontFamily: Fonts.Roboto.Medium,
                color: COLORS.subtext,
                marginVertical: 5,
              }}>
              Create a new password. Ensure it differs from previous ones for
              security
            </Text>
          </View>

          <View>
            <Text style={styles.topics}>current password</Text>
          </View>

          <SquareTextBox
            Title={'Enter your current password'}
            Secure={true}></SquareTextBox>

          <View>
            <Text style={styles.topics}>New Password</Text>
          </View>

          <SquareTextBox
            Title={'Enter your new password'}
            Secure={true}></SquareTextBox>

          <View style={{ marginTop: window.height * 0.02 }}>
            <View style={styles.conditionsWrap}>
              <View style={styles.condIconWrap}>
                <MaterialCommunityIcons
                  name="check-circle"
                  color={COLORS.primaryGreen}
                  size={23}
                />
              </View>
              <Text style={styles.condText}>8 to 20 characters</Text>
            </View>

            <View style={styles.conditionsWrap}>
              <View style={styles.condIconWrap}>
                <MaterialCommunityIcons
                  name="check-circle"
                  color={COLORS.primaryGreen}
                  size={23}
                />
              </View>
              <Text style={styles.condText}>
                1 or more lowercase characters
              </Text>
            </View>

            <View style={styles.conditionsWrap}>
              <View style={styles.condIconWrap}>
                <MaterialCommunityIcons
                  name="check-circle"
                  color={COLORS.primaryGreen}
                  size={23}
                />
              </View>
              <Text style={styles.condText}>
                1 or more uppercase characters
              </Text>
            </View>

            <View style={styles.conditionsWrap}>
              <View style={styles.condIconWrap}>
                <MaterialCommunityIcons
                  name="check-circle"
                  color={COLORS.primaryGreen}
                  size={23}
                />
              </View>
              <Text style={styles.condText}>1 or more numerice</Text>
            </View>

            <View style={styles.conditionsWrap}>
              <View style={styles.condIconWrap}>
                <MaterialCommunityIcons
                  name="check-circle"
                  color={COLORS.primaryGreen}
                  size={23}
                />
              </View>
              <Text style={styles.condText}>1 or more Special characters</Text>
            </View>
          </View>

          <View>
            <Text style={styles.topics}>Confirm Password</Text>
          </View>

          <SquareTextBox
            Title={'Enter Confirm Password'}
            Secure={true}></SquareTextBox>

          <View
            style={{
              marginVertical: 12,
              paddingHorizontal: 20,
              // position: 'absolute',
              width: '100%',
            }}>
            <Button
              onPress={() => navigation.goBack()}
              Title={'Submit'}></Button>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

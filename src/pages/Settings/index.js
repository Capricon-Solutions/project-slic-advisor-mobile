import React, { useState, useEffect } from 'react';
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
import avatar from '../../images/avatar.png';
import Button from '../../components/Button';
import LoaderKit from 'react-native-loader-kit';
import { useChangePasswordMutation } from '../../redux/services/loginSlice';
import { showToast } from '../../components/ToastMessage';
import { useSelector } from 'react-redux';

const window = Dimensions.get('window');

export default function Settings({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const id = useSelector(state => state.Profile?.profile?.user?.id);

  const [changePassword, { isLoading, error: changePassError }] =
    useChangePasswordMutation();

  useEffect(() => {
    validateForm();
  }, [currentPassword, newPassword, confirmPassword]);

  const validateForm = () => {
    let errors = {};

    // Current password validation
    if (!currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    // New password validation
    if (!newPassword) {
      errors.newPassword = 'New password is required';
    } else if (newPassword.length < 8 || newPassword.length > 20) {
      errors.newPassword = 'Password must be 8-20 characters long';
    } else if (!/[a-z]/.test(newPassword)) {
      errors.newPassword =
        'Password must contain at least one lowercase letter';
    } else if (!/[A-Z]/.test(newPassword)) {
      errors.newPassword =
        'Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(newPassword)) {
      errors.newPassword = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      errors.newPassword =
        'Password must contain at least one special character';
    } else if (currentPassword && newPassword === currentPassword) {
      errors.newPassword =
        'New password must be different from current password';
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      showToast({
        type: 'error',
        text1: 'Validation issue',
        text2: 'validation message',
      });
      return;
    }

    const body = {
      Username: id,
      CurrentPassword: currentPassword,
      NewPassword: newPassword,
    };
    try {
      const response = await changePassword(body).unwrap();
      showToast({
        type: 'success',
        text1: 'Success',
        text2: 'Password changed successfully',
      });
      navigation.goBack();
    } catch (err) {
      console.error('Password change failed:', err);
      if (err?.data?.Message?.toLowerCase().includes('current password')) {
        setErrors({ ...errors, currentPassword: 'Incorrect current password' });
      } else {
        showToast({
          type: 'error',
          text1: 'Failed',
          text2: err?.data?.Message || 'Something went wrong.',
        });
      }
    }
  };

  const renderPasswordRequirement = (condition, text) => {
    const isMet = condition(newPassword);
    return (
      <View style={styles.conditionsWrap}>
        <View style={styles.condIconWrap}>
          <MaterialCommunityIcons
            name={isMet ? 'check-circle' : 'checkbox-blank-circle-outline'}
            color={isMet ? COLORS.primaryGreen : COLORS.warmGray}
            size={23}
          />
        </View>
        <Text
          style={[
            styles.condText,
            { color: isMet ? COLORS.primaryGreen : COLORS.textColor },
          ]}>
          {text}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={Styles.container}>
        <Header Title="Change Password" onPress={() => navigation.goBack()} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          fadingEdgeLength={20}
          contentContainerStyle={{ paddingHorizontal: 20 }}>
          <View>
            <Text style={styles.topics}>Set a new password</Text>
          </View>

          <View>
            <Text style={styles.subtext}>
              Create a new password. Ensure it differs from previous ones for
              security
            </Text>
          </View>

          <View>
            <Text style={styles.topics}>Current password</Text>
          </View>

          <SquareTextBox
            Title={'Enter your current password'}
            Secure={!showCurrentPassword}
            value={currentPassword}
            setValue={text => {
              const newText = text.replace(
                /[^a-zA-Z0-9!@#$%^&*(),.?":{}|<>]/g,
                '',
              );
              setCurrentPassword(newText);
            }}
            RightIcon={
              <TouchableOpacity
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                <Feather
                  name={showCurrentPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={COLORS.gray}
                />
              </TouchableOpacity>
            }
          />
          {errors.currentPassword && (
            <Text style={styles.errorText}>{errors.currentPassword}</Text>
          )}

          <View>
            <Text style={styles.topics}>New Password</Text>
          </View>

          <SquareTextBox
            Title={'Enter your new password'}
            Secure={!showNewPassword}
            value={newPassword}
            setValue={text => {
              const newText = text.replace(
                /[^a-zA-Z0-9!@#$%^&*(),.?":{}|<>]/g,
                '',
              );
              setNewPassword(newText);
            }}
            RightIcon={
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}>
                <Feather
                  name={showNewPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={COLORS.gray}
                />
              </TouchableOpacity>
            }
          />
          {errors.newPassword && (
            <Text style={styles.errorText}>{errors.newPassword}</Text>
          )}

          <View style={{ marginTop: window.height * 0.02 }}>
            {renderPasswordRequirement(
              pwd => pwd.length >= 8 && pwd.length <= 20,
              '8 to 20 characters',
            )}
            {renderPasswordRequirement(
              pwd => /[a-z]/.test(pwd),
              '1 or more lowercase characters',
            )}
            {renderPasswordRequirement(
              pwd => /[A-Z]/.test(pwd),
              '1 or more uppercase characters',
            )}
            {renderPasswordRequirement(
              pwd => /[0-9]/.test(pwd),
              '1 or more numeric characters',
            )}
            {renderPasswordRequirement(
              pwd => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
              '1 or more special characters',
            )}
          </View>

          <View>
            <Text style={styles.topics}>Confirm Password</Text>
          </View>

          <SquareTextBox
            Title={'Enter Confirm Password'}
            Secure={!showConfirmPassword}
            value={confirmPassword}
            setValue={text => {
              const newText = text.replace(
                /[^a-zA-Z0-9!@#$%^&*(),.?":{}|<>]/g,
                '',
              );
              setConfirmPassword(newText);
            }}
            RightIcon={
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Feather
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={COLORS.gray}
                />
              </TouchableOpacity>
            }
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}

          <View style={{ marginVertical: 12, paddingHorizontal: 20 }}>
            <Button
              onPress={handleSubmit}
              Title={'Submit'}
              disabled={!isFormValid || isLoading}
            />
          </View>
        </ScrollView>

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <LoaderKit
              style={{ width: 50, height: 50 }}
              name={'LineScalePulseOutRapid'}
              color={COLORS.grayText}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topics: {
    fontSize: window.width * 0.04,
    fontFamily: Fonts.Roboto.Medium,
    color: COLORS.black,
    marginVertical: 10,
  },
  subtext: {
    fontSize: window.width * 0.035,
    fontFamily: Fonts.Roboto.Medium,
    color: COLORS.subtext,
    marginVertical: 5,
  },
  conditionsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
    width: '63%',
    padding: 2,
    paddingHorizontal: 3,
    borderRadius: 100,
    marginVertical: 3,
  },
  condIconWrap: {
    marginRight: 7,
  },
  condText: {
    fontSize: window.width * 0.03,
    fontFamily: Fonts.Roboto.SemiBold,
  },
  errorText: {
    color: COLORS.errorBorder,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 5,
    fontFamily: Fonts.Roboto.Regular,
  },
  loadingOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '100%',
    height: '100%',
  },
});

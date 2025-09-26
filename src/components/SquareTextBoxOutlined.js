import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Dimensions, Text, View, Image} from 'react-native';

import {TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';
import {Styles} from '../theme/Styles';

const window = Dimensions.get('window');
// import { useSelector } from "react-redux";

export default function SquareTextBoxOutlined({
  Label,
  Title,
  Secure,
  value,
  mediumFont,
  keyboardType,
  setValue,
  errorBorder,
  borderColor,
  readOnly,
  maxLength,
  placeholder,
  errorMessage,
  nic,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={{width: '100%', marginTop: window.height * 0.01}}>
      {Label && (
        <Text
          style={{
            marginBottom: 5,
            fontSize: 12.5,
            fontFamily: mediumFont ? Fonts.Roboto.Medium : Fonts.Roboto.Bold,
            color: COLORS.ashBlue,
          }}>
          {Label.includes('*') ? (
            <>
              {Label.replace('*', '')}
              <Text style={{color: 'red'}}>*</Text>
            </>
          ) : (
            Label
          )}
        </Text>
      )}
      <View style={{position: 'relative'}}>
        <TextInput
          mode={'outlined'}
          readOnly={readOnly}
          maxLength={maxLength}
          outlineColor={
            errorBorder
              ? COLORS.errorBorder
              : borderColor
              ? borderColor
              : COLORS.borderColor
          }
          outlineStyle={{borderRadius: 5, borderWidth: 1}}
          style={[
            Styles.textInput,

            {
              height: 38,
              borderColor: errorBorder
                ? COLORS.errorBorder
                : COLORS.borderColor,
              fontSize: 13,
              color: COLORS.textColor,
              fontFamily: Fonts.Roboto.SemiBold,
            },
          ]}
          placeholderTextColor={COLORS.grayPlaceholder}
          placeholder={placeholder}
          textColor={COLORS.textColor}
          value={value}
          secureTextEntry={Secure && !showPassword}
          keyboardType={keyboardType}
          onChangeText={text => {
            let sanitizedText = text;

            // Step 1: Remove emojis
            sanitizedText = sanitizedText.replace(
              /([\p{Emoji_Presentation}\p{Extended_Pictographic}\u200D\uFE0F])/gu,
              '',
            );

            // Step 2: Apply NIC-specific validation if nic prop is true
            if (nic) {
              // Allow only digits and V/X (for old NICs like 831234567V)
              sanitizedText = sanitizedText
                .toUpperCase()
                .replace(/[^0-9VX]/g, '')
                .slice(0, 12);
            }

            // No need to manually limit length — TextInput handles it via maxLength prop
            setValue(sanitizedText);
          }}
          // onChangeText={setValue}
          right={
            Secure && (
              <TextInput.Icon
                size={20}
                icon={showPassword ? 'eye' : 'eye-off'}
                onPress={togglePasswordVisibility}
              />
            )
          }></TextInput>
      </View>
      {errorMessage && (
        <Text
          style={{
            color: COLORS.errorBorder,
            fontSize: 12,
            fontFamily: Fonts.Roboto.Regular,
            marginTop: 5,
            fontWeight: 'bold',
          }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
}

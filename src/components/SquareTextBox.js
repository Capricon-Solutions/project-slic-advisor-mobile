import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Dimensions, Text, View, Image} from 'react-native';

import {TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';
import {Styles} from '../theme/Styles';

const window = Dimensions.get('window');
// import { useSelector } from "react-redux";

export default function SquareTextBox({
  Label,
  Title,
  Secure,
  value,
  keyboardType,
  setValue,
  LabelColor,
  errorBorder,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={{width: '100%', marginTop: window.height * 0.015}}>
      {Label && (
        <Text
          style={{
            marginBottom: 5,
            fontFamily: Fonts.Roboto.Bold,
            color: LabelColor ? LabelColor : COLORS.textColor,
            fontSize: window.width * 0.035,
          }}>
          {Label}
        </Text>
      )}
      <View style={{position: 'relative'}}>
        <TextInput
          mode={'outlined'}
          outlineColor={errorBorder ? COLORS.errorBorder : COLORS.borderColor}
          outlineStyle={{borderRadius: 8, borderWidth: 0}}
          style={[
            Styles.textInput,
            {
              paddingRight: window.width * 0.07 + 10, // Adjust for icon size and padding
              borderColor: errorBorder
                ? COLORS.errorBorder
                : COLORS.borderColor,
              fontSize: 13,
              fontFamily: Fonts.Roboto.SemiBold,
            },
          ]}
          placeholderTextColor={COLORS.textInputText}
          placeholder={Title}
          value={value}
          secureTextEntry={Secure && !showPassword}
          keyboardType={keyboardType}
          onChangeText={setValue}
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
    </View>
  );
}

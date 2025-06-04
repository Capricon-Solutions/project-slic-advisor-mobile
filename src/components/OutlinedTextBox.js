import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Dimensions, Text, View, Image} from 'react-native';

import {TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';
import {Styles} from '../theme/Styles';

const window = Dimensions.get('window');
// import { useSelector } from "react-redux";

export default function OutlinedTextBox({
  Label,
  Title,
  Secure,
  readOnly,
  value,
  keyboardType,
  setValue,
  errorBorder,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={{marginVertical: 2}}>
      <TextInput
        mode="outlined"
        label={Title}
        // readOnly
        readOnly={readOnly}
        style={{marginVertical: 3, fontSize: 12, width: '100%'}}
        textColor={COLORS.ashBlue}
        outlineStyle={{borderRadius: 10}}
        outlineColor={COLORS.warmGray}
        activeOutlineColor={COLORS.warmGray}
        value={value}
      />
    </View>
  );
}

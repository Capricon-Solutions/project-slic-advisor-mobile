import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Dimensions, Text, View, Image} from 'react-native';

import {TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';
import {Styles} from '../theme/Styles';

const window = Dimensions.get('window');

export default function OutlinedTextView({
  Title,

  value,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={{marginTop: 15}}>
      <View
        style={{
          height: 47,
          borderColor: COLORS.warmGray,
          borderWidth: 1,

          borderRadius: 9,
          justifyContent: 'center',
          paddingLeft: 13,
        }}>
        <Text numberOfLines={1} style={{color: COLORS.ashBlue}}>
          {value}
        </Text>
      </View>
      <Text
        numberOfLines={1}
        style={{
          color: COLORS.ashBlue,
          fontSize: 11,
          position: 'absolute',
          top: -9,
          paddingHorizontal: 5,
          backgroundColor: COLORS.white,
          left: 9,
        }}>
        {Title}
      </Text>
    </View>
  );
}

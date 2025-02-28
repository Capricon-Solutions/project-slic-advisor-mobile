import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';
import {Styles} from '../theme/Styles';

const window = Dimensions.get('window');

export default function SquareTextBoxOutlinedDate({
  Label,
  Title,
  Secure,
  value,
  mediumFont,
  keyboardType,
  setValue,
  errorBorder,
  borderColor,
}) {
  const [inputValue, setInputValue] = useState(value || '');

  const formatDate = text => {
    // Remove all non-numeric characters
    let cleaned = text.replace(/\D/g, '');

    // Format as YYYY/MM/DD
    let formatted = '';
    if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 4)}/${cleaned.slice(4, 6)}`;
    } else {
      formatted = cleaned;
    }
    if (cleaned.length > 6) {
      formatted += `/${cleaned.slice(6, 8)}`;
    }

    // Set formatted value
    setInputValue(formatted);
    setValue(formatted);
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
          {Label}
        </Text>
      )}
      <View style={{position: 'relative'}}>
        <TextInput
          mode={'outlined'}
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
              // paddingRight: window.width * 0.07 + 10,
              borderColor: errorBorder
                ? COLORS.errorBorder
                : COLORS.borderColor,
              fontSize: 14,
              fontFamily: Fonts.Roboto.SemiBold,
            },
          ]}
          placeholderTextColor={COLORS.textInputText}
          placeholder="YYYY/MM/DD"
          value={inputValue}
          keyboardType="numeric"
          onChangeText={formatDate}
        />
      </View>
    </View>
  );
}

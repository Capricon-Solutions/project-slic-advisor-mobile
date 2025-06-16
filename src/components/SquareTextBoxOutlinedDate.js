import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';
import {Styles} from '../theme/Styles';

const window = Dimensions.get('window');

const SquareTextBoxOutlinedDate = forwardRef(
  (
    {
      Label,
      Title,
      Secure,
      value,
      mediumFont,
      keyboardType,
      setValue,
      errorBorder,
      borderColor,
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(value || '');

    useEffect(() => {
      setInputValue(value || '');
    }, [value]);

    const formatDate = text => {
      let cleaned = text.replace(/\D/g, '');
      let formatted = '';
      if (cleaned.length > 4) {
        formatted = `${cleaned.slice(0, 4)}/${cleaned.slice(4, 6)}`;
      } else {
        formatted = cleaned;
      }
      if (cleaned.length > 6) {
        formatted += `/${cleaned.slice(6, 8)}`;
      }
      setInputValue(formatted);
      setValue(formatted);
    };

    // Expose clear method to parent
    useImperativeHandle(ref, () => ({
      clear: () => {
        setInputValue('');
        setValue('');
      },
    }));

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
            mode="outlined"
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
                fontSize: 14,
                color: COLORS.textColor,
                fontFamily: Fonts.Roboto.SemiBold,
              },
            ]}
            placeholderTextColor={COLORS.textColor}
            placeholder="YYYY/MM/DD"
            textColor={COLORS.textColor}
            value={inputValue}
            keyboardType="numeric"
            onChangeText={formatDate}
          />
        </View>
      </View>
    );
  },
);

export default SquareTextBoxOutlinedDate;

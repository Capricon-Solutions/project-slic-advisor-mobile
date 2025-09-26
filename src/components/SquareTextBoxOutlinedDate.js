import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
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
      readOnly,
      minimumDate,
      maximumDate,
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(value || '');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
      setInputValue(value || '');
    }, [value]);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
      const formattedDate = moment(date).format('YYYY/MM/DD');
      setInputValue(formattedDate);
      setValue(formattedDate);
      hideDatePicker();
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

        <TouchableOpacity
          disabled={readOnly}
          onPress={showDatePicker}
          activeOpacity={1}>
          <TextInput
            mode="outlined"
            editable={false}
            pointerEvents="none"
            outlineColor={
              readOnly
                ? COLORS.textInputBackground
                : errorBorder
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
            textColor={COLORS.grayText}
            value={inputValue}
            keyboardType="numeric"
          />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          minimumDate={minimumDate ? minimumDate : null}
          maximumDate={maximumDate ? maximumDate : null}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    );
  },
);

export default SquareTextBoxOutlinedDate;

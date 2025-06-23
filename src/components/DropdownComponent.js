import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors';

const window = Dimensions.get('window');

const DropdownComponent = ({dropdownData, mode, label, onValueChange}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    // if (value || isFocus) {
    return (
      <Text style={[styles.label, isFocus && {color: 'blue'}]}>{label}</Text>
    );
    // }
    // return null;
  };
  const handleChange = item => {
    setValue(item.value);
    setIsFocus(false);
    if (onValueChange) {
      onValueChange(item.value); // 🔥 Send selected value to parent
    }
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        mode={mode == 'modal' ? 'modal' : 'auto'}
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        selectedStyle={{color: 'red'}}
        itemTextStyle={{color: COLORS.textColor, fontSize: 14}}
        activeColor={COLORS.lightPrimary}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={{width: window.width * 0.5, fontSize: 12}}
        data={dropdownData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
        renderLeftIcon={() => (
          <MaterialCommunityIcons
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="menu-down"
            size={20}
          />
        )}
        renderRightIcon={item => {
          return (
            <>
              {value && (
                <TouchableOpacity onPress={() => setValue(null)}>
                  <MaterialCommunityIcons
                    style={styles.icon}
                    color={COLORS.primaryRed}
                    name="close-thick"
                    size={14}
                  />
                </TouchableOpacity>
              )}
            </>
          );
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  dropdown: {
    height: 43,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 12,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
    color: COLORS.textColor,
  },
  placeholderStyle: {
    fontSize: 12,
    color: COLORS.textColor,
  },
  selectedTextStyle: {
    fontSize: 12,
    color: COLORS.textColor,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: COLORS.textColor,
  },
});

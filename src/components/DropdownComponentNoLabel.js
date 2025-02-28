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

const DropdownComponentNoLabel = ({
  dropdownData,
  mode,
  label,
  initialValue,
  placeholder,
  onSelect,
  BorderColor,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        mode={mode == 'modal' ? 'modal' : 'auto'}
        style={[
          styles.dropdown,
          {borderColor: BorderColor ? BorderColor : 'gray'},
        ]}
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
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          if (onSelect) {
            onSelect(item.value);
          }
        }}
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

export default DropdownComponentNoLabel;

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 15,
  },
  dropdown: {
    height: 43,
    // borderColor: 'gray',
    borderWidth: 0.8,
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
    fontSize: 15,
    color: COLORS.textColor,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

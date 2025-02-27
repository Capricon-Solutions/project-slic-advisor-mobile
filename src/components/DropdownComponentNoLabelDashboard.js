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

const DropdownComponentNoLabelDashboard = ({
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
        itemTextStyle={{color: COLORS.textColor, fontSize: 10}}
        activeColor={COLORS.lightPrimary}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={{width: window.width * 0.5, fontSize: 10}}
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

export default DropdownComponentNoLabelDashboard;

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 15,
  },
  dropdown: {
    height: 25,
    // borderColor: 'gray',
    borderWidth: 0.8,
    borderRadius: 8,
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
    fontSize: 10,
  },
  placeholderStyle: {
    fontSize: 10,
  },
  selectedTextStyle: {
    fontSize: 10,
    color: COLORS.textColor,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 10,
  },
});

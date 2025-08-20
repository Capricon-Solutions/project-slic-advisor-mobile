import React, {useState, useMemo, useEffect} from 'react';
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

const DropdownFilledDebit = ({
  dropdownData = [],
  mode,
  label,
  placeholder,
  Color,
  search,
  onSelect,
  value: valueFromParent,
  cancelable,
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setValue(valueFromParent);
  }, [valueFromParent]);
  // Filter data where label starts with searchText (case-insensitive)
  const filteredData = useMemo(() => {
    if (!searchText) return dropdownData;
    return dropdownData.filter(item =>
      item.label?.toLowerCase().startsWith(searchText.toLowerCase()),
    );
  }, [dropdownData, searchText]);

  return (
    <View style={styles.container}>
      <Dropdown
        mode={mode === 'modal' ? 'modal' : 'auto'}
        style={[
          styles.dropdown,
          isFocus && {borderColor: 'blue'},
          {backgroundColor: Color || COLORS.lightBorder},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        selectedStyle={{color: 'red'}}
        itemTextStyle={{color: COLORS.textColor, fontSize: 14}}
        activeColor={COLORS.lightPrimary}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={{fontSize: 12}}
        data={filteredData} // Use filtered data
        search={search !== false}
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
        onChangeText={text => setSearchText(text)} // Capture search input
        renderLeftIcon={() => (
          <MaterialCommunityIcons
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="menu-down"
            size={20}
          />
        )}
        renderRightIcon={() =>
          value ? (
            <View>
              {!cancelable && (
                <TouchableOpacity
                  onPress={() => {
                    setValue(null);
                    if (onSelect) onSelect(null);
                  }}>
                  <MaterialCommunityIcons
                    style={styles.icon}
                    color={COLORS.primaryRed}
                    name="close-thick"
                    size={14}
                  />
                </TouchableOpacity>
              )}
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default DropdownFilledDebit;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
  },
  dropdown: {
    height: 45,
    borderColor: COLORS.warmGray,
    // borderWidth: 0.5,
    backgroundColor: COLORS.warmGray,
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

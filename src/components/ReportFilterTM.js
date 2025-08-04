import * as React from 'react';
import {
  TouchableOpacity,
  Animated,
  Dimensions,
  Text,
  View,
  Modal,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownComponent from './DropdownComponent';
import Button from './Button';
import COLORS from '../theme/colors';

const window = Dimensions.get('window');

export default function ReportFilterTM({
  modalVisible,
  setModalVisible,
  Name,
  lastTitle,
  dropdownOptions,
  onPressSearch,
  onPressClear,
  onViewDetailsChange,
  onTypeChange,
  onMonthChange,
  onBranchChange,
  initialValues = {},
  notbranchVisible,
}) {
  // State for dropdown selections with initial values

  const [viewDetails, setViewDetails] = React.useState(initialValues.view);
  const [type, setType] = React.useState(initialValues.type);
  const [month, setMonth] = React.useState(initialValues.month);
  const [branch, setBranch] = React.useState(initialValues.branch);
  console.log('typeh', type);
  // Animation setup
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    setViewDetails(initialValues.view);
    setType(initialValues.type);
    setMonth(initialValues.month);
    setBranch(initialValues.branch || '');
  }, [initialValues]);
  // Handle animation when modal visibility changes
  React.useEffect(() => {
    if (modalVisible) {
      Animated.timing(backgroundOpacity, {
        toValue: 0.2,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [modalVisible]);

  // Close modal with animation
  const hideModal = () => {
    Animated.timing(backgroundOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => setModalVisible(false));
  };

  // Handle apply button press
  const handleApply = () => {
    // Call all the change handlers with current values
    onViewDetailsChange?.(viewDetails);
    onTypeChange?.(type);
    onMonthChange?.(month);
    onBranchChange?.(branch);

    // Call the search handler if provided
    if (onPressSearch) {
      onPressSearch();
    }

    hideModal();
  };

  // Handle clear button press
  const handleClear = () => {
    setViewDetails('1');
    setType('1');
    setMonth('00');
    setBranch('');

    // Call the clear handler if provided
    if (onPressClear) {
      onPressClear();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={hideModal}>
      <Animated.View
        style={[
          styles.modalOverlay,
          {
            backgroundColor: backgroundOpacity.interpolate({
              inputRange: [0, 0.2],
              outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)'],
            }),
          },
        ]}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.modalTitle}>{Name}</Text>
            <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" color="#000" size={20} />
            </TouchableOpacity>
          </View>

          {/* Filter Options */}

          <DropdownComponent
            label={'View Details'}
            mode={'modal'}
            // value={viewDetails}
            search={false}
            nonClearable={true}
            value={viewDetails}
            // selectedValue={viewDetails}
            onValueChange={setViewDetails}
            dropdownData={[
              {label: 'Value', value: 1},
              {label: 'NOP', value: 2},
            ]}
          />

          <DropdownComponent
            label={'Type'}
            mode={'modal'}
            search={false}
            nonClearable={type == 'ALL' ? true : false}
            value={type}
            onValueChange={value => {
              setType(value ?? 'ALL'); // 👈 If value is null, use 'ALL'
              if (value == 'G') {
                setMonth('00'); // Reset month to '00' if type is 'G'
              } else if (value == 'M') {
                setMonth(null); // Set month to '01' if type is 'M
              }
            }}
            dropdownData={[
              {label: 'General Cumulative', value: 'G'},
              {label: 'Motor Monthly', value: 'M'},
            ]}
          />

          <DropdownComponent
            label={'Month'}
            mode={'modal'}
            disabled={type == 'G'}
            value={month}
            search={type == 'M' ? true : false}
            nonClearable={true}
            // onValueChange={setSelectedMonth}
            onValueChange={value => {
              setMonth(value ?? '00'); // 👈 If value is null, use 'ALL'
            }}
            // dropdownData={
            //   type == 'M'
            //     ? [
            //         {label: 'January', value: '01'},
            //         {label: 'February', value: '02'},
            //         {label: 'March', value: '03'},
            //         {label: 'April', value: '04'},
            //         {label: 'May', value: '05'},
            //         {label: 'June', value: '06'},
            //         {label: 'July', value: '07'},
            //         {label: 'August', value: '08'},
            //         {label: 'September', value: '09'},
            //         {label: 'October', value: '10'},
            //         {label: 'November', value: '11'},
            //         {label: 'December', value: '12'},
            //       ]
            //     : [{label: 'Cumulative', value: '00'}]
            // }
            dropdownData={
              type == 'M'
                ? [
                    {label: 'January', value: '01'},
                    {label: 'February', value: '02'},
                    {label: 'March', value: '03'},
                    {label: 'April', value: '04'},
                    {label: 'May', value: '05'},
                    {label: 'June', value: '06'},
                    {label: 'July', value: '07'},
                    {label: 'August', value: '08'},
                    {label: 'September', value: '09'},
                    {label: 'October', value: '10'},
                    {label: 'November', value: '11'},
                    {label: 'December', value: '12'},
                  ]
                : type == 'G'
                ? [{label: 'Cumulative', value: '00'}]
                : [
                    {label: 'Cumulative', value: '00'},
                    {label: 'January', value: '01'},
                    {label: 'February', value: '02'},
                    {label: 'March', value: '03'},
                    {label: 'April', value: '04'},
                    {label: 'May', value: '05'},
                    {label: 'June', value: '06'},
                    {label: 'July', value: '07'},
                    {label: 'August', value: '08'},
                    {label: 'September', value: '09'},
                    {label: 'October', value: '10'},
                    {label: 'November', value: '11'},
                    {label: 'December', value: '12'},
                  ]
            }
          />

          {!notbranchVisible && (
            <DropdownComponent
              label={lastTitle}
              mode={'modal'}
              dropdownData={dropdownOptions}
              selectedValue={branch}
              onValueChange={setBranch}
            />
          )}

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              Title={'Apply'}
              onPress={handleApply}
              style={styles.applyButton}
            />
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    borderRadius: 100,
    padding: 2,
    height: 27,
    width: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  applyButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});

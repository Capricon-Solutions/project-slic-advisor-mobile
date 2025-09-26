import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import Fonts from '../theme/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors';
import moment from 'moment';
import Orientation from 'react-native-orientation-locker';

const window = Dimensions.get('window');
const squareSize = Math.min(window.width * 0.92, window.height * 0.92);

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MonthYearPickerSingleCurrent = ({
  visible,
  onClose,
  onSelect,
  lockOrientation,
}) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleMonthSelection = (year, month) => {
    setSelectedDate(moment({year, month: month, day: 1}));
  };

  const handleDone = () => {
    if (selectedDate) {
      onSelect(selectedDate.format('YYYY/MM'));
      onClose();
    }
  };
  const handleClose = () => {
    setSelectedYear(currentYear); // Reset to current year
    setSelectedDate(null);
    onClose(); // Just close the modal without sending selected date
  };

  useEffect(() => {
    if (visible && lockOrientation) {
      Orientation.lockToLandscape(); // or lockToPortrait() based on need
    }

    // optional: cleanup orientation on close
    return () => {
      if (lockOrientation) Orientation.lockToPortrait();
    };
  }, [visible, lockOrientation]);

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape-left', 'landscape-right']} // 🔑
      transparent
      visible={visible}
      animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Year Navigation */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setSelectedYear(prev => prev - 1)}
              disabled={selectedYear <= new Date().getFullYear() - 10}>
              <MaterialCommunityIcons
                name="chevron-left"
                color={selectedYear <= 2000 ? COLORS.warmGray : COLORS.black}
                size={25}
              />
            </TouchableOpacity>
            <Text style={styles.yearText}>{selectedYear}</Text>
            <TouchableOpacity onPress={() => setSelectedYear(prev => prev + 1)}>
              <MaterialCommunityIcons
                name="chevron-right"
                color={COLORS.black}
                size={25}
              />
            </TouchableOpacity>
          </View>

          {/* Month Selection */}
          <FlatList
            data={months}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
            contentContainerStyle={styles.monthGrid}
            renderItem={({item, index}) => {
              const monthDate = moment({
                year: selectedYear,
                month: index,
                day: 1,
              });

              const today = moment();
              const isSelected =
                selectedDate && monthDate.isSame(selectedDate, 'month');
              const isDisabled =
                selectedYear > today.year() || // future years
                (selectedYear === today.year() && index > today.month()); // current or future months in current year

              return (
                <TouchableOpacity
                  disabled={isDisabled}
                  style={[
                    styles.monthButton,
                    isSelected ? styles.selectedMonth : {},
                    isDisabled ? styles.disabledMonth : {},
                  ]}
                  onPress={() => handleMonthSelection(selectedYear, index)}>
                  <Text
                    style={[
                      styles.monthText,
                      isSelected ? styles.selectedMonthText : {},
                      isDisabled ? styles.disabledMonthText : {},
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!selectedDate}
              style={[
                styles.doneButton,
                {
                  backgroundColor: !selectedDate
                    ? COLORS.warmGray
                    : COLORS.primaryGreen,
                },
              ]}
              onPress={handleDone}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MonthYearPickerSingleCurrent;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: squareSize,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
  },
  yearText: {fontSize: 20, fontWeight: 'bold', color: COLORS.textColor},
  monthGrid: {
    marginVertical: 20,
    paddingHorizontal: 5,
    justifyContent: 'space-evenly',
  },
  monthButton: {
    marginHorizontal: 5,
    width: 70,
    marginVertical: 5,
    paddingVertical: 13,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedMonth: {borderColor: '#00AEEF', backgroundColor: '#E0F7FA'},
  monthText: {
    fontSize: 11,
    fontFamily: Fonts.Roboto.Medium,
    color: COLORS.textColor,
  },
  selectedMonthText: {color: '#00AEEF', fontWeight: 'bold'},
  disabledMonth: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ddd',
  },
  disabledMonthText: {
    color: '#aaa',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    width: '85%',
  },
  closeButton: {
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  doneButton: {
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    backgroundColor: COLORS.primaryGreen,
  },
  closeText: {color: '#555'},
  doneText: {color: '#fff', fontWeight: 'bold'},
});

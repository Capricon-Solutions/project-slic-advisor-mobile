import React, { useState } from 'react';
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

const window = Dimensions.get('window');
const squareSize = Math.min(window.width * 0.86, window.height * 0.9);

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

const MonthYearPickerSingle = ({ visible, onClose, onSelect }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleMonthSelection = (year, month) => {
    setSelectedDate(moment({ year, month: month, day: 1 }));
  };
  const handleDone = () => {
    if (selectedDate) {
      onSelect(selectedDate.format('YYYY/MM'));
      onClose();
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Year Navigation */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setSelectedYear((prev) => prev - 1)}>
              <MaterialCommunityIcons name="chevron-left" color={COLORS.black} size={25} />
            </TouchableOpacity>
            <Text style={styles.yearText}>{selectedYear}</Text>
            <TouchableOpacity onPress={() => setSelectedYear((prev) => prev + 1)}>
              <MaterialCommunityIcons name="chevron-right" color={COLORS.black} size={25} />
            </TouchableOpacity>
          </View>

          {/* Month Selection */}
          <FlatList
            data={months}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
            contentContainerStyle={styles.monthGrid}
            renderItem={({ item, index }) => {
              const monthDate = moment(`${selectedYear}-${index + 1}-01`, 'YYYY-MM');
              const isSelected = selectedDate && monthDate.isSame(selectedDate, 'month');
              return (
                <TouchableOpacity
                  style={[
                    styles.monthButton,
                    isSelected ? styles.selectedMonth : {},
                  ]}
                  onPress={() => handleMonthSelection(selectedYear, index)}
                >
                  <Text
                    style={[
                      styles.monthText,
                      isSelected ? styles.selectedMonthText : {},
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>


              );
            }}
          />

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MonthYearPickerSingle;

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
  yearText: { fontSize: 20, fontWeight: 'bold', color: COLORS.textColor },
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
  selectedMonth: { borderColor: '#00AEEF', backgroundColor: '#E0F7FA' },
  monthText: {
    fontSize: 11,
    fontFamily: Fonts.Roboto.Medium,
    color: COLORS.textColor,
  },
  selectedMonthText: { color: '#00AEEF', fontWeight: 'bold' },
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
  closeText: { color: '#555' },
  doneText: { color: '#fff', fontWeight: 'bold' },
});

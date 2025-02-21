import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from 'react-native';
import Fonts from '../theme/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../theme/colors';

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

const MonthYearPicker = ({visible, onClose, onSelect}) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(null);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Year Navigation */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => setSelectedYear(prev => prev - 1)}>
              {/* <Text style={styles.navButton}>{'←'}</Text> */}
              <MaterialCommunityIcons
                name="chevron-left"
                color={COLORS.black}
                size={25}
              />
            </TouchableOpacity>
            <Text style={styles.yearText}>{selectedYear}</Text>
            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => setSelectedYear(prev => prev + 1)}>
              <MaterialCommunityIcons
                name="chevron-right"
                color={COLORS.black}
                size={25}
              />
            </TouchableOpacity>
          </View>

          {/* Month Grid using FlatList */}

          <FlatList
            data={months}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4} // Display 3 months per row
            contentContainerStyle={styles.monthGrid}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[
                  styles.monthButton,
                  selectedMonth === index && styles.selectedMonth,
                ]}
                onPress={() => setSelectedMonth(index)}>
                <Text
                  style={[
                    styles.monthText,
                    selectedMonth === index && styles.selectedMonthText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />

          {/* Action Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => {
                if (selectedMonth !== null) {
                  onSelect({month: selectedMonth + 1, year: selectedYear}); // Convert 0-based index to 1-based month

                  onClose();
                }
              }}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MonthYearPicker;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '95%',
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
  navButton: {
    fontSize: 20,
  },
  yearText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  monthGrid: {
    marginVertical: 20,
    paddingHorizontal: 5,
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
  selectedMonth: {
    borderColor: '#00AEEF',
    backgroundColor: '#E0F7FA',
  },
  monthText: {
    fontSize: 11,
    fontFamily: Fonts.Roboto.Medium,
    color: COLORS.textColor,
  },
  selectedMonthText: {
    color: '#00AEEF',
    fontWeight: 'bold',
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
  closeText: {
    color: '#555',
  },
  doneText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  navigateButton: {
    borderColor: COLORS.warmGray,
    borderWidth: 1,
    padding: 8,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fonts from '../theme/Fonts';
import COLORS from '../theme/colors';

const DateRangePicker = ({onLoad, initialFrom, initialTo}) => {
  const [fromDate, setFromDate] = useState(
    initialFrom ? new Date(initialFrom) : new Date(),
  );
  const [toDate, setToDate] = useState(
    initialTo ? new Date(initialTo) : new Date(),
  );
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const handleFromDateChange = (event, selectedDate) => {
    setShowFromPicker(false);
    if (selectedDate) setFromDate(selectedDate);
  };

  const handleToDateChange = (event, selectedDate) => {
    setShowToPicker(false);
    if (selectedDate) setToDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>From</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowFromPicker(true)}>
        <Text>{fromDate.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showFromPicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={handleFromDateChange}
        />
      )}

      <Text style={styles.label}>To</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowToPicker(true)}>
        <Text>{toDate.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showToPicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={handleToDateChange}
        />
      )}

      <TouchableOpacity
        style={styles.loadButton}
        onPress={() => onLoad(fromDate, toDate)}>
        <Text style={styles.loadButtonText}>Load</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginHorizontal: 5,
    fontFamily: Fonts.Roboto.Regular,
    color: COLORS.black,
  },
  dateButton: {
    padding: 8,
    backgroundColor: '#FFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  loadButton: {
    backgroundColor: '#00796B',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginLeft: 13,
  },
  loadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DateRangePicker;

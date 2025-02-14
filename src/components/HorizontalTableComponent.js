import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import COLORS from '../theme/colors';

const HorizontalTableComponent = ({
  tableHead,
  tableData,
  columnWidths,
  haveTotal,
}) => {
  const handleCellPress = cellData => {
    console.log('Clicked Cell:', cellData);
  };

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <View style={styles.tableWrapper}>
          <Table
            borderStyle={{
              borderWidth: 1,
              borderColor: COLORS.white,
            }}>
            {/* Table Header */}

            {/* <Row
              data={tableHead}
              widthArr={columnWidths}
              style={styles.head}
              textStyle={styles.headText}
            /> */}

            <Row
              data={tableHead.map((item, index) => (
                <Text
                  key={index}
                  style={[
                    styles.headText,
                    index === 0 ? styles.firstCell : null, // Apply red background to first item
                  ]}>
                  {item}
                </Text>
              ))}
              widthArr={columnWidths}
              style={styles.head}
              textStyle={styles.headText}
            />
            {/* Table Rows with Alternating Colors */}
            {tableData.map((rowData, index) => (
              <Row
                key={index}
                data={rowData.map((cellData, cellIndex) => (
                  <TouchableOpacity
                    key={cellIndex}
                    onPress={() => handleCellPress(cellData)}>
                    <Text
                      style={[
                        styles.text,
                        haveTotal &&
                          rowIndex === tableData.length - 1 &&
                          styles.boldText,
                      ]}>
                      {cellData}
                    </Text>
                  </TouchableOpacity>
                ))}
                widthArr={columnWidths}
                style={[
                  styles.row,
                  index % 2 === 0 ? styles.rowGray : styles.rowWhite,
                ]}
                textStyle={[
                  styles.text,
                  haveTotal &&
                    index === tableData.length - 1 &&
                    styles.boldText, // Apply boldText only if hasTotal is true
                ]}
              />
            ))}
          </Table>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {padding: 0},
  tableWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  head: {height: 50, backgroundColor: '#00A8B5'},
  headText: {
    margin: 6,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  firstCell: {
    backgroundColor: COLORS.background,
    flex: 1, // Make first cell background red
    color: 'white', // Ensure text is visible
    padding: 0,
    margin: -1,
  },
  text: {
    marginVertical: 6,
    marginHorizontal: 10, // Add horizontal margin to create spacing between columns
    textAlign: 'left',
    fontSize: 13,
  },
  row: {height: 50},
  rowGray: {backgroundColor: '#F8F9FA'}, // Light gray row
  rowWhite: {backgroundColor: '#FFFFFF'}, // White row
  boldText: {
    fontWeight: 'bold',
    color: COLORS.darkText,
    textAlign: 'left',
  },
  transparentHead: {
    backgroundColor: 'transparent', // Make first header cell background transparent
  },
  transparentText: {
    color: 'transparent', // Make first header item text transparent
  },
});

export default HorizontalTableComponent;

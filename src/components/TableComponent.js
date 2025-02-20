import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';
const window = Dimensions.get('window');

const TableComponent = ({
  tableHead,
  tableData,
  columnWidths,
  haveTotal,
  Error,
}) => {
  const handleCellPress = cellData => {
    console.log('Clicked Cell:', cellData);
  };

  return (
    <View>
      {tableData ? (
        <ScrollView horizontal>
          <View style={styles.container}>
            <View style={styles.tableWrapper}>
              <Table
                borderStyle={{
                  borderWidth: 1,
                  borderColor: COLORS.white,
                }}>
                {/* Table Header */}
                <Row
                  data={tableHead}
                  widthArr={columnWidths}
                  style={styles.head}
                  textStyle={styles.headText}
                />
                {/* Table Rows with Alternating Colors */}
                {tableData?.map((rowData, index) => (
                  <Row
                    key={index}
                    // data={rowData}
                    data={rowData?.map((cellData, cellIndex, rowIndex) => (
                      <TouchableOpacity
                        key={cellIndex}
                        onPress={() => handleCellPress(cellData)}>
                        <Text
                          style={[
                            styles.text,
                            haveTotal &&
                              rowIndex === tableData?.length - 1 &&
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
                        index === tableData?.length - 1 &&
                        styles.boldText,
                    ]}
                  />
                ))}
              </Table>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            height: window.height * 0.5,
            justifyContent: 'center',
            alignItems: 'center',

            marginHorizontal: window.width * 0.03,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.Roboto.SemiBold,
              color: COLORS.primaryRed,
            }}>
            {Error}
          </Text>
        </View>
      )}
    </View>
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
});

export default TableComponent;

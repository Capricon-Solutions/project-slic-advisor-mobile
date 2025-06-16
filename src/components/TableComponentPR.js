import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';

const window = Dimensions.get('window');

const TableComponentPR = ({
  tableHead,
  tableData,
  columnWidths,
  haveTotal,
  navigation,
  Error,
  clickableColumns = [], // Array of column indices that should be clickable
}) => {
  const handleCellPress = cellData => {
    navigation.navigate('PolicyDetails', {policyNo: cellData});
    console.log('Clicked Cell:', cellData);
  };

  return (
    <View>
      {tableData?.length > 0 ? (
        <ScrollView horizontal>
          <View style={styles.container}>
            <View style={styles.tableWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: COLORS.white}}>
                {/* Table Header */}
                <Row
                  data={tableHead}
                  widthArr={columnWidths}
                  style={styles.head}
                  textStyle={styles.headText}
                />
                {/* Table Rows */}
                {tableData?.map((rowData, rowIndex) => (
                  <Row
                    key={rowIndex}
                    data={rowData?.map((cellData, cellIndex) =>
                      clickableColumns.includes(cellIndex) ? (
                        <TouchableOpacity
                          key={cellIndex}
                          onPress={() => handleCellPress(cellData)}>
                          <Text style={[styles.text]}>{cellData}</Text>
                        </TouchableOpacity>
                      ) : (
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            backgroundColor:
                              cellIndex === rowData.length - 1
                                ? cellData === 'Renewed'
                                  ? COLORS.tableBlue
                                  : cellData === 'Expired'
                                  ? COLORS.tableRed
                                  : cellData === 'Not Paid'
                                  ? COLORS.tableRed
                                  : cellData === 'Due'
                                  ? COLORS.pendingColor
                                  : 'transparent'
                                : 'transparent',
                          }}>
                          <Text
                            key={cellIndex}
                            numberOfLines={1}
                            style={styles.text}>
                            {cellData}
                          </Text>
                        </View>
                      ),
                    )}
                    widthArr={columnWidths}
                    style={[
                      styles.row,
                      rowIndex % 2 === 0 ? styles.rowGray : styles.rowWhite,
                    ]}
                  />
                ))}
              </Table>
            </View>
          </View>
        </ScrollView>
      ) : tableData?.length == 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.errorText}>Sorry, No Dat found</Text>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.errorText}>{Error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 0},
  tableWrapper: {borderRadius: 10, overflow: 'hidden'},
  head: {height: 50, backgroundColor: '#00A8B5'},
  headText: {margin: 6, fontWeight: 'bold', color: '#fff', textAlign: 'center'},
  text: {
    marginVertical: 6,
    marginHorizontal: 10,
    textAlign: 'center',
    fontSize: 13,
    color: COLORS.textColor,
  },
  clickableText: {color: COLORS.primary, textDecorationLine: 'underline'}, // Style for clickable columns
  row: {height: 50},
  rowGray: {backgroundColor: '#F8F9FA'},
  rowWhite: {backgroundColor: '#FFFFFF'},
  emptyContainer: {
    flex: 1,
    height: window.height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: window.width * 0.03,
  },
  errorText: {
    textAlign: 'center',
    fontFamily: Fonts.Roboto.Bold,
    color: COLORS.primaryRed,
    fontSize: 16,
  },
});

export default TableComponentPR;

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';
import TableComponent from './TableComponent';
const window = Dimensions.get('window');

const TableComponentDoc = ({
  tableHead,
  tableData,
  columnWidths,
  haveTotal,
  Error,
  navigation,
  touchable,
}) => {
  const handleCellPress = cellData => {
    console.log('Clicked Cell:', cellData);
  };
  return (
    <View>
      {tableData?.length > 0 ? (
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
                  data={tableHead.map((item, index) => (
                    <View>
                      <View
                        style={[
                          styles.mainHeader,
                          index === 0 ? styles.firstHeader : null,
                        ]}>
                        <Text
                          key={index}
                          style={[
                            styles.headText,
                            index === 0 ? styles.firstCell : null, // Apply red background to first item
                          ]}>
                          {item}
                        </Text>
                      </View>
                    </View>
                  ))}
                  widthArr={columnWidths}
                  style={styles.head}
                  textStyle={styles.headText}
                />
                {/* Table Rows with Alternating Colors */}
                {tableData?.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData.map((cellData, cellIndex) => (
                      <View
                        style={{ flex: 1, justifyContent: 'center' }}
                        key={cellIndex}
                        onPress={() => handleCellPress(cellData)}>
                        {cellIndex == 0 && (
                          <TouchableOpacity
                            disabled={!touchable}
                            onPress={() =>
                              navigation.navigate('BranchSummary', {
                                title: cellData,
                              })
                            }
                            style={{ flex: 1 }}
                          >
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                              <Text
                                style={[
                                  styles.text,
                                  cellIndex === 0
                                    ? styles.leftAlignedText
                                    : styles.centerAlignedText, // Align first column left
                                  haveTotal &&
                                  index === tableData.length - 1 &&
                                  styles.boldText,
                                ]}>
                                {cellData}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )}
                        {cellIndex > 0 && (

                          <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}>
                            <View style={{
                              width: 80, borderRadius: 100,
                              backgroundColor: cellIndex === rowData.length - 1
                                ? (cellData === 'Received' ? COLORS.lightGreen
                                  : cellData === 'Pending' ? COLORS.pendingColor
                                    : cellData === 'Reject' ? COLORS.tableRed
                                      : 'transparent')
                                : 'transparent'

                            }}>

                              <Text
                                style={[
                                  styles.text, {
                                    fontFamily: Fonts.Roboto.Bold,
                                    color: cellIndex === rowData.length - 1
                                      ? (cellData === 'Received' ? COLORS.primaryGreen
                                        : cellData === 'Pending' ? COLORS.tableOrange
                                          : cellData === 'Reject' ? COLORS.primaryRed
                                            : 'transparent')
                                      : 'transparent'
                                  }
                                ]}>
                                {cellData}
                              </Text>
                            </View>
                          </View>

                        )}
                      </View>
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
      ) : tableData?.length == 0 ? (
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
            Don't have any data yet
          </Text>
        </View>
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
  container: { padding: 0 },
  tableWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  head: {
    height: 50,
    backgroundColor: '#00A8B5',
    fontFamily: Fonts.Roboto.Medium,
  },
  headText: {
    margin: 6,
    fontFamily: Fonts.Roboto.Regular,
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
  },
  text: {
    marginVertical: 3,
    // marginHorizontal: 10, // Add horizontal margin to create spacing between columns
    textAlign: 'center',
    fontSize: 13,
    color: COLORS.textColor,
  },
  leftAlignedText: {
    textAlign: 'left',
    paddingLeft: 10, // Ensure proper spacing
    fontSize: 13,
    //  color: 'red',
  },
  centerAlignedText: {
    textAlign: 'center',
    color: COLORS.ashBlue,
    fontSize: 13,
  },
  row: { height: 50 },
  rowGray: { backgroundColor: '#F8F9FA' }, // Light gray row
  rowWhite: { backgroundColor: '#FFFFFF' }, // White row
  boldText: {
    fontWeight: 'bold',
    color: COLORS.darkText,
    textAlign: 'left',
  },
});

export default TableComponentDoc;

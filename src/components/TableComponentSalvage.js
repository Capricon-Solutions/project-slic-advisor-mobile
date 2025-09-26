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
import TableComponent from './TableComponent';
const window = Dimensions.get('window');

const TableComponentSalvage = ({
  tableHead,
  tableData,
  columnWidths,
  haveTotal,
  Error,
  navigation,
  touchable,
}) => {
  const handleCellPress = cellData => {
    // console.log('Clicked Cell:', cellData);
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
                        style={{flex: 1, justifyContent: 'center'}}
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
                            style={{flex: 1}}>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                              <Text
                                numberOfLines={1}
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
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                borderRadius: 100,
                                paddingHorizontal: 10,
                                backgroundColor:
                                  cellIndex === rowData.length - 1
                                    ? cellData === 'Item Received'
                                      ? COLORS.lightGreen
                                      : cellData === 'Item Pending'
                                      ? COLORS.backcard
                                      : cellData === 'Item Rejected'
                                      ? COLORS.tableRed
                                      : 'transparent'
                                    : 'transparent',
                              }}>
                              <Text
                                style={[
                                  styles.text,
                                  {
                                    fontFamily: Fonts.Roboto.Bold,
                                    color:
                                      cellIndex === rowData.length - 1
                                        ? cellData === 'Item Received'
                                          ? COLORS.primaryGreen
                                          : cellData === 'Item Pending'
                                          ? COLORS.tableOrange
                                          : cellData === 'Item Rejected'
                                          ? COLORS.primaryRed
                                          : 'transparent'
                                        : 'transparent',
                                  },
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
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.primaryRed,
              fontSize: 16,
            }}>
            Sorry, No Data found
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
  container: {padding: 0},
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
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.textColor,
  },
  leftAlignedText: {
    textAlign: 'left',
    paddingLeft: 10, // Ensure proper spacing
    fontSize: 13,
  },
  centerAlignedText: {
    textAlign: 'center',
    color: COLORS.ashBlue,
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

export default TableComponentSalvage;

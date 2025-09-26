import React from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';

const HorizontalMargedTableComponent = ({
  tableHead,
  tableData,
  columnWidths,
  haveTotal,
  onPress,
}) => {
  const handleCellPress = cellData => {
    onPress();
    // console.log('Clicked Cell:', cellData);
  };

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <View style={styles.tableWrapper}>
          {/* Table header (fixed row) */}
          <Table borderStyle={{borderWidth: 1, borderColor: COLORS.white}}>
            <Row
              data={tableHead?.map((item, index) => (
                <View key={index}>
                  <View
                    style={[
                      styles.mainHeader,
                      index === 0 ? styles.firstHeader : null,
                    ]}>
                    <Text
                      style={[
                        styles.headText,
                        index === 0 ? styles.firstCell : null,
                      ]}>
                      {item}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={[
                        styles.subheaderItem,
                        index === 0 ? styles.firstHeader : null,
                      ]}>
                      <Text
                        style={[
                          styles.headTextSub,
                          index === 0 ? styles.firstCell : null,
                        ]}>
                        Cash
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.subheaderItem,
                        index === 0 ? styles.firstHeader : null,
                      ]}>
                      <Text
                        style={[
                          styles.headTextSub,
                          index === 0 ? styles.firstCell : null,
                        ]}>
                        Debit
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
              widthArr={columnWidths}
              style={styles.head}
              textStyle={styles.headText}
            />
          </Table>

          {/* Table body (scrollable rows) */}
          <ScrollView>
            <Table borderStyle={{borderWidth: 1, borderColor: COLORS.white}}>
              {tableData?.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData.map((cellData, cellIndex) => (
                    <View key={cellIndex}>
                      {cellIndex === 0 ? (
                        <Text
                          style={[
                            styles.text,
                            styles.leftAlignedText,
                            haveTotal &&
                              index === tableData.length - 1 &&
                              styles.boldText,
                          ]}>
                          {cellData}
                        </Text>
                      ) : (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{flex: 0.5}}>
                            <Text
                              style={[
                                styles.text,
                                styles.centerAlignedText,
                                haveTotal &&
                                  index === tableData.length - 1 &&
                                  styles.boldText,
                              ]}>
                              {cellData?.cash}
                            </Text>
                          </View>
                          <View style={{flex: 0.5}}>
                            <Text
                              style={[
                                styles.text,
                                styles.centerAlignedText,
                                haveTotal &&
                                  index === tableData.length - 1 &&
                                  styles.boldText,
                              ]}>
                              {cellData?.debit}
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
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {padding: 0},
  tableWrapper: {
    borderRadius: 10,
    overflow: 'scroll',
  },
  head: {backgroundColor: 'transparent'},
  headText: {
    margin: 6,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  headTextSub: {
    margin: 6,
    fontFamily: Fonts.Roboto.Regular,
    color: COLORS.textColor,
    fontSize: 12,
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
    textAlign: 'center',
    fontSize: 10,
    color: COLORS.textColor,
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
  subheaderItem: {
    backgroundColor: COLORS.tableSubHeader,
    paddingVertical: 1,
    flex: 0.5,
    borderWidth: 0.7,

    borderColor: COLORS.white,
  },
  mainHeader: {
    backgroundColor: COLORS.primary,
    paddingVertical: 1,
  },
  firstHeader: {
    backgroundColor: 'transparent',
  },
  leftAlignedText: {
    textAlign: 'left',
    paddingLeft: 10, // Ensure proper spacing
  },
  centerAlignedText: {
    textAlign: 'center',
  },
});

export default HorizontalMargedTableComponent;

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';

const HorizontalReportTable = ({
  tableHead,
  tableData,
  columnWidths,
  haveTotal,
  onPress,
}) => {
  const handleCellPress = cellData => {
    onPress?.();
    console.log('Clicked Cell:', cellData);
  };

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <View style={styles.tableWrapper}>
          {/* Header */}
          <Table borderStyle={{borderWidth: 1, borderColor: COLORS.white}}>
            <Row
              data={tableHead.map((item, index) => (
                <View key={index} style={styles.mainHeader}>
                  <Text style={styles.headText}>{item}</Text>
                  {index === 3 && (
                    <View style={styles.subHeaderRow}>
                      <View style={styles.subheaderItem}>
                        <Text style={styles.headTextSub}>PPW</Text>
                      </View>
                      <View style={styles.subheaderItem}>
                        <Text style={styles.headTextSub}>Other</Text>
                      </View>
                    </View>
                  )}
                </View>
              ))}
              widthArr={columnWidths}
              style={styles.head}
              textStyle={styles.headText}
            />
          </Table>

          {/* Body */}
          <ScrollView contentContainerStyle={{paddingBottom: 150}}>
            <Table borderStyle={{borderWidth: 1, borderColor: COLORS.white}}>
              {Array.isArray(tableData) && tableData.length > 0 ? (
                tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData.map((cellData, cellIndex) => (
                      <TouchableOpacity
                        disabled
                        key={cellIndex}
                        onPress={() => handleCellPress(cellData)}>
                        {cellIndex !== 3 ? (
                          <Text
                            style={[
                              styles.text,
                              cellIndex === 0
                                ? styles.leftAlignedText
                                : styles.centerAlignedText,
                              haveTotal &&
                                index === tableData.length - 1 &&
                                styles.boldText,
                            ]}>
                            {cellData}
                          </Text>
                        ) : (
                          <View style={styles.splitCell}>
                            <View style={{flex: 0.5}}>
                              <Text
                                numberOfLines={1}
                                style={[
                                  styles.text,
                                  styles.centerAlignedText,
                                  haveTotal &&
                                    index === tableData.length - 1 &&
                                    styles.boldText,
                                ]}>
                                {cellData?.ppw}
                              </Text>
                            </View>
                            <View style={{flex: 0.5}}>
                              <Text
                                numberOfLines={1}
                                style={[
                                  styles.text,
                                  styles.centerAlignedText,
                                  haveTotal &&
                                    index === tableData.length - 1 &&
                                    styles.boldText,
                                ]}>
                                {cellData?.other}
                              </Text>
                            </View>
                          </View>
                        )}
                      </TouchableOpacity>
                    ))}
                    widthArr={columnWidths}
                    style={[
                      styles.row,
                      index % 2 === 0 ? styles.rowGray : styles.rowWhite,
                    ]}
                  />
                ))
              ) : (
                <Text style={styles.noDataText}>No data available</Text>
              )}
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
  head: {
    backgroundColor: COLORS.primary,
  },
  headText: {
    margin: 3,
    fontFamily: Fonts.Roboto.Regular,
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  headTextSub: {
    margin: 3,
    fontFamily: Fonts.Roboto.Regular,
    fontSize: 11,
    color: COLORS.white,
    textAlign: 'center',
  },
  subHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subheaderItem: {
    backgroundColor: COLORS.primary,
    flex: 0.5,
    borderWidth: 0.7,
    borderColor: COLORS.white,
  },
  text: {
    marginVertical: 6,
    marginHorizontal: 10,
    textAlign: 'center',
    fontSize: 11,
    color: COLORS.textColor,
  },
  row: {height: 50},
  rowGray: {backgroundColor: '#F8F9FA'},
  rowWhite: {backgroundColor: '#FFFFFF'},
  boldText: {
    fontWeight: 'bold',
    color: COLORS.darkText,
    textAlign: 'left',
  },
  splitCell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftAlignedText: {
    textAlign: 'left',
    paddingLeft: 10,
  },
  centerAlignedText: {
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.errorBorder,
    fontFamily: Fonts.Roboto.Bold,
  },
});

export default HorizontalReportTable;

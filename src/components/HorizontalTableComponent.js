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

const HorizontalTableComponent = ({
  tableHead,
  tableData,
  columnWidths,
  haveTotal,
  onPress,
  clickable,
}) => {
  const handleCellPress = cellData => {
    onPress?.();
    console.log('Clicked Cell:', cellData);
  };

  return (
    <ScrollView horizontal>
      <View style={styles.fullContainer}>
        {tableData.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>Sorry, No Data Found</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.tableWrapper}>
              {/* Table Header */}
              <Table borderStyle={{borderWidth: 1, borderColor: COLORS.white}}>
                <Row
                  data={tableHead.map((item, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.headText,
                        index === 0 ? styles.firstCell : null,
                      ]}>
                      {item}
                    </Text>
                  ))}
                  widthArr={columnWidths}
                  style={styles.head}
                  textStyle={styles.headText}
                />
              </Table>

              {/* Table Body - Vertical scroll only */}
              <ScrollView>
                <Table
                  borderStyle={{borderWidth: 1, borderColor: COLORS.white}}>
                  {tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData.map((cellData, cellIndex) => (
                        <TouchableOpacity
                          disabled={!clickable}
                          key={cellIndex}
                          onPress={() => handleCellPress(cellData)}>
                          <Text
                            style={[
                              styles.text,
                              cellIndex === 0
                                ? styles.leftAlignText
                                : styles.centerAlignText,
                              haveTotal &&
                                index === tableData.length - 1 &&
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
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  tableWrapper: {
    borderRadius: 10,
    overflow: 'scroll',
  },
  fullContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
  noDataText: {
    fontSize: 16,
    color: COLORS.errorBorder,
    fontFamily: Fonts.Roboto.Bold,
  },
  head: {
    height: 50,
    backgroundColor: '#00A8B5',
  },
  headText: {
    margin: 6,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  firstCell: {
    backgroundColor: COLORS.background,
    flex: 1,
    color: 'white',
    padding: 0,
    margin: -1,
  },
  text: {
    marginVertical: 6,
    marginHorizontal: 10,
    fontSize: 13,
    color: COLORS.textColor,
  },
  row: {
    height: 50,
  },
  rowGray: {
    backgroundColor: '#F8F9FA',
  },
  rowWhite: {
    backgroundColor: '#FFFFFF',
  },
  boldText: {
    fontWeight: 'bold',
    color: COLORS.darkText,
    textAlign: 'left',
  },
  leftAlignText: {
    textAlign: 'left',
  },
  centerAlignText: {
    textAlign: 'center',
  },
});

export default HorizontalTableComponent;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Styles } from '../../../../theme/Styles';
import HeaderBackground from '../../../../components/HeaderBackground';
import Header from '../../../../components/Header';
import COLORS from '../../../../theme/colors';
import Fonts from '../../../../theme/Fonts';
import KpiSummery from '../../../../icons/KpiSummery.png'; // Replace with the actual logo path
import * as Progress from 'react-native-progress';
import DuesSummery from '../../../../icons/DuesSummery.png'; // Replace with the actual logo path
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Octicons from 'react-native-vector-icons/Octicons';
import { FlatList } from 'react-native';
import ContactListItem from '../../../../components/contactListItem';
import DepartmentItem from '../../../../components/DepartmentItem';
import { styles } from './styles';
import LoadingScreen from '../../../../components/LoadingScreen';
import {
  useGetBranchesQuery,
  useGetDepartmentQuery,
} from '../../../../redux/services/contactSlice';
import { useSelector } from 'react-redux';
import { useDuesSummeryQuery } from '../../../../redux/services/SummeryApiSlice';
import moment from 'moment';
const window = Dimensions.get('window');

export default function DUESSummary({ navigation }) {
  const [SelectedType, setSelectedType] = useState(1);
  const motorData = useSelector(state => state.DUES.motorData);
  const nonmotorData = useSelector(state => state.DUES.nonmotorData);
  const currentMonthNumber = moment().month() + 1; // +1 because Moment.js months are 0-indexed
  const currentMonthName = moment().format('MMMM');


  const {
    data: DuesSummeryData,
    error: DuesSummeryError,
    isLoading: DuesSummeryLoading,
    isFetching: DuesSummeryFetching,
  } = useDuesSummeryQuery({
    month: currentMonthNumber,
  });

  const DataSet = SelectedType == 1 ? DuesSummeryData?.data : DuesSummeryData?.data;
  console.log("DuesSummeryData", DuesSummeryData);
  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="DUES Summary" onPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <View style={styles.mainWrap}>
          <TouchableOpacity
            onPress={() => setSelectedType(1)}
            style={{
              backgroundColor:
                SelectedType == 1 ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Text
              style={{
                color: SelectedType == 1 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              Motor
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(2)}
            style={{
              backgroundColor:
                SelectedType == 2 ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: SelectedType == 2 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              Non-Motor
            </Text>
          </TouchableOpacity>
        </View>

        {/* {isLoading == true ? (
          <LoadingScreen />
        ) : ( */}
        <View>
          {/* {SelectedType == 1 ? ( */}
          <View
            style={{
              borderRadius: 15,
              padding: 10,
              backgroundColor: COLORS.white,
              elevation: 10,
              marginBottom: 20,
            }}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <View style={{ flex: 0.2 }}>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 5,
                    backgroundColor: COLORS.lightBorder,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{ height: 23, width: 23 }}
                    source={DuesSummery}></Image>
                </View>
              </View>
              <View style={{ flex: 0.8, justifyContent: 'center' }}>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto.SemiBold,
                    color: COLORS.textColor,
                  }}>
                  DUES Summary
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: COLORS.lightBorder,
                borderRadius: 6,
                paddingVertical: 2.5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: Fonts.Roboto.SemiBold,
                  color: COLORS.textColor,
                  fontSize: 13,
                }}>
                {currentMonthName} summary
              </Text>
            </View>
            {SelectedType == 1 ? (
              <FlatList
                data={motorData}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View
                    style={{
                      padding: 10,
                      borderRadius: 13,
                      backgroundColor: COLORS.white,
                      elevation: 10,
                      marginTop: 10,
                      marginBottom: 10,
                      marginHorizontal: 10,
                    }}>
                    {/* Header */}
                    <View
                      style={{
                        backgroundColor: COLORS.lightBorder,
                        borderRadius: 6,
                        paddingVertical: 2.5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                      }}>
                      <MaterialIcons
                        color={COLORS.primaryGreen}
                        name={item?.icon}
                        size={16}
                      />

                      <Text
                        style={{
                          textAlign: 'center',
                          fontFamily: Fonts.Roboto.SemiBold,
                          color: COLORS.textColor,
                          fontSize: 12,
                          marginLeft: 10,
                        }}>
                        {item?.name}
                      </Text>
                    </View>

                    {/* Sub Items */}
                    <FlatList
                      data={item.subItem}
                      keyExtractor={(subItem, index) => index.toString()}
                      renderItem={({ item: subItem }) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10,
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontFamily: Fonts.Roboto.Medium,
                              fontSize: 12,
                              color: COLORS.textColor,
                            }}>
                            {subItem.name}
                          </Text>

                          <Text
                            style={{
                              fontFamily: Fonts.Roboto.ExtraBold,
                              fontSize: 12,
                              color: COLORS.textColor,
                            }}>
                            {subItem?.type === 'count'
                              ? subItem.value
                              : `LKR ${new Intl.NumberFormat('en-LK', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(subItem.value)}`}
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                )}
              />
            ) : (
              <FlatList
                data={nonmotorData}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View
                    style={{
                      padding: 10,
                      borderRadius: 13,
                      backgroundColor: COLORS.white,
                      elevation: 10,
                      marginTop: 10,
                      marginBottom: 10,
                      marginHorizontal: 10,
                    }}>
                    {/* Header */}
                    <View
                      style={{
                        backgroundColor: COLORS.lightBorder,
                        borderRadius: 6,
                        paddingVertical: 2.5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                      }}>
                      <MaterialIcons
                        color={COLORS.primaryGreen}
                        name={item?.icon}
                        size={16}
                      />

                      <Text
                        style={{
                          textAlign: 'center',
                          fontFamily: Fonts.Roboto.SemiBold,
                          color: COLORS.textColor,
                          fontSize: 12,
                          marginLeft: 10,
                        }}>
                        {item?.name}
                      </Text>
                    </View>

                    {/* Sub Items */}
                    <FlatList
                      data={item.subItem}
                      keyExtractor={(subItem, index) => index.toString()}
                      renderItem={({ item: subItem }) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10,
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontFamily: Fonts.Roboto.Medium,
                              fontSize: 12,
                              color: COLORS.textColor,
                            }}>
                            {subItem.name}
                          </Text>

                          <Text
                            style={{
                              fontFamily: Fonts.Roboto.ExtraBold,
                              fontSize: 12,
                              color: COLORS.textColor,
                            }}>
                            {subItem?.type === 'count'
                              ? subItem.value
                              : `LKR ${new Intl.NumberFormat('en-LK', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(subItem.value)}`}
                          </Text>
                        </View>
                      )}
                    />
                  </View>
                )}
              />
            )}
          </View>

          <View></View>
        </View>
      </ScrollView>
    </View>
  );
}

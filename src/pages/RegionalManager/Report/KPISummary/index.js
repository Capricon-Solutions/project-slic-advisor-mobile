import React, {useState} from 'react';
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
import {Styles} from '../../../../theme/Styles';
import HeaderBackground from '../../../../components/HeaderBackground';
import Header from '../../../../components/Header';
import COLORS from '../../../../theme/colors';
import Fonts from '../../../../theme/Fonts';
import KpiSummery from '../../../../icons/KpiSummery.png'; // Replace with the actual logo path
import * as Progress from 'react-native-progress';

import Octicons from 'react-native-vector-icons/Octicons';
import {FlatList} from 'react-native';
import ContactListItem from '../../../../components/contactListItem';
import DepartmentItem from '../../../../components/DepartmentItem';
import {styles} from './styles';
import LoadingScreen from '../../../../components/LoadingScreen';
import {
  useGetBranchesQuery,
  useGetDepartmentQuery,
} from '../../../../redux/services/contactSlice';
const window = Dimensions.get('window');

export default function KPISummary({navigation}) {
  const [SelectedType, setSelectedType] = useState(1);

  const data = [
    {
      id: '1',
      name: 'Motor New',
      price: 'LKR 3,445,513.00',
      priceOutof: 'LKR 27,721,140.00',
      progress: 0.3,
    },
    {
      id: '2',
      name: 'Motor Renewal',
      price: 'LKR 5,771,060.00',
      priceOutof: 'LKR 75,632,110.00',
      progress: 0.5,
    },
    {
      id: '3',
      name: 'Total Motor',
      price: 'LKR 9,216,573.00',
      priceOutof: 'LKR 103,353,250.00',
      progress: 0.7,
    },
    {
      id: '4',
      name: 'Non Motor New',
      price: 'LKR 3,445,513.00',
      priceOutof: 'LKR 27,721,140.00',
      progress: 0.7,
    },
    {
      id: '5',
      name: 'Non Motor Renewal',
      price: 'LKR 3,445,513.00',
      priceOutof: 'LKR 27,721,140.00',
      progress: 0.2,
    },
    {
      id: '6',
      name: 'Total Non Motor ',
      price: 'LKR 3,445,513.00',
      priceOutof: 'LKR 27,721,140.00',
      progress: 0.1,
    },
  ];
  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="KPI Summary" onPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
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
              Monthly
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
              Cumalative
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
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <View style={{flex: 0.2}}>
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
                    style={{height: 23, width: 23}}
                    source={KpiSummery}></Image>
                </View>
              </View>
              <View style={{flex: 0.8, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto.SemiBold,
                    color: COLORS.textColor,
                  }}>
                  Region KPI Summary
                </Text>
              </View>
            </View>
            {/* //progress items */}
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts.Roboto.SemiBold,
                        color: COLORS.textColor,
                        fontSize: 12,
                      }}>
                      {item?.name}
                    </Text>

                    <Text
                      style={{
                        fontFamily: Fonts.Roboto.SemiBold,
                        color: COLORS.textColor,
                        fontSize: 10.5,
                      }}>
                      <Text style={{color: COLORS.primaryGreen}}>
                        {item.price}
                      </Text>{' '}
                      /{' '}
                      <Text style={{color: COLORS.primaryRed}}>
                        {' '}
                        {item.price}
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      marginBottom: 20,
                      marginTop: 6,
                    }}>
                    <Progress.Bar
                      progress={item?.progress}
                      width={window.width * 0.83}
                      height={12}
                      borderRadius={100}
                      color={COLORS.primary}
                    />
                  </View>
                </View>
              )}
            />
            {/* /// */}
          </View>
          {/* ) : ( */}
          <View></View>
          {/* )} */}
        </View>
        {/* )} */}
      </ScrollView>
    </View>
  );
}

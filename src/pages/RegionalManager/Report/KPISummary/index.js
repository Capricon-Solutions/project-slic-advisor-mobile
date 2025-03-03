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
  const {data: branches, isLoading, error} = useGetBranchesQuery();
  const {data: departments, isDipLoading, diperror} = useGetDepartmentQuery();

  const [SelectedType, setSelectedType] = useState(1);

  const renderItem = ({item}) => <ContactListItem item={item} />;

  const renderDepartmentItem = ({item}) => <DepartmentItem item={item} />;

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

        {isLoading == true ? (
          <LoadingScreen />
        ) : (
          <View>
            {/* {SelectedType == 1 ? ( */}
            <View
              style={{
                borderRadius: 15,
                padding: 10,
                backgroundColor: COLORS.white,
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
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.Roboto.SemiBold,
                      color: COLORS.textColor,
                      fontSize: 12,
                    }}>
                    Motor New
                  </Text>

                  <Text
                    style={{
                      fontFamily: Fonts.Roboto.SemiBold,
                      color: COLORS.textColor,
                      fontSize: 11,
                    }}>
                    LKR 3,445,513.00 / LKR 27,721,140.00
                  </Text>
                </View>
                <View></View>
              </View>
            </View>
            {/* ) : ( */}
            <View></View>
            {/* )} */}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

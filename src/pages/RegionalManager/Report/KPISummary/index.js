import React, {useEffect, useState} from 'react';
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
import KpiSummeryIcon from '../../../../icons/KpiSummery.png'; // Replace with the actual logo path
import * as Progress from 'react-native-progress';
import {FlatList} from 'react-native';
import {styles} from './styles';
import LoadingScreen from '../../../../components/LoadingScreen';
import {
  useKpiSummeryQuery,
  useRegionalSummeryQuery,
} from '../../../../redux/services/SummeryApiSlice';
import LoaderKit from 'react-native-loader-kit';
import {useSelector} from 'react-redux';
import moment from 'moment';

const window = Dimensions.get('window');

export default function KPISummary({navigation}) {
  const [selectedType, setSelectedType] = useState('monthly'); // 'monthly' or 'cumulative'
  const profile = useSelector(state => state.Profile.profile);
  const currentMonthNumber = moment().month() + 1; // +1 because Moment.js months are 0-indexed

  const regionName = profile?.user?.region;
  const {
    data: KpiSummery,
    error: KpiSummeryError,
    isLoading: KpiSummeryLoading,
    isFetching: KpiSummeryFetching,
  } = useKpiSummeryQuery({
    month: currentMonthNumber,
    regionName: regionName,
  });

  useEffect(() => {
    console.log('regionName', regionName);
    console.log('KpiSummery', KpiSummery);
    console.log('KpiSummeryError', KpiSummeryError);
  }, [KpiSummery, KpiSummeryError]);

  // Format number to LKR currency with commas
  const formatCurrency = value => {
    return `LKR ${value.toLocaleString('en-US')}.00`;
  };

  // Transform the API data to match the required format
  const transformData = sourceData => {
    if (!sourceData) return [];

    return sourceData?.map(item => ({
      id: item.kpi?.replace(/\s+/g, '-').toLowerCase(),
      name: item.kpi,
      price: formatCurrency(item.achievement),
      priceOutof: formatCurrency(item.target),
      progress: item.achPresentage / 100, // Convert percentage to decimal
      growthPercentage: item.growthPresentage,
      lastYear: formatCurrency(item.lastYear),
    }));
  };

  // Get the appropriate data based on selected tab
  const getCurrentData = () => {
    if (KpiSummeryLoading || KpiSummeryFetching || !KpiSummery?.data) {
      return [];
    }

    return selectedType === 'monthly'
      ? transformData(KpiSummery.data.monthly)
      : transformData(KpiSummery.data.cumulative);
  };

  const currentData = getCurrentData();

  if (KpiSummeryLoading || KpiSummeryFetching) {
    return <LoadingScreen />;
  }

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="KPI Summary" onPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
        <View style={styles.mainWrap}>
          <TouchableOpacity
            onPress={() => setSelectedType('monthly')}
            style={{
              backgroundColor:
                selectedType === 'monthly' ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Text
              style={{
                color: selectedType === 'monthly' ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType('cumulative')}
            style={{
              backgroundColor:
                selectedType === 'cumulative' ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color:
                  selectedType === 'cumulative' ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              Cumulative
            </Text>
          </TouchableOpacity>
        </View>

        <View>
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
                    source={KpiSummeryIcon}></Image>
                </View>
              </View>
              <View style={{flex: 0.8, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: Fonts.Roboto.SemiBold,
                    color: COLORS.textColor,
                  }}>
                  Region KPI Summary
                  {/* ({selectedType === 'monthly' ? 'Monthly' : 'Cumulative'}) */}
                </Text>
              </View>
            </View>

            <FlatList
              data={currentData}
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
                      {item.name}
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
                        {item.priceOutof}
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      marginBottom: 1,
                      marginTop: 3,
                    }}>
                    <Progress.Bar
                      progress={item.progress}
                      width={window.width * 0.83}
                      height={12}
                      borderRadius={100}
                      color={
                        item.progress >= 1 ? COLORS.primary : COLORS.primary
                      }
                    />
                    <Text style={{fontSize: 10, marginTop: 4}}>
                      Growth: {item.growthPercentage}% (LY: {item.lastYear})
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
      {KpiSummeryLoading && (
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            width: '100%',
            height: '100%',
          }}>
          <LoaderKit
            style={{width: 50, height: 50}}
            name={'LineScalePulseOutRapid'}
            color={COLORS.grayText}
          />
        </View>
      )}
    </View>
  );
}

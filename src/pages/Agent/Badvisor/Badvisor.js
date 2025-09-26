import React, {useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Linking} from 'react-native';
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {Getpath} from '../../../redux/services/NavControllerSlice';
import {useGetBusinessAdvisorQuery} from '../../../redux/services/loginSlice';
import LoaderKit from 'react-native-loader-kit';
import COLORS from '../../../theme/colors';

export default function Badvisor({navigation}) {
  const dispatch = useDispatch();

  const token = useSelector(state => state.Profile.token);
  const {data: ReturnUrl, isLoading, error} = useGetBusinessAdvisorQuery(token);

  useFocusEffect(() => {
    if (ReturnUrl?.redirectUrl) {
      setTimeout(() => {
        navigation.goBack();
      }, 1000);

      Linking.openURL(ReturnUrl.redirectUrl).catch(err =>
        console.error('Failed to open URL:', err),
      );
    }
  }, [ReturnUrl]);

  return (
    <View style={Styles.container}>
      {/* <HeaderBackground /> */}
      <Header Title="B-Advisor" onPress={() => navigation.goBack()} />
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            width: '100%',
            height: '100%',
          }}>
          <LoaderKit
            style={{width: 50, height: 50}}
            name={'LineScalePulseOutRapid'} // Optional: see list of animations below
            color={COLORS.grayText} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
          />
        </View>
      )}
    </View>
  );
}

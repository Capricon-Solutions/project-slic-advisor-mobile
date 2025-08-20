import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import LoadingScreen from '../../../components/LoadingScreen';
import NotificationItem from '../../../components/NotificationItem';
import {GestureHandlerRootView} from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import {useSelector} from 'react-redux';
import {useGetNotificationsQuery} from '../../../redux/services/NotificationSlice';
const window = Dimensions.get('window');

export default function Notification({navigation}) {
  const userCode = useSelector(state => state.Profile.userCode);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const notificationResponse = useSelector(
    state => state.Notifications.notificationsResponse,
  );

  const {
    data: Notifications,
    error,
    isLoading,
    isFetching,
  } = useGetNotificationsQuery({
    // id: usertype == 2 ? personalCode : userCode,
    id: userCode,
  });

  const renderItem = ({item}) => (
    <GestureHandlerRootView
      style={{
        flex: 1,

        borderRadius: 20,
        overflow: 'hidden',
      }}>
      <NotificationItem item={item} navigation={navigation} />
    </GestureHandlerRootView>
  );

  return (
    <View style={[Styles.container, {backgroundColor: COLORS.grayBackground}]}>
      <HeaderBackground />
      <Header Title="Notification" onPress={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          // paddingBottom: 10,
          flex: 1,
        }}>
        {Notifications?.data == null && !isFetching ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: Fonts?.Roboto?.Bold,
                fontSize: window.width * 0.04,
                color: COLORS.errorBorder,
              }}>
              {'No notifications available.!'}
            </Text>
          </View>
        ) : (
          <View>
            {isFetching == true ? (
              <View style={{height: window.height * 0.8}}>
                <LoadingScreen />
              </View>
            ) : (
              <FlatList
                data={Notifications?.data}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  fadeDuration: 1000,

                  backgroundColor: 'transparent',
                  paddingBottom: window.height * 0.25,
                }}
                renderItem={renderItem}
                keyExtractor={item => item?.id?.toString()}
              />
            )}
          </View>
        )}
      </ScrollView>
      <View
        style={{
          alignItems: 'center',
          position: 'absolute',
          width: '100%',
          bottom: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: Fonts.Roboto.Regular,
            fontSize: window.width * 0.043,
            color: COLORS.borderColor,
          }}>
          Swipe items to delete
        </Text>
      </View>
    </View>
  );
}

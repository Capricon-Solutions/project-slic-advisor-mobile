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
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './styles';
import LoadingScreen from '../../../components/LoadingScreen';
import TableComponent from '../../../components/TableComponent';
import ContactListItem from '../../../components/contactListItem';
import NotificationItem from '../../../components/NotificationItem';
import {useSelector} from 'react-redux';
import {useGetNotificationsQuery} from '../../../redux/services/NotificationSlice';
const window = Dimensions.get('window');

export default function Notification({navigation}) {
  const notificationResponse = useSelector(
    state => state.Notifications.notificationsResponse,
  );

  const {
    data: Notifications,
    error,
    isLoading,
    isFetching,
  } = useGetNotificationsQuery({
    id: 123456,
  });
  console.log('Notifications', Notifications);
  const notifications = [
    {
      id: 1,
      Title: 'Claim Intimated',
      name: 'Dr A N HEWAGE',
      date: '12/04/2024 5:53:04 PM',
      plicyNo: 'VMI119001710000672',
      type: 'COMPREHENSIVE',
      intimated_date: '12/04/2024 5:53:04 PM',
      phone: '0772616625',
    },
    {
      id: 2,
      Title: 'Claim Intimated',
      name: 'Dr A N HEWAGE',
      date: '12/04/2024 5:53:04 PM',
      plicyNo: 'VMI119001710000672',
      type: 'COMPREHENSIVE',
      intimated_date: '12/04/2024 5:53:04 PM',
      phone: '0772616625',
    },
    {
      id: 3,
      Title: 'Claim Intimated',
      name: 'Dr A N HEWAGE',
      date: '12/04/2024 5:53:04 PM',
      plicyNo: 'VMI119001710000672',
      type: 'COMPREHENSIVE',
      intimated_date: '12/04/2024 5:53:04 PM',
      phone: '0772616625',
    },
  ];

  const [SelectedType, setSelectedType] = useState(1);

  const renderItem = ({item}) => (
    <NotificationItem item={item} navigation={navigation} />
  );

  return (
    <View style={[Styles.container, {backgroundColor: COLORS.grayBackground}]}>
      <HeaderBackground />
      <Header Title="Notification" onPress={() => navigation.goBack()} />

      {/* <View style={styles.searchWrap}>
        <TextInput style={styles.textInput} placeholder="11/2024" />
        <TouchableOpacity style={styles.searchButton}>
          <Feather name="calendar" color={COLORS.white} size={20} />
        </TouchableOpacity>
      </View> */}
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 10}}>
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
      </ScrollView>
    </View>
  );
}

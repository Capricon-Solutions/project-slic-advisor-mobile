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
} from 'react-native';
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './styles';
import {useGetBranchesQuery} from '../../../redux/services/api';
import LoadingScreen from '../../../components/LoadingScreen';
import TableComponent from '../../../components/TableComponent';
import ContactListItem from '../../../components/contactListItem';
import NotificationItem from '../../../components/NotificationItem';
const window = Dimensions.get('window');

export default function Notification({navigation}) {
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

  const {data: branches, isLoading, error} = useGetBranchesQuery();

  const [SelectedType, setSelectedType] = useState(1);

  const renderItem = ({item}) => <NotificationItem item={item} />;

  return (
    <View style={[Styles.container, {backgroundColor: COLORS.grayBackground}]}>
      <HeaderBackground />
      <Header Title="Notification" onPress={() => navigation.goBack()} />

      <View style={styles.searchWrap}>
        <TextInput style={styles.textInput} placeholder="11/2024" />
        <TouchableOpacity style={styles.searchButton}>
          <Feather name="calendar" color={COLORS.white} size={20} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          fadeDuration: 1000,
          backgroundColor: 'transparent',
          paddingBottom: window.height * 0.25,
        }}
        renderItem={renderItem}
        keyExtractor={item => item?.id?.toString()}
      />
    </View>
  );
}

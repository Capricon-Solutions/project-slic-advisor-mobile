import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Styles} from '../../../../theme/Styles';
import {FlatList} from 'react-native';
import {styles} from './styles';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';
import HorizontalTeamMemberTable from '../../../../components/HorizontalTeamMemberTable';
import DropdownComponent from '../../../../components/DropdownComponent';
import SmallButton from '../../../../components/SmallButton';
import Button from '../../../../components/Button';
import COLORS from '../../../../theme/colors';
import Fonts from '../../../../theme/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Orientation from 'react-native-orientation-locker';
import Header from '../../../../components/Header';
import OutlinedTextBox from '../../../../components/OutlinedTextBox';
import LandscapeHeader from '../../../../components/LandscapeHeader';
import Building from './../../../../icons/Building.png';
import HorizontalReportTable from '../../../../components/HorizontalReportTable';
import BottomModal from '../../../../components/BottomModal';
import individualPerforamance from '../../../../icons/individualPerforamance.png'; // Replace with the actual logo path
import {useFocusEffect} from '@react-navigation/native';
import ReportBottomModal from '../../../../components/ReportBottomModal';

const window = Dimensions.get('window');
const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

export default function ReportSwitch({navigation}) {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [ModalVisible, setModalVisible] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setModalVisible(true);
    }, []),
  );

  // useEffect(() => {
  //   setModalVisible(true)
  // }, [])

  const ReportModal = [
    {
      title: 'Marketing executive',
      icon: individualPerforamance,

      onPress: () => {
        setModalVisible(false);
        navigation.navigate('MeReport', {Title: 'Marketing executive'});
      },
    },
    {
      title: 'Team leader',
      icon: individualPerforamance,
      onPress: () => {
        setModalVisible(false);
        navigation.navigate('TeamLeaderReport', {Title: 'Team leader'});
      },
    },
    {
      title: 'Advisor',
      icon: individualPerforamance,
      onPress: () => {
        setModalVisible(false);
        navigation.navigate('AdvisorReport', {Title: 'Advisor'});
      },
    },
    {
      title: 'Direct',
      icon: individualPerforamance,
      onPress: () => {
        setModalVisible(false);
        navigation.navigate('DirectReport', {Title: 'Direct'});
      },
    },
  ];

  return (
    <View style={Styles.container}>
      {/* <StatusBar backgroundColor={COLORS.primary} barStyle="dark-content" /> */}
      <ReportBottomModal
        Name={'Select your type'}
        ButtonList={ReportModal}
        modalVisible={ModalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
      {/* <HeaderBackground /> */}
    </View>
  );
}

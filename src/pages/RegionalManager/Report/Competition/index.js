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
import CompetitionIcon from '../../../../icons/CompetitionIcon.png'; // Replace with the actual logo path
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
import SquareTextBoxOutlined from '../../../../components/SquareTextBoxOutlined';
import DropdownComponent from '../../../../components/DropdownComponent';
import DropdownComponentNoLabelDashboard from '../../../../components/DropdownComponentNoLabelDashboard';
import DropdownComponentNoLabel from '../../../../components/DropdownComponentNoLabel';
import SmallButton from '../../../../components/SmallButton';
const window = Dimensions.get('window');

export default function Competition({ navigation }) {
  const [SelectedType, setSelectedType] = useState(1);
  const motorData = useSelector(state => state.DUES.motorData);
  const nonmotorData = useSelector(state => state.DUES.nonmotorData);
  const currentYear = new Date().getFullYear();

  const dropdownData = Array.from({ length: currentYear - 2019 }, (_, i) => ({
    label: (2020 + i).toString(),
    value: (2020 + i).toString(),
  }));
  const monthDropdownData = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  const competitions = [
    {
      id: 1,
      title: 'Complete 5 Claims to Win a Prize!',
      description: 'This active competition ends on December 4, 2024, with a $100 gift card as the prize. ',
      timeAgo: '10 mins ago',
      image: 'path_to_your_image', // Replace with your actual image source
    },
    {
      id: 2,
      title: 'Complete 10 Claims to Win a Gift Card!',
      description: 'This active competition ends on December 10, 2024, with a $200 gift card as the prize. Complete the required claims to qualify!',
      timeAgo: '1 hour ago',
      image: 'path_to_your_image', // Replace with your actual image source
    },
    // Add more competitions as needed
  ];
  const renderCompetitionItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 105,
        borderRadius: 10,
        backgroundColor: COLORS.lightBlue,
        elevation: 8,
        marginBottom: 15,
        marginHorizontal: 20,
        marginTop: 3
      }}
    >
      <View style={{ flex: 0.23, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={CompetitionIcon} style={{ height: 45, width: 45 }} />

      </View>
      <View style={{ flex: 0.77, padding: 6, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Bold,
                color: COLORS.black,
                fontSize: 14,
              }}
            >
              {item.title}
            </Text>
          </View>
          <MaterialCommunityIcons
            name="close"
            color={COLORS.primaryGreen}
            size={20}
          />
        </View>
        <Text
          numberOfLines={3}
          style={{
            fontFamily: Fonts.Roboto.Bold,
            color: COLORS.grayText,
            fontSize: 10,
            marginTop: 1,
          }}
        >
          {item.description}
        </Text>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingRight: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#00796B',
              paddingVertical: 4,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              paddingHorizontal: 12,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 10,
                fontFamily: Fonts.Roboto.SemiBold,
              }}
            >
              More Info
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.grayText,
              fontSize: 10,
            }}
          >
            {item.timeAgo}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Competition" onPress={() => navigation.goBack()} />
      <View style={{}}>
        <View style={styles.mainWrap}>
          <TouchableOpacity
            onPress={() => setSelectedType(1)}
            style={{
              backgroundColor:
                SelectedType == 1 ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: SelectedType == 1 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              GIPA
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(2)}
            style={{
              backgroundColor:
                SelectedType == 2 ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.25,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: SelectedType == 2 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              GI Summit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(3)}
            style={{
              backgroundColor:
                SelectedType == 3 ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.35,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: SelectedType == 3 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              Annual Awards
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(4)}
            style={{
              backgroundColor:
                SelectedType == 4 ? COLORS.primary : COLORS.white,
              borderRadius: 15,
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: SelectedType == 4 ? COLORS.white : COLORS.black,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              Other
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
            marginBottom: 20,
            marginHorizontal: 20,
          }}>
          <View style={{ flex: 0.35 }}>
            <Text
              style={{
                fontSize: 12,
                color: COLORS.textColor,
                fontFamily: Fonts.Roboto.SemiBold,
                marginBottom: 3,
              }}>
              Select Year
            </Text>
            <DropdownComponentNoLabelDashboard
              backgroundColor={COLORS.white}
              placeholder={'Select Year'}
              dropdownData={dropdownData}
            />
          </View>
          <View style={{ flex: 0.35 }}>
            <Text
              style={{
                fontSize: 12,
                color: COLORS.textColor,
                fontFamily: Fonts.Roboto.SemiBold,
                marginBottom: 3,
              }}>
              Select Month
            </Text>
            <DropdownComponentNoLabelDashboard
              backgroundColor={COLORS.white}
              placeholder="Select Month"
              dropdownData={monthDropdownData}
            />
          </View>
          <View style={{ flex: 0.25, justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#00796B',
                paddingVertical: 5.5,
                alignItems: 'center',
                borderRadius: 6,
              }}
            // onPress={() => onLoad(fromDate, toDate)}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: window.width * 0.03,
                  fontWeight: 'bold',
                }}>
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={competitions}
          renderItem={renderCompetitionItem}
          contentContainerStyle={{}}
          keyExtractor={(item) => item.id.toString()}
        />

      </View>
    </View>
  );
}

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import {FlatList} from 'react-native';
import ContactListItem from '../../../components/contactListItem';
import DepartmentItem from '../../../components/DepartmentItem';
import {styles} from './styles';
import ProductListItem from '../../../components/ProductListItem';
import Motorplus from '../../../icons/Motorplus.png'; // Replace with the actual logo path
import MotorLady from '../../../icons/MotorLady.png'; // Replace with the actual logo path
import OtherListItem from '../../../components/OtherListItem';

const window = Dimensions.get('window');

const products = [
  {id: 1, name: 'Motor Plus', icon: Motorplus},
  {id: 2, name: 'Motor Plus Ladies only', icon: MotorLady},
  {id: 3, name: 'Motor Plus rider', icon: MotorLady},
  {id: 4, name: 'Motor Plus commercial', icon: MotorLady},
  {id: 5, name: 'Motor Plus tuk', icon: MotorLady},
];

const others = [
  {
    id: 1,
    name: 'Company profile ',
    description: 'SLIC Company profile ',
    icon: Motorplus,
  },
  {
    id: 2,
    name: 'user manual',
    description:
      'BConnect user manual : The latest version of user-manual is available here.',
    icon: MotorLady,
  },
  {
    id: 3,
    name: 'Motor Plus Loyalty Rewards',
    description:
      'Motor Plus Loyalty Rewards is a loyalty scheme for the Motor Plus Comprehensive policy holders Read more',
    icon: MotorLady,
  },
];

export default function ProductPortfolio({navigation}) {
  const [SelectedType, setSelectedType] = useState(1);

  const renderItem = ({item}) => <ProductListItem item={item} />;

  const renderDepartmentItem = ({item}) => <OtherListItem item={item} />;

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Product portfolio" onPress={() => navigation.goBack()} />
      <View style={styles.mainWrap}>
        <TouchableOpacity
          onPress={() => setSelectedType(1)}
          style={{
            backgroundColor: SelectedType == 1 ? COLORS.primary : COLORS.white,
            borderRadius: 12,
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
            Product
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedType(2)}
          style={{
            backgroundColor: SelectedType == 2 ? COLORS.primary : COLORS.white,
            borderRadius: 12,
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: SelectedType == 2 ? COLORS.white : COLORS.black,
              fontFamily: Fonts.Roboto.SemiBold,
            }}>
            Other
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrap}>
        <TextInput style={styles.textInput} placeholder="Quick Search" />
        <TouchableOpacity style={styles.searchButton}>
          <Octicons name="search" color={COLORS.white} size={20} />
        </TouchableOpacity>
      </View>

      <View>
        {SelectedType == 1 ? (
          <FlatList
            data={products}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              fadeDuration: 1000,
              backgroundColor: 'transparent',
              paddingBottom: window.height * 0.25,
            }}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        ) : (
          <FlatList
            data={others}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              fadeDuration: 1000,
              backgroundColor: 'transparent',
              paddingBottom: window.height * 0.25,
            }}
            renderItem={renderDepartmentItem}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    </View>
  );
}

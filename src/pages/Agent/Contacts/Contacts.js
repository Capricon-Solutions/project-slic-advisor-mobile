import React, { useCallback, useEffect, useState } from 'react';
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
import { Styles } from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import { FlatList } from 'react-native';
import ContactListItem from '../../../components/contactListItem';
import DepartmentItem from '../../../components/DepartmentItem';
import { styles } from './styles';
import LoadingScreen from '../../../components/LoadingScreen';
import {
  useGetBranchesQuery,
  useGetDepartmentQuery,
} from '../../../redux/services/contactSlice';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Getpath } from '../../../redux/services/NavControllerSlice';
const window = Dimensions.get('window');

export default function Contacts({ navigation }) {
  const { data: branches, isLoading, error } = useGetBranchesQuery();
  const { data: departments, isDipLoading, diperror } = useGetDepartmentQuery();
  const [SelectedType, setSelectedType] = useState(1);
  const [search, setSearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const renderItem = ({ item }) => <ContactListItem item={item} />;

  const renderDepartmentItem = ({ item }) => <DepartmentItem item={item} />;
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(Getpath(0));
      setSearchQuery('');
    }, []),
  );

  useEffect(() => {
    if (branches?.data) {
      const query = searchQuery.toLowerCase();

      const filtered = branches.data
        .map(item => {
          const name = item?.name?.toLowerCase() || '';
          const words = name.split(/\s+/);
          const matchIndex = words.findIndex(word => word.startsWith(query));
          return {
            ...item,
            _matchIndex: matchIndex >= 0 ? matchIndex : Infinity, // prioritize match position
          };
        })
        .filter(item => item._matchIndex !== Infinity)
        .sort((a, b) => {
          if (a._matchIndex !== b._matchIndex) {
            return a._matchIndex - b._matchIndex;
          }
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase()); // fallback alphabetical
        });

      setFilteredBranches(filtered);
    }
  }, [branches, searchQuery, search]);

  useEffect(() => {
    if (departments?.data) {
      const query = searchQuery.toLowerCase();

      const filtered = departments.data
        .map(item => {
          const name = item?.contactName?.toLowerCase() || '';
          const words = name.split(' ');
          const matchIndex = words.findIndex(word => word.startsWith(query));
          return {
            ...item,
            _matchIndex: matchIndex >= 0 ? matchIndex : Infinity, // store match position
          };
        })
        .filter(item => item._matchIndex !== Infinity) // only keep matches
        .sort((a, b) => {
          if (a._matchIndex !== b._matchIndex) {
            return a._matchIndex - b._matchIndex; // prioritize earlier match position
          }
          return a.contactName
            .toLowerCase()
            .localeCompare(b.contactName.toLowerCase()); // fallback alphabetical sort
        });

      setFilteredDepartments(filtered);
    }
  }, [departments, searchQuery, search]);

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Contacts" onPress={() => navigation.goBack()} />
      <View style={{ paddingHorizontal: 20 }}>
        <View style={[styles.mainWrap, { marginTop: 5 }]}>
          <TouchableOpacity
            onPress={() => setSelectedType(1)}
            style={{
              backgroundColor:
                SelectedType == 1 ? COLORS.primary : COLORS.white,
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
              Branches
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType(2)}
            style={{
              backgroundColor:
                SelectedType == 2 ? COLORS.primary : COLORS.white,
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
              Department
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.searchWrap, { marginVertical: 12 }]}>
          <TextInput
            style={styles.textInput}
            placeholder="Quick Search"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => setSearch(!search)}>
            <Octicons name="search" color={COLORS.white} size={20} />
          </TouchableOpacity>
        </View>
        {isLoading == true ? (
          <View style={{ height: window.height * 0.6 }}>
            <LoadingScreen />
          </View>
        ) : (
          <View>
            {SelectedType == 1 ? (
              <FlatList
                data={filteredBranches}
                showsVerticalScrollIndicator={false}
                scrollToOverflowEnabled={true}
                contentContainerStyle={{
                  fadeDuration: 1000,
                  backgroundColor: 'transparent',
                  paddingBottom: window.height * 0.6,
                }}
                renderItem={renderItem}
              // keyExtractor={item => item?.id?.toString()}
              />
            ) : (
              <FlatList
                data={filteredDepartments}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  fadeDuration: 1000,
                  backgroundColor: 'transparent',
                  paddingBottom: window.height * 0.6,
                }}
                renderItem={renderDepartmentItem}
              // keyExtractor={item => item.id.toString()}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
}

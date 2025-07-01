import React, {useCallback, useEffect, useState} from 'react';
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
import LoadingScreen from '../../../components/LoadingScreen';
import {
  useGetBranchesQuery,
  useGetDepartmentQuery,
} from '../../../redux/services/contactSlice';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {Getpath} from '../../../redux/services/NavControllerSlice';
const window = Dimensions.get('window');

export default function Contacts({navigation}) {
  const {data: branches, isLoading, error} = useGetBranchesQuery();
  const {data: departments, isDipLoading, diperror} = useGetDepartmentQuery();
  const [SelectedType, setSelectedType] = useState(1);
  const [search, setSearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const renderItem = ({item}) => <ContactListItem item={item} />;

  const renderDepartmentItem = ({item}) => <DepartmentItem item={item} />;
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(Getpath(0));
      console.log('test conact');
    }, []),
  );

  // useEffect(() => {
  //   if (branches?.data) {
  //     const filtered = branches?.data?.filter(item =>
  //       item?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  //     );
  //     console.log('filteredbranches', filtered);
  //     setFilteredBranches(filtered);
  //   }
  // }, [branches, searchQuery, search]);
  // useEffect(() => {
  //   if (branches?.data) {
  //     const filtered = branches?.data
  //       ?.filter(item =>
  //         item?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  //       )
  //       ?.sort((a, b) => {
  //         const aName = a?.name?.toLowerCase();
  //         const bName = b?.name?.toLowerCase();
  //         const query = searchQuery.toLowerCase();

  //         const aStartsWith = aName.startsWith(query);
  //         const bStartsWith = bName.startsWith(query);

  //         if (aStartsWith && !bStartsWith) return -1;
  //         if (!aStartsWith && bStartsWith) return 1;

  //         return aName.localeCompare(bName); // fallback alphabetical
  //       });

  //     console.log('filteredbranches', filtered);
  //     setFilteredBranches(filtered);
  //   }
  // }, [branches, searchQuery, search]);

  useEffect(() => {
    if (branches?.data) {
      const query = searchQuery.toLowerCase();

      const filtered = branches.data
        .filter(item => item?.name?.toLowerCase().startsWith(query))
        .sort((a, b) => {
          const aName = a?.name?.toLowerCase();
          const bName = b?.name?.toLowerCase();

          return aName.localeCompare(bName); // optional: alphabetical fallback
        });

      console.log('filteredBranches', filtered);
      setFilteredBranches(filtered);
    }
  }, [branches, searchQuery, search]);
  // useEffect(() => {
  //   if (departments?.data) {
  //     const filtered = departments?.data?.filter(item =>
  //       item?.contactName?.toLowerCase().includes(searchQuery.toLowerCase()),
  //     );
  //     console.log('filtereddapartments', filtered);
  //     console.log('departments', departments);
  //     setFilteredDepartments(filtered);
  //   }
  // }, [departments, searchQuery, search]);

  // useEffect(() => {
  //   if (departments?.data) {
  //     const filtered = departments?.data
  //       ?.filter(item =>
  //         item?.contactName?.toLowerCase().includes(searchQuery.toLowerCase()),
  //       )
  //       ?.sort((a, b) => {
  //         const aName = a?.contactName?.toLowerCase();
  //         const bName = b?.contactName?.toLowerCase();
  //         const query = searchQuery.toLowerCase();

  //         const aStartsWith = aName.startsWith(query);
  //         const bStartsWith = bName.startsWith(query);

  //         if (aStartsWith && !bStartsWith) return -1;
  //         if (!aStartsWith && bStartsWith) return 1;

  //         return aName.localeCompare(bName);
  //       });

  //     console.log('filtereddapartments', filtered);
  //     console.log('departments', departments);
  //     setFilteredDepartments(filtered);
  //   }
  // }, [departments, searchQuery, search]);

  useEffect(() => {
    if (departments?.data) {
      const query = searchQuery.toLowerCase();

      const filtered = departments.data
        .filter(item => {
          const words = item?.contactName?.toLowerCase().split(' ') || [];
          return words.some(word => word.startsWith(query));
        })
        .sort((a, b) => {
          const aName = a?.contactName?.toLowerCase();
          const bName = b?.contactName?.toLowerCase();
          return aName.localeCompare(bName);
        });

      console.log('filteredDepartments', filtered);
      setFilteredDepartments(filtered);
    }
  }, [departments, searchQuery, search]);

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Contacts" onPress={() => navigation.goBack()} />
      <View style={{paddingHorizontal: 20}}>
        <View style={[styles.mainWrap, {marginTop: 5}]}>
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

        <View style={[styles.searchWrap, {marginVertical: 12}]}>
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
          <LoadingScreen />
        ) : (
          <View>
            {SelectedType == 1 ? (
              <FlatList
                data={filteredBranches}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  fadeDuration: 1000,
                  backgroundColor: 'transparent',
                  paddingBottom: window.height * 0.25,
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
                  paddingBottom: window.height * 0.25,
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

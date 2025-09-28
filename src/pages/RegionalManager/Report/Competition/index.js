import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {Styles} from '../../../../theme/Styles';
import HeaderBackground from '../../../../components/HeaderBackground';
import Header from '../../../../components/Header';
import COLORS from '../../../../theme/colors';
import Fonts from '../../../../theme/Fonts';
import CompetitionIcon from '../../../../icons/CompetitionIcon.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useGetCompetitionsQuery} from '../../../../redux/services/NotificationSlice';
import DropdownComponentNoLabelDashboard from '../../../../components/DropdownComponentNoLabelDashboard';

const window = Dimensions.get('window');

export default function Competition({navigation}) {
  const [SelectedType, setSelectedType] = useState(1);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const currentYear = new Date().getFullYear();
  const dropdownData = Array.from({length: currentYear - 2019}, (_, i) => ({
    label: (2020 + i).toString(),
    value: (2020 + i).toString(),
  }));

  const monthDropdownData = [
    {label: 'January', value: '1'},
    {label: 'February', value: '2'},
    {label: 'March', value: '3'},
    {label: 'April', value: '4'},
    {label: 'May', value: '5'},
    {label: 'June', value: '6'},
    {label: 'July', value: '7'},
    {label: 'August', value: '8'},
    {label: 'September', value: '9'},
    {label: 'October', value: '10'},
    {label: 'November', value: '11'},
    {label: 'December', value: '12'},
  ];

  const {data: Competition, isLoading} = useGetCompetitionsQuery({id: 123456});

  useEffect(() => {
    if (Competition) {
      handleSearch();
    }
  }, [Competition]);

  const filterCompetitionsByDate = data => {
    if (!data) return {};

    const filterFunc = items =>
      items?.filter(item => {
        const yearMatch = selectedYear
          ? item.year.toString() === selectedYear
          : true;
        const monthMatch = selectedMonth
          ? item.month.toString() === selectedMonth
          : true;
        return yearMatch && monthMatch;
      });

    return {
      gipa: filterFunc(data.gipa),
      giSummit: filterFunc(data.giSummit),
      annualAwards: filterFunc(data.annualAwards),
      other: filterFunc(data.other),
    };
  };

  const handleSearch = () => {
    if (!Competition?.data) return;
    const filtered = filterCompetitionsByDate(Competition.data);
    const selectedFilteredData =
      SelectedType === 1
        ? filtered.gipa
        : SelectedType === 2
        ? filtered.giSummit
        : SelectedType === 3
        ? filtered.annualAwards
        : filtered.other;

    setFilteredData(filtered);
  };

  const DataSet =
    SelectedType === 1
      ? filteredData?.gipa
      : SelectedType === 2
      ? filteredData?.giSummit
      : SelectedType === 3
      ? filteredData?.annualAwards
      : filteredData?.other;

  const CompetitionItem = ({item}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSeeMore, setShowSeeMore] = useState(false);

    const maxLines = 2;

    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          borderRadius: 10,
          backgroundColor: COLORS.lightBlue,
          elevation: 8,
          shadowOpacity: 0.2, // add opacity
          shadowRadius: 3, // add blur radius
          shadowOffset: {
            width: 0,
            height: 3,
          },
          marginBottom: 15,
          marginHorizontal: 20,
          marginTop: 3,
        }}>
        <View
          style={{flex: 0.23, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={CompetitionIcon} style={{height: 45, width: 45}} />
        </View>
        <View
          style={{
            flex: 0.77,
            paddingHorizontal: 6,

            paddingTop: 6,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Bold,
                color: COLORS.black,
                fontSize: 14,
              }}>
              {item.title}
            </Text>
          </View>
          <View style={{paddingRight: 20}}>
            <Text
              onTextLayout={e => {
                if (e.nativeEvent.lines.length > maxLines && !showSeeMore) {
                  setShowSeeMore(true);
                }
              }}
              numberOfLines={isExpanded ? undefined : maxLines}
              style={{
                fontFamily: 'Roboto-Bold',
                color: 'gray',
                fontSize: 10,
              }}>
              {item.description}
            </Text>
          </View>

          {showSeeMore && (
            <TouchableOpacity
              style={{
                backgroundColor: '#00796B',
                paddingVertical: 4,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                width: '25%',
                marginTop: 10,
              }}
              onPress={() => setIsExpanded(!isExpanded)}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 10,
                  fontFamily: Fonts.Roboto.SemiBold,
                }}>
                {isExpanded ? 'See less' : 'See more'}
              </Text>
            </TouchableOpacity>
          )}

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingRight: 20,
            }}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Bold,
                color: COLORS.grayText,
                fontSize: 10,
              }}>
              {item.timeAgo}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Competition" onPress={() => navigation.goBack()} />

      <View style={{paddingHorizontal: 10, marginTop: 10}}>
        {/* Filter Tabs */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}>
          {[
            {id: 1, label: 'GIPA'},
            {id: 2, label: 'GI Summit'},
            {id: 3, label: 'Annual Awards'},
            {id: 4, label: 'Other'},
          ].map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelectedType(item.id)}
              style={{
                backgroundColor:
                  SelectedType === item.id ? COLORS.primary : COLORS.white,
                borderRadius: 15,
                flex: 1,
                marginHorizontal: 5,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 6,
              }}>
              <Text
                style={{
                  color: SelectedType === item.id ? COLORS.white : COLORS.black,
                  fontFamily: Fonts.Roboto.SemiBold,
                }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filters: Year & Month */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
            marginBottom: 20,
          }}>
          <View style={{flex: 0.35}}>
            <Text style={styles.filterLabel}>Select Year</Text>
            <DropdownComponentNoLabelDashboard
              backgroundColor={COLORS.white}
              placeholder={'Select Year'}
              dropdownData={dropdownData}
              onSelect={setSelectedYear}
              value={selectedYear}
            />
          </View>
          <View style={{flex: 0.35}}>
            <Text style={styles.filterLabel}>Select Month</Text>
            <DropdownComponentNoLabelDashboard
              backgroundColor={COLORS.white}
              placeholder="Select Month"
              dropdownData={monthDropdownData}
              onSelect={setSelectedMonth}
              value={selectedMonth}
            />
          </View>
          <View style={{flex: 0.25, justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#00796B',
                paddingVertical: 6,
                alignItems: 'center',
                borderRadius: 6,
              }}
              onPress={handleSearch}>
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

        {/* FlatList */}
        <FlatList
          data={DataSet}
          renderItem={({item}) => <CompetitionItem item={item} />}
          keyExtractor={item => item?.id?.toString()}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: 'center',
                marginTop: 50,
                color: COLORS.grayText,
                fontFamily: Fonts.Roboto.SemiBold,
              }}>
              No competitions found.
            </Text>
          }
          contentContainerStyle={{paddingBottom: 100}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterLabel: {
    fontSize: 12,
    color: COLORS.textColor,
    fontFamily: Fonts.Roboto.SemiBold,
    marginBottom: 3,
  },
});

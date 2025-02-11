import React, {useState} from 'react';
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
import TableComponent from '../../../components/TableComponent';
import DateRangePicker from '../../../components/DateRangePicker';
const window = Dimensions.get('window');

const locations = [
  {id: 1, name: 'Akkaraipattu'},
  {id: 2, name: 'Akuressa'},
  {id: 3, name: 'Aluthgama'},
  {id: 4, name: 'Ambalangoda'},
  {id: 5, name: 'Ambalantota'},
  {id: 6, name: 'Ampara'},
  {id: 7, name: 'Anuradhapura'},
  {id: 8, name: 'Badulla'},
  {id: 9, name: 'Batticaloa'},
  {id: 10, name: 'Colombo'},
  {id: 11, name: 'Dambulla'},
  {id: 12, name: 'Galle'},
  {id: 13, name: 'Hambantota'},
  {id: 14, name: 'Jaffna'},
  {id: 15, name: 'Kandy'},
  {id: 16, name: 'Kurunegala'},
];

const departments = [
  {
    id: 1,
    name: 'Mr. Saman Priyantha',
    department: 'ICT Department',
    contact: '0762456721',
  },
  {
    id: 2,
    name: 'Mr. Poorna Gamage',
    department: 'ICT Department',
    contact: '0762456721',
  },
  {
    id: 3,
    name: 'Mr. Saman Priyantha',
    department: 'ICT Department',
    contact: '0762456721',
  },
  {
    id: 4,
    name: 'Mr. Kamal Priyantha',
    department: 'ICT Department',
    contact: '0762456721',
  },
  {
    id: 5,
    name: 'Mr. Nimal Priyantha',
    department: 'ICT Department',
    contact: '0762456721',
  },
  {
    id: 6,
    name: 'Mr. Sumal Priyantha',
    department: 'ICT Department',
    contact: '0762456721',
  },
  {
    id: 7,
    name: 'Mr. Kevin gamage',
    department: 'ICT Department',
    contact: '0762456721',
  },
];

export default function TrainingList({navigation}) {
  const [SelectedType, setSelectedType] = useState(1);
  const tableHead = [
    'Training No.',
    'Topic',
    'General',
    'Date and Time',
    'Status',
  ];
  const tableData = [
    [
      '01',
      'Social Media Marketing',
      'General',
      '21/12/2024 03:45pm',
      'Completed',
    ],
    ['02', 'Content Writing', 'General', '15/11/2024 10:30am', 'In Progress'],
    ['03', 'SEO Optimization', 'General', '05/09/2024 02:15pm', 'Pending'],
    ['04', 'Email Marketing', 'General', '28/08/2024 04:50pm', 'Completed'],
    ['05', 'Affiliate Marketing', 'General', '10/07/2024 01:00pm', 'On Hold'],
    ['06', 'Pay-Per-Click Ads', 'General', '22/06/2024 09:45am', 'Completed'],
    ['07', 'Video Marketing', 'General', '18/05/2024 11:20am', 'In Progress'],
    [
      '08',
      'Influencer Marketing',
      'General',
      '09/04/2024 05:10pm',
      'Completed',
    ],
    ['09', 'Mobile Marketing', 'General', '30/03/2024 08:55am', 'Pending'],
    ['10', 'Podcast Marketing', 'General', '12/02/2024 06:40pm', 'On Hold'],
  ];
  const columnWidths = [100, 160, 100, 130, 100];

  const renderItem = ({item}) => <ContactListItem item={item} />;

  const renderDepartmentItem = ({item}) => <DepartmentItem item={item} />;

  const handleLoad = (from, to) => {
    console.log('Selected From:', from);
    console.log('Selected To:', to);
  };

  return (
    <ScrollView style={{}}>
      <View style={[Styles.container, {flex: 1, height: window.height * 1}]}>
        <HeaderBackground />
        <Header Title="Training List" onPress={() => navigation.goBack()} />

        {/* <DateRangePicker onLoad={handleLoad} /> */}
        <DateRangePicker
          onLoad={(from, to) => console.log('From:', from, 'To:', to)}
        />

        <View style={styles.searchWrap}>
          <TextInput style={styles.textInput} placeholder="Quick Search" />
          <TouchableOpacity style={styles.searchButton}>
            <Octicons name="search" color={COLORS.white} size={20} />
          </TouchableOpacity>
        </View>

        <TableComponent
          haveTotal={false}
          tableHead={tableHead}
          tableData={tableData}
          columnWidths={columnWidths}
        />
      </View>
    </ScrollView>
  );
}

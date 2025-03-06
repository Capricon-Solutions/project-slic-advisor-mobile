import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Styles} from '../../../theme/Styles';
import HeaderBackground from '../../../components/HeaderBackground';
import Header from '../../../components/Header';
import COLORS from '../../../theme/colors';
import DropdownComponent from '../../../components/DropdownComponent';
import Button from '../../../components/Button';
import AlertButtonWhite from '../../../components/AlertButtonWhite';
import AlertButton from '../../../components/AlertButton';
import Fonts from '../../../theme/Fonts';
import SmallButton from '../../../components/SmallButton';
import SquareTextBoxOutlined from '../../../components/SquareTextBoxOutlined';
import DropdownComponentNoLabel from '../../../components/DropdownComponentNoLabel';
import Octicons from 'react-native-vector-icons/Octicons';
import {styles} from './styles';
import TableComponent from '../../../components/TableComponent';

export default function LeadInformation({navigation}) {
  const tableHead = ['Type', 'Premium', 'Income'];

  const table = [
    {
      id: '01777',
      date: '21/12/2024 03.45pm',
      type: 'appointment',
      description: 'Description',
    },
    {
      id: '01777',
      date: '21/12/2024 03.45pm',
      type: 'Quotation',
      description: 'Description',
    },
    {
      id: '01777',
      date: '21/12/2024 03.45pm',
      type: 'appointment',
      description: 'Description',
    },
  ];
  const tableData = table.map(item => [
    item.id,
    item.date,
    item.type,
    item.description,
  ]);
  const columnWidths = [130, 110, 110];
  const [expanded, setExpanded] = useState(1);

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Lead Information" onPress={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={20}
        contentContainerStyle={{
          paddingHorizontal: 15,
          marginBottom: 20,
          paddingTop: 10,
        }}>
        {/* <TextInput autoFocus placeholder="svsv" /> */}

        {/* Event and Lead Details */}

        <View style={styles.leadInfoCard}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Bold,
                fontSize: 16,
                color: COLORS.textColor,
              }}>
              Event and Lead Details
            </Text>
            <TouchableOpacity
              onPress={() => (expanded !== 1 ? setExpanded(1) : setExpanded(0))}
              style={{alignItems: 'center', padding: 3}}>
              <Octicons
                name={expanded == 1 ? 'chevron-up' : 'chevron-down'}
                color={COLORS.black}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {expanded == 1 && (
            <View>
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Event:'}
                borderColor={COLORS.warmGray}
              />
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Event Date'}
                borderColor={COLORS.warmGray}
              />
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Lead Type'}
                borderColor={COLORS.warmGray}
              />
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Lead Source'}
                borderColor={COLORS.warmGray}
              />
            </View>
          )}
        </View>

        {/* Customer Basic Info */}

        <View style={styles.leadInfoCard}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Bold,
                fontSize: 16,
                color: COLORS.textColor,
              }}>
              Customer Basic Info
            </Text>
            <TouchableOpacity
              onPress={() => (expanded !== 2 ? setExpanded(2) : setExpanded(0))}
              style={{alignItems: 'center', padding: 3}}>
              <Octicons
                name={expanded == 2 ? 'chevron-up' : 'chevron-down'}
                color={COLORS.black}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {expanded == 2 && (
            <View>
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Customer Name'}
                borderColor={COLORS.warmGray}
              />
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'NIC Number'}
                borderColor={COLORS.warmGray}
              />
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Date Of Birth'}
                borderColor={COLORS.warmGray}
              />
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Occupation'}
                borderColor={COLORS.warmGray}
              />

              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Remarks'}
                borderColor={COLORS.warmGray}
              />
            </View>
          )}
        </View>

        {/* Customer Contact Info */}
        <View style={styles.leadInfoCard}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Bold,
                fontSize: 16,
                color: COLORS.textColor,
              }}>
              Customer Contact Info
            </Text>
            <TouchableOpacity
              onPress={() => (expanded !== 3 ? setExpanded(3) : setExpanded(0))}
              style={{alignItems: 'center', padding: 3}}>
              <Octicons
                name={expanded == 3 ? 'chevron-up' : 'chevron-down'}
                color={COLORS.black}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {expanded == 3 && (
            <View>
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Home Number'}
                borderColor={COLORS.warmGray}
              />
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Mobile Number'}
                borderColor={COLORS.warmGray}
              />
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Work Number'}
                borderColor={COLORS.warmGray}
              />
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Email'}
                borderColor={COLORS.warmGray}
              />

              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Address'}
                borderColor={COLORS.warmGray}
              />
              <SquareTextBoxOutlined
                mediumFont={true}
                // Label={'Address'}
                borderColor={COLORS.warmGray}
              />
            </View>
          )}
        </View>

        {/* policy Info */}

        <View style={styles.leadInfoCard}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Bold,
                fontSize: 16,
                color: COLORS.textColor,
              }}>
              policy Info
            </Text>
            <TouchableOpacity
              onPress={() => (expanded !== 4 ? setExpanded(4) : setExpanded(0))}
              style={{alignItems: 'center', padding: 3}}>
              <Octicons
                name={expanded == 4 ? 'chevron-up' : 'chevron-down'}
                color={COLORS.black}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {expanded == 4 && (
            <View>
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Lead Type'}
                borderColor={COLORS.warmGray}
              />
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Policy Number'}
                borderColor={COLORS.warmGray}
              />
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Insurance Company'}
                borderColor={COLORS.warmGray}
              />
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'premium'}
                borderColor={COLORS.warmGray}
              />

              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Renewal Date'}
                borderColor={COLORS.warmGray}
              />

              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Ref. No. (If any)'}
                borderColor={COLORS.warmGray}
              />
            </View>
          )}
        </View>

        {/* Vehicle Info */}

        <View style={styles.leadInfoCard}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Bold,
                fontSize: 16,
                color: COLORS.textColor,
              }}>
              Vehicle Info
            </Text>
            <TouchableOpacity
              onPress={() => (expanded !== 5 ? setExpanded(5) : setExpanded(0))}
              style={{alignItems: 'center', padding: 3}}>
              <Octicons
                name={expanded == 5 ? 'chevron-up' : 'chevron-down'}
                color={COLORS.black}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {expanded == 5 && (
            <View>
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Vehicle Number'}
                borderColor={COLORS.warmGray}
              />
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Vehicle Type'}
                borderColor={COLORS.warmGray}
              />
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Vehicle Value'}
                borderColor={COLORS.warmGray}
              />
              <SquareTextBoxOutlined
                mediumFont={true}
                Label={'Year of manufacture'}
                borderColor={COLORS.warmGray}
              />
            </View>
          )}
        </View>

        {/* Activity History */}

        <View style={styles.leadInfoCard}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.Roboto.Bold,
                fontSize: 16,
                color: COLORS.textColor,
              }}>
              Activity History
            </Text>
            <TouchableOpacity
              onPress={() => (expanded !== 6 ? setExpanded(6) : setExpanded(0))}
              style={{alignItems: 'center', padding: 3}}>
              <Octicons
                name={expanded == 6 ? 'chevron-up' : 'chevron-down'}
                color={COLORS.black}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {expanded == 6 && (
            <View style={{marginVertical: 5}}>
              <TableComponent
                haveTotal={true}
                tableHead={tableHead}
                tableData={tableData}
                columnWidths={columnWidths}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

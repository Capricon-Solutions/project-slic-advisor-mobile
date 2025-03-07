import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Styles } from '../../../theme/Styles';
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
import { styles } from './styles';
import TableComponent from '../../../components/TableComponent';
import TableComponentDoc from '../../../components/TableComponentDoc';

export default function ClaimDetails({ navigation }) {


  const tableHead = ['Document', 'Status'];
  const Data = [
    {
      id: 1,
      documentName: 'Claim Form',
      status: 'Received'
    },
    {
      id: 2,
      documentName: 'Driver Statement (SA-6)',
      status: 'Received'
    },
    {
      id: 3,
      documentName: 'debit Status Email',
      status: 'Pending'
    },
    {
      id: 4,
      documentName: 'Bank Pass book copy',
      status: 'Reject'
    },
  ]
  const DataSalvage = [
    {
      id: 1,
      documentName: 'RHS Headlight Cowling',
      status: 'Received'
    },
    {
      id: 2,
      documentName: 'Headlight',
      status: 'Received'
    },


  ]
  const tableData = Data?.map(item => [
    item.documentName,
    item.status,

  ]);
  const tableDataSalvage = DataSalvage?.map(item => [
    item.documentName,
    item.status,

  ]);
  const columnWidths = [170, 170];
  const [expanded, setExpanded] = useState(1);

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Claim Details" onPress={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={20}
        contentContainerStyle={{
          paddingHorizontal: 15,
          marginBottom: 20,
          paddingTop: 10,
        }}>
        {/* <TextInput autoFocus placeholder="svsv" /> */}

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
              Document
            </Text>
            <TouchableOpacity
              onPress={() => (expanded !== 1 ? setExpanded(1) : setExpanded(0))}
              style={{ alignItems: 'center', padding: 3 }}>
              <Octicons
                name={expanded == 1 ? 'chevron-up' : 'chevron-down'}
                color={COLORS.black}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {expanded == 1 && (

            <View style={{
              marginTop: 10,
              flex: 1,
              alignItems: 'center'
            }}>

              <TableComponentDoc
                haveTotal={false}
                tableHead={tableHead}
                tableData={tableData}
                columnWidths={columnWidths}
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
              Comments
            </Text>
            <TouchableOpacity
              onPress={() => (expanded !== 2 ? setExpanded(2) : setExpanded(0))}
              style={{ alignItems: 'center', padding: 3 }}>
              <Octicons
                name={expanded == 2 ? 'chevron-up' : 'chevron-down'}
                color={COLORS.black}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {expanded == 2 && (
            <View>
              <Text>
                test
              </Text>
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
              Salvage            </Text>
            <TouchableOpacity
              onPress={() => (expanded !== 4 ? setExpanded(3) : setExpanded(0))}
              style={{ alignItems: 'center', padding: 3 }}>
              <Octicons
                name={expanded == 3 ? 'chevron-up' : 'chevron-down'}
                color={COLORS.black}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {expanded == 3 && (
            <View style={{
              marginTop: 10,
              flex: 1,
              alignItems: 'center'
            }}>
              <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                <View style={{ flex: 0.5 }}>
                  <Text style={{
                    fontFamily: Fonts.Roboto.SemiBold,
                    color: COLORS.textColor,
                    fontSize: 14
                  }}>Garage</Text>
                </View>
                <View style={{ flex: 0.5 }}>
                  <Text style={{
                    fontFamily: Fonts.Roboto.Regular,
                    color: COLORS.textColor,
                    fontSize: 14
                  }}>Non MOU</Text>
                </View>

              </View>
              <View style={{ flexDirection: 'row', marginVertical: 3 }}>
                <View style={{ flex: 0.5 }}>
                  <Text style={{
                    fontFamily: Fonts.Roboto.SemiBold,
                    color: COLORS.textColor,
                    fontSize: 14
                  }}>Salvage Yard</Text>
                </View>
                <View style={{ flex: 0.5 }}>
                  <Text style={{
                    fontFamily: Fonts.Roboto.Regular,
                    color: COLORS.textColor,
                    fontSize: 14
                  }}>      -</Text>
                </View>

              </View>
              <View style={{ flexDirection: 'row', marginTop: 3 }}>
                <View style={{ flex: 0.5 }}>
                  <Text style={{
                    fontFamily: Fonts.Roboto.SemiBold,
                    color: COLORS.textColor,
                    fontSize: 14
                  }}>Allocated Branch</Text>
                </View>
                <View style={{ flex: 0.5 }}>
                  <Text style={{
                    fontFamily: Fonts.Roboto.Regular,
                    color: COLORS.textColor,
                    fontSize: 14
                  }}>Kegalle</Text>
                </View>

              </View>
              <View style={{ marginVertical: 17, borderColor: COLORS.borderColor, borderWidth: 0.5, width: '100%' }}></View>

              <TableComponentDoc
                haveTotal={false}
                tableHead={tableHead}
                tableData={tableDataSalvage}
                columnWidths={columnWidths}
              />

            </View>
          )}
        </View>


      </ScrollView >
    </View >
  );
}

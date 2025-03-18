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
import Fonts from '../../../theme/Fonts';
import SquareTextBoxOutlined from '../../../components/SquareTextBoxOutlined';
import Octicons from 'react-native-vector-icons/Octicons';
import {styles} from './styles';
import TableComponent from '../../../components/TableComponent';
import {useGetLeadByIdQuery} from '../../../redux/services/plannerSlice';
import moment from 'moment';
import LoadingScreen from '../../../components/LoadingScreen';

export default function LeadInformation({navigation, route}) {
  const tableHead = ['Type', 'Premium', 'Income'];
  const {item} = route.params;

  const {
    data: leadData,
    isLoading,
    error,
  } = useGetLeadByIdQuery(item?.leadId, {
    skip: !item?.leadId, // Prevent query if leadId is not available
  });
  const leadInfo = leadData?.data;
  console.log('leadInfo', leadInfo);
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
      {isLoading ? (
        <View style={{flex: 1}}>
          <LoadingScreen />
        </View>
      ) : (
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
            <TouchableOpacity
              onPress={() => (expanded !== 1 ? setExpanded(1) : setExpanded(0))}
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
              <View
                // onPress={() => (expanded !== 1 ? setExpanded(1) : setExpanded(0))}
                style={{alignItems: 'center', padding: 3}}>
                <Octicons
                  name={expanded == 1 ? 'chevron-up' : 'chevron-down'}
                  color={COLORS.black}
                  size={20}
                />
              </View>
            </TouchableOpacity>
            {expanded == 1 && (
              <View>
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Event:'}
                  readOnly={true}
                  value={String(leadInfo?.eventId ?? '')}
                  borderColor={COLORS.warmGray}
                />
                <SquareTextBoxOutlined
                  mediumFont={true}
                  readOnly={true}
                  Label={'Event Date'}
                  // value={String(leadInfo?.eventId ?? '')}
                  borderColor={COLORS.warmGray}
                />
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Lead Type'}
                  readOnly={true}
                  value={String(leadInfo?.leadType ?? '')}
                  // value={leadInfo?.leadType}
                  borderColor={COLORS.warmGray}
                />
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Lead Source'}
                  readOnly={true}
                  value={String(leadInfo?.leadSource ?? '')}
                  borderColor={COLORS.warmGray}
                />
              </View>
            )}
          </View>

          {/* Customer Basic Info */}

          <View style={styles.leadInfoCard}>
            <TouchableOpacity
              onPress={() => (expanded !== 2 ? setExpanded(2) : setExpanded(0))}
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
              <View
                onPress={() =>
                  expanded !== 2 ? setExpanded(2) : setExpanded(0)
                }
                style={{alignItems: 'center', padding: 3}}>
                <Octicons
                  name={expanded == 2 ? 'chevron-up' : 'chevron-down'}
                  color={COLORS.black}
                  size={20}
                />
              </View>
            </TouchableOpacity>
            {expanded == 2 && (
              <View>
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Customer Name'}
                  readOnly={true}
                  value={String(leadInfo?.customerName ?? '')}
                  borderColor={COLORS.warmGray}
                />
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'NIC Number'}
                  readOnly={true}
                  value={String(leadInfo?.nicNumber ?? '')}
                  borderColor={COLORS.warmGray}
                />
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Date Of Birth'}
                  readOnly={true}
                  value={String(leadInfo?.dateOfBirth ?? '')}
                  borderColor={COLORS.warmGray}
                />
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Occupation'}
                  readOnly={true}
                  value={String(leadInfo?.occupation ?? '')}
                  borderColor={COLORS.warmGray}
                />

                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Remarks'}
                  readOnly={true}
                  // value={String(leadInfo?.occupation ?? '')}
                  borderColor={COLORS.warmGray}
                />
              </View>
            )}
          </View>

          {/* Customer Contact Info */}
          <View style={styles.leadInfoCard}>
            <TouchableOpacity
              onPress={() => (expanded !== 3 ? setExpanded(3) : setExpanded(0))}
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
              <View
                // onPress={() => (expanded !== 3 ? setExpanded(3) : setExpanded(0))}
                style={{alignItems: 'center', padding: 3}}>
                <Octicons
                  name={expanded == 3 ? 'chevron-up' : 'chevron-down'}
                  color={COLORS.black}
                  size={20}
                />
              </View>
            </TouchableOpacity>
            {expanded == 3 && (
              <View>
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Home Number'}
                  readOnly={true}
                  value={String(leadInfo?.homeNumber ?? '')}
                  borderColor={COLORS.warmGray}
                />
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Mobile Number'}
                  readOnly={true}
                  value={String(leadInfo?.mobileNumber ?? '')}
                  borderColor={COLORS.warmGray}
                />
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Work Number'}
                  readOnly={true}
                  value={String(leadInfo?.workNumber ?? '')}
                  borderColor={COLORS.warmGray}
                />
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Email'}
                  readOnly={true}
                  value={String(leadInfo?.email ?? '')}
                  borderColor={COLORS.warmGray}
                />

                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Address'}
                  readOnly={true}
                  value={String(leadInfo?.address1 ?? '')}
                  borderColor={COLORS.warmGray}
                />
                {leadInfo?.address2 && (
                  <SquareTextBoxOutlined
                    mediumFont={true}
                    readOnly={true}
                    value={String(leadInfo?.address2 ?? '')}
                    borderColor={COLORS.warmGray}
                  />
                )}
                {leadInfo?.address3 && (
                  <SquareTextBoxOutlined
                    mediumFont={true}
                    readOnly={true}
                    value={String(leadInfo?.address3 ?? '')}
                    borderColor={COLORS.warmGray}
                  />
                )}
              </View>
            )}
          </View>

          {/* policy Info */}

          <View style={styles.leadInfoCard}>
            <TouchableOpacity
              onPress={() => (expanded !== 4 ? setExpanded(4) : setExpanded(0))}
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
              <View style={{alignItems: 'center', padding: 3}}>
                <Octicons
                  name={expanded == 4 ? 'chevron-up' : 'chevron-down'}
                  color={COLORS.black}
                  size={20}
                />
              </View>
            </TouchableOpacity>
            {expanded == 4 && (
              <View>
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Lead Type'}
                  readOnly={true}
                  value={String(leadInfo?.leadType ?? '')}
                  borderColor={COLORS.warmGray}
                />
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Policy Number'}
                  readOnly={true}
                  value={String(leadInfo?.policyNumber ?? '')}
                  borderColor={COLORS.warmGray}
                />
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Insurance Company'}
                  readOnly={true}
                  value={String(leadInfo?.insCompany ?? '')}
                  borderColor={COLORS.warmGray}
                />
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'premium'}
                  readOnly={true}
                  value={
                    leadInfo?.premium != null
                      ? new Intl.NumberFormat('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(leadInfo.premium)
                      : ''
                  }
                  borderColor={COLORS.warmGray}
                />

                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Renewal Date'}
                  readOnly={true}
                  value={
                    leadInfo?.renewalDate
                      ? moment(leadInfo.renewalDate).format('YYYY/MM/DD')
                      : ''
                  }
                  borderColor={COLORS.warmGray}
                />

                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Ref. No. (If any)'}
                  readOnly={true}
                  value={String(leadInfo?.refNo ?? '')}
                  borderColor={COLORS.warmGray}
                />
              </View>
            )}
          </View>

          {/* Vehicle Info */}

          <View style={styles.leadInfoCard}>
            <TouchableOpacity
              onPress={() => (expanded !== 5 ? setExpanded(5) : setExpanded(0))}
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
              <View
                // onPress={() => (expanded !== 5 ? setExpanded(5) : setExpanded(0))}
                style={{alignItems: 'center', padding: 3}}>
                <Octicons
                  name={expanded == 5 ? 'chevron-up' : 'chevron-down'}
                  color={COLORS.black}
                  size={20}
                />
              </View>
            </TouchableOpacity>
            {expanded == 5 && (
              <View>
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Vehicle Number'}
                  readOnly={true}
                  value={String(leadInfo?.vehicleNumber ?? '')}
                  borderColor={COLORS.warmGray}
                />
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Vehicle Type'}
                  readOnly={true}
                  value={String(leadInfo?.vehicleType ?? '')}
                  borderColor={COLORS.warmGray}
                />
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Vehicle Value'}
                  readOnly={true}
                  value={String(leadInfo?.vehicleValue ?? '')}
                  borderColor={COLORS.warmGray}
                />
                <SquareTextBoxOutlined
                  mediumFont={true}
                  Label={'Year of Manufacture'}
                  readOnly={true}
                  // value={String(leadInfo?.vehicleValue ?? '')}
                  borderColor={COLORS.warmGray}
                />
              </View>
            )}
          </View>

          {/* Activity History */}

          <View style={styles.leadInfoCard}>
            <TouchableOpacity
              onPress={() => (expanded !== 6 ? setExpanded(6) : setExpanded(0))}
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
              <View
                // onPress={() => (expanded !== 6 ? setExpanded(6) : setExpanded(0))}
                style={{alignItems: 'center', padding: 3}}>
                <Octicons
                  name={expanded == 6 ? 'chevron-up' : 'chevron-down'}
                  color={COLORS.black}
                  size={20}
                />
              </View>
            </TouchableOpacity>
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
      )}
    </View>
  );
}

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import {Styles} from '../../../theme/Styles';
import Header from '../../../components/Header';
import HeaderBackground from '../../../components/HeaderBackground';
import {styles} from './styles';
import SetTargetModal from '../../../components/SetTargetModal';
import PolicyItem from '../../../components/PolicyItem';
import Button from '../../../components/Button';
import SmallButton from '../../../components/SmallButton';
import {useSelector} from 'react-redux';
import {useGetPolicyDetailsQuery} from '../../../redux/services/policyDetailsSlice';
import LoadingScreen from '../../../components/LoadingScreen';
import {useGetLeadByIdQuery} from '../../../redux/services/plannerSlice';
import LoaderKit from 'react-native-loader-kit';
import moment from 'moment';

const window = Dimensions.get('window');

export default function ActivityDetails({navigation, route}) {
  const activityTypeMap = {
    A: 'Appointment',
    M: 'Meeting',
    P: 'Presentation',
    Q: 'Quotation',
    S: 'Proposal',
    C: 'Closed',
    R: 'Reject',
  };

  const leadTypeMap = {
    M: 'Motor',
    G: 'Non-Motor',
  };
  const {item} = route.params;
  const {
    data: leadData,
    isLoading,
    error,
  } = useGetLeadByIdQuery(item?.leadId, {
    skip: !item?.leadId, // Prevent query if leadId is not available
  });

  const leadInfo = leadData?.data;

  const DetailLine = ({Title, detail}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 3,
        }}>
        <View
          style={{
            flex: 0.35,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.detailText}>{Title}</Text>
          <Text style={styles.detailText}>:</Text>
        </View>

        <View style={{flex: 0.6}}>
          <Text style={styles.detailText}>{detail}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={Styles.container}>
      <HeaderBackground />

      <Header
        Title={item?.type + ' Details'}
        onPress={() => navigation.goBack()}
        haveFilters={false}
        haveMenu={false}
        onButton={() => setModalVisible(true)}
      />

      <ScrollView
        contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 20}}>
        <View style={styles.card}>
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: Fonts.Roboto.Bold,
              fontSize: 14,
              marginBottom: 5,
            }}>
            {item?.type} Information
          </Text>
          {item?.type == 'Activity' && (
            <View>
              <DetailLine Title={'Activity ID'} detail={item?.activityId} />
              <DetailLine
                Title={'Activity Type'}
                detail={activityTypeMap[item?.activityType] || 'Unknown'}
              />
              <DetailLine Title={'Description'} detail={item?.description} />
              <DetailLine Title={'Meeting With'} detail={item?.meetingWith} />
            </View>
          )}
          {item?.type == 'Event' ? (
            <View>
              <DetailLine Title={'Event ID'} detail={item?.eventId} />
              <DetailLine Title={'Description'} detail={item?.eventDesc} />

              <DetailLine
                Title={'Event Date'}
                detail={
                  item?.eventDate
                    ? moment(item.eventDate).format('YYYY/MM/DD')
                    : ''
                }
              />
            </View>
          ) : (
            <View>
              <DetailLine
                Title="Activity Date"
                detail={
                  item?.activityDate
                    ? moment(item.activityDate).format('YYYY/MM/DD')
                    : ''
                }
              />
            </View>
          )}
        </View>
        {isLoading ? (
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              height: window.height * 0.2,
              justifyContent: 'center',
            }}>
            <LoaderKit
              style={{width: 35, height: 35}}
              name={'BallPulse'} // Optional: see list of animations below
              color={COLORS.grayText} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
            />
          </View>
        ) : (
          <View>
            {leadInfo && (
              <View style={styles.card}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontFamily: Fonts.Roboto.Bold,
                    fontSize: 14,
                    marginBottom: 5,
                  }}>
                  Lead Information
                </Text>
                <DetailLine
                  Title={'Lead Type'}
                  detail={leadTypeMap[leadInfo?.leadType] || 'Unknown'}
                />
                <DetailLine Title={'Name'} detail={leadInfo?.customerName} />
                <DetailLine Title={'Contact'} detail={leadInfo?.mobileNumber} />
                <DetailLine
                  Title={'Email'}
                  detail={leadInfo?.email || 'Unavailable'}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <View
        style={{
          marginHorizontal: window.width * 0.07,
          marginVertical: 15,
          position: 'absolute',
          width: '70%',
          alignSelf: 'center',
          bottom: 20,
        }}>
        <SmallButton
          onPress={() => navigation.goBack()}
          disabledButton={false}
          Title={'Close'}
        />
      </View>
    </View>
  );
}

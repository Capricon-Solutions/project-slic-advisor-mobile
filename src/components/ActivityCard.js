import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Checkbox} from 'react-native-paper';
import COLORS from '../theme/colors';
import Fonts from '../theme/Fonts';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from '../pages/Agent/BPlanner/styles';
import SmallButton from './SmallButton';
import moment from 'moment';

const ActivityCard = ({activity, index, handleCheckboxToggle, onPress}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)}
      style={styles.cardWrap}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: Fonts.Roboto.Bold,
              fontSize: 14,
            }}>
            {activity?.type} {activity?.activityId || activity?.eventId}
          </Text>
          <Text
            style={{
              color: COLORS.textColor,
              fontFamily: Fonts.Roboto.Bold,
              fontSize: 16,
              marginTop: 3,
            }}>
            Status: {activity?.description || activity?.eventDesc}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => handleCheckboxToggle(index)}>
            <View style={{transform: [{scale: 1.2}]}}>
              <Checkbox
                uncheckedColor={COLORS.warmGray}
                color={COLORS.primary}
                status={activity?.checked ? 'checked' : 'unchecked'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 7,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Feather name="calendar" color={COLORS.grayText} size={16} />
          <Text
            style={{
              color: COLORS.textColor,
              fontFamily: Fonts.Roboto.Medium,
              fontSize: 13,
              marginLeft: 5,
            }}>
            {/* {activity?.activityDate} */}
            {moment(activity.activityDate).format('YYYY-MM-DD') ||
              moment(activity.eventDate).format('YYYY-MM-DD')}
          </Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Feather name="clock" color={COLORS.grayText} size={16} />
          <Text
            style={{
              color: COLORS.textColor,
              fontFamily: Fonts.Roboto.Medium,
              fontSize: 13,
              marginLeft: 5,
            }}>
            {moment(activity.time).format('hh:mm A')}
          </Text>
        </View>
      </View>
      {expanded && (
        <View style={{marginTop: 10}}>
          <SmallButton Title={'View'} onPress={onPress} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ActivityCard;

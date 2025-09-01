import React, {useCallback} from 'react';
import {View, Platform, StatusBar, Dimensions} from 'react-native';
import {
  useFocusEffect,
  useLinkBuilder,
  useTheme,
} from '@react-navigation/native';
import {Text, PlatformPressable} from '@react-navigation/elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Dashboard from '../Dashboard/Dashboard';
import Contacts from '../Contacts/Contacts';
import TrainingList from '../TrainingList/TrainingList';
import Badvisor from '../Badvisor/Badvisor';
import COLORS from '../../../theme/colors';
import {Styles} from './Styles';
import TrainingCalender from '../TrainingCalender/TrainingCalender';
import {useDispatch, useSelector} from 'react-redux';
import Report from '../../RegionalManager/Report/Report';
import ReportSwitch from '../../RegionalManager/Report/ReportSwitch';
import {Getpath} from '../../../redux/services/NavControllerSlice';
import {useWindowDimensions} from 'react-native';

const window = Dimensions.get('window');

function AgengNavigator({state, descriptors, navigation}) {
  const {colors} = useTheme();
  const {buildHref} = useLinkBuilder();
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.card,
        borderTopWidth: 1,
        borderColor: colors.border,
      
        //  paddingBottom: Platform.OS === 'ios' ? 10 : 0,
      }}>
      <StatusBar
        backgroundColor={COLORS.TopBackColor}
        
        // barStyle="dark-content"
      />

      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const Icon = options.tabBarIcon; // Fetch the icon

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            android_ripple={{color: 'transparent'}} // Removes ripple effect on Android
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              Styles.platformStyle,
              {display: isLandscape ? 'none' : 'flex'},
            ]}>
            {Icon && (
              <Icon
                color={isFocused ? COLORS.primary : COLORS.iconDisabled}
                size={22}
              />
            )}
            <Text
              style={{
                color: isFocused ? COLORS.primary : COLORS.iconDisabled,
                fontSize: 10,
                marginTop: 5,
              }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const usertype = useSelector(state => state.userType.userType);
  if (usertype == 1) {
    return (
      <Tab.Navigator
        tabBar={props => <AgengNavigator {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="view-dashboard-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Training Calender"
          component={TrainingCalender}
          options={{
            tabBarLabel: 'Training Calender',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="calendar-clock"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Contacts"
          component={Contacts}
          options={{
            tabBarLabel: 'Contacts',
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="address-book-o" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="B-Advisor"
          component={Badvisor}
          options={{
            tabBarLabel: 'B-Advisor',
            tabBarIcon: ({color, size}) => (
              <AntDesign name="earth" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  } else if (usertype == 2) {
    return (
      <Tab.Navigator
        tabBar={props => <AgengNavigator {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="view-dashboard-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Training Calender"
          component={TrainingCalender}
          options={{
            tabBarLabel: 'Training Calender',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="calendar-clock"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Contacts"
          component={Contacts}
          options={{
            tabBarLabel: 'Contacts',
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="address-book-o" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="B-Advisor"
          component={Badvisor}
          options={{
            tabBarLabel: 'B-Advisor',
            tabBarIcon: ({color, size}) => (
              <AntDesign name="earth" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  } else if (usertype == 3) {
    return (
      <Tab.Navigator
        tabBar={props => <AgengNavigator {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="view-dashboard-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Training Calender"
          component={TrainingCalender}
          options={{
            tabBarLabel: 'Training Calender',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="calendar-clock"
                color={color}
                size={size}
              />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Report"
          component={Report}
          options={{
            tabBarLabel: 'Report',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="file-document-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name="B-Advisor"
          component={Badvisor}
          options={{
            tabBarLabel: 'B-Advisor',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="earth" color={color} size={size} />
            ),

          }}
        /> */}
      </Tab.Navigator>
    );
  } else if (usertype == 4) {
    return (
      <Tab.Navigator
        tabBar={props => <AgengNavigator {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="view-dashboard-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Training Calender"
          component={TrainingCalender}
          options={{
            tabBarLabel: 'Training Calender',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="calendar-clock"
                color={color}
                size={size}
              />
            ),
          }}
        /> */}
        <Tab.Screen
          name="ReportSwitch"
          component={ReportSwitch}
          options={{
            tabBarLabel: 'Report',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="file-document-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name="B-Advisor"
          component={Badvisor}
          options={{
            tabBarLabel: 'B-Advisor',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="earth" color={color} size={size} />
            ),
          }}
        /> */}
      </Tab.Navigator>
    );
  } else if (usertype == 5) {
    return (
      <Tab.Navigator
        tabBar={props => <AgengNavigator {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="view-dashboard-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Training Calender"
          component={TrainingCalender}
          options={{
            tabBarLabel: 'Training Calender',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="calendar-clock"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Contacts"
          component={Contacts}
          options={{
            tabBarLabel: 'Contacts',
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="address-book-o" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="B-Advisor"
          component={Badvisor}
          options={{
            tabBarLabel: 'B-Advisor',
            tabBarIcon: ({color, size}) => (
              <AntDesign name="earth" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

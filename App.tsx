/**
 * Sample React Native App with Stack Navigator
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {StyleSheet, Text, View, useColorScheme, StatusBar} from 'react-native';
import LoginScreen from './src/pages/Auth/login';
import AgentNavigator from './src/pages/Agent/AgentNavigator/AgentNavigator';
import Profile from './src/pages/Profile/Profile';
import SalesMeter from './src/pages/Agent/SalesMeter/SalesMeter';
import Settings from './src/pages/Settings';
import GeneralPolicyList from './src/pages/Agent/GeneralPolicyList';
import PolicyDetails from './src/pages/Agent/PolicyDetails';
import ClaimHistory from './src/pages/Agent/ClaimHistory';
import PremiumHistory from './src/pages/Agent/PremiumHistory';
import DebitSettlement from './src/pages/Agent/DebitSettlement';
import ProductPortfolio from './src/pages/Agent/ProductPortfolio';
import ClubInformation from './src/pages/Agent/ClubInformation';
import {Provider, useSelector} from 'react-redux';
import {store} from './src/redux/services/store';
import PolicyRenewals from './src/pages/Agent/PolicyRenewals';
import TrainingList from './src/pages/Agent/TrainingList/TrainingList';
import IndividualStatistics from './src/pages/Agent/IndividualStatistics';
import PPWCancellation from './src/pages/Agent/PPWCancellation';
import Notification from './src/pages/Agent/Notification';
import PDFViewer from './src/pages/PDFViewer/PDFViewer';
import ProductDetails from './src/pages/Agent/ProductDetails';
import MyselfPerformance from './src/pages/Agent/MyselfPerformance';
import TypeTest from './src/pages/Auth/TypeTest';
import BPlanner from './src/pages/Agent/BPlanner';
import LeadSearch from './src/pages/Agent/BPlanner/LeadSearch';
import LeadCreation from './src/pages/Agent/BPlanner/LeadCreation';
import MonthlyPlan from './src/pages/Agent/BPlanner/MonthlyPlan';
import ActivityDetails from './src/pages/Agent/ActivityDetails';
import COLORS from './src/theme/colors';
import TeamStatistics from './src/pages/TeamLeader/TeamStatistics';
import TeamPerformance from './src/pages/TeamLeader/TeamPerformance';
import TeamMemberGrid from './src/pages/TeamLeader/TeamMemberGrid';
import ECorner from './src/pages/Agent/ECorner';
import Report from './src/pages/RegionalManager/Report/Report';
import KPISummary from './src/pages/RegionalManager/Report/KPISummary';
import DUESSummary from './src/pages/RegionalManager/Report/DUESSummary';
import ClassSummary from './src/pages/RegionalManager/Report/ClassSummary';
import RegionSummary from './src/pages/RegionalManager/Report/RegionSummary';
import BranchSummary from './src/pages/RegionalManager/Report/BranchSummary';
import Competition from './src/pages/RegionalManager/Report/Competition';
import LeadInformation from './src/pages/Agent/BPlanner/LeadInformation';
import MotorRenewal from './src/pages/Agent/ECorner/MotorRenewal';
import EDocument from './src/pages/Agent/ECorner/EDocument';
import MotorRenewalLetter from './src/pages/Agent/ECorner/MotorRenewalLetter';
import CommissionStatement from './src/pages/Agent/ECorner/CommissionStatement';
import MotorRenewalCompact from './src/pages/Agent/ECorner/MotorRenewalCompact';
import NonMotorRenewalCompact from './src/pages/Agent/ECorner/NonMotorRenewalCompact';
import PendingClaims from './src/pages/Agent/PendingClaims';
import ClaimDetails from './src/pages/Agent/ClaimHistory/ClaimDetails';
import DebitSettlementRenewal from './src/pages/Agent/DebitSettlementRenewal';
import ReportSwitch from './src/pages/RegionalManager/Report/ReportSwitch';
import {ToastMessage} from './src/components/ToastMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdvisorReport from './src/pages/RegionalManager/Report/Report/AdvisorReport';
import DirectReport from './src/pages/RegionalManager/Report/Report/DirectReport';
import MeReport from './src/pages/RegionalManager/Report/Report/MeReport';
import TeamLeaderReport from './src/pages/RegionalManager/Report/Report/TeamLeaderReport';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedloggedIn = await AsyncStorage.getItem('loggedIn');
        if (storedloggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        console.log('Stored Username:', storedloggedIn);
      } catch (error) {
        console.error('Error retrieving username:', error);
      }
    };

    fetchUsername();
  }, []);

  // const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  // **Auth Stack (Contains Only Login)**
  const AuthStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );

  // **App Stack (Contains All Screens)**

  const AppStack = () => (
    <Stack.Navigator
      initialRouteName="TypeTest"
      screenOptions={{
        orientation: 'portrait',
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="TypeTest" component={TypeTest} />

      <Stack.Screen name="AgentNavigator" component={AgentNavigator} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="SalesMeter" component={SalesMeter} />
      <Stack.Screen name="GeneralPolicyList" component={GeneralPolicyList} />
      <Stack.Screen name="PolicyDetails" component={PolicyDetails} />
      <Stack.Screen name="ClaimHistory" component={ClaimHistory} />
      <Stack.Screen name="PremiumHistory" component={PremiumHistory} />
      <Stack.Screen name="DebitSettlement" component={DebitSettlement} />
      <Stack.Screen name="ProductPortfolio" component={ProductPortfolio} />
      <Stack.Screen name="ClubInformation" component={ClubInformation} />
      <Stack.Screen name="PolicyRenewals" component={PolicyRenewals} />
      <Stack.Screen name="TrainingList" component={TrainingList} />
      <Stack.Screen
        options={{orientation: 'landscape'}}
        name="IndividualStatistics"
        component={IndividualStatistics}
      />
      <Stack.Screen name="PPWCancellation" component={PPWCancellation} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="PDFViewer" component={PDFViewer} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen
        options={{orientation: 'landscape'}}
        name="MyselfPerformance"
        component={MyselfPerformance}
      />
      <Stack.Screen
        options={{orientation: 'landscape'}}
        name="TeamStatistics"
        component={TeamStatistics}
      />
      <Stack.Screen
        options={{orientation: 'landscape'}}
        name="TeamPerformance"
        component={TeamPerformance}
      />
      <Stack.Screen name="TeamMemberGrid" component={TeamMemberGrid} />
      <Stack.Screen name="BPlanner" component={BPlanner} />
      <Stack.Screen name="LeadSearch" component={LeadSearch} />
      <Stack.Screen name="LeadCreation" component={LeadCreation} />
      <Stack.Screen name="MonthlyPlan" component={MonthlyPlan} />
      <Stack.Screen name="ActivityDetails" component={ActivityDetails} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="ECorner" component={ECorner} />
      <Stack.Screen name="KPISummary" component={KPISummary} />
      <Stack.Screen name="DUESSummary" component={DUESSummary} />
      <Stack.Screen name="ClassSummary" component={ClassSummary} />
      <Stack.Screen name="RegionSummary" component={RegionSummary} />
      <Stack.Screen name="BranchSummary" component={BranchSummary} />
      <Stack.Screen name="Competition" component={Competition} />
      <Stack.Screen name="LeadInformation" component={LeadInformation} />
      <Stack.Screen name="MotorRenewal" component={MotorRenewal} />
      <Stack.Screen name="EDocument" component={EDocument} />
      <Stack.Screen name="MotorRenewalLetter" component={MotorRenewalLetter} />
      <Stack.Screen name="AdvisorReport" component={AdvisorReport} />
      <Stack.Screen name="DirectReport" component={DirectReport} />
      <Stack.Screen name="MeReport" component={MeReport} />
      <Stack.Screen name="TeamLeaderReport" component={TeamLeaderReport} />
      <Stack.Screen
        name="CommissionStatement"
        component={CommissionStatement}
      />
      <Stack.Screen
        name="MotorRenewalCompact"
        component={MotorRenewalCompact}
      />
      <Stack.Screen
        name="NonMotorRenewalCompact"
        component={NonMotorRenewalCompact}
      />
      <Stack.Screen name="PendingClaims" component={PendingClaims} />
      <Stack.Screen name="ClaimDetails" component={ClaimDetails} />
      <Stack.Screen
        name="DebitSettlementRenewal"
        component={DebitSettlementRenewal}
      />
      <Stack.Screen name="ReportSwitch" component={ReportSwitch} />
    </Stack.Navigator>
  );

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* Conditionally Render AuthStack or AppStack */}
          {/* {isLoggedIn ? ( */}
          <Stack.Screen name="AppStack" component={AppStack} />
          {/* ) : ( */}
          {/* <Stack.Screen name="AuthStack" component={AuthStack} /> */}
          {/* )} */}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}

export default App;

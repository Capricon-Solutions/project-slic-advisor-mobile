/**
 * Sample React Native App with Stack Navigator
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {View} from 'react-native';
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
import {Provider} from 'react-redux';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdvisorReport from './src/pages/RegionalManager/Report/Report/AdvisorReport';
import DirectReport from './src/pages/RegionalManager/Report/Report/DirectReport';
import MeReport from './src/pages/RegionalManager/Report/Report/MeReport';
import TeamLeaderReport from './src/pages/RegionalManager/Report/Report/TeamLeaderReport';
import {navigationRef} from './src/navigation/RootNavigation';

const Stack = createNativeStackNavigator();
// @ts-ignore
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
      } catch (error) {
        console.error('Error retrieving username:', error);
      }
    };

    fetchUsername();
  }, []);

  // **Auth Stack (Contains Only Login)**

  const AuthStack = () => (
    // @ts-ignore
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{
          gestureEnabled: true, // Disable swipe back
          orientation: 'portrait',
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="NavigateToAppStack"
        options={{headerShown: false, orientation: 'portrait'}}
        component={AppStack}
      />
    </Stack.Navigator>
  );

  // **App Stack (Contains All Screens)**

  const AppStack = () => (
    // @ts-ignore
    <Stack.Navigator
      initialRouteName="AgentNavigator"
      screenOptions={{
        orientation: 'portrait',
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="NavigateToAuthStack"
        options={{headerShown: false, orientation: 'portrait'}}
        component={AuthStack}
      />

      <Stack.Screen name="TypeTest" component={TypeTest} />
      <Stack.Screen
        name="AgentNavigator"
        component={AgentNavigator}
        options={{
          gestureEnabled: false, // Disable swipe back
          orientation: 'all',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="SalesMeter"
        component={SalesMeter}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="GeneralPolicyList"
        component={GeneralPolicyList}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="PolicyDetails"
        component={PolicyDetails}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="ClaimHistory"
        component={ClaimHistory}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="PremiumHistory"
        component={PremiumHistory}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="DebitSettlement"
        component={DebitSettlement}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="ProductPortfolio"
        component={ProductPortfolio}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="ClubInformation"
        component={ClubInformation}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="PolicyRenewals"
        component={PolicyRenewals}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="TrainingList"
        component={TrainingList}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        options={{orientation: 'landscape'}}
        name="IndividualStatistics"
        component={IndividualStatistics}
      />
      <Stack.Screen
        name="PPWCancellation"
        component={PPWCancellation}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="PDFViewer"
        component={PDFViewer}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{orientation: 'portrait'}}
      />
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
      <Stack.Screen
        name="TeamMemberGrid"
        component={TeamMemberGrid}
        options={{orientation: 'all'}}
      />
      <Stack.Screen
        name="BPlanner"
        component={BPlanner}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="LeadSearch"
        component={LeadSearch}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="LeadCreation"
        component={LeadCreation}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="MonthlyPlan"
        component={MonthlyPlan}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="ActivityDetails"
        component={ActivityDetails}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="Report"
        component={Report}
        options={{orientation: 'all'}}
      />
      <Stack.Screen
        name="ECorner"
        component={ECorner}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="KPISummary"
        component={KPISummary}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="DUESSummary"
        component={DUESSummary}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="ClassSummary"
        component={ClassSummary}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="RegionSummary"
        component={RegionSummary}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="BranchSummary"
        component={BranchSummary}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="Competition"
        component={Competition}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="LeadInformation"
        component={LeadInformation}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="MotorRenewal"
        component={MotorRenewal}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="EDocument"
        component={EDocument}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="MotorRenewalLetter"
        component={MotorRenewalLetter}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="AdvisorReport"
        // options={{orientation: 'landscape'}}
        component={AdvisorReport}
        options={{orientation: 'all'}}
      />
      <Stack.Screen
        name="DirectReport"
        component={DirectReport}
        options={{orientation: 'all'}}
      />
      <Stack.Screen
        name="MeReport"
        component={MeReport}
        options={{orientation: 'all'}}
      />
      <Stack.Screen
        name="TeamLeaderReport"
        component={TeamLeaderReport}
        options={{orientation: 'all'}}
      />
      <Stack.Screen
        name="CommissionStatement"
        component={CommissionStatement}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="MotorRenewalCompact"
        component={MotorRenewalCompact}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="NonMotorRenewalCompact"
        component={NonMotorRenewalCompact}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="PendingClaims"
        component={PendingClaims}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="ClaimDetails"
        component={ClaimDetails}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="DebitSettlementRenewal"
        component={DebitSettlementRenewal}
        options={{orientation: 'portrait'}}
      />
      <Stack.Screen
        name="ReportSwitch"
        component={ReportSwitch}
        options={{orientation: 'portrait'}}
      />
    </Stack.Navigator>
  );
  // @ts-ignore
  function SafeAreaViewWithInsets() {
    const insets = useSafeAreaInsets();
    // @ts-ignore
    return (
      <View style={{flex: 1}}>
        {/* <HeaderBackground Title={undefined} /> */}

        <SafeAreaView
          edges={['top', 'left']}
          style={{
            flex: 1,

            backgroundColor: COLORS.TopBackColor,
          }}>
          <Provider store={store}>
            <NavigationContainer ref={navigationRef}>
              {/* @ts-ignore */}
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="AuthStack" component={AuthStack} />
              </Stack.Navigator>
            </NavigationContainer>
            <Toast visibilityTime={2000} />
          </Provider>
        </SafeAreaView>
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <View style={{flex: 1}}>
        <SafeAreaViewWithInsets />
      </View>
    </SafeAreaProvider>
  );
}

export default App;

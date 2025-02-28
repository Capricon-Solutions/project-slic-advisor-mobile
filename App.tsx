/**
 * Sample React Native App with Stack Navigator
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen'

import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  StatusBar
} from 'react-native';
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
import { Provider } from 'react-redux';
import { store } from './src/redux/services/store';
import PolicyRenewals from './src/pages/Agent/PolicyRenewals';
import TrainingList from './src/pages/Agent/TrainingList/TrainingList';
import IndividualStatistics from './src/pages/Agent/IndividualStatistics';
import PPWCancellation from './src/pages/Agent/PPWCancellation';
import Notification from './src/pages/Agent/Notification';
import PDFViewer from './src/pages/PDFViewer/PDFViewer';
import ProductDetails from './src/pages/Agent/ProductDetails';
import MyselfPerformance from './src/pages/Agent/MyselfPerformance';
import TeamStatistics from './src/pages/Agent/TeamStatistics';
import TeamPerformance from './src/pages/Agent/TeamPerformance';
import TeamMemberGrid from './src/pages/Agent/TeamMemberGrid';
import TypeTest from './src/pages/Auth/TypeTest';
import BPlanner from './src/pages/Agent/BPlanner';
import LeadSearch from './src/pages/Agent/BPlanner/LeadSearch';
import LeadCreation from './src/pages/Agent/BPlanner/LeadCreation';
import MonthlyPlan from './src/pages/Agent/BPlanner/MonthlyPlan';
import ActivityDetails from './src/pages/Agent/ActivityDetails';
import Report from './src/pages/Agent/Report';
import COLORS from './src/theme/colors';

// Sample Home Screen
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
    </View>
  );
};

// Sample Details Screen
const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
    </View>
  );
};

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  useEffect(() => {
    SplashScreen.hide();
  }, []);


  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333333' : '#ffffff',
  };

  return (
    <Provider store={store}>
      
    <NavigationContainer>
    <StatusBar backgroundColor={COLORS.TopBackColor} barStyle="dark-content" />
      
      <Stack.Navigator initialRouteName="Login" screenOptions={{orientation:'portrait', headerShown: false, animation: "slide_from_right" }}>
        {/* Define your screens here */}
        <Stack.Screen name="Login" component={LoginScreen} />
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
        <Stack.Screen  name="TrainingList" component={TrainingList} />
        <Stack.Screen options={{orientation:'landscape'}}  name="IndividualStatistics" component={IndividualStatistics} />
        <Stack.Screen  name="PPWCancellation" component={PPWCancellation} />
        <Stack.Screen  name="Notification" component={Notification} />
        <Stack.Screen  name="PDFViewer" component={PDFViewer} />
        <Stack.Screen  name="ProductDetails" component={ProductDetails} />
        <Stack.Screen  options={{orientation:'landscape'}} name="MyselfPerformance" component={MyselfPerformance} />
        <Stack.Screen  options={{orientation:'landscape'}} name="TeamStatistics" component={TeamStatistics} />
        <Stack.Screen  options={{orientation:'landscape'}} name="TeamPerformance" component={TeamPerformance} />
        <Stack.Screen   name="TeamMemberGrid" component={TeamMemberGrid} />
        <Stack.Screen   name="TypeTest" component={TypeTest} />
        <Stack.Screen   name="BPlanner" component={BPlanner} />
        <Stack.Screen   name="LeadSearch" component={LeadSearch} />
        <Stack.Screen   name="LeadCreation" component={LeadCreation} />
        <Stack.Screen   name="MonthlyPlan" component={MonthlyPlan} />
        <Stack.Screen   name="ActivityDetails" component={ActivityDetails} />
        <Stack.Screen   name="Report" component={Report} />
        
        {/* <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;

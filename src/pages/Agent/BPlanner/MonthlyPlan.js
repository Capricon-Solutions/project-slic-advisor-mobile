import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
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
import moment from 'moment';
import {
  useGetMonthlyPlanQuery,
  useMonthlyCreationMutation,
} from '../../../redux/services/plannerSlice';
import {useSelector} from 'react-redux';

export default function MonthlyPlan({navigation}) {
  const userCode = useSelector(state => state.Profile.userCode);
  const [currentStep, setCurrentStep] = useState(1);
  const [MonthlyCreate, {data: newActivity, isLoading, error}] =
    useMonthlyCreationMutation();
  const [meetings, setmeetings] = useState('');
  const [presentations, setPresentations] = useState('');
  const [quotations, setQuotations] = useState('');
  const [proposals, setProposals] = useState('');
  const [closed, setClosed] = useState('');
  const [leads, setLeads] = useState('');

  const {
    data: planData,
    isLoading: loadingPlan,
    error: planError,
  } = useGetMonthlyPlanQuery(userCode);

  useEffect(() => {
    if (planData?.data) {
      const data = planData?.data;
      setmeetings(data?.noOfMeetings);
      setPresentations(data?.noOfPresents);
      setQuotations(data?.noOfQuots);
      setProposals(data?.noOfProposals);
      setClosed(data?.noOfClosed);
      setLeads(data?.noOfLeads);
    }
  }, [planData]);

  const body = {
    noOfMeetings: meetings,
    noOfPresents: presentations,
    noOfQuots: quotations,
    noOfProposals: proposals,
    noOfClosed: closed,
    noOfLeads: leads,
    monthDate: moment().format('YYYY/MM'),
  };
  console.log('planData', planData);
  const validateForm = () => {
    if (
      !meetings ||
      !presentations ||
      !quotations ||
      !proposals ||
      !closed ||
      !leads
    ) {
      Alert.alert('All fields are required!');
      return false;
    }
    return true;
  };

  const handleActivityCreate = async () => {
    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await MonthlyCreate({body, userCode});
      console.log('Activity Created:', response?.error?.status);
      if (response?.error?.status == '500') {
        console.log('something went wrong');
        Alert.alert('something went wrong', 'Unsuccessfull');
      } else {
        navigation.goBack();
      }
    } catch (err) {
      console.error('Error creating activity:', err);
    }
  };

  const StepperItems = [
    {id: 1, Title: 'Policy Info'},
    {id: 2, Title: 'Vehicle Info'},
    {id: 3, Title: 'Customer Basic Info'},
    {id: 4, Title: 'Customer Contact Info'},
  ];

  const handleNext = () => {
    if (currentStep < StepperItems.length) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      navigation.navigate('BPlanner');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  return (
    <View style={Styles.container}>
      <HeaderBackground />
      <Header Title="Monthly Plan" onPress={() => navigation.goBack()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={20}
        contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 10}}
        style={{}}>
        <Text
          style={{
            marginVertical: 10,
            fontFamily: Fonts.Roboto.Bold,
            color: COLORS.textColor,
            fontSize: 15,
          }}>
          {`Monthly Plan for ${moment().format('YYYY/MM')}`}
        </Text>
        <View>
          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Meetings'}
            Title={'000000'}
            keyboardType={'number-pad'}
            setValue={text => setmeetings(text)}
            borderColor={COLORS.warmGray}
          />
          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Presentation'}
            Title={'000000'}
            keyboardType={'number-pad'}
            setValue={text => setPresentations(text)}
            borderColor={COLORS.warmGray}
          />
          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Quotations'}
            Title={'000000'}
            keyboardType={'number-pad'}
            setValue={text => setQuotations(text)}
            borderColor={COLORS.warmGray}
          />

          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Proposals'}
            Title={'000000'}
            keyboardType={'number-pad'}
            setValue={text => setProposals(text)}
            borderColor={COLORS.warmGray}
          />
          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Closed'}
            Title={'000000'}
            keyboardType={'number-pad'}
            setValue={text => setClosed(text)}
            borderColor={COLORS.warmGray}
          />
          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Leads'}
            Title={'000000'}
            keyboardType={'number-pad'}
            setValue={text => setLeads(text)}
            borderColor={COLORS.warmGray}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'flex-end',
            marginVertical: 5,
          }}>
          <AlertButtonWhite
            onPress={() => navigation.goBack()}
            Title={'Close'}
          />
          <AlertButton
            Title={'Submit'}
            onPress={() => {
              handleActivityCreate();
            }}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
      {/* Navigation Buttons */}
    </View>
  );
}

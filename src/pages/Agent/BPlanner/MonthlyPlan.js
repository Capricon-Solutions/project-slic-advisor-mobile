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
import Toast from 'react-native-toast-message';

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

  const [formError, setFormError] = useState({
    meetings: '',
    presentations: '',
    quotations: '',
    proposals: '',
    closed: '',
    leads: '',
  });

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
    noOfMeetings: meetings || 0,
    noOfPresents: presentations || 0,
    noOfQuots: quotations || 0,
    noOfProposals: proposals || 0,
    noOfClosed: closed || 0,
    noOfLeads: leads || 0,
    monthDate: moment().format('YYYY/MM'),
  };

  //   const body = {
  //     numberOfMeetings: meetings,
  //     numberOfPresents: presentations,
  //     numberOfQuotations: quotations,
  //     numberOfProposals: proposals,
  //     numberOfClosed: closed,
  //     numberOfLeads: leads,
  //     monthDate: moment().format('YYYY/MM'),
  //   };

  const validateForm = () => {
    const newErrors = {};

    if (!meetings || meetings === '') {
      setFormError({...formError, meetings: 'Meetings is required'});
      newErrors.meetings = 'Meetings is required';
    }
    if (!presentations || presentations === '') {
      setFormError({...formError, presentations: 'Presentations is required'});
      newErrors.presentations = 'Presentations is required';
    }
    if (!quotations || quotations === '') {
      setFormError({...formError, quotations: 'Quotations is required'});
      newErrors.quotations = 'Quotations is required';
    }
    if (!proposals || proposals === '') {
      setFormError({...formError, proposals: 'Proposals is required'});
      newErrors.proposals = 'Proposals is required';
    }
    if (!closed || closed === '') {
      setFormError({...formError, closed: 'Closed is required'});
      newErrors.closed = 'Closed is required';
    }
    if (!leads || leads === '') {
      setFormError({...formError, leads: 'Leads is required'});
      newErrors.leads = 'Leads is required';
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleActivityCreate = async () => {
    // if (!validateForm()) return; // Stop if validation fails

    // console.log('body');

    if (
      !meetings &&
      !presentations &&
      !quotations &&
      !proposals &&
      !closed &&
      !leads
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please enter any one field',
        text2: 'Please enter any one field',
      });
      return;
    }

    try {
      const response = await MonthlyCreate({body, userCode});
      console.log('Activity Created:', response);

      if (response?.error?.status == '500') {
        console.log('something went wrong', response?.error);
        Toast.show({
          type: 'error',
          text1: 'Monthly Plan Not Created',
          text2: response?.error?.data?.message || 'Something went wrong',
        });
        // Alert.alert('something went wrong', 'Unsuccessfull');
      } else {
        Toast.show({
          type: 'success',
          text1: 'Monthly Plan Created',
          text2: 'Monthly Plan Created Successfully',
        });
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
            Label={'Meetings *'}
            placeholder={'000000'}
            value={String(meetings || '')}
            keyboardType={'number-pad'}
            setValue={text => {
              let filteredText = text.replace(/[^0-9]/g, '');
              setmeetings(filteredText);
              setFormError({...formError, meetings: ''});
            }}
            borderColor={COLORS.warmGray}
            errorMessage={formError.meetings}
            errorBorder={formError.meetings !== ''}
          />
          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Presentation *'}
            placeholder={'000000'}
            value={String(presentations || '')}
            keyboardType={'number-pad'}
            setValue={text => {
              let filteredText = text.replace(/[^0-9]/g, '');
              setPresentations(filteredText);
              setFormError({...formError, presentations: ''});
            }}
            borderColor={COLORS.warmGray}
            errorMessage={formError.presentations}
            errorBorder={formError.presentations !== ''}
          />
          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Quotations *'}
            placeholder={'000000'}
            value={String(quotations || '')}
            keyboardType={'number-pad'}
            setValue={text => {
              let filteredText = text.replace(/[^0-9]/g, '');
              setQuotations(filteredText);
              setFormError({...formError, quotations: ''});
            }}
            borderColor={COLORS.warmGray}
            errorMessage={formError.quotations}
            errorBorder={formError.quotations !== ''}
          />

          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Proposals *'}
            placeholder={'000000'}
            value={String(proposals || '')}
            keyboardType={'number-pad'}
            setValue={text => {
              let filteredText = text.replace(/[^0-9]/g, '');
              setProposals(filteredText);
              setFormError({...formError, proposals: ''});
            }}
            borderColor={COLORS.warmGray}
            errorMessage={formError.proposals}
            errorBorder={formError.proposals !== ''}
          />
          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Closed *'}
            placeholder={'000000'}
            value={String(closed || '')}
            keyboardType={'number-pad'}
            setValue={text => {
              let filteredText = text.replace(/[^0-9]/g, '');
              setClosed(filteredText);
              setFormError({...formError, closed: ''});
            }}
            borderColor={COLORS.warmGray}
            errorMessage={formError.closed}
            errorBorder={formError.closed !== ''}
          />
          <SquareTextBoxOutlined
            mediumFont={true}
            Label={'Leads *'}
            placeholder={'000000'}
            value={String(leads || '')}
            keyboardType={'number-pad'}
            setValue={text => {
              let filteredText = text.replace(/[^0-9]/g, '');
              setLeads(filteredText);
              setFormError({...formError, leads: ''});
            }}
            borderColor={COLORS.warmGray}
            errorMessage={formError.leads}
            errorBorder={formError.leads !== ''}
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

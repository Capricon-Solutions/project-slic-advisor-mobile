import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useFocusEffect } from '@react-navigation/native';
import COLORS from '../../../theme/colors';
import Fonts from '../../../theme/Fonts';
import { Styles } from '../../../theme/Styles';
import Header from '../../../components/Header';
import HeaderBackground from '../../../components/HeaderBackground';
import { Avatar } from 'react-native-paper';
import individualPerforamance from '../../../icons/individualPerforamance.png'; // Replace with the actual logo path
import policyRenewal from '../../../icons/policyRenewal.png'; // Replace with the actual logo path
import ppwIcon from '../../../icons/PPW.png'; // Replace with the actual logo path
import RNFS from 'react-native-fs';

import { styles } from './styles';
// import GeneralModal from '../../../components/GeneralModal';
import BottomModal from '../../../components/BottomModal';
import teamPerformance from '../../../icons/teamPerformance.png'; // Replace with the actual logo path
import Flag from '../../../components/Flag';
import { useDispatch, useSelector } from 'react-redux';
import AgentGrid from '../../../components/AgentGrid';
import RMGrid from '../../../components/RMGrid';
import LoaderKit from 'react-native-loader-kit';
import AgentProgressCard from '../../../components/AgentProgressCard';
import RMProgressCard from '../../../components/RMProgressCard';
import { Getpath } from '../../../redux/services/NavControllerSlice';
import { SetdefaultImageUrl } from '../../../redux/services/ProfileSlice';
import {
  useGetImageQuery,
  useLazyGetImageUrlQuery,
} from '../../../redux/services/profilePicSlice';
import {
  useGetCurrentMonthRankQuery,
  useGetRMSummeryQuery,
} from '../../../redux/services/SalesMeterApiSlice';
import { API_KEY } from '@env';

const window = Dimensions.get('window');

export default function Dashboard({ navigation }) {
  const AgentCode = useSelector(state => state.userType.userType);
  const userCode = useSelector(state => state.Profile.userCode);
  const dispatch = useDispatch();
  const value = 40; // 40% of the gauge. min=0 max=100
  const [modalVisible, setModalVisible] = useState(false);
  const [generaModalVisible, setgeneraModalVisible] = useState(false);
  const [salesModalVisible, setsalesModalVisible] = useState(false);
  const [flagVisible, setFlagVisible] = useState(false);

  const path = useSelector(state => state.NavController.path);
  const usertype = useSelector(state => state.userType.userType);
  const personalCode = useSelector(state => state.Profile.personalCode);
  const token = useSelector(state => state.Profile.token);

  const profile = useSelector(state => state.Profile.profile);
  const profileResponse = profile?.user;

  useFocusEffect(
    useCallback(() => {
      if (path == 1) {
        setgeneraModalVisible(true);
      } else {
        setgeneraModalVisible(false);
      }
    }, [path]),
  );

  const {
    data: CurrentMonthRank,
    error: achiveError,
    isLoading: achiveLoading,
    isFetching: achiveFetch,
  } = useGetCurrentMonthRankQuery({
    id: usertype == 2 ? personalCode : userCode,
  });
  const regionName = profileResponse?.region;
  const {
    data: RMSummeryData,
    error: RMSummeryError,
    isLoading: RMSummeryLoading,
    isFetching: RMSummeryFetching,
  } = useGetRMSummeryQuery({
    month: new Date().getMonth() + 1,
    region: regionName,
  });

  // API Binds
  const name = profileResponse?.firstName;

  const designation = profileResponse?.designation;
  const imageUrl = profileResponse?.imageUrl;
  const totalIslandRank = CurrentMonthRank?.data?.islandTotal;
  const islandRank = CurrentMonthRank?.data?.islandRank;
  const regionalRank = CurrentMonthRank?.data?.regionalRank;
  const totalNumberofRegions = CurrentMonthRank?.data?.regionalTotal;
  const branchRank = CurrentMonthRank?.data?.branchRank;
  const totalNumberofBranches = CurrentMonthRank?.data?.branchTotal;

  const {
    data: ProfilePic,
    error,
    isLoading,
  } = useGetImageQuery({
    id: userCode,
  });

  useEffect(() => {
    if (ProfilePic?.data?.urlPath) {
      fetchImage(ProfilePic?.data?.urlPath);
    }
  }, [ProfilePic?.data?.urlPath]);

  async function fetchImage(urlPath) {
    dispatch(SetdefaultImageUrl(null));
    if (!ProfilePic?.data?.urlPath) return;
    const url = `https://gisalesappapi.slicgeneral.com${urlPath}`;
    const apiKey = API_KEY; // Replace with your actual API key

    try {
      const timestamp = Date.now(); // current time in ms
      const filePath = `${RNFS.CachesDirectoryPath}/profile_${timestamp}.png`;

      const response = await RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath,
        headers: { 'x-api-key': apiKey, Authorization: `Bearer ${token}` },
      }).promise;
      if (response.statusCode === 200) {
        dispatch(SetdefaultImageUrl(`file://${filePath}`));
      } else {
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  const GeneralModal = [
    {
      title: 'Policy Details',
      icon: individualPerforamance,
      onPress: () => {
        dispatch(Getpath(1));
        navigation.navigate('GeneralPolicyList');

        setgeneraModalVisible(false);
      },
    },
    {
      title: 'Policy Renewals',

      icon: policyRenewal,
      onPress: () => {
        dispatch(Getpath(1));
        navigation.navigate('PolicyRenewals');
        setgeneraModalVisible(false);
      },
    },
    {
      title: 'PPW Cancellation',
      icon: ppwIcon,
      onPress: () => {
        dispatch(Getpath(1));
        navigation.navigate('PPWCancellation');
        setgeneraModalVisible(false);
      },
    },
  ];
  const SalesModal = [
    {
      title: 'Individual Performance',
      icon: individualPerforamance,
      onPress: () => setModalVisible(true),
    },
  ];

  const IndividualPerformanceType =
    usertype === 1 || usertype === 5
      ? [
        {
          title: 'Individual Statistics',
          icon: individualPerforamance,
          onPress: () => {
            setsalesModalVisible(false);
            setModalVisible(false);
            navigation.navigate('IndividualStatistics');
          },
        },
      ]
      : [
        {
          title: 'My Self',
          icon: individualPerforamance,
          onPress: () => {
            setModalVisible(false);
            navigation.navigate('MyselfPerformance');
          },
        },
        {
          title: 'Team',
          expandable: true,
          subButtons: [
            {
              title: 'Team Statistics',
              onPress: () => {
                setModalVisible(false);
                navigation.navigate('TeamStatistics');
              },
            },
            {
              title: 'Current Performance',
              onPress: () => {
                setModalVisible(false);
                navigation.navigate('TeamPerformance');
              },
            },
          ],
          icon: policyRenewal,
          onPress: 'expand',
        },
        {
          title: 'Team Member',
          icon: policyRenewal,
          onPress: () => {
            setModalVisible(false);
            navigation.navigate('TeamMemberGrid');
          },
        },
      ];
  const defaultImageUrl = useSelector(state => state.Profile.defaultImageUrl);

  const getInitials = name => {
    return name
      ?.split(' ') // Split by space
      .map(word => word.charAt(0).toUpperCase()) // Get first letter and uppercase
      .join(''); // Join them together
  };
  return (
    <View
      style={[
        Styles.container,
        { paddingHorizontal: 0, marginTop: Platform.OS === 'ios' ? -10 : 0 },
      ]}>

      <BottomModal
        Name={'Individual Performance'}
        ButtonList={SalesModal}
        modalVisible={salesModalVisible}
        setModalVisible={setsalesModalVisible}
        closeAction={true}
      />

      <BottomModal
        Name={'General Insurance'}
        modalVisible={generaModalVisible}
        ButtonList={GeneralModal}
        setModalVisible={setgeneraModalVisible}
      />
      <Flag
        Name={'Flag this for quick access?'}
        modalVisible={flagVisible}
        setModalVisible={setFlagVisible}
      />
      <BottomModal
        Name={'Sales Performance'}
        modalVisible={modalVisible}
        ButtonList={IndividualPerformanceType}
        setModalVisible={setModalVisible}
      />

      <HeaderBackground />
      <ScrollView
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={20}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 10,
          paddingTop: 30,
        }}>
        <View style={[styles.mainWrap, { justifyContent: 'flex-start' }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            Title={'Sign In'}
            style={styles.profilePicture}>
            {defaultImageUrl ? (
              <Avatar.Image
                label="XD"
                size={window.width * 0.15}
                style={{ backgroundColor: 'transparent' }}
                source={{ uri: defaultImageUrl }}
              />
            ) : (
              <Avatar.Text
                label={getInitials(name)}
                size={window.width * 0.15}
                style={{ backgroundColor: COLORS.primary }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
              dispatch(Getpath(0));
            }}
            style={{ flex: 0.6, justifyContent: 'center', paddingLeft: 3 }}>
            <Text numberOfLines={1} style={styles.UserName}>
              {name}
            </Text>
            <Text style={styles.regionName}>Region Name - {regionName}</Text>
            <Text style={styles.position}>
              (
              {usertype == 1
                ? 'Advisor'
                : usertype == 2
                  ? 'Team Leader'
                  : usertype == 3
                    ? 'Regional Manager'
                    : usertype == 4
                      ? 'Branch Manager'
                      : usertype == 5
                        ? 'Marketing executive'
                        : 'Unknown'}
              )
            </Text>
          </TouchableOpacity>

          {[1, 2, 5].includes(usertype) && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notification');
                dispatch(Getpath(0));
              }}
              style={styles.notiIcon}>
              <MaterialCommunityIcons
                name="bell-outline"
                color={COLORS.iconDisabled}
                size={window.width * 0.075}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontFamily: Fonts.Roboto.ExtraBold,
              color: COLORS.black,
              fontSize: window.width * 0.043,
            }}>
            {usertype == 1
              ? 'Advisor Summary'
              : usertype == 2
                ? 'Team Leader Summary'
                : usertype == 3
                  ? `${regionName} Region Summary`
                  : usertype == 4
                    ? `${regionName} Branch Summary`
                    : usertype == 5
                      ? ' Marketing executive Summary'
                      : 'user type unknown'}
          </Text>
        </View>

        {usertype == 1 && (
          <AgentProgressCard
            totalIslandRank={totalIslandRank}
            totalNumberofRegions={totalNumberofRegions}
            totalNumberofBranches={totalNumberofBranches}
            regionalRank={regionalRank}
            loading={achiveLoading}
            branchRank={branchRank}
            islandRank={islandRank}
            onPress={() => {
              navigation.navigate('SalesMeter');
              dispatch(Getpath(0));
            }}
          />
        )}

        {usertype == 2 && (
          <AgentProgressCard
            totalIslandRank={totalIslandRank}
            totalNumberofRegions={totalNumberofRegions}
            totalNumberofBranches={totalNumberofBranches}
            regionalRank={regionalRank}
            loading={achiveLoading}
            branchRank={branchRank}
            islandRank={islandRank}
            onPress={() => {
              navigation.navigate('SalesMeter');
              dispatch(Getpath(0));
            }}
          />
        )}

        {usertype == 3 && (
          <RMProgressCard
            totalIslandRank={totalIslandRank}
            totalNumberofRegions={totalNumberofRegions}
            totalNumberofBranches={totalNumberofBranches}
            regionalRank={regionalRank}
            branchRank={branchRank}
            loading={RMSummeryLoading}
            islandRank={islandRank}
            Data={RMSummeryData?.data}
          />
        )}

        {usertype == 4 && (
          <RMProgressCard
            totalIslandRank={totalIslandRank}
            totalNumberofRegions={totalNumberofRegions}
            totalNumberofBranches={totalNumberofBranches}
            regionalRank={regionalRank}
            branchRank={branchRank}
            loading={RMSummeryLoading}
            islandRank={islandRank}
            Data={RMSummeryData?.data}
          />
        )}

        {usertype == 5 && (
          <AgentProgressCard
            totalIslandRank={totalIslandRank}
            totalNumberofRegions={totalNumberofRegions}
            totalNumberofBranches={totalNumberofBranches}
            regionalRank={regionalRank}
            branchRank={branchRank}
            loading={achiveLoading}
            islandRank={islandRank}
            onPress={() => {
              navigation.navigate('SalesMeter');
              dispatch(Getpath(0));
            }}
          />
        )}

        {usertype == 3 && (
          <Text
            style={{
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.textColor,
              fontSize: 15,
              marginVertical: 2,
            }}>
            Insurance Categories
          </Text>
        )}

        {usertype == 4 && (
          <Text
            style={{
              fontFamily: Fonts.Roboto.Bold,
              color: COLORS.textColor,
              fontSize: 15,
              marginVertical: 2,
            }}>
            Insurance Categories
          </Text>
        )}

        {usertype == 1 && (
          <AgentGrid
            onSalesClick={() => {
              setModalVisible(true);
              dispatch(Getpath(0));
            }}
            onGeneralClick={() => {
              setgeneraModalVisible(true);
            }}
            onClubClick={() => {
              navigation.navigate('ClubInformation');
              dispatch(Getpath(0));
            }}
            onBplannerClick={() => {
              navigation.navigate('BPlanner');
              dispatch(Getpath(0));
            }}
            onEConnerClick={() => {
              navigation.navigate('ECorner');
              dispatch(Getpath(0));
            }}
            onProductPortfolioClick={() => {
              navigation.navigate('ProductPortfolio');
              dispatch(Getpath(0));
            }}
          />
        )}

        {usertype == 2 && (
          <AgentGrid
            onSalesClick={() => {
              setModalVisible(true);
              dispatch(Getpath(0));
            }}
            onGeneralClick={() => {
              setgeneraModalVisible(true);
            }}
            onClubClick={() => {
              navigation.navigate('ClubInformation');
              dispatch(Getpath(0));
            }}
            onBplannerClick={() => {
              navigation.navigate('BPlanner');
              dispatch(Getpath(0));
            }}
            onEConnerClick={() => {
              navigation.navigate('ECorner');
              dispatch(Getpath(0));
            }}
            onProductPortfolioClick={() => {
              navigation.navigate('ProductPortfolio');
              dispatch(Getpath(0));
            }}
          />
        )}

        {usertype == 3 && (
          <RMGrid
            onRegionSummaryClick={() => navigation.navigate('RegionSummary')}
            onKPISummaryClick={() => navigation.navigate('KPISummary')}
            onDUESSummaryClick={() => navigation.navigate('DUESSummary')}
            onClassSummaryClick={() => navigation.navigate('ClassSummary')}
            onCompetitionClick={() => navigation.navigate('Competition')}
          />
        )}
        {usertype == 4 && (
          <RMGrid
            onRegionSummaryClick={() => navigation.navigate('RegionSummary')}
            onKPISummaryClick={() => navigation.navigate('KPISummary')}
            onDUESSummaryClick={() => navigation.navigate('DUESSummary')}
            onClassSummaryClick={() => navigation.navigate('ClassSummary')}
            onCompetitionClick={() => navigation.navigate('Competition')}
          />
        )}

        {usertype == 5 && (
          <AgentGrid
            onSalesClick={() => {
              setModalVisible(true);
              dispatch(Getpath(0));
            }}
            onGeneralClick={() => {
              setgeneraModalVisible(true);
            }}
            onClubClick={() => {
              navigation.navigate('ClubInformation');
              dispatch(Getpath(0));
            }}
            onBplannerClick={() => {
              navigation.navigate('BPlanner');
              dispatch(Getpath(0));
            }}
            onEConnerClick={() => {
              navigation.navigate('ECorner');
              dispatch(Getpath(0));
            }}
            onProductPortfolioClick={() => {
              navigation.navigate('ProductPortfolio');
              dispatch(Getpath(0));
            }}
          />
        )}
      </ScrollView>
    </View>
  );
}

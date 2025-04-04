import { baseApi } from './api';

export const trainingSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    // getEventsAndActivitiess: builder.query({
    //   query: ({ date }) => `planner/getEventsAndActivities/905717?date=${date}`,
    //   providesTags: ['Events'],
    // }),
    getTrainingList: builder.query({
      query: type => {
        console.log('Training Type:', type); // Log the type parameter
        return `training/getTrainingList/905717?trainType=${type}`;
      },
      providesTags: ['Trainings'],
    }),
    getTrainingListByDate: builder.query({
      query: ({ fromDate, toDate }) => {
        console.log('fromDate:', fromDate); // Log the fromDate
        console.log('toDate:', toDate); // Log the toDate
        return `training/getAgentTrainingsByDate/905717?fromDate=${fromDate}&toDate=${toDate}`;
      },
    }),

    approveTraining: builder.mutation({
      query: id => {
        const finalUrl = `training/approveTrainingByAgent/905717?trainId=${id}`;
        console.log('id:', id);
        console.log('Final URL:', finalUrl);
        // console.log('Final body:', body);

        return {
          url: finalUrl,
          method: 'PUT',

        };
      },
      invalidatesTags: ['Trainings'],
    }),

  }),
});

// Export hooks
export const {
  useGetEventsAndActivitiessQuery,
  useGetLeadsQuery,
  useActivityCreationMutation,
  useActivityDeleteMutation,
  useEventCreationMutation,
  useEventDeleteMutation,
  useGetLeadByIdQuery,
  useMonthlyCreationMutation,
  useLeadCreationMutation,
  useGetMonthlyPlanQuery,
  useGetLeadActivitiesQuery,
  useGetTrainingListQuery,
  useApproveTrainingMutation,
  useGetTrainingListByDateQuery
} = trainingSlice;

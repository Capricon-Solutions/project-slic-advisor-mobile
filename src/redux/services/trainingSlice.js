import {baseApi} from './api';

export const trainingSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getTrainingList: builder.query({
      query: ({type, userCode}) => {
        // console.log('Training Type:', type); // Log the type parameter
        return `training/getTrainingList/${userCode}?trainType=${type}`;
      },
      providesTags: ['Trainings'],
    }),
    getTrainingListByDate: builder.query({
      query: ({fromDate, toDate, userCode}) => {
        return `training/getAgentTrainingsByDate/${userCode}?fromDate=${fromDate}&toDate=${toDate}`;
      },
      providesTags: ['Trainings'],
    }),

    //approveTraining
    approveTraining: builder.mutation({
      query: ({id, userCode}) => {
        const finalUrl = `training/approveTrainingByAgent/${userCode}?trainId=${id}`;

        return {
          url: finalUrl,
          method: 'PUT',
        };
      },
      invalidatesTags: ['Trainings'],
    }),

    //NotAttending
    NotAttending: builder.mutation({
      query: body => {
        const finalUrl = `training/notAttendTrainingByAgent`;

        return {
          url: finalUrl,
          method: 'PUT',
          body: body,
        };
      },
      invalidatesTags: ['Trainings'],
    }),
  }),
});

// Export hooks
export const {
  useGetTrainingListQuery,
  useApproveTrainingMutation,
  useGetTrainingListByDateQuery,
  useNotAttendingMutation,
} = trainingSlice;

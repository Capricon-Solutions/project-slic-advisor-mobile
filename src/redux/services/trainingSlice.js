import { baseApi } from './api';

export const trainingSlice = baseApi.injectEndpoints({
  endpoints: builder => ({

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

    //approveTraining
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

    //NotAttending
    NotAttending: builder.mutation({
      query: body => {
        const finalUrl = `training/notAttendTrainingByAgent`;
        console.log('body:', body);
        console.log('Final URL:', finalUrl);
        // console.log('Final body:', body);
        return {
          url: finalUrl,
          method: 'PUT',
          body: body
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
  useNotAttendingMutation
} = trainingSlice;

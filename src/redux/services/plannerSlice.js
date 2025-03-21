import {baseApi} from './api';

export const plannerSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getEventsAndActivitiess: builder.query({
      query: ({date}) => `planner/getEventsAndActivities/905717?date=${date}`,
      providesTags: ['Events'],
    }),
    getLeads: builder.query({
      query: () => `planner/GetPlannerLeadList?agentCode=905717`,
    }),
    getLeadById: builder.query({
      query: id => `planner/GetPlannerLeadById?Id=${id}`,
    }),
    activityDelete: builder.mutation({
      query: id => {
        const finalUrl = `planner/removePlannerActivity/905717?activityId=${id}`;
        console.log('Final URL:', finalUrl);

        return {
          url: finalUrl,
          method: 'PUT',
        };
      },
      invalidatesTags: ['Events'],
    }),
    eventDelete: builder.mutation({
      query: id => {
        const finalUrl = `planner/removePlannerEvent/905717?eventId=${id}`;
        console.log('Final URL:', finalUrl);

        return {
          url: finalUrl,
          method: 'PUT',
        };
      },
      invalidatesTags: ['Events'],
    }),
    activityCreation: builder.mutation({
      query: body => {
        const finalUrl = `planner/addPlannerActivity/905717`;
        console.log('Final URL:', finalUrl);
        console.log('Final body:', body);

        return {
          url: finalUrl,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['Events'],
    }),
    leadCreation: builder.mutation({
      query: body => {
        const finalUrl = `planner/addPlannerLead`;
        console.log('Final URL:', finalUrl);
        console.log('Final body:', body);

        return {
          url: finalUrl,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['Events'],
    }),
    monthlyCreation: builder.mutation({
      query: body => {
        const finalUrl = `planner/addPlannerMonthly/905717`;
        console.log('Final URL:', finalUrl);
        console.log('Final body:', body);

        return {
          url: finalUrl,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['Events'],
    }),
    eventCreation: builder.mutation({
      query: body => {
        const finalUrl = `planner/AddPlannerEvent/905717`;
        console.log('Final URL:', finalUrl);
        console.log('Final body:', body);

        return {
          url: finalUrl,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['Events'],
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
} = plannerSlice;

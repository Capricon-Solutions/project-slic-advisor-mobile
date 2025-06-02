import {baseApi} from './api';

export const plannerSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getEventsAndActivitiess: builder.query({
      query: ({date, userCode}) =>
        `planner/getEventsAndActivities/${userCode}?date=${date}`,
      providesTags: ['Events'],
    }),
    getMonthlyPlan: builder.query({
      query: userCode => `planner/GetPlannerMonthly/${userCode}`,
    }),
    getLeads: builder.query({
      query: ({userCode}) => {
        console.log('User Code test in url', userCode); // Logs userCode to console whenever the query runs
        const url = `planner/GetPlannerLeadList?agentCode=${userCode}`;
        console.log('Final URL:', url); // Logs to console whenever the query runs
        return url;
      },
    }),
    getLeadById: builder.query({
      query: id => {
        const url = `planner/GetPlannerLeadById?Id=${id}`;
        console.log('Final URL:', url);
        return url;
      },
    }),
    getLeadActivities: builder.query({
      query: ({id, userCode}) =>
        `planner/GetLeadActivities?Id=${id}&agentCode=${userCode}`,
    }),
    activityDelete: builder.mutation({
      query: ({id, userCode}) => {
        const finalUrl = `planner/removePlannerActivity/${userCode}?activityId=${id}`;
        console.log('Final URL:', finalUrl);

        return {
          url: finalUrl,
          method: 'PUT',
        };
      },
      invalidatesTags: ['Events'],
    }),
    eventDelete: builder.mutation({
      query: ({id, userCode}) => {
        const finalUrl = `planner/removePlannerEvent/${userCode}?eventId=${id}`;
        console.log('Final URL:', finalUrl);

        return {
          url: finalUrl,
          method: 'PUT',
        };
      },
      invalidatesTags: ['Events'],
    }),
    activityCreation: builder.mutation({
      query: ({body, userCode}) => {
        const finalUrl = `planner/addPlannerActivity/${userCode}`;
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
      query: ({body, userCode}) => {
        const finalUrl = `planner/addPlannerMonthly/${userCode}`;
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
      query: ({body, userCode}) => {
        const finalUrl = `planner/AddPlannerEvent/${userCode}`;
        console.log('Final URL:', finalUrl);
        console.log('Final body:', body);
        console.log('userCode :', userCode);

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
  useGetMonthlyPlanQuery,
  useGetLeadActivitiesQuery,
} = plannerSlice;

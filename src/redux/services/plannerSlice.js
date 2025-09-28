import { baseApi } from './api';

export const plannerSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getEventsAndActivitiess: builder.query({
      query: ({ date, userCode }) => {
        const url = `planner/getEventsAndActivities/${userCode}?date=${date}`;

        return url;
      },
      providesTags: ['Events'],
    }),
    getMonthlyPlan: builder.query({
      query: userCode => `planner/GetPlannerMonthly/${userCode}`,
      providesTags: ['MonthlyPlan'],
    }),
    getLeads: builder.query({
      query: ({ userCode }) => {
        const url = `planner/GetPlannerLeadList?agentCode=${userCode}`;
        return url;
      },
      providesTags: ['Events'],
    }),
    getLeadById: builder.query({
      query: id => {
        const url = `planner/GetPlannerLeadById?Id=${id}`;
        return url;
      },
    }),
    getLeadActivities: builder.query({
      query: ({ id, userCode }) =>
        `planner/GetLeadActivities?Id=${id}&agentCode=${userCode}`,
    }),
    activityDelete: builder.mutation({
      query: ({ activityId, userCode }) => {
        const finalUrl = `planner/removePlannerActivity/${userCode}?activityId=${activityId}`;

        return {
          url: finalUrl,
          method: 'PUT',
        };
      },
      invalidatesTags: ['Events'],
    }),
    eventDelete: builder.mutation({
      query: ({ activityId, userCode }) => {
        const finalUrl = `planner/removePlannerEvent/${userCode}?eventId=${activityId}`;

        return {
          url: finalUrl,
          method: 'PUT',
        };
      },
      invalidatesTags: ['Events'],
    }),
    activityCreation: builder.mutation({
      query: ({ body, userCode }) => {
        const finalUrl = `planner/addPlannerActivity/${userCode}`;

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

        return {
          url: finalUrl,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['Events'],
    }),
    monthlyCreation: builder.mutation({
      query: ({ body, userCode }) => {
        const finalUrl = `planner/addPlannerMonthly/${userCode}`;

        return {
          url: finalUrl,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['MonthlyPlan'],
    }),
    eventCreation: builder.mutation({
      query: ({ body, userCode }) => {
        const finalUrl = `planner/AddPlannerEvent/${userCode}`;

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

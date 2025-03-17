import { baseApi } from './api';

export const plannerSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getEventsAndActivitiess: builder.query({
      query: ({ date }) => `planner/getEventsAndActivities/905717?date=${date}`,
    }),
    getLeads: builder.query({
      query: () => `planner/GetPlannerLeadList?agentCode=905717`,
    }),

    // getDepartment: builder.query({
    //   query: () => 'agent/getMotorContacts',
    // }),

    // addBranches: builder.mutation({
    //   query: newPlant => ({
    //     url: 'agent/getBranches',
    //     method: 'POST',
    //     body: newPlant,
    //   }),
    // }),
  }),
});

// Export hooks
export const {
  useGetEventsAndActivitiessQuery,
  useGetLeadsQuery

} = plannerSlice;

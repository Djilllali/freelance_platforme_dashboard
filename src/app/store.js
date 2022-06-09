import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "../features/signin/signinSlice";
import ticketsReducer from "../features/tickets/ticketSlice";
import newTicketsReducer from "../features/ticket-nouveau/ticketNouveauSlice";
import encoursTicketsReducer from "../features/ticket-encours/ticketEnCoursSlice";
import termineTicketsReducer from "../features/ticket-termines/ticketTermineSlice"
import singleTicketReducer from "../features/singleTicket/singleTicketSlice";
import ticketsArchivedReducer from "../features/ticket-archived/ticketArchivedSlice"
// import statsReducer from "../features/stats/StatsSlice";
// import templates from "../features/templates/templatesSlice";
// import trackedImages from "../features/trackedImages/trackedImagesSlice";
// import singleTrackedImage from "../features/singleTrackedImage/singleTrackedImageSlice";
// import subscriptions from "../features/subscriptions/subscriptionsSlice";
// import plans from "../features/plans/plansSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import singleUser from "../features/user/userSlice";
export default configureStore({
  reducer: {
    signin: signinReducer,
    tickets: ticketsReducer,
    dashboard: dashboardReducer,
    newTickets: newTicketsReducer,
    encoursTickets:encoursTicketsReducer,
    singleTicket: singleTicketReducer,
    termineTickets:termineTicketsReducer,
    ticketsArchived:ticketsArchivedReducer,
    // stats: statsReducer,
    // templates: templates,
    // trackedImages: trackedImages,
    // singleTrackedImage: singleTrackedImage,
    // subscriptions: subscriptions,
    // plans: plans,
    // singleUser: singleUser,
  },
});

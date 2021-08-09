import React from "react";
const Dashboard = React.lazy(() => import("@/pages/vendor/Dashboard"))
const Packages = React.lazy(() =>  import("@/pages/vendor/Packages"))
const FooterMenu = React.lazy(() => import("@/parts/vendor/FooterMenu"))
const SendPackage = React.lazy(() => import("@/pages/vendor/SendPackage"))
const Success = React.lazy(() => import("@/pages/vendor/Success"))
const MapSearch = React.lazy(() => import("@/pages/vendor/MapSearch"))
const Inbox = React.lazy(() => import("@/pages/rider/Inbox"))
const Profile = React.lazy(() => import("@/pages/vendor/Profile"))
const PackageTrack = React.lazy(() => import("@/pages/vendor/PackageTrack"))
const SendTicket = React.lazy(() => import("@/pages/vendor/SendTicket"))
const Ticket = React.lazy(() => import("@/pages/vendor/Ticket"))
const ProfileEdit = React.lazy(() => import("@/pages/vendor/ProfileEdit"))
const Document = React.lazy(() => import("@/pages/vendor/Documents"))
const Chat = React.lazy(() => import("@/pages/vendor/Chat"))
const ChatAll = React.lazy(() => import("@/pages/Chat"))

const routes = {
   dashboard : {
		path: "/dashboard",
		component: <Dashboard />,
   },
   packages : {
    path: "/package",
    component: <Packages />,
   },
   success : {
    path: "/success",
    component: <Success />,
   },
   sendPackage : {
    path: "/package-form",
    component: <SendPackage />,
   },
   mapSearch : {
    path: "/map-search",
    component: <MapSearch />,
   },
   inbox : {
    path: "/inbox",
    component: <Inbox />,
   },
   profile : {
    path: "/profile",
    component: <Profile />,
   },
   packageTrack : {
      path: "/package-detail/:id",
      component: <PackageTrack />,
   },
   sendTicket : {
      path: "/ticket/create",
      component: <SendTicket />,
   },
   ticket : {
      path: "/ticket",
      component: <Ticket />,
   },
   profileEdit : {
      path: "/profile-edit",
      component: <ProfileEdit />,
   },
   document : {
      path: "/document",
      component: <Document />,
   },
   chat : {
      path: "/ticket-message/:id",
      component: <Chat />,
   },

   chatAll : {
      path: "/chat/:id",
      component: <ChatAll />,
   },
}

export default routes

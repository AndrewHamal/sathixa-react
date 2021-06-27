import React from "react";
const Dashboard = React.lazy(() => import("@/pages/vendor/Dashboard"))
const Packages = React.lazy(() =>  import("@/pages/vendor/Packages"))
const FooterMenu = React.lazy(() => import("@/parts/vendor/FooterMenu"))
const SendPackage = React.lazy(() => import("@/pages/vendor/SendPackage"))
const Success = React.lazy(() => import("@/pages/vendor/Success"))
const MapSearch = React.lazy(() => import("@/pages/vendor/MapSearch"))
const Inbox = React.lazy(() => import("@/pages/rider/Inbox"))
const Profile = React.lazy(() => import("@/pages/rider/Profile"))

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

}

export default routes

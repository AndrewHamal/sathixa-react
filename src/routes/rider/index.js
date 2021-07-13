import React from "react";
const Dashboard = React.lazy(() => import("@/pages/rider/Dashboard"))
const Packages = React.lazy(() =>  import("@/pages/vendor/Packages"))
const FooterMenu = React.lazy(() => import("@/parts/vendor/FooterMenu"))
const SendPackage = React.lazy(() => import("@/pages/vendor/SendPackage"))
const Success = React.lazy(() => import("@/pages/vendor/Success"))
const MapSearch = React.lazy(() => import("@/pages/vendor/MapSearch"))
const Inbox = React.lazy(() => import("@/pages/rider/Inbox"))
const Profile = React.lazy(() => import("@/pages/rider/Profile"))
const Package = React.lazy(() => import("@/pages/rider/Pack"))
const ProfileEdit = React.lazy(() => import("@/pages/rider/ProfileEdit"))
const Document = React.lazy(() => import("@/pages/rider/Documents"))
const PackageDetail = React.lazy(() => import("@/pages/rider/packageDetail"))

const routes = {
   dashboard : {
    path: "/dashboard",
    component: <Dashboard />,
   },
   packages : {
    path: "/package",
    component: <Package />,
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
   mapSearch : {
    path: "/inbox",
    component: <Inbox />,
   },
   profile : {
    path: "/profile",
    component: <Profile />,
   },
   profileEdit : {
      path: "/profile-edit",
      component: <ProfileEdit />,
   },
   document : {
      path: "/document",
      component: <Document />,
   },
   packageDetail : {
      path: "/package-detail/:id",
      component: <PackageDetail />,
   },

}

export default routes

import React from "react";

const Login = React.lazy(() => import("../pages/auth/login"));
const Dashboard = React.lazy(() => import("../pages/dashboard/dashboard"));
const Users = React.lazy(() => import("../pages/users/users"));
const Payments = React.lazy(() => import("../pages/payments/payments"));
const Reports = React.lazy(() => import("../pages/reports/reports"));
const Settings = React.lazy(() => import("../pages/settings/settings"));
const NotFound = React.lazy(() => import("../pages/notfound/notfound"));

const routes = [
    {
        path: "/login",
        element: Login,
        fullLayout: false
    },
    {
        path: "/dashboard",
        element: Dashboard,
        isPrivate: true,
        fullLayout: true
    },
    {
        path: "/users",
        element: Users,
        isPrivate: true,
        fullLayout: true
    },
    {
        path: "/payments",
        element: Payments,
        isPrivate: true,
        fullLayout: true
    },
    {
        path: "/reports",
        element: Reports,
        isPrivate: true,
        fullLayout: true
    },
    {
        path: "/settings",
        element: Settings,
        isPrivate: true,
        fullLayout: true
    },
    {
        path: "*",
        element: NotFound,
        fullLayout: false
    },
    // Temporal con Dashboard con isPrivate true
    {
        path: "/",
        element: Dashboard,
        isPrivate: true,
        fullLayout: true
    }
];

export default routes;
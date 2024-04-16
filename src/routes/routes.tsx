import React from "react";
import HomeRedirect from "./HomeRedirect";

const Login = React.lazy(() => import("../pages/auth/login"));
const pagosAcademicos = React.lazy(() => import("../pages/pagosAcademicos/pagosAcademicos"));
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
        path: "/pagosAcademicos",
        element: pagosAcademicos,
        isPrivate: true,
        fullLayout: false,
        data: { roles: ['STUDENT'] }
    },
    {
        path: "/dashboard",
        element: Dashboard,
        isPrivate: true,
        fullLayout: true,
        data: { roles: ['SUPERADMIN', 'ADMIN'] }
    },
    {
        path: "/users",
        element: Users,
        isPrivate: true,
        fullLayout: true,
        data: { roles: ['SUPERADMIN', 'ADMIN'] }
    },
    {
        path: "/payments",
        element: Payments,
        isPrivate: true,
        fullLayout: true,
        data: { roles: ['SUPERADMIN', 'ADMIN'] }
    },
    {
        path: "/reports",
        element: Reports,
        isPrivate: true,
        fullLayout: true,
        data: { roles: ['SUPERADMIN', 'ADMIN'] }
    },
    {
        path: "/settings",
        element: Settings,
        isPrivate: true,
        fullLayout: true,
        data: { roles: ['SUPERADMIN'] }
    },
    {
        path: "*",
        element: NotFound,
        fullLayout: false
    },
    // Temporal con Dashboard con isPrivate true
    {
        path: "/",
        element: HomeRedirect,
        isPrivate: true,
        fullLayout: true
    }
];

export default routes;
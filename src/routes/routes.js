import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import Accounts from "@/pages/Accounts.vue";
import Instances from "@/pages/Instances.vue";
import Plan from "@/pages/Plan.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "account",
        name: "Accounts",
        component: Accounts
      },
      {
        path: "instance",
        name: "Instances",
        component: Instances
      },
      {
        path: "plan",
        name: "Plan",
        component: Plan
      }
    ]
  }
];

export default routes;

import {
  LuLayoutDashboard,
  LuUsers,
  LuSettings,
  LuUser,
  LuFileText,
  LuBell,
  LuLogOut,
} from "react-icons/lu";

const sideBar = [
  {
    id: 1,
    icon: <LuLayoutDashboard />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    id: 2,
    icon: <LuUsers />,
    name: "Users",
    path: "/users",
  },
  {
    id: 3,
    icon: <LuFileText />,
    name: "Reports",
    path: "/reports",
  },
  {
    id: 4,
    icon: <LuBell />,
    name: "Notifications",
    path: "/notifications",
  },
  {
    id: 5,
    icon: <LuUser />,
    name: "Profile",
    path: "/profile",
  },
  {
    id: 6,
    icon: <LuSettings />,
    name: "Settings",
    path: "/settings",
  },
  {
    id: 7,
    icon: <LuLogOut />,
    name: "Logout",
    path: "/logout",
  },
];

export default sideBar;

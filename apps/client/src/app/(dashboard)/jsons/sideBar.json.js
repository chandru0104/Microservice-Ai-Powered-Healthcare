import {
  LuLayoutDashboard,
  LuUsers,
  LuTestTubeDiagonal ,
  LuUser,
  LuFileText,
  LuBell,
  LuLogOut,
  LuShoppingCart,LuStethoscope
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
    icon: <LuTestTubeDiagonal  />,
    name: "Lab Test",
    path: "/lab-test",
  },
  {
    id: 7,
    icon: <LuShoppingCart />,
    name: "Products",
    path: "/products",
  },
    {
    id: 8,
    icon: <LuShoppingCart />,
    name: "Origin",
    path: "/origin",
  },
  {
    id: 9,
    icon: <LuStethoscope />,
    name: "Doctors",
    path: "/doctors",
  }
];

export default sideBar;

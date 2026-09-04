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
    icon: <LuStethoscope  />,
    name: "Doctors",
    path: "/doctor",
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
    icon: <LuShoppingCart />,
    name: "Category",
    path: "/category",
  },
  {
    id: 10,
    icon: <LuStethoscope />,
    name: "Doctors",
    path: "/doctors",
  }
];

export default sideBar;

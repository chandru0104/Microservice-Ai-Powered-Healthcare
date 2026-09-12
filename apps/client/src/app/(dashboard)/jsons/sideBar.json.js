import {
  LuLayoutDashboard,
  LuUsers,
  LuStethoscope,
  LuTestTubeDiagonal,
  LuTestTube,
  LuFolderTree,
  LuGitFork,
  LuGitCommitVertical,
  LuTag,
  LuBaby,
  LuGlobe,
  LuPackage,
  LuShoppingBag,
  LuReceipt
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
    icon: <LuStethoscope />,
    name: "Doctors",
    path: "/doctors",
  },
  {
    id: 4,
    icon: <LuTestTubeDiagonal />,
    name: "Lab Test Category",
    path: "/lab-test-category",
  },
  {
    id: 5,
    icon: <LuTestTube />,
    name: "Lab Test",
    path: "/lab-test",
  },
  {
    id: 6,
    icon: <LuFolderTree />,
    name: "Product Category",
    path: "/product-category",
  },
  {
    id: 7,
    icon: <LuGitCommitVertical />,
    name: "Product ChildCategory",
    path: "/product-child-category",
  },
  {
    id: 8,
    icon: <LuGlobe />,
    name: "Product Subcategory",
    path: "/product-subcategory",
  },
  {
    id: 9,
    icon: <LuGitFork />,
    name: "Product Origin",
    path: "/product-origin",
  },
  {
    id: 10,
    icon: <LuTag />,
    name: "Product Brand",
    path: "/product-brand",
  },
  {
    id: 11,
    icon: <LuBaby />,
    name: "Product Age Group",
    path: "/product-age-group",
  },
  {
    id: 13,
    icon: <LuPackage />,
    name: "Products",
    path: "/products",
  },
  {
    id: 14,
    icon: <LuShoppingBag />,
    name: "Order History",
    path: "/order-history",
  },
];

export default sideBar;
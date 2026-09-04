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
    icon: <LuGitFork />,
    name: "Product Subcategory",
    path: "/product-subcategory",
  },
  {
    id: 8,
    icon: <LuGitCommitVertical />,
    name: "Product Child Category",
    path: "/product-child-category",
  },
  {
    id: 9,
    icon: <LuTag />,
    name: "Product Brand",
    path: "/product-brand",
  },
  {
    id: 10,
    icon: <LuBaby />,
    name: "Product Age Group",
    path: "/product-age-group",
  },
  {
    id: 11,
    icon: <LuGlobe />,
    name: "Product Origin",
    path: "/product-origin",
  },
  {
    id: 12,
    icon: <LuPackage />,
    name: "Products",
    path: "/products",
  },
  {
    id: 13,
    icon: <LuShoppingBag />,
    name: "Order History",
    path: "/order-history",
  },
  {
    id: 14,
    icon: <LuReceipt />,
    name: "Payment History",
    path: "/payment-history",
  }
];

export default sideBar;
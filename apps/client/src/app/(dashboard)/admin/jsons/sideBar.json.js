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
    path: "/admin/dashboard",
  },
  {
    id: 2,
    icon: <LuUsers />,
    name: "Users",
    path: "/admin/users",
  },
  {
    id: 3,
    icon: <LuStethoscope />,
    name: "Doctors",
    path: "/admin/doctors",
  },
  {
    id: 4,
    icon: <LuTestTubeDiagonal />,
    name: "Lab Test Category",
    path: "/admin/lab-test-category",
  },
  {
    id: 5,
    icon: <LuTestTube />,
    name: "Lab Test",
    path: "/admin/lab-test",
  },
  {
    id: 6,
    icon: <LuFolderTree />,
    name: "Product Category",
    path: "/admin/product-category",
  },
  {
    id: 7,
    icon: <LuGitCommitVertical />,
    name: "Product ChildCategory",
    path: "/admin/product-child-category",
  },
  {
    id: 8,
    icon: <LuGlobe />,
    name: "Product Subcategory",
    path: "/admin/product-subcategory",
  },
  {
    id: 9,
    icon: <LuGitFork />,
    name: "Product Origin",
    path: "/admin/product-origin",
  },
  {
    id: 10,
    icon: <LuTag />,
    name: "Product Brand",
    path: "/admin/product-brand",
  },
  {
    id: 11,
    icon: <LuBaby />,
    name: "Product Age Group",
    path: "/admin/product-age-group",
  },
  {
    id: 13,
    icon: <LuPackage />,
    name: "Products",
    path: "/admin/products",
  },
  {
    id: 14,
    icon: <LuShoppingBag />,
    name: "Order History",
    path: "/admin/order-history",
  },
];

export default sideBar;
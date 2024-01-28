import AdminDashboard from "../pages/admin/AdminDashboard";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Gift Shop Management",
    children: [
      {
        name: "Add a new gift",
        path: "create-gift",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    name: "Sales Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <AdminDashboard />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <AdminDashboard />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <AdminDashboard />,
      },
      {
        name: "Create Member",
        path: "create-member",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    name: "Sales History",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <AdminDashboard />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <AdminDashboard />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <AdminDashboard />,
      },
      {
        name: "Create Member",
        path: "create-member",
        element: <AdminDashboard />,
      },
    ],
  },
];

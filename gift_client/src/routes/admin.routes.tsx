import AdminDashboard from "../pages/admin/AdminDashboard";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    name: "User Management",
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

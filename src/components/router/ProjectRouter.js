import React, { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Master from "../layout/Master";
import Error500 from "../modules/auth/Error500";
import AddCategory from "../modules/category/AddCategory";
import CategoryList from "../modules/category/CategoryList";
import Dashboard from "../modules/Dashboard";

const ProjectRouter = createBrowserRouter([
  {
    path: "/",
    element: <Master />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/category/create",
        element: <AddCategory/>,
      },
      {
        path: "/category",
        element: <CategoryList/>,
      },
      {
        path: "/error-500",
        element: <Error500 />,
      },
    ],
  },
]);
export default ProjectRouter;

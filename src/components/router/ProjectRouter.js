import React, { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Master from "../layout/Master";
import Error500 from "../modules/auth/Error500";
import AddCategory from "../modules/category/AddCategory";
import CategoryEdit from "../modules/category/CategoryEdit";
import CategoryList from "../modules/category/CategoryList";
import Dashboard from "../modules/Dashboard";
import SubCategoryAdd from "../modules/subCategory/SubCategoryAdd";
import SubCategoryEdit from "../modules/subCategory/SubCategoryEdit";
import SubcategoryList from "../modules/subCategory/SubcategoryList";

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
        path: "/category/edit/:id",
        element: <CategoryEdit/>,
      },
      {
        path: "/category",
        element: <CategoryList/>,
      },
      {
        path: "/sub-category/create",
        element: <SubCategoryAdd/>,
      },
      {
        path: "/sub-category",
        element: <SubcategoryList/>,
      },
      {
        path: "/sub-category/edit/:id",
        element: <SubCategoryEdit/>,
      },
      {
        path: "/error-500",
        element: <Error500 />,
      },
    ],
  },
]);
export default ProjectRouter;

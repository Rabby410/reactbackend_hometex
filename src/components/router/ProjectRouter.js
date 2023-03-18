import React, { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Master from "../layout/Master";
import Error500 from "../modules/auth/Error500";
import BrandAdd from "../modules/brand/BrandAdd";
import BrandList from "../modules/brand/BrandList";
import BrandEdit from "../modules/brand/BrandEdit";
import AddCategory from "../modules/category/AddCategory";
import CategoryEdit from "../modules/category/CategoryEdit";
import CategoryList from "../modules/category/CategoryList";
import Dashboard from "../modules/Dashboard";
import SubCategoryAdd from "../modules/subCategory/SubCategoryAdd";
import SubCategoryEdit from "../modules/subCategory/SubCategoryEdit";
import SubcategoryList from "../modules/subCategory/SubcategoryList";
import AddSupplier from "../modules/suppliers/AddSupplier";
import SuppliersList from "../modules/suppliers/SuppliersList";
import SupplierEdit from "../modules/suppliers/SupplierEdit";

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
        path: "/brand/create",
        element: <BrandAdd/>,
      },
      {
        path: "/brand",
        element: <BrandList/>,
      },
      {
        path: "/brand/edit/:id",
        element: <BrandEdit/>,
      },
      {
        path: "/supplier/create",
        element: <AddSupplier/>,
      },
      {
        path: "/suppliers",
        element: <SuppliersList/>,
      },
      {
        path: "/supplier/edit/:id",
        element: <SupplierEdit/>,
      },
      {
        path: "/error-500",
        element: <Error500 />,
      },
    ],
  },
]);
export default ProjectRouter;

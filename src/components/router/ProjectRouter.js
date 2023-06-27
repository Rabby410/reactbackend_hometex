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
import ProductAttributes from "../modules/productAttribute/ProductAttributes";
import AddProduct from "../modules/product/AddProduct";
import AddProductPhoto from "../modules/product/AddProductPhoto";
import ProductList from "../modules/product/ProductList";
import AddShop from "../modules/shop/AddShop";
import ShopList from "../modules/shop/ShopList";
import ShopEdit from "../modules/shop/ShopEdit";
import AddSalesManger from "../modules/salesManager/AddSalesManger";
import SalesManagerList from "../modules/salesManager/SalesManagerList";
import OrderCreate from "../modules/order/OrderCreate";
import OrderList from "../modules/order/OrderList";
import OrderDetails from "../modules/order/OrderDetails";
import BarCode from "../modules/bar_code/BarCode";
import Report from "../modules/report/Report";
import PriceFormulaList from "../modules/priceFormula/PriceFormulaList";
import AddPriceFormula from "../modules/priceFormula/AddPriceFormula";
import PriceFormulaEdit from "../modules/priceFormula/PriceFormulaEdit";
import PriceFormulaVariablesList from "../modules/priceFormula/PriceFormulaVariablesList";
import PriceFormulaVariablesEdit from "../modules/priceFormula/PriceFormulaVariablesEdit";
import AddPriceFormulaVariables from "../modules/priceFormula/AddPriceFormulaVariables";

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
        path: "/product-attributes",
        element: <ProductAttributes/>,
      },
      {
        path: "/products",
        element: <ProductList/>,
      },
      {
        path: "/product/create",
        element: <AddProduct/>,
      },
      {
        path: "/product/photo/:id",
        element: <AddProductPhoto/>,
      },
      {
        path: "/shop/edit/:id",
        element: <ShopEdit/>,
      },
      {
        path: "/shop/Create",
        element: <AddShop/>,
      },
      {
        path: "/shops",
        element: <ShopList/>,
      },
      {
        path: "/sales-manager/create",
        element: <AddSalesManger/>,
      },
      {
        path: "/sales-manager",
        element: <SalesManagerList/>,
      },
      {
        path: "/orders",
        element: <OrderList/>,
      },
      {
        path: "/orders/create",
        element: <OrderCreate/>,
      },
      {
        path: "/order/:id",
        element: <OrderDetails/>,
      },
      {
        path: "/generate-bar-code",
        element: <BarCode/>,
      },
      {
        path: "/reports",
        element: <Report/>,
      },
      {
        path: "/price_formula",
        element: <PriceFormulaList/>,
      },
      {
        path: "/price_formula/create",
        element: <AddPriceFormula/>,
      },
      {
        path: "/price_formula/edit/:id",
        element: <PriceFormulaEdit/>,
      },
      {
        path: "/price_formula_variable",
        element: <PriceFormulaVariablesList/>,
      },
      {
        path: "/price_formula_variable/create",
        element: <AddPriceFormulaVariables/>,
      },
      {
        path: "/price_formula_variable/edit/:id",
        element: <PriceFormulaVariablesEdit/>,
      },
      {
        path: "/error-500",
        element: <Error500 />,
      },
    ],
  },
]);
export default ProjectRouter;

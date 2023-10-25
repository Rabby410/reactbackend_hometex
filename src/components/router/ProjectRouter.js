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
import ProductEdit from "../modules/product/ProductEdit";
import CsvProduct from "../modules/product/CsvProduct";
import ChildSubCategoryList from "../modules/childSubCategory/ChildSubCategoryList";
import ChildSubCategoryEdit from "../modules/childSubCategory/ChildSubCategoryEdit";
import ChildSubCategoryAdd from "../modules/childSubCategory/ChildSubCategoryAdd";
import ProductDetails from "../modules/product/ProductDetails";
import ProductTransferList from "../modules/product/transferProduct/ProductTransferList";
import ProductTransferForm from "../modules/product/transferProduct/ProductTransferForm";

const ProjectRouter = createBrowserRouter([
  {
    path: "/",
    element: <Master />,
    children: [
      {
        path: "/",
        element: <Report />,
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
        path: "/child-sub-category/create",
        element: <ChildSubCategoryAdd/>,
      },
      {
        path: "/child-sub-category",
        element: <ChildSubCategoryList/>,
      },
      {
        path: "/child-sub-category/edit/:id",
        element: <ChildSubCategoryEdit/>,
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
        path: "/product/edit/:id",
        element: <ProductEdit/>,
      },
      {
        path: "/product/transfer/list",
        element: <ProductTransferList/>,
      },
      {
        path: "/product/transfer/form/:id",
        element: <ProductTransferForm/>,
      },
      {
        path: "/product/:id",
        element: <ProductDetails/>,
      },
      {
        path: "/product/csv",
        element: <CsvProduct/>,
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
        path: "/employee/create",
        element: <AddSalesManger/>,
      },
      {
        path: "/employee",
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
        path: "/error-500",
        element: <Error500 />,
      },
    ],
  },
]);
export default ProjectRouter;

import React, { useEffect, useState } from "react";
import Breadcrumb from "../../partoals/Breadcrumb";
import CardHeader from "../../partoals/miniComponents/CardHeader";
import axios from "axios";
import Swal from "sweetalert2";
import Constants from "../../../Constants";
import Loader from "../../partoals/miniComponents/Loader";
import NoDataFound from "../../partoals/miniComponents/NoDataFound";
import { Link } from "react-router-dom";
import ProductTransferForm from "./transferProduct/ProductTransferForm";

const ProductList = () => {
  const [input, setInput] = useState({
    order_by: "id",
    direction: "desc",
    search: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [startFrom, setStartFrom] = useState(1);
  const [productColumns, setProductColumns] = useState([]);
  const [duplicateMessage, setDuplicateMessage] = useState("");

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getProducts = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get(
        `${Constants.BASE_URL}/product?page=1&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setProducts(res.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // handle error here, e.g. set an error state or display an error message
      });
  };

  const getProductColumns = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${Constants.BASE_URL}/get-product-columns`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProductColumns(res.data);
      })
      .catch((error) => {
        console.log(error);
        // handle error here, e.g. set an error state or display an error message
      });
  };
  const handleDuplicateProduct = (id) => {
    const token = localStorage.getItem("token");

    axios
      .get(
        `${Constants.BASE_URL}/product/duplicate/@_jkL_qwErtOp~_lis/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setDuplicateMessage(response.data.msg);
        getProducts();
        Swal.fire({
          position: "top-end",
          icon: response.data.cls,
          title: response.data.msg,
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        });
      })
      .catch((error) => {
        setDuplicateMessage("Error duplicating product: " + error.message);
        Swal.fire({
          position: "top-end",
          title: error.message,
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        });
      });
  };

  const handleProductDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete the product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, DELETE IT!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        axios
          .delete(`${Constants.BASE_URL}/product/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            getProducts();
            Swal.fire({
              position: "top-end",
              icon: res.data.cls,
              title: res.data.msg,
              showConfirmButton: false,
              toast: true,
              timer: 1500,
            });
          });
      }
    });
  };

  useEffect(() => {
    getProducts();
    getProductColumns();
  }, []);
  return (
    <>
      <Breadcrumb title={"Product List"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Product list"}
                link={"/product/create"}
                icon={"fa-add"}
                button_text={"Add"}
              />
              <br />
              <CardHeader
                // title={"Product CSV"}
                link={"/product/csv"}
                icon={"fa-file-csv"}
                button_text={"Create CSV"}
              />
            </div>
            <div className="search-area mb-4 mx-3">
              <div className="row">
                <div className="col-md-3">
                  <label className={"w-100"}>
                    <p>Search</p>
                    <input
                      className="form-control form-control-sm"
                      type={"search"}
                      name={"search"}
                      value={input.search}
                      onChange={handleInput}
                      placeholder={"Enter product Name"}
                    />
                  </label>
                </div>

                <div className="col-md-2">
                  <label className={"w-100"}>
                    <p>Order By</p>
                    <select
                      className="form-select form-control-sm"
                      name={"order_by"}
                      value={input.order_by}
                      onChange={handleInput}
                    >
                      {productColumns.map((column, j) => (
                        <option key={j} value={column.id}>
                          {column.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="col-md-2">
                  <label className={"w-100"}>
                    <p>Order Direction</p>
                    <select
                      className="form-select form-control-sm"
                      name={"direction"}
                      value={input.direction}
                      onChange={handleInput}
                    >
                      <option value={"asc"}>ASC</option>
                      <option value={"desc"}>DESC</option>
                    </select>
                  </label>
                </div>

                <div className="col-md-2">
                  <div className="d-grid mt-4">
                    <button
                      onClick={() => getProducts(1)}
                      className={"btn theme-button"}
                    >
                      <i className="fa-solid fa-magnifying-glass"></i>
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              {isLoading ? (
                <Loader />
              ) : (
                <div className="table-responsive soft-landing">
                  <table
                    className={
                      "my-table table-sm product-table table table-hover table-striped table-bordered"
                    }
                  >
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Name /Slug</th>
                        <th>Price / Price Formula</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Photo</th>
                        <th>Date Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(products).length > 0 ? (
                        products.map((product, number) => (
                          <tr key={number}>
                            <td>{startFrom + number}</td>
                            <td>
                              <p className={"text-theme"}>
                                Name: {product.name}
                              </p>
                              <p className={"text-success"}>
                                Slug: {product.slug}
                              </p>
                              <p className={"text-success"}>
                                {product.attributes != undefined &&
                                Object.keys(product.attributes).length > 0
                                  ? product.attributes.map(
                                      (attribute, index) => (
                                        <p>
                                          <small>
                                            {attribute.name}: {attribute.value}
                                          </small>
                                        </p>
                                      )
                                    )
                                  : null}
                              </p>
                            </td>
                            <td>
                              <p className={"text-theme"}>
                                <strong>
                                  Sale Price: {product.sell_price.price}{" "}
                                  {product.sell_price.symbol} | Discount:{" "}
                                  {product.sell_price.discount}{" "}
                                  {product.sell_price.symbol}
                                </strong>
                              </p>
                              <p className={"text-theme"}>
                                Price: {product.price}
                              </p>
                              <p className={"text-success"}>
                                Discount : {product.discount_percent} +{" "}
                                {product.discount_fixed}
                              </p>
                              <p className={"text-theme"}>
                                Cost: {product.cost}
                              </p>
                              <p className={"text-success"}>
                                Discount Start : {product.discount_start}
                              </p>
                              <p className={"text-theme"}>
                                Discount End: {product.discount_end}
                              </p>
                            </td>
                            <td>
                              <p className={"text-theme"}>
                                Status: {product.status}
                              </p>
                              <p className={"text-success"}>
                                SKU : {product.sku}
                              </p>
                              <p className={"text-theme"}>
                                Stock: {product.stock}
                              </p>
                            </td>
                            <td>
                              <p className={"text-theme"}>
                                Category: {product.category?.name}
                              </p>
                              <p className={"text-success"}>
                                Sub Category : {product.sub_category?.name}
                              </p>
                              <p className={"text-theme"}>
                                Brand: {product.brand?.name}
                              </p>
                              <p className={"text-success"}>
                                Origin : {product.country?.name}
                              </p>
                              <p className={"text-theme"}>
                                Supplier: {product.supplier?.name}
                              </p>
                            </td>
                            <td>
                              <img
                                src={product.primary_photo}
                                alt={product.name}
                                className={"img-thumbnail table-image"}
                              />
                            </td>
                            <td>
                              <p className={"text-theme"}>
                                Created: {product.created_at}
                              </p>
                              <p className={"text-success"}>
                                Updated: {product.updated_at}
                              </p>
                              <p className={"text-theme"}>
                                Created By:{product.created_by}
                              </p>
                              <p className={"text-success"}>
                                Updated By:{product.updated_by}
                              </p>
                            </td>
                            <td>
                              <div className={"w-40"}>
                                <Link to={`/product/${product.id}`}>
                                  <button className={"btn btn-sm btn-info"}>
                                    <i className="fa-solid fa-eye"></i>
                                  </button>
                                </Link>
                                <Link to={`/product/edit/${product.id}`}>
                                  <button
                                    className={"btn btn-sm my-1 btn-warning"}
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                  </button>
                                </Link>
                                <Link
                                  to={`/product/transfer/form/${product.id}`}
                                >
                                  <button 
                                    className={
                                      "btn btn-sm btn-outline-success my-1"
                                    }
                                  >
                                    <i className=" fa fa-exchange"></i>
                                  </button>
                                </Link>
                                <button
                                  onClick={() =>
                                    handleProductDelete(product.id)
                                  }
                                  className={"btn btn-sm btn-danger"}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                                <button
                                  className={"btn btn-sm btn-primary my-1"}
                                  onClick={() =>
                                    handleDuplicateProduct(product.id)
                                  }
                                >
                                  <i class="fa-solid fa-clone"></i>
                                </button>
                                {/* {duplicateMessage && <p>{duplicateMessage}</p>} */}
                                {/* <button
                                  className={"btn btn-sm btn-outline-dark"}
                                >
                                  <i class="fa-solid fa-barcode"></i>
                                </button> */}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <NoDataFound />
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;

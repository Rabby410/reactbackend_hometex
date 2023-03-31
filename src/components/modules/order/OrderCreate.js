import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../partoals/Breadcrumb";
import Constants from "../../../Constants";
import Swal from "sweetalert2";
import CardHeader from "../../partoals/miniComponents/CardHeader";

const OrderCreate = () => {
  const [input, setInput] = useState({
    order_by: "id",
    per_page: 10,
    direction: "desc",
    search: "",
  });

  const [itemsCountsPerPage, setItemsCountPerPage] = useState(0);
  const [totalCountsPerPage, setTotalCountPerPage] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState({});
  const [orderSummary, setOrderSummary] = useState({
    items: 0,
    amount: 0,
    discount: 0,
    pay_able: 0,
  });

  const handleCart = (id) => {
    products.map((product, index) => {
      if (product.id == id) {
        setCarts(prevState => ({ ...prevState, [id]: product }))
      }
    })
  }

  const removeCart = (id) => {
    setCarts(current => {
      const copy = { ...current };
      delete copy[id];
      return copy;
    })
  }

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getProducts = (pageNumber = 1) => {
    setIsLoading(true);
    axios
      .get(
        `${Constants.BASE_URL}/product?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
      )
      .then((res) => {
        setProducts(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setStartFrom(res.data.meta.from);
        setTotalCountPerPage(res.data.meta.total);
        setActivePage(res.data.meta.current_page);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    let items = Object.keys(carts).length
    let amount = 0
    let discount = 0
    let pay_able = 0
    Object.keys(carts).map((key) => {
      amount += carts[key].original_price
      discount += carts[key].sell_price.discount
      pay_able += carts[key].sell_price.price
    })
    setOrderSummary({
      items: items,
      amount: amount,
      discount: discount,
      pay_able: pay_able,
    })
  }, [carts]);

  return (
    <>
      <Breadcrumb title={"Create Order"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Create Order"}
                link={"/orders"}
                icon={"fa-list"}
                button_text={"List"}
              />
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <h5>Product List</h5>
                    </div>
                    <div className="card-body">
                      <div className="product-search-area mb-4">
                        <div className="input-group">
                          <input
                            className="form-control form-control-sm"
                            type={"search"}
                            name={'search'}
                            value={input.search}
                            onChange={handleInput}
                            placeholder={'search...'}
                          />
                          <button onClick={getProducts} className="input-group-text bg-theme text-white">
                            <i className="fa-solid fa-search" />
                          </button>
                        </div>
                      </div>
                      {products.map((product, index) => (

                        <div className="d-flex align-items-center my-2 py-2 border-bottom position-relative" key={index}>
                          <div className="details-area">
                            <button className="btn-success btn-sm ms-1" onClick={() => handleCart(product.id)}><i className="fa-solid fa-plus" /></button>
                            <button className="btn-info btn-sm ms-1"><i className="fa-solid fa-eye " /></button>
                          </div>
                          <div className="flex-shrink-0">
                            <img className="order-product-photo img-thumbnail" src={product.primary_photo} alt="Hometex Products" />
                          </div>
                          <div className="flex-grow-1 ms-2">
                            <p className="text-theme"><strong>{product.name}</strong> </p>
                            <p><small>Original Price: {product.price}</small> </p>
                            <p className={"text-theme"}><small><strong>Price: {product.sell_price.price} {product.sell_price.symbol} | Discount: {product.sell_price.discount} {product.sell_price.symbol}</strong></small></p>
                            <p><small>SKU: {product.sku} | Stock: {product.stock}</small> </p>
                          </div>
                        </div>
                      ))}

                    </div>

                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <h5>Cart</h5>
                    </div>
                    <div className="card-body">
                      <div className="order-summary">
                        <table className="table-sm table table-hover table-striped table-bordered">
                          <tbody>
                          <tr>
                            <th>Total Items</th>
                            <td className="text-end">{orderSummary.items}</td>
                          </tr>
                          <tr>
                            <th>price</th>
                            <td className="text-end">{orderSummary.amount} ৳</td>
                          </tr>
                          <tr>
                            <th>Discount</th>
                            <td className="text-end">- {orderSummary.discount} ৳</td>
                          </tr>
                          <tr>
                            <th>Net Payable</th>
                            <th className="text-end text-theme">{orderSummary.pay_able} ৳</th>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                      {Object.keys(carts).map((key) => (
                        <div className="d-flex align-items-center my-2 py-2 border-bottom position-relative" key={key}>
                          <div className="details-area">
                            <button className="btn-danger btn-sm ms-1" onClick={() => removeCart(key)}><i className="fa-solid fa-times" /></button>
                            <button className="btn-info btn-sm ms-1"><i className="fa-solid fa-eye " /></button>
                          </div>
                          <div className="flex-shrink-0">
                            <img className="order-product-photo img-thumbnail" src={carts[key].primary_photo} alt="Hometex Products" />
                          </div>
                          <div className="flex-grow-1 ms-2">
                            <p className="text-theme"><strong>{carts[key].name}</strong> </p>
                            <p><small>Original Price: {carts[key].price}</small> </p>
                            <p className={"text-theme"}><small><strong>Price: {carts[key].sell_price.price} {carts[key].sell_price.symbol} | Discount: {carts[key].sell_price.discount} {carts[key].sell_price.symbol}</strong></small></p>
                            <p><small>SKU: {carts[key].sku} | Stock: {carts[key].stock}</small> </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <h5>User List</h5>
                    </div>
                    <div className="card-body"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderCreate;

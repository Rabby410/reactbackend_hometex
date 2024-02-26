import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../partoals/Breadcrumb";
import Constants from "../../../Constants";
import Swal from "sweetalert2";
import CardHeader from "../../partoals/miniComponents/CardHeader";
import AddCustomer from "../../partoals/modals/AddCustomer";
import ShowOrderConfirmation from "../../partoals/modals/ShowOrderConfirmation";

const OrderCreate = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    order_by: "id",
    per_page: 10,
    direction: "desc",
    search: "",
  });

  const [customerInput, setCustomerInput] = useState("");
  const [customers, setCustomers] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [showOrderConfirmationModal, setShowOrderConfirmationModal] =
    useState(false);
  const [paymentMethod, setPaymentMethod] = useState([]);

  const getPaymentMethod = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${Constants.BASE_URL}/get-payment-methods`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPaymentMethod(res.data);
      });
  };

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
    customer: "",
    customer_id: 0,
    paid_amount: 0,
    due_amount: 0,
    payment_method_id: 1,
    trx_id: "",
  });

  const [order, setOrder] = useState({});

  const handleOrderPlace = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const shopData = JSON.parse(localStorage.getItem("branch"));
    const shop_id = shopData.id;
    axios
      .post(
        `${Constants.BASE_URL}/order`,
        { carts: carts, orderSummary: orderSummary, shop_id: shop_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.flag != undefined) {
          Swal.fire({
            position: "top-end",
            icon: res.data.cls,
            title: res.data.msg,
            showConfirmButton: false,
            toast: true,
            timer: 1500,
          });
          if (res.data.flag != undefined) {
            setShowOrderConfirmationModal(false);
            navigate(`/order/${res.data.order_id}`);
          }
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        // handle error here, e.g. set an error state or display an error message
      });
  };

  const selectCustomer = (customer) => {
    setOrder((prevState) => ({ ...prevState, customer_id: customer.id }));
    setOrderSummary((prevState) => ({
      ...prevState,
      customer: customer.name + " - " + customer.phone,
    }));
    setOrderSummary((prevState) => ({
      ...prevState,
      customer_id: customer.id,
    }));
  };
  const handleCart = (id) => {
    products.map((product, index) => {
      if (product.id == id) {
        if (carts[id] == undefined) {
          setCarts((prevState) => ({ ...prevState, [id]: product }));
          setCarts((prevState) => ({
            ...prevState,
            [id]: {
              ...prevState[id],
              quantity: 1,
            },
          }));
        } else {
          if (carts[id].stock > carts[id].quantity) {
            setCarts((prevState) => ({
              ...prevState,
              [id]: {
                ...prevState[id],
                quantity: carts[id].quantity + 1,
              },
            }));
          }
        }
      }
    });
  };

  const removeCart = (id) => {
    setCarts((current) => {
      const copy = { ...current };
      delete copy[id];
      return copy;
    });
  };

  const handleCustomerSearch = (e) => {
    setCustomerInput(e.target.value);
  };

  const handleDecrease = (id) => {
    if (carts[id].quantity > 1) {
      setCarts((prevState) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          quantity: carts[id].quantity - 1,
        },
      }));
    }
  };
  const handleIncrease = (id) => {
    if (carts[id].stock > carts[id].quantity) {
      setCarts((prevState) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          quantity: carts[id].quantity + 1,
        },
      }));
    }
  };

  const getCustomer = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get(`${Constants.BASE_URL}/customer?&search=${customerInput}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCustomers(res.data);
        setIsLoading(false);
      });
  };

  // useEffect(()=>{
  //   getCustomer()
  // },[customerInput])

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getProducts = (pageNumber = 1) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get(
        `${Constants.BASE_URL}/product?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res && res.data) {
          setProducts(res.data.data);
          setItemsCountPerPage(res.data.meta.per_page);
          setStartFrom(res.data.meta.from);
          setTotalCountPerPage(res.data.meta.total);
          setActivePage(res.data.meta.current_page);
        } else {
          // Handle the case where res.data or its properties are undefined.
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        // Handle the axios request error here.
      });
  };

  const calculateOrderSummery = () => {
    let items = 0;
    let amount = 0;
    let discount = 0;
    let pay_able = 0;
    let paid_amount = 0;
    Object.keys(carts).map((key) => {
      items += carts[key].quantity;
      amount += carts[key].original_price * carts[key].quantity;
      discount += carts[key].sell_price.discount * carts[key].quantity;
      pay_able += carts[key].sell_price.price * carts[key].quantity;
    });
    setOrderSummary((prevState) => ({
      ...prevState,
      items: items,
      amount: amount,
      discount: discount,
      pay_able: pay_able,
      paid_amount: pay_able,
    }));
  };

  const handleOrderSummaryInput = (e) => {
    if (
      e.target.name == "paid_amount" &&
      orderSummary.pay_able >= e.target.value
    ) {
      setOrderSummary((prevState) => ({
        ...prevState,
        paid_amount: e.target.value,
        due_amount: orderSummary.pay_able - e.target.value,
      }));
    } else if (e.target.name == "payment_method_id") {
      setOrderSummary((prevState) => ({
        ...prevState,
        payment_method_id: e.target.value,
      }));
      if (e.target.value == 1) {
        setOrderSummary((prevState) => ({ ...prevState, trx_id: "" }));
      }
    } else if (e.target.name == "trx_id") {
      setOrderSummary((prevState) => ({
        ...prevState,
        trx_id: e.target.value,
      }));
    }
  };

  useEffect(() => {
    getProducts();
    getPaymentMethod();
  }, []);
  useEffect(() => {
    calculateOrderSummery();
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
                {/* Product List */}
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <h5>Product List</h5>
                    </div>
                    <div className="card-body p-1">
                      <div className="product-search-area mb-4 mt-2">
                        <div className="input-group">
                          <input
                            className="form-control form-control-sm"
                            type={"search"}
                            name={"search"}
                            value={input.search}
                            onChange={handleInput}
                            placeholder={"search..."}
                          />
                          <button
                            onClick={getProducts}
                            className="input-group-text bg-theme text-white"
                          >
                            <i className="fa-solid fa-search" />
                          </button>
                        </div>
                      </div>
                      {products.map((product, index) => (
                        <div
                          className="d-flex align-items-center my-2 p-1 order-product-container position-relative"
                          key={index}
                        >
                          <div className="details-area">
                            <button
                              className="btn-success btn-sm ms-1"
                              onClick={() => handleCart(product.id)}
                            >
                              <i className="fa-solid fa-plus" />
                            </button>
                            <button className="btn-info btn-sm ms-1">
                              <i className="fa-solid fa-eye " />
                            </button>
                          </div>
                          <div className="flex-shrink-0">
                            <img
                              className="order-product-photo img-thumbnail"
                              src={product.primary_photo}
                              alt="Hometex Products"
                            />
                          </div>
                          <div className="flex-grow-1 ms-2">
                            <p className="text-theme">
                              <strong>{product.name}</strong>{" "}
                            </p>
                            <p>
                              <small>Original Price: {product.price}</small>{" "}
                            </p>
                            <p className={"text-theme"}>
                              <small>
                                <strong>
                                  Price: {product.sell_price.price}{" "}
                                  {product.sell_price.symbol} | Discount:{" "}
                                  {product.sell_price.discount}{" "}
                                  {product.sell_price.symbol}
                                </strong>
                              </small>
                            </p>
                            <p>
                              <small>
                                SKU: {product.sku} | Stock: {product.stock}
                              </small>{" "}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Cart */}
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <h5>Cart</h5>
                    </div>
                    <div className="card-body">
                      <div className="order-summary mt-1">
                        <p className="pb-2 m">
                          <strong>Customer: </strong>
                          <span className="text-theme">
                            {" "}
                            {orderSummary.customer}
                          </span>
                        </p>
                        <table className="table-sm table table-hover table-striped table-bordered">
                          <tbody>
                            <tr>
                              <th>Total Items</th>
                              <td className="text-end">{orderSummary.items}</td>
                            </tr>
                            <tr>
                              <th>price</th>
                              <td className="text-end">
                                {orderSummary.amount} ৳
                              </td>
                            </tr>
                            <tr>
                              <th>Discount</th>
                              <td className="text-end">
                                - {orderSummary.discount} ৳
                              </td>
                            </tr>
                            <tr>
                              <th>Net Payable</th>
                              <th className="text-end text-theme">
                                {orderSummary.pay_able} ৳
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {Object.keys(carts).map((key) => (
                        <div
                          className="d-flex align-items-center my-2 p-1 order-product-container position-relative"
                          key={key}
                        >
                          <div className="details-area">
                            <button
                              className="btn-danger btn-sm ms-1"
                              onClick={() => removeCart(key)}
                            >
                              <i className="fa-solid fa-times" />
                            </button>
                            <button className="btn-info btn-sm ms-1">
                              <i className="fa-solid fa-eye " />
                            </button>
                          </div>
                          <div className="flex-shrink-0">
                            <img
                              className="order-product-photo img-thumbnail"
                              src={carts[key].primary_photo}
                              alt="Hometex Products"
                            />
                          </div>
                          <div className="flex-grow-1 ms-2">
                            <p className="text-theme">
                              <strong>{carts[key].name}</strong>{" "}
                            </p>
                            <p>
                              <small>Original Price: {carts[key].price}</small>{" "}
                            </p>
                            <p className={"text-theme"}>
                              <small>
                                <strong>
                                  Price: {carts[key].sell_price.price}{" "}
                                  {carts[key].sell_price.symbol} | Discount:{" "}
                                  {carts[key].sell_price.discount}{" "}
                                  {carts[key].sell_price.symbol}
                                </strong>
                              </small>
                            </p>
                            <p>
                              <small>
                                SKU: {carts[key].sku} | Stock:{" "}
                                {carts[key].stock}
                              </small>{" "}
                            </p>
                            <p>
                              Quantity:
                              <button
                                onClick={() => handleDecrease(carts[key].id)}
                                disabled={carts[key].quantity <= 1}
                                className="quantity-button"
                              >
                                -
                              </button>
                              <span>{carts[key].quantity}</span>
                              <button
                                onClick={() => handleIncrease(carts[key].id)}
                                disabled={
                                  carts[key].stock <= carts[key].quantity
                                }
                                className="quantity-button"
                              >
                                +
                              </button>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Customer Details */}
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <div className="d-flex justify-content-between">
                        <h5>Customer List</h5>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => setModalShow(true)}
                        >
                          <i className="fa-solid fa-plus" />
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="input-group">
                        <input
                          className="form-control form-control-sm"
                          type={"search"}
                          name={"search"}
                          value={customerInput}
                          onChange={handleCustomerSearch}
                          placeholder={"search..."}
                        />
                        <button
                          onClick={getCustomer}
                          className="input-group-text bg-theme text-white"
                        >
                          <i className="fa-solid fa-search" />
                        </button>
                      </div>

                      {/* customer add */}

                      <ul className="customer-list">
                        {customers.map((customer, index) => (
                          <li
                            className={
                              orderSummary.customer_id == customer.id
                                ? "text-theme"
                                : ""
                            }
                            onClick={() => selectCustomer(customer)}
                            key={index}
                          >
                            {customer.name} - {customer.phone}
                          </li>
                        ))}
                      </ul>
                      <div className="d-grid mt-4">
                        <button
                          disabled={
                            orderSummary.items == 0 ||
                            orderSummary.customer_id == 0
                          }
                          onClick={() => setShowOrderConfirmationModal(true)}
                          className={"btn theme-button"}
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddCustomer
        show={modalShow}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
      />
      <ShowOrderConfirmation
        show={showOrderConfirmationModal}
        onHide={() => setShowOrderConfirmationModal(false)}
        order_summary={orderSummary}
        carts={carts}
        is_loading={isLoading}
        handleOrderPlace={handleOrderPlace}
        handleOrderSummaryInput={handleOrderSummaryInput}
        paymentMethod={paymentMethod}
      />
    </>
  );
};
export default OrderCreate;

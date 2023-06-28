import React, { useEffect, useState } from "react";
import Breadcrumb from "../../partoals/Breadcrumb";
import CardHeader from "../../partoals/miniComponents/CardHeader";
import axios from "axios";
import Swal from "sweetalert2";
import Constants from "../../../Constants";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import Loader from "../../partoals/miniComponents/Loader";
import NoDataFound from "../../partoals/miniComponents/NoDataFound";

const PriceFormulaList = () => {
  const [input, setInput] = useState({
    order_by: "serial",
    per_page: 10,
    direction: "asc",
    search: "",
  });

  const [itemsCountsPerPage, setItemsCountPerPage] = useState(0);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [priceFormula, setPriceFormula] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [priceFormulas, setPriceFormulas] = useState([]);

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getPriceFormulas = (pageNumber = 1) => {
    const token = localStorage.getItem("token");
    const url = `${Constants.BASE_URL}/priceFormula?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`;

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setIsLoading(true);
    setPriceFormulas([]); // set a default value

    axios
      .request(config)
      .then((res) => {
        setPriceFormulas(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setStartFrom(res.data.meta.from);
        setActivePage(res.data.meta.current_page);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handlePriceFormulaDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete the Price Formula!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, DELETE IT!",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");

        const config = {
          method: "delete",
          url: `${Constants.BASE_URL}/priceFormula/${id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            getPriceFormulas();
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
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    getPriceFormulas();
  }, []);
  return (
    <>
      <Breadcrumb title={"Price Formula List"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Price Formula List"}
                link={"/price_formula/create"}
                icon={"fa-add"}
                button_text={"Add"}
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
                      placeholder={"Enter priceFormula Name"}
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
                      <option value={"name"}>Name</option>
                      <option value={"status"}>Status</option>
                      <option value={"created_at"}>Created At</option>
                      <option value={"updated_at"}>Updated At</option>
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
                  <label className={"w-100"}>
                    <p>Per Page</p>
                    <select
                      className="form-select form-control-sm"
                      name={"per_page"}
                      value={input.per_page}
                      onChange={handleInput}
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={100}>100</option>
                    </select>
                  </label>
                </div>
                <div className="col-md-2">
                  <div className="d-grid mt-4">
                    <button
                      onClick={() => getPriceFormulas(1)}
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
                      "my-table table table-hover table-striped table-bordered"
                    }
                  >
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Formula</th>
                        <th>Created By</th>
                        <th>Date Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {Object.keys(priceFormulas).length > 0 ? (
                        priceFormulas.map((priceFormula, number) => (
                          <tr key={number}>
                            <td>{startFrom + number}</td>
                            <td>
                              <p className={"text-theme"}>
                                Name: {priceFormula.name}
                              </p>
                              <td>
                              <p className={"text-success"}>
                                {priceFormula.status}
                              </p>
                            </td>
                              <p className={"text-success"}>
                                Formula: {priceFormula.formula}
                              </p>
                            </td>
                            
                            <td>{priceFormula.created_by}</td>
                            <td>
                              <p className={"text-theme"}>
                                {priceFormula.created_at}
                              </p>
                              <p className={"text-success"}>
                                {priceFormula.updated_at}
                              </p>
                            </td>
                            <td>
                              <button className={"btn btn-sm my-1 btn-info"}>
                                <i className="fa-solid fa-eye"></i>
                              </button>
                              <Link
                                to={`/priceFormula/edit/${priceFormula.id}`}
                              >
                                <button
                                  className={"btn btn-sm my-1 mx-1 btn-warning"}
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                              </Link>
                              <button
                                onClick={() =>
                                  handlePriceFormulaDelete(priceFormula.id)
                                }
                                className={"btn btn-sm my-1 btn-danger"}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
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
            <div className="card-footer">
              <nav className={"pagination-sm"}>
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={itemsCountsPerPage}
                  pageRangeDisplayed={5}
                  onChange={getPriceFormulas}
                  firstPageText={"First"}
                  nextPageText={"Next"}
                  prevPageText={"Previous"}
                  lastPageText={"Last"}
                  itemClass={"page-item"}
                  linkClass={"page-link"}
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceFormulaList;

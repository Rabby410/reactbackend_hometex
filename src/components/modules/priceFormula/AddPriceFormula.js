import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../partoals/Breadcrumb";
import Constants from "../../../Constants";
import Swal from "sweetalert2";
import CardHeader from "../../partoals/miniComponents/CardHeader";

const AddPriceFormula = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ status: 1 });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePriceFormulaCreate = () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    if (token) {
      const config = {
        method: "post",
        url: `${Constants.BASE_URL}/price_formula`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: input,
      };

      axios(config)
        .then((response) => {
          setIsLoading(false);
          Swal.fire({
            position: "top-end",
            icon: response.data.cls,
            title: response.data.msg,
            showConfirmButton: false,
            toast: true,
            timer: 1500,
          });
          navigate("/price_formula");
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response.status === 422) {
            setErrors(error.response.data.errors);
          }
        });
    }
  };
  return (
    <>
      <Breadcrumb title={"Add Price Formula"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Add Price Formula"}
                link={"/price_formula"}
                icon={"fa-list"}
                button_text={"List"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPriceFormula;

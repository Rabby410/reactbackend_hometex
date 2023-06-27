import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../partoals/Breadcrumb";
import Constants from "../../../Constants";
import Swal from "sweetalert2";
import CardHeader from "../../partoals/miniComponents/CardHeader";

const AddPriceFormulaVariables = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ status: 1 });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleInput = (e) => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  const handlePriceFormulaVariableCreate = () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    if (token) {
      const config = {
        method: "post",
        url: `${Constants.BASE_URL}/price_formula_variables`,
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
      <Breadcrumb title={"Add Price Formula Variables"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Add Price Formula Variables"}
                link={"/price_formula"}
                icon={"fa-list"}
                button_text={"List"}
              />
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Name</p>
                    <input
                      className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                      type={'text'}
                      name={'name'}
                      value={input.name}
                      onChange={handleInput}
                      placeholder={'Enter Price Formula Variables name'}
                    />
                    <p className={'login-error-msg'}><small>{errors.name != undefined ? errors.name[0] : null}</small></p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Short Name (Length = len)</p>
                    <input
                      className={errors.short_name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                      type={'text'}
                      name={'short_name'}
                      value={input.short_name}
                      onChange={handleInput}
                      placeholder={'Enter Price Formula Variables short_name'}
                    />
                    <p className={'login-error-msg'}><small>{errors.short_name != undefined ? errors.short_name[0] : null}</small></p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Status</p>
                    <select
                      className={errors.status != undefined ? 'form-select mt-2 is-invalid' : 'form-select mt-2'}
                      name={'status'}
                      value={input.status}
                      onChange={handleInput}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                    <p className={'login-error-msg'}><small>{errors.status != undefined ? errors.status[0] : null}</small></p>
                  </label>
                </div>
                <div className="col-md-12">
                  <div className="row justify-content-center">
                    <div className="col-md-4">
                      <div className="d-grid mt-4">
                        <button onClick={handlePriceFormulaVariableCreate} className={"btn theme-button"}
                          dangerouslySetInnerHTML={{ __html: isLoading ? '<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Add Price Formula Variables...' : 'Add Price Formula Variables' }}
                        />
                      </div>
                    </div>
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

export default AddPriceFormulaVariables;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const handleInput = (e) => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  
  const handlePriceFormulaCreate = () => { 
    let token = localStorage.getItem('token');
    setIsLoading(true);
    if (token) {
        const config = {
            method: 'post',
            url: `${Constants.BASE_URL}/priceFormula`,
            headers: { 
                'Authorization': `Bearer ${token}`
            },
            data: input // assuming input is defined elsewhere
        };
                
        axios(config)
            .then(function (response) {
                setIsLoading(false);
                Swal.fire({
                    position: "top-end",
                    icon: response.data.cls,
                    title: response.data.msg,
                    showConfirmButton: false,
                    toast: true,
                    timer: 1500,
                });
                if (response.data.flag === undefined) {
                  navigate('/brand');
                }
            })
            .catch((error) => {
                setIsLoading(false);
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                }
            });
    }
}
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
                      placeholder={'Enter Price formula name'}
                    />
                    <p className={'login-error-msg'}><small>{errors.name != undefined ? errors.name[0] : null}</small></p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Formula</p>
                    <input
                      className={errors.formula != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                      type={'text'}
                      name={'formula'}
                      value={input.formula}
                      onChange={handleInput}
                      placeholder={'Enter Price formula'}
                    />
                    <p className={'login-error-msg'}><small>{errors.formula != undefined ? errors.formula[0] : null}</small></p>
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
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Description</p>
                    <textarea
                      className={errors.serial != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                      name={'description'}
                      value={input.description}
                      onChange={handleInput}
                      placeholder={'Enter Price formula description'}
                    ></textarea>
                    <p className={'login-error-msg'}><small>{errors.description != undefined ? errors.description[0] : null}</small></p>
                  </label>
                </div>
                <div className="col-md-12">
                  <div className="row justify-content-center">
                    <div className="col-md-4">
                      <div className="d-grid mt-4">
                        <button onClick={handlePriceFormulaCreate} className={"btn theme-button"}
                          dangerouslySetInnerHTML={{ __html: isLoading ? '<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Add Price formula...' : 'Add Price formula' }}
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

export default AddPriceFormula;


import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Breadcrumb from "../../partoals/Breadcrumb";
import Constants from "../../../Constants";
import Swal from 'sweetalert2'
import CardHeader from "../../partoals/miniComponents/CardHeader";

const PriceFormulaEdit = () => {

    const params = useParams()
    const navigate = useNavigate();
    const [input, setInput] = useState({ status: 1 })
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [formula, setformula] = useState([])

    const getFormula = () => {
        const token = localStorage.getItem('token');
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${Constants.BASE_URL}/formula/${params.id}`,
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        };
      
        axios.request(config)
          .then((response) => {
            setInput(response.data.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      

      const handleInput = (e) => {
        setInput((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

      const handleformulaUpdate = () => { 
        let token = localStorage.getItem('token');
        setIsLoading(true);
        if (token) {
            const config = {
                method: 'put',
                url: `${Constants.BASE_URL}/formula/${params.id}`,
                headers: { 
                    'Authorization': `Bearer ${token}`
                },
                data: input // assuming input is defined elsewhere
            };
                    
            axios(config)
                .then(function (res) {
                    setIsLoading(false);
                    Swal.fire({
                        position: "top-end",
                        icon: res.data.cls,
                        title: res.data.msg,
                        showConfirmButton: false,
                        toast: true,
                        timer: 1500,
                    });
                      navigate('/brand');
                })
                .catch((error) => {
                    setIsLoading(false);
                    if (error.res.status === 422) {
                        setErrors(error.res.data.errors);
                    }
                });
        }
    }

    useEffect(() => {
        getFormula()
    }, [])

    return (
        <>
            <Breadcrumb title={"Edit Formula"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader
                                title={'Edit Formula'}
                                link={'/formula'}
                                icon={'fa-list'}
                                button_text={'List'}
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
                                            placeholder={'Enter formula name'}
                                        />
                                        <p className={'login-error-msg'}><small>{errors.name != undefined ? errors.name[0] : null}</small></p>
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
                                            placeholder={'Enter formula description'}
                                        ></textarea>
                                        <p className={'login-error-msg'}><small>{errors.description != undefined ? errors.description[0] : null}</small></p>
                                    </label>
                                </div>
                                <div className="col-md-12">
                                    <div className="row justify-content-center">
                                        <div className="col-md-4">
                                            <div className="d-grid mt-4">
                                                <button onClick={handleformulaUpdate} className={"btn theme-button"}
                                                    dangerouslySetInnerHTML={{ __html: isLoading ? '<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Update formula...' : 'Update Formula' }}
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

export default PriceFormulaEdit

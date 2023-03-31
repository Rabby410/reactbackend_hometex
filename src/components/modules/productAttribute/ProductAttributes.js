import React, { useEffect, useState } from "react";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Breadcrumb from "../../partoals/Breadcrumb";
import Constants from "../../../Constants";
import Pagination from "react-js-pagination";

import Loader from "../../partoals/miniComponents/Loader";
import NoDataFound from "../../partoals/miniComponents/NoDataFound";
import Swal from "sweetalert2";

const ProductAttributes = () => {
    const [modalShow, setModalShow] = useState(false);
    const [input, setInput] = useState({ status: 1 })

    const [itemsCountsPerPage, setItemsCountPerPage] = useState(0);
    const [toltalCountsPerPage, setTotlaCountPerPage] = useState(1);
    const [startFrom, setStartFrom] = useState(1);
    const [activePage, setActivePage] = useState(1);

    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [attributes, setAttributes] = useState([])
    const [modalTitle, setModalTitle] = useState('add')
    const [valueModalTitle, setValueModalTitle] = useState('Add')
    const [valueModalShow, setValueModalShow] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false)

    const [modalValue, setModalValue] = useState([])
    const [modalValueShow, setModalValueShow] = useState(false)

    const handleInput = (e) => setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))

    const handleAttributeValueCreate = () =>{
        setIsLoading(true)
        axios.post(`${Constants.BASE_URL}/attribute-value`, input)
            .then(res => {
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: res.data.cls,
                    title: res.data.msg,
                    showConfirmButton: false,
                    toast: true,
                    timer: 1500
                })
                setErrors([])
                setInput({ status: 1 })
                setValueModalShow(false)
                getAttribute()
            }).catch(errors => {
                setIsLoading(false)
                if (errors.response.status === 422) {
                    setErrors(errors.response.data.errors)
                }
            })
    }

    const getAttribute = () => {
        setIsLoading(true)
        axios.get(`${Constants.BASE_URL}/attribute`).then(res => {
            setAttributes(res.data.data)
            setItemsCountPerPage(res.data.meta.per_page);
            setStartFrom(res.data.meta.from);
            setTotlaCountPerPage(res.data.meta.total);
            setActivePage(res.data.meta.current_page);
            setIsLoading(false)
        })
    }

    const handleAttributeUpdate = (id) => {
        setIsLoading(true)
        axios.put(`${Constants.BASE_URL}/attribute/${id}`, input)
            .then(res => {
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: res.data.cls,
                    title: res.data.msg,
                    showConfirmButton: false,
                    toast: true,
                    timer: 1500
                })
                setErrors([])
                setInput({ status: 1 })
                setModalShow(false)
                getAttribute()
            }).catch(errors => {
                setIsLoading(false)
                if (errors.response.status === 422) {
                    setErrors(errors.response.data.errors)
                }
            })
    }
    const handleAttributeCreate = () => {
        setIsLoading(true)
        axios.post(`${Constants.BASE_URL}/attribute`, input)
            .then(res => {
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: res.data.cls,
                    title: res.data.msg,
                    showConfirmButton: false,
                    toast: true,
                    timer: 1500
                })
                setErrors([])
                setInput({ status: 1 })
                setModalShow(false)
                getAttribute()
            }).catch(errors => {
                setIsLoading(false)
                if (errors.response.status === 422) {
                    setErrors(errors.response.data.errors)
                }
            })
    }
    const handleAttributeDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete the Attribute!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, DELETE IT!'
        }).then((result) => {
            if (result.isConfirmed) {
        setIsLoading(true)
        axios.delete(`${Constants.BASE_URL}/attribute/${id}`)
            .then(res => {
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: res.data.cls,
                    title: res.data.msg,
                    showConfirmButton: false,
                    toast: true,
                    timer: 1500
                })
                getAttribute()
            })
        }
            })
    }

    const handleModel = (attribute = undefined) => {
        setInput({ status: 1 })
        if(attribute != undefined){
            setModalTitle('Update')
            setIsEditMode(true)
            setInput({status: attribute.original_status, name: attribute.name, id:attribute.id})
        }else{
            setIsEditMode(false)
            setModalTitle('Add')
        }
        setErrors([])
        setModalShow(true)
    }

    const handleValueDetailsModal = (value) =>{
        setModalValue(value)
        setModalValueShow(true)
    }

    const handleValueDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete the Attribute Value!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, DELETE IT!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Constants.BASE_URL}/attribute-value/${id}`).then(res => {
                    getAttribute()
                    Swal.fire({
                        position: 'top-end',
                        icon: res.data.cls,
                        title: res.data.msg,
                        showConfirmButton: false,
                        toast:true,
                        timer: 1500
                      })
                })
            }
        })
    }
    const handleValueCreateModal = (id) => {
        setValueModalShow(true)
        setIsEditMode(false)
        setValueModalTitle('Add')
        setInput({status: 1, attribute_id : id})
    }

    const handleValueEditModal = (value) =>{
        setIsEditMode(true)
        setValueModalShow(true)
        setValueModalTitle('Update')
        setInput({status: value.status_original, name: value.name, id:value.id})
    }
    const handleValueEdit = () =>{
        setIsLoading(true)
        axios.put(`${Constants.BASE_URL}/attribute-value/${input.id}`, input)
            .then(res => {
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: res.data.cls,
                    title: res.data.msg,
                    showConfirmButton: false,
                    toast: true,
                    timer: 1500
                })
                setErrors([])
                setInput({ status: 1 })
                setValueModalShow(false)
                getAttribute()
            }).catch(errors => {
                setIsLoading(false)
                if (errors.response.status === 422) {
                    setErrors(errors.response.data.errors)
                }
            })
    }
    
    useEffect(() => {
    getAttribute()
    }, [])

    return (
        <>
            <Breadcrumb title={"Product Attributes"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="text-theme">Product Attributes</h4>
                                <button onClick={()=>handleModel()} className="btn theme-button">
                                    <i className={`fa-solid fa-plus`}></i>{" "}
                                    <span className="px-2">Add</span>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    {isLoading ? <Loader /> :

                                        <div className="table-responsive soft-landing">
                                            <table className={"my-table table table-hover table-striped table-bordered"}>
                                                <thead>
                                                    <tr>
                                                        <th>SL</th>
                                                        <th>Name</th>
                                                        <th>Value</th>
                                                        <th>Status</th>
                                                        <th>Created By</th>
                                                        <th>Date Time</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {Object.keys(attributes).length > 0 ? attributes.map((attribute, number) => (
                                                        <tr key={number}>
                                                            <td>{startFrom + number}</td>
                                                            <td>{attribute.name}</td>
                                                            <td>
                                                                <div className="value-container-parent">
                                                                {attribute.value != undefined ? attribute.value.map((value, valIndex)=>(
                                                                    <div className={"value-container"}>
                                                                        {value.name}
                                                                       <div className="value-buttons">
                                                                       <button onClick={()=>handleValueDetailsModal(value)} className={"btn-info"}><i className={`fa-solid fa-eye`}></i></button>
                                                                        <button onClick={()=>handleValueEditModal(value)} className={"btn-warning"}><i className={`fa-solid fa-edit`}></i></button>
                                                                        <button onClick={()=>handleValueDelete(value.id)} className={"btn-danger"}><i className={`fa-solid fa-trash`}></i></button>
                                                                       </div>
                                                                    </div>
                                                                )):null}
                                                                </div>
                                                                <button onClick={()=>handleValueCreateModal(attribute.id)} className="small-button">
                                                            <i className={`fa-solid fa-plus`}></i>
                                                                </button>
                                                            </td>
                                                            <td>{attribute.status}</td>
                                                            <td>{attribute.created_by}</td>
                                                            <td>
                                                                <p className={"text-theme"}>{attribute.created_at}</p>
                                                                <p className={"text-success"}>
                                                                    {attribute.updated_at}
                                                                </p>
                                                            </td>
                                                            <td>
                                                                {/* <button className={"btn btn-sm my-1 btn-info"}><i className="fa-solid fa-eye"></i></button> */}
                                                                <button onClick={()=>handleModel(attribute)} className={"btn btn-sm my-1 mx-1 btn-warning"}><i className="fa-solid fa-pen-to-square"></i></button>
                                                                <button onClick={() => handleAttributeDelete(attribute.id)} className={"btn btn-sm my-1 btn-danger"}><i className="fa-solid fa-trash"></i></button>
                                                            </td>
                                                        </tr>
                                                    )) : <NoDataFound />}
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <nav className={"pagination-sm"}>
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountsPerPage}
                                    totalItemsCount={toltalCountsPerPage}
                                    pageRangeDisplayed={5}
                                    onChange={getAttribute}
                                    firstPageText={"First"}
                                    nextPageText={"Next"}
                                    prevPageText={"Previous"}
                                    lastPageText={"Last"}
                                    itemclassName={"page-item"}
                                    linkclassName={"page-link"}
                                />
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                    centered
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {modalTitle} Product Attribute
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="w-100">
                            <p>Name</p>
                            <input
                                className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                type={'text'}
                                name={'name'}
                                value={input.name}
                                onChange={handleInput}
                                placeholder={'Enter Attribute name'}
                            />
                            <p className={'login-error-msg'}><small>{errors.name != undefined ? errors.name[0] : null}</small></p>
                        </label>
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
                        <button onClick={isEditMode ? ()=> handleAttributeUpdate(input.id) :handleAttributeCreate} className={"btn theme-button mt-3"}
                            dangerouslySetInnerHTML={{ __html: isLoading ? '<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' : `${modalTitle} Attribute` }}
                        />
                    </Modal.Body>
            </Modal>
            <Modal
                    centered
                    show={valueModalShow}
                    onHide={() => setValueModalShow(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {valueModalTitle} Attribute Value
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="w-100">
                            <p>Name</p>
                            <input
                                className={errors.name != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                type={'text'}
                                name={'name'}
                                value={input.name}
                                onChange={handleInput}
                                placeholder={'Enter Attribute name'}
                            />
                            <p className={'login-error-msg'}><small>{errors.name != undefined ? errors.name[0] : null}</small></p>
                        </label>
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
                        <button onClick={isEditMode ? handleValueEdit : handleAttributeValueCreate} className={"btn theme-button mt-3"}
                            dangerouslySetInnerHTML={{ __html: isLoading ? '<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' : `${valueModalTitle} Attribute Value` }}
                        />
                    </Modal.Body>
            </Modal>
            <Modal
                    centered
                    show={modalValueShow}
                    onHide={() => setModalValueShow(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Value
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table className="table table-bordered table-hover table-striped">
                                    <tbody>
                                        <tr>
                                            <th>Id</th>
                                            <td>{modalValue.id}</td>
                                        </tr>
                                        <tr>
                                            <th>Name</th>
                                            <td>{modalValue.name}</td>
                                        </tr>
                                        <tr>
                                            <th>status</th>
                                            <td>{modalValue.status}</td>
                                        </tr>
                                        <tr>
                                            <th>Created By</th>
                                            <td>{modalValue.created_by}</td>
                                        </tr>
                                        <tr>
                                            <th>Created At</th>
                                            <td>{modalValue.created_at}</td>
                                        </tr>
                                        <tr>
                                            <th>Updated At</th>
                                            <td>{modalValue.updated_at}</td>
                                        </tr>
                                    </tbody>

                        </table>
                    </Modal.Body>
            </Modal>
               
            </>
            );
};

            export default ProductAttributes;

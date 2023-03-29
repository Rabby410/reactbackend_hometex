import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../partoals/Breadcrumb";
import Constants from "../../../Constants";
import Swal from "sweetalert2";
import CardHeader from "../../partoals/miniComponents/CardHeader";

const AddSalesManger = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({ status: 1 });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [areas, setAreas] = useState([]);
    const [shops, setShops] = useState([]);

    const getShops = () => {
        axios.get(`${Constants.BASE_URL}/get-shop-list`).then(res => {
                setShops(res.data)
            })
    }
    const getDivisions = () => {
        axios.get(`${Constants.BASE_URL}/divisions`).then(res => {
                setDivisions(res.data)
            })
    }
    const getDistrict = (division_id) => {
        axios.get(`${Constants.BASE_URL}/district/${division_id}`).then(res => {
                setDistricts(res.data)
            })
    }
    const getAreas = (district_id) => {
        axios.get(`${Constants.BASE_URL}/area/${district_id}`).then(res => {
                setAreas(res.data)
            })
    }

    const handleInput = (e) => {
        if (e.target.name == 'division_id') {
            setDistricts([])
            setAreas([])
            let division_id = parseInt(e.target.value)
            if(!isNaN(division_id))getDistrict(division_id)
        }else if(e.target.name == 'district_id'){
            setAreas([])
            let district_id = e.target.value
            if(!isNaN(district_id))getAreas(e.target.value)
        }
        setInput((prevState) => ({...prevState,[e.target.name]: e.target.value}))
    }
    // const handleAreaInput = (selected_option, name) =>{
    //     setInput((prevState) => ({...prevState,[name]: selected_option.value}))
    // }

    const handlePhoto = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setInput((prevState) => ({ ...prevState, [e.target.name]: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleShopCreate = () => {
        setIsLoading(true);
        axios
            .post(`${Constants.BASE_URL}/sales-manager`, input)
            .then((res) => {
                setIsLoading(false);
                Swal.fire({
                    position: "top-end",
                    icon: res.data.cls,
                    title: res.data.msg,
                    showConfirmButton: false,
                    toast: true,
                    timer: 1500,
                });
                if(res.data.flag == undefined){
                //    navigate("/sales-manager");
                }
            })
            .catch((errors) => {
                setIsLoading(false);
                if (errors.response.status === 422) {
                    setErrors(errors.response.data.errors);
                }
            });
    };
    useEffect(() => {
        getDivisions()
        getShops()
    }, []);
  return (
    <>
            <Breadcrumb title={"Add Sales Manager"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader
                                title={"Add Sales Manager"}
                                link={"/sales-manager"}
                                icon={"fa-list"}
                                button_text={"List"}
                            />
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Sales Manager Details</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <label className="w-100">
                                                    <p>Name</p>
                                                    <input
                                                        className={
                                                            errors.name != undefined
                                                                ? "form-control mt-2 is-invalid"
                                                                : "form-control mt-2"
                                                        }
                                                        type={"text"}
                                                        name={"name"}
                                                        value={input.name}
                                                        onChange={handleInput}
                                                        placeholder={"Enter Sales Manager name"}
                                                    />
                                                    <p className={"login-error-msg"}>
                                                        <small>
                                                            {errors.name != undefined
                                                                ? errors.name[0]
                                                                : null}
                                                        </small>
                                                    </p>
                                                </label>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="w-100 mt-4">
                                                    <p>Phone</p>
                                                    <input
                                                        className={
                                                            errors.phone != undefined
                                                                ? "form-control mt-2 is-invalid"
                                                                : "form-control mt-2"
                                                        }
                                                        type={"number"}
                                                        name={"phone"}
                                                        value={input.phone}
                                                        onChange={handleInput}
                                                        placeholder={"Enter Sales Manager phone number"}
                                                    />
                                                    <p className={"login-error-msg"}>
                                                        <small>
                                                            {errors.phone != undefined
                                                                ? errors.phone[0]
                                                                : null}
                                                        </small>
                                                    </p>
                                                </label>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="w-100 mt-4">
                                                    <p>Password</p>
                                                    <input
                                                        className={
                                                            errors.password != undefined
                                                                ? "form-control mt-2 is-invalid"
                                                                : "form-control mt-2"
                                                        }
                                                        type={"password"}
                                                        name={"password"}
                                                        value={input.password}
                                                        onChange={handleInput}
                                                        placeholder={"Enter Sales Manager password"}
                                                    />
                                                    <p className={"login-error-msg"}>
                                                        <small>
                                                            {errors.password != undefined
                                                                ? errors.password[0]
                                                                : null}
                                                        </small>
                                                    </p>
                                                </label>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="w-100 mt-4">
                                                    <p>Email Address</p>
                                                    <input
                                                        className={
                                                            errors.email != undefined
                                                                ? "form-control mt-2 is-invalid"
                                                                : "form-control mt-2"
                                                        }
                                                        type={"email"}
                                                        name={"email"}
                                                        value={input.email}
                                                        onChange={handleInput}
                                                        placeholder={"Enter Sales Manager email address"}
                                                    />
                                                    <p className={"login-error-msg"}>
                                                        <small>
                                                            {errors.email != undefined
                                                                ? errors.email[0]
                                                                : null}
                                                        </small>
                                                    </p>
                                                </label>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="w-100 mt-4">
                                                    <p>NID / Passport / Birth Certificate / Driving License No</p>
                                                    <input
                                                        className={
                                                            errors.nid != undefined
                                                                ? "form-control mt-2 is-invalid"
                                                                : "form-control mt-2"
                                                        }
                                                        type={"text"}
                                                        name={"nid"}
                                                        value={input.nid}
                                                        onChange={handleInput}
                                                        placeholder={"Enter Sales Manager photo identification"}
                                                    />
                                                    <p className={"login-error-msg"}>
                                                        <small>
                                                            {errors.nid != undefined
                                                                ? errors.nid[0]
                                                                : null}
                                                        </small>
                                                    </p>
                                                </label>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="w-100 mt-4">
                                                    <p>Select Shop</p>
                                                    <select
                                                        className={
                                                            errors.shop_id != undefined
                                                                ? "form-select mt-2 is-invalid"
                                                                : "form-select mt-2"
                                                        }
                                                        name={"shop_id"}
                                                        value={input.shop_id}
                                                        onChange={handleInput}
                                                    >
                                                        <option >Select Shop</option>
                                                        {shops.map((shop, index)=>(

                                                        <option value={shop.id}>{shop.name}</option>
                                                        ))}
                                                    </select>
                                                    <p className={"login-error-msg"}>
                                                        <small>
                                                            {errors.shop_id != undefined
                                                                ? errors.shop_id[0]
                                                                : null}
                                                        </small>
                                                    </p>
                                                </label>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="w-100 mt-4">
                                                    <p>Status</p>
                                                    <select
                                                        className={
                                                            errors.status != undefined
                                                                ? "form-select mt-2 is-invalid"
                                                                : "form-select mt-2"
                                                        }
                                                        name={"status"}
                                                        value={input.status}
                                                        onChange={handleInput}
                                                    >
                                                        <option value={1}>Active</option>
                                                        <option value={0}>Inactive</option>
                                                    </select>
                                                    <p className={"login-error-msg"}>
                                                        <small>
                                                            {errors.status != undefined
                                                                ? errors.status[0]
                                                                : null}
                                                        </small>
                                                    </p>
                                                </label>
                                            </div>
                                            
                                            <div className="col-md-12">
                                                <label className="w-100 mt-4">
                                                    <p>Photo</p>
                                                    <input
                                                        className={
                                                            errors.photo != undefined
                                                                ? "form-control mt-2 is-invalid"
                                                                : "form-control mt-2"
                                                        }
                                                        type={"file"}
                                                        name={"photo"}
                                                        onChange={handlePhoto}
                                                        placeholder={"Enter Sales Manager picture"}
                                                    />
                                                    <p className={"login-error-msg"}>
                                                        <small>
                                                            {errors.photo != undefined ? errors.photo[0] : null}
                                                        </small>
                                                    </p>
                                                </label>
                                                {input.photo != undefined ? (
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="photo-preview mt-3">
                                                                <img
                                                                    alt={"Hometex Sales Manager"}
                                                                    src={input.photo}
                                                                    className={"img-thumbnail aspect-one"}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="col-md-12">
                                                <label className="w-100 mt-4">
                                                    <p>NID / Passport / Birth Certificate / Driving License</p>
                                                    <input
                                                        className={
                                                            errors.nid_photo != undefined
                                                                ? "form-control mt-2 is-invalid"
                                                                : "form-control mt-2"
                                                        }
                                                        type={"file"}
                                                        name={"nid_photo"}
                                                        onChange={handlePhoto}
                                                        placeholder={"Enter Sales Manager picture"}
                                                    />
                                                    <p className={"login-error-msg"}>
                                                        <small>
                                                            {errors.nid_photo != undefined ? errors.nid_photo[0] : null}
                                                        </small>
                                                    </p>
                                                </label>
                                                {input.photo != undefined ? (
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="photo-preview mt-3">
                                                                <img
                                                                    alt={"Hometex Sales Manager"}
                                                                    src={input.nid_photo}
                                                                    className={"img-thumbnail aspect-one"}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Sales Manager Address</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <label className="w-100">
                                                    <p>
                                                        Address <small>(House/Road/Village etc)</small>
                                                    </p>
                                                    <input
                                                        className={
                                                            errors.address != undefined
                                                                ? "form-control mt-2 is-invalid"
                                                                : "form-control mt-2"
                                                        }
                                                        type={"text"}
                                                        name={"address"}
                                                        value={input.address}
                                                        onChange={handleInput}
                                                        placeholder={"Enter Sales Manager address"}
                                                    />
                                                    <p className={"login-error-msg"}>
                                                        <small>
                                                            {errors.address != undefined
                                                                ? errors.address[0]
                                                                : null}
                                                        </small>
                                                    </p>
                                                </label>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="w-100 mt-4">
                                                    <p>Select Division</p>
                                                    <select
                                                        className={
                                                            errors.division_id != undefined
                                                                ? "form-select mt-2 is-invalid"
                                                                : "form-select mt-2"
                                                        }
                                                        name={"division_id"}
                                                        value={input.division_id}
                                                        onChange={handleInput}
                                                    >
                                                        <option>Select division</option>
                                                        {divisions.map((division, index) => (
                                                            <option key={index} value={division.id}>{division.name}</option>
                                                        ))}
                                                    </select>
                                                    <p className={"login-error-msg"}>
                                                        <small>
                                                            {errors.division_id != undefined
                                                                ? errors.division_id[0]
                                                                : null}
                                                        </small>
                                                    </p>
                                                </label>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="w-100 mt-4">
                                                    <p>Select City</p>
                                                    <select
                                                        className={
                                                            errors.district_id != undefined
                                                                ? "form-select mt-2 is-invalid"
                                                                : "form-select mt-2"
                                                        }
                                                        name={"district_id"}
                                                        value={input.district_id}
                                                        onChange={handleInput}
                                                        disabled={Object.keys(districts).length < 1}
                                                    >
                                                        <option>Select city</option>
                                                        {districts.map((district, index) => (
                                                            <option key={index} value={district.id}>{district.name}</option>
                                                        ))}
                                                    </select>
                                                    <p className={"login-error-msg"}>
                                                        <small>
                                                            {errors.district_id != undefined
                                                                ? errors.district_id[0]
                                                                : null}
                                                        </small>
                                                    </p>
                                                </label>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="w-100 mt-4">
                                                    <p>Select Area</p>
                                                    <select
                                                        className={
                                                            errors.area_id != undefined
                                                                ? "form-select mt-2 is-invalid"
                                                                : "form-select mt-2"
                                                        }
                                                        name={"area_id"}
                                                        value={input.area_id}
                                                        onChange={handleInput}
                                                        disabled={Object.keys(areas).length < 1}
                                                    >
                                                        <option>Select area</option>
                                                        {areas.map((area, index) => (
                                                            <option key={index} value={area.id}>{area.name}</option>
                                                        ))}
                                                    </select>
                                                    <p className={"login-error-msg"}>
                                                        <small>
                                                            {errors.area_id != undefined
                                                                ? errors.area_id[0]
                                                                : null}
                                                        </small>
                                                    </p>
                                                </label>
                                            </div>
                                            
                                            <div className="col-md-12">
                                                <label className="w-100 mt-4">
                                                    <p>
                                                        Landmark
                                                    </p>
                                                    <input
                                                        className={
                                                            errors.landmark != undefined
                                                                ? "form-control mt-2 is-invalid"
                                                                : "form-control mt-2"
                                                        }
                                                        type={"text"}
                                                        name={"landmark"}
                                                        value={input.landmark}
                                                        onChange={handleInput}
                                                        placeholder={"Enter Sales Manager  landmark"}
                                                    />
                                                    <p className={"login-error-msg"}>
                                                        <small>
                                                            {errors.landmark != undefined
                                                                ? errors.landmark[0]
                                                                : null}
                                                        </small>
                                                    </p>
                                                </label>
                                            </div>
                                            <div className="col-md-12">
                                                <label className="w-100 mt-4">
                                                    <p>BIO</p>
                                                    <textarea
                                                        className={
                                                            errors.bio != undefined
                                                                ? "form-control mt-2 is-invalid"
                                                                : "form-control mt-2"
                                                        }
                                                        name={"bio"}
                                                        value={input.bio}
                                                        onChange={handleInput}
                                                        placeholder={"Enter Sales Manager bio data"}
                                                    ></textarea>
                                                    <p className={"login-error-msg"}>
                                                        <small>
                                                            {errors.bio != undefined
                                                                ? errors.bio[0]
                                                                : null}
                                                        </small>
                                                    </p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row justify-content-center">
                                        <div className="col-md-4">
                                            <div className="d-grid mt-4">
                                                <button
                                                    onClick={handleShopCreate}
                                                    className={"btn theme-button"}
                                                    dangerouslySetInnerHTML={{
                                                        __html: isLoading
                                                            ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Add Shop...'
                                                            : "Add Shop",
                                                    }}
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
  )
}

export default AddSalesManger
import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../partoals/Breadcrumb";
import Constants from "../../../Constants";
import Swal from "sweetalert2";
import CardHeader from "../../partoals/miniComponents/CardHeader";

const ChildSubCategoryEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({ status: 1 });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const getSubCategories = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${Constants.BASE_URL}/get-sub-category-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSubCategories(res.data);
      });
  };

  const getChildSubCategory = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${Constants.BASE_URL}/child-sub-category/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setInput(res.data.data);
      });
  };

  const handleInput = (e) => {
  if (e.target.name === 'name') {
    let slug = e.target.value
    slug = slug.toLowerCase()
    slug = slug.replaceAll(' ', '-')
    setInput((prevState) => ({ ...prevState, slug: slug }))
  } else if (e.target.name === 'status') { // Handle status field
    setInput((prevState) => ({ ...prevState, [e.target.name]: parseInt(e.target.value) }));
  } else {
    setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }
};

  const handlePhoto = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setInput((prevState) => ({ ...prevState, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleCategoryUpdate = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    axios
      .put(`${Constants.BASE_URL}/child-sub-category/${params.id}`, input, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
        navigate("/sub-category");
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  useEffect(() => {
    getSubCategories();
    getChildSubCategory();
  }, []);

  return (
    <>
      <Breadcrumb title={"Edit Child Sub Category"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Edit Child Sub Category"}
                link={"/child-sub-category"}
                icon={"fa-list"}
                button_text={"List"}
              />
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Select Sub Category</p>
                    <select
                      className={
                        errors.sub_category_id != undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"sub_category_id"}
                      value={input.sub_category_id}
                      onChange={handleInput}
                      placeholder={"Select sub category"}
                    >
                      <option value={""}>Select Sub Category</option>{" "}
                      {/* Placeholder option */}
                      {subCategories.map((sub_category, index) => (
                        <option key={index} value={sub_category.id}>
                          {sub_category.name}
                        </option>
                      ))}
                    </select>
                    <p className={"login-error-msg"}>
                      <small>
                        {errors.sub_category_id != undefined
                          ? errors.sub_category_id[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="w-100 mt-4">
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
                      placeholder={"Enter sub category Name"}
                    />
                    <p className={"login-error-msg"}>
                      <small>
                        {errors.name != undefined ? errors.name[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Slug</p>
                    <input
                      className={
                        errors.slug != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      type={"text"}
                      name={"slug"}
                      value={input.slug}
                      onChange={handleInput}
                      placeholder={"Enter Sub category slug"}
                    />
                    <p className={"login-error-msg"}>
                      <small>
                        {errors.slug != undefined ? errors.slug[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Serial</p>
                    <input
                      className={
                        errors.serial != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      type={"number"}
                      name={"serial"}
                      value={input.serial}
                      onChange={handleInput}
                      placeholder={"Enter Sub category serial"}
                    />
                    <p className={"login-error-msg"}>
                      <small>
                        {errors.serial != undefined ? errors.serial[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
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
                        {errors.status != undefined ? errors.status[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Description</p>
                    <textarea
                      className={
                        errors.serial != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      name={"description"}
                      value={input.description}
                      onChange={handleInput}
                      placeholder={"Enter Sub category description"}
                    ></textarea>
                    <p className={"login-error-msg"}>
                      <small>
                        {errors.description != undefined
                          ? errors.description[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
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
                      placeholder={"Enter sub category photo"}
                    />
                    <p className={"login-error-msg"}>
                      <small>
                        {errors.photo != undefined ? errors.photo[0] : null}
                      </small>
                    </p>
                  </label>
                  {input.photo != undefined ||
                  input.photo_preview != undefined ? (
                    <div className="row">
                      <div className="col-6">
                        <div className="photo-preview mt-3">
                          <img
                            alt={"Hometex sub Category"}
                            src={
                              input.photo == undefined
                                ? input.photo_preview
                                : input.photo
                            }
                            className={"img-thumbnail aspect-one"}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="col-md-12">
                  <div className="row justify-content-center">
                    <div className="col-md-4">
                      <div className="d-grid mt-4">
                        <button
                          onClick={handleCategoryUpdate}
                          className={"btn theme-button"}
                          dangerouslySetInnerHTML={{
                            __html: isLoading
                              ? '<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Update Sub Category...'
                              : "Update Sub Category",
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
  );
};

export default ChildSubCategoryEdit;

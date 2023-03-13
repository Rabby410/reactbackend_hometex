import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Breadcrumb from "../../partoals/Breadcrumb";
import Constants from "../../../Constants";

export default function AddCategory() {

  const [input, setInput] = useState({ status : 1})
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const handleInput = (e) => {
    if(e.target.name == 'name'){
      let slug = e.target.value
      slug = slug.toLowerCase()
      slug = slug.replaceAll(' ', '-')
      setInput(prevState => ({ ...prevState, slug: slug }))
    }
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const handlePhoto = (e) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.onloadend = () => {
      setInput(prevState => ({ ...prevState, photo: reader.result }))
    }
    reader.readAsDataURL(file)
  }
  const handleCategoryCreate = () => {
    setIsLoading(true)
    axios.post(`${Constants.BASE_URL}/category`, input).then(res=>{
      setIsLoading(false)
      console.log(res.data)
    }).catch(errors =>
      {
          setIsLoading(false)
          if(errors.response.status == 422 ){
              setErrors(errors.response.data.errors)
          }
      })
  }

  return (
    <>
      <Breadcrumb title={"Add Category"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-theme">Add Category</h4>
                <button className="btn theme-button">
                  <Link to="/category" className="">
                    <i className="fa-solid fa-list"></i>Category List
                  </Link>
                </button>
              </div>
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
                      placeholder={'Enter category Name'}
                    />
                    <p className={'login-error-msg'}><small>{errors.name != undefined ? errors.name[0] : null}</small></p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Slug</p>
                    <input
                      className={errors.slug != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                      type={'text'}
                      name={'slug'}
                      value={input.slug}
                      onChange={handleInput}
                      placeholder={'Enter category slug'}
                    />
                    <p className={'login-error-msg'}><small>{errors.slug != undefined ? errors.slug[0] : null}</small></p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Serial</p>
                    <input
                      className={errors.serial != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                      type={'number'}
                      name={'serial'}
                      value={input.serial}
                      onChange={handleInput}
                      placeholder={'Enter category serial'}
                    />
                    <p className={'login-error-msg'}><small>{errors.serial != undefined ? errors.serial[0] : null}</small></p>
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
                      placeholder={'Enter category description'}
                    />
                    <p className={'login-error-msg'}><small>{errors.description != undefined ? errors.description[0] : null}</small></p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="w-100 mt-4">
                    <p>Photo</p>
                    <input
                      className={errors.photo != undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                      type={'file'}
                      name={'photo'}
                      onChange={handlePhoto}
                      placeholder={'Enter category photo'}
                    />
                    <p className={'login-error-msg'}><small>{errors.photo != undefined ? errors.photo[0] : null}</small></p>
                  </label>
                  {
                    input.photo != undefined ?
                    <div className="row">
                    <div className="col-6">
                      <div className="photo-preview mt-3">
                        <img alt={"Hometex Category"} src={input.photo} className={'img-thumbnail aspect-one'} />
                      </div>
                    </div>
                  </div> : null
                  }
                </div>
                <div className="col-md-12">
                  <div className="row justify-content-center">
                    <div className="col-md-4">
                      <div className="d-grid mt-4">
                        <button onClick={handleCategoryCreate} className={"btn theme-button"} 
                        dangerouslySetInnerHTML={{ __html: isLoading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Add Category...':'Add Category' }}
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
}

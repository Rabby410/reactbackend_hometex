import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Login() {
    const[input, setInput] = useState({})
    const[errors, setErrors] = useState([])
    const[isLoading, setIsLoading] = useState(true)


    const handleInput = (e) => setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
       
    const handleLogin = () => {
        axios.post('http://localhost:8000/api/login', input).then(res=>{
            localStorage.email = res.data.email
            localStorage.phone = res.data.phone
            localStorage.name = res.data.name
            localStorage.photo = res.data.photo
            localStorage.token = res.data.token
            window.location.reload()
        }).catch(errors =>
            {
                if(errors.response.status == 422 ){
                    setErrors(errors.response.data.errors)
                }
            })
    }

   

  return (
    <div className="container-flude bg-theme" id={'login'}>
        <div className="row">
        <div className="col-md-6">
        <div className="card bg-theme">
        <div className="card-header">
            <h4>Login</h4>
        </div>
        <div className="card-body">
            <label className={'w-100'}>
                <p>Email / Phone</p>
                <input 
                className={'form-control mt-2'} 
                type={'text'} 
                name={'email'} 
                value={input.email} 
                onChange={handleInput} 
                />
            <p className={'login-error-msg'}><small>{errors.email != undefined ? errors.email[0]: null}</small></p>
            </label>
            <label className={'w-100 mt-4'}>
                <p>Password</p>
                <input 
                className={'form-control mt-2'} 
                type={'password'} 
                name={'password'} 
                value={input.password} 
                onChange={handleInput} 
                />
            <p className={'login-error-msg'}><small>{errors.password != undefined ? errors.password[0]: null}</small></p>
            </label>
            <div className="d-grid mt-4">
                <button onClick={handleLogin} className={'brn btn-outline-warning'}>Login</button>
            </div>
        </div>

        </div>
        </div>
        </div>
    </div>
  )
}

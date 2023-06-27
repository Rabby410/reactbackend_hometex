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
    const [priceFormula, setPriceFormula] = useState([])

    const getPriceFormula = () => {
        const token = localStorage.getItem('token');
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${Constants.BASE_URL}/priceFormula/${params.id}`,
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
        if (e.target.name === 'name') {
            let slug = e.target.value
            slug = slug.toLowerCase()
            slug = slug.replaceAll(' ', '-')
            setInput(prevState => ({ ...prevState, slug: slug }))
        }
        setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handlePriceFormulaUpdate = () => {
        const token = localStorage.getItem('token');
        setIsLoading(true);
        if (token) {
          const config = {
            method: 'put',
            url: `${Constants.BASE_URL}/priceFormula/${params.id}`,
            headers: {
              'Authorization': `Bearer ${token}`
            },
            data: input // assuming input is defined elsewhere
          };
      
          axios(config)
            .then((res) => {
              setIsLoading(false);
              Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
              });
              navigate('/price_formula');
            })
            .catch((error) => {
              setIsLoading(false);
              if (error.response.status === 422) {
                setErrors(error.response.data.errors);
              }
            });
        }
      };
      

    useEffect(() => {
        getPriceFormula()
    }, [])
  return (
    <>
    <Breadcrumb title={"Edit Price Formula"} />
    <div className="row">
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <CardHeader
                        title={'Edit Price Formula'}
                        link={'/price_formula'}
                        icon={'fa-list'}
                        button_text={'List'}
                    />
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default PriceFormulaEdit
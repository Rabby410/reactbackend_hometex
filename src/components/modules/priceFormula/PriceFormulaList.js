import React, { useEffect, useState } from "react";
import Breadcrumb from "../../partoals/Breadcrumb";
import CardHeader from "../../partoals/miniComponents/CardHeader";
import axios from "axios";
import Swal from 'sweetalert2'
import Constants from "../../../Constants";
import CategoryPhotoModal from "../../partoals/modals/CategoryPhotoModal";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import CategoryDetailsModal from "../../partoals/modals/CategoryDetailsModal";
import Loader from "../../partoals/miniComponents/Loader";
import NoDataFound from "../../partoals/miniComponents/NoDataFound";

const PriceFormulaList = () => {
    const [input, setInput] = useState({
        order_by: 'serial',
        per_page: 10,
        direction: 'asc',
        search: '',
    });

    const [itemsCountsPerPage, setItemsCountPerPage] = useState(0);
    const [totalCountsPerPage, setTotalCountPerPage] = useState(1);
    const [startFrom, setStartFrom] = useState(1);
    const [activePage, setActivePage] = useState(1);

    const [modalShow, setModalShow] = React.useState(false);
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const [categories, setCategories] = useState([]);

    const handleInput = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const getCategories = (pageNumber = 1) => {
        const token = localStorage.getItem('token');
        const url = `${Constants.BASE_URL}/price_formula?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`;
      
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
      
        setIsLoading(true);
        setCategories([]); // set a default value
      
        axios.request(config)
          .then((res) => {
            setCategories(res.data.data);
            setItemsCountPerPage(res.data.meta.per_page);
            setStartFrom(res.data.meta.from);
            setTotalCountPerPage(res.data.meta.total);
            setActivePage(res.data.meta.current_page);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
          });
      };
    const handleDetailsModal = (price_formula) => {
        setCategory(price_formula);
        setModalShow(true);
    };
    const handleCategoryDelete = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You want to delete the category!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, DELETE IT!',
        }).then((result) => {
          if (result.isConfirmed) {
            const token = localStorage.getItem('token');
      
            const config = {
              method: 'delete',
              url: `${Constants.BASE_URL}/price_formula/${id}`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
      
            axios(config)
              .then((response) => {
                console.log(JSON.stringify(response.data));
                getCategories();
                Swal.fire({
                  position: 'top-end',
                  icon: response.data.cls,
                  title: response.data.msg,
                  showConfirmButton: false,
                  toast: true,
                  timer: 1500,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      };
      

    useEffect(() => {
        getCategories();
    }, []);
  return (
    <>
    <Breadcrumb title={"Price Formula List"} />
    <div className="row">
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <CardHeader
                        title={"Price Formula List"}
                        link={"/price_formula/create"}
                        icon={"fa-add"}
                        button_text={"Add"}
                    />
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default PriceFormulaList
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

function CategoryList() {
    const [input, setInput] = useState({
        order_by: 'serial',
        per_page: 10,
        direction: 'asc',
        search: '',
    });

    const [itemsCountsPerPage, setItemsCountPerPage] = useState(0);
    const [toltalCountsPerPage, setTotlaCountPerPage] = useState(1);
    const [startFrom, setStartFrom] = useState(1);
    const [activePage, setActivePage] = useState(1);

    const [modalShow, setModalShow] = React.useState(false);
    const [modalPhotoShow, setModalPhotoShow] = React.useState(false);
    const [category, setCategory] = useState([]);
    const [modalPhoto, setModalPhoto] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const [categories, setCategories] = useState([]);

    const handleInput = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const getCategories = (pageNumber = 1) => {
        setIsLoading(true)
        axios
            .get(`${Constants.BASE_URL}/category?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`)
            .then((res) => {
                setCategories(res.data.data);
                setItemsCountPerPage(res.data.meta.per_page);
                setStartFrom(res.data.meta.from);
                setTotlaCountPerPage(res.data.meta.total);
                setActivePage(res.data.meta.current_page);
                setIsLoading(false)
            });
    };

    const handlePhotoModal = (photo) => {
        setModalPhoto(photo);
        setModalPhotoShow(true);
    };
    const handleDetailsModal = (category) => {
        setCategory(category);
        setModalShow(true);
    };
    const handleCategoryDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete the Category!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, DELETE IT!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Constants.BASE_URL}/category/${id}`).then(res => {
                    getCategories()
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
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <Breadcrumb title={"Category List"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader
                                title={"Category list"}
                                link={"/category/create"}
                                icon={"fa-add"}
                                button_text={"Add"}
                            />
                        </div>
                        <div className="search-area mb-4 mx-3">
                            <div className="row">
                                <div className="col-md-3">
                                    <label className={"w-100"}>
                                        <p>Search</p>
                                        <input
                                            className="form-control form-control-sm"
                                            type={"search"}
                                            name={"search"}
                                            value={input.search}
                                            onChange={handleInput}
                                            placeholder={"Enter category Name"}
                                        />
                                    </label>
                                </div>

                                <div className="col-md-2">
                                    <label className={"w-100"}>
                                        <p>Order By</p>
                                        <select
                                            className="form-select form-control-sm"
                                            name={"order_by"}
                                            value={input.order_by}
                                            onChange={handleInput}
                                        >
                                            <option value={"name"}>Name</option>
                                            <option value={"serial"}>Serial</option>
                                            <option value={"status"}>Status</option>
                                            <option value={"created_at"}>Created At</option>
                                            <option value={"updated_at"}>Updated At</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="col-md-2">
                                    <label className={"w-100"}>
                                        <p>Order Direction</p>
                                        <select
                                            className="form-select form-control-sm"
                                            name={"direction"}
                                            value={input.direction}
                                            onChange={handleInput}
                                        >
                                            <option value={"asc"}>ASC</option>
                                            <option value={"desc"}>DESC</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="col-md-2">
                                    <label className={"w-100"}>
                                        <p>Per Page</p>
                                        <select
                                            className="form-select form-control-sm"
                                            name={"per_page"}
                                            value={input.per_page}
                                            onChange={handleInput}
                                        >
                                            <option value={10}>10</option>
                                            <option value={25}>25</option>
                                            <option value={100}>100</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="col-md-2">
                                    <div className="d-grid mt-4">
                                        <button
                                            onClick={() => getCategories(1)}
                                            className={"btn theme-button"}
                                        >
                                            <i class="fa-solid fa-magnifying-glass"></i>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                        {isLoading ? <Loader/> :

                        <div className="table-responsive soft-landing">
                                <table className={"my-table table table-hover table-striped table-bordered"}>
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Name /Slug</th>
                                            <th>Serial / Status</th>
                                            <th>Photo</th>
                                            <th>Created By</th>
                                            <th>Date Time</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {Object.keys(categories).length > 0 ? categories.map((category, number) => (
                                            <tr key={number}>
                                                <td>{startFrom + number}</td>
                                                <td>
                                                    <p className={"text-theme"}>Name: {category.name}</p>
                                                    <p className={"text-success"}>
                                                        Slug: {category.slug}
                                                    </p>
                                                </td>
                                                <td>
                                                    <p className={"text-theme"}>{category.serial}</p>
                                                    <p className={"text-success"}>{category.status}</p>
                                                </td>
                                                <td>
                                                    <img
                                                        onClick={() =>
                                                            handlePhotoModal(category.photo_full)
                                                        }
                                                        src={category.photo}
                                                        alt={category.name}
                                                        className={"img-thumbnail table-image"}
                                                    />
                                                </td>
                                                <td>{category.created_by}</td>
                                                <td>
                                                    <p className={"text-theme"}>{category.created_at}</p>
                                                    <p className={"text-success"}>
                                                        {category.updated_at}
                                                    </p>
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() =>
                                                            handleDetailsModal(category)
                                                        }
                                                        className={"btn btn-sm my-1 btn-info"}><i class="fa-solid fa-eye"></i></button>
                                                    <Link to={`/category/edit/${category.id}`}><button className={"btn btn-sm my-1 mx-1 btn-warning"}><i class="fa-solid fa-pen-to-square"></i></button></Link>
                                                    <button onClick={() => handleCategoryDelete(category.id)} className={"btn btn-sm my-1 btn-danger"}><i class="fa-solid fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        )): <NoDataFound/>}
                                    </tbody>
                                </table>
                                <CategoryPhotoModal
                                    show={modalPhotoShow}
                                    onHide={() => setModalPhotoShow(false)}
                                    title={"Category Picture"}
                                    size={""}
                                    photo={modalPhoto}
                                />
                                <CategoryDetailsModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    title={"Category Details"}
                                    size={""}
                                    category={category}
                                />
                            </div>
                        }

                        </div>
                        <div className="card-footer">
                            <nav className={"pagination-sm"}>
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountsPerPage}
                                    totalItemsCount={toltalCountsPerPage}
                                    pageRangeDisplayed={5}
                                    onChange={getCategories}
                                    firstPageText={"First"}
                                    nextPageText={"Next"}
                                    prevPageText={"Previous"}
                                    lastPageText={"Last"}
                                    itemClass={"page-item"}
                                    linkClass={"page-link"}
                                />
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryList;

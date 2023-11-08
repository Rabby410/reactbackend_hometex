import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../../partoals/Breadcrumb';
import Constants from '../../../Constants';
import CardHeader from '../../partoals/miniComponents/CardHeader';
import { useReactToPrint } from 'react-to-print'; // Import the hook
import BarCodePage from './BarCodePage';

const BarCode = () => {
    const componentRef = useRef();
    const [columnCount, setColumnCount] = useState(1);
    const [input, setInput] = useState({
        name: '',
        sub_category_id: '',
        category_id: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const handleInput = (e) => {
        if (e.target.name === 'category_id') {
            let category_id = parseInt(e.target.value);
            if (!Number.isNaN(category_id)) {
                getSubCategories(e.target.value);
            }
        }

        setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleProductSearch = () => {
        const token = localStorage.getItem('token');
        axios
            .get(
                `${Constants.BASE_URL}/get-product-list-for-bar-code?name=${input?.name}&category_id=${input?.category_id}&sub_category_id=${input?.sub_category_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                setProducts(res.data.data);
            });
    };

    const getCategories = () => {
        const token = localStorage.getItem('token');
        axios
            .get(`${Constants.BASE_URL}/get-category-list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setCategories(res.data);
            });
    };

    const getSubCategories = (category_id) => {
        const token = localStorage.getItem('token');
        axios
            .get(`${Constants.BASE_URL}/get-sub-category-list/${category_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setSubCategories(res.data);
            });
    };

    useEffect(() => {
        getCategories();
    }, []);

    // Define the print function
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Bar Codes',
    });

    return (
        <>
            <style>
                {`
                @page {
                    size: auto;
                    margin: 0;
                }
                `}
            </style>
            <Breadcrumb title={'Generate or Create Barcode'} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader
                                title={'Generate or Create Barcode'}
                                link={'/products'}
                                icon={'fa-list'}
                                button_text={'product List'}
                                hide={true}
                            />
                        </div>

                        <div className="card-body">
                            <div className="row align-items-baseline">
                                <div className="col-md-3">
                                    <label className="w-100 mt-4 mt-md-0">
                                        <p>Select Product Category</p>
                                        <select
                                            className={'form-select mt-2'}
                                            name={'category_id'}
                                            value={input.category_id}
                                            onChange={handleInput}
                                            placeholder={"Select Product Category"}
                                        >
                                            <option>Select Category</option>
                                            {categories.map((category, index) => (
                                                <option value={category.id} key={index}>{category.name}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className="col-md-3">
                                    <label className="w-100 mt-4 mt-md-0">
                                        <p>Select Product Sub Category</p>
                                        <select
                                            className={'form-select mt-2'}
                                            name={'sub_category_id'}
                                            value={input.sub_category_id}
                                            onChange={handleInput}
                                            placeholder={"Select Product Sub Category"}
                                            disabled={input.category_id == undefined}
                                        >
                                            <option>Select Sub Category</option>
                                            {subCategories.map((sub_category, index) => (
                                                <option value={sub_category.id} key={index}>{sub_category.name}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className="col-md-4">
                                    <label className="w-100 mt-4 mt-md-0">
                                        <p>Product Name</p>
                                        <input
                                            className={'form-control mt-2'}
                                            type={'search'}
                                            name={'name'}
                                            value={input.name}
                                            onChange={handleInput}
                                            placeholder={'Enter product name'}
                                        />
                                    </label>
                                </div>
                                <div className="col-md-2 ">
                                    <div className="d-grid mt-4">
                                        <button onClick={handleProductSearch} className={"btn theme-button"}
                                            dangerouslySetInnerHTML={{ __html: isLoading ? '<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' : 'Search' }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col-md-3">
                                    <label className="w-100 mt-4 mt-md-0">
                                        <p>Column Count</p>
                                        <input
                                            className={'form-control mt-2'}
                                            type={'number'}
                                            name={'column_count'}
                                            value={columnCount}
                                            onChange={(e) => setColumnCount(parseInt(e.target.value))}
                                            placeholder={'Enter column count'}
                                        />
                                    </label>
                                </div>
                                <div className="col-md-3">
                                    <div className="d-grid mt-4">
                                        <button onClick={handlePrint} className={"btn btn-sm btn-success"}>
                                            Print This Out!
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="bar-code-area-wraper">
                                <BarCodePage
                                    products={products}
                                    columnCount={columnCount}
                                    printing={true}
                                    rowCount={Math.ceil(products.length / columnCount)}
                                    ref={componentRef}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BarCode;
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../partoals/Breadcrumb";
import CardHeader from "../../../partoals/miniComponents/CardHeader";
import axios from "axios";
import Swal from "sweetalert2";
import Constants from "../../../../Constants";
import Loader from "../../../partoals/miniComponents/Loader";
import NoDataFound from "../../../partoals/miniComponents/NoDataFound";
import { Link } from "react-router-dom";

const ProductTransferForm = ({ product, fromShop, toShop }) => {
    const [formData, setFormData] = useState({
        product_id: "",
        from_shop_id: "",
        to_shop_id: "",
        quantity: 1, // Set an initial quantity
    });

    const handleInputChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = event => {
        event.preventDefault();

        axios.post('/api/transfers', formData)
            .then(response => {
                console.log(response.data);
                // You can update the UI or close the form after a successful transfer
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <>
            <Breadcrumb title={"Product Transfer Form"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader
                                title={"Product Transfer Form"}
                                link={"/products"}
                                icon={"fa-list"}
                                button_text={"Product List"}
                            />
                        </div>

                        <div className="card-body">
                            <div>
                                <h2>Transfer Product</h2>
                                <p>Product: {""}</p>
                                <p>From Shop: {""}</p>
                                <p>To Shop: {""}</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="quantity">Quantity:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="quantity"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3">
                                        Transfer
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductTransferForm
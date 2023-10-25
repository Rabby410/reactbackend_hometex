import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../partoals/Breadcrumb";
import CardHeader from "../../../partoals/miniComponents/CardHeader";
import axios from "axios";
import Swal from "sweetalert2";
import Constants from "../../../../Constants";
import Loader from "../../../partoals/miniComponents/Loader";
import NoDataFound from "../../../partoals/miniComponents/NoDataFound";
import { Link } from "react-router-dom";

const ProductTransferList = () => {
    return (
        <>
            <Breadcrumb title={"Product Transfer List"} />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader
                                title={"Product Transfer list"}
                                link={"/products"}
                                icon={"fa-list"}
                                button_text={"Product List"}
                            />
                        </div>

                        <div className="card-body">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductTransferList
import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from 'axios';
import Breadcrumb from "../../partoals/Breadcrumb";
import Constants from "../../../Constants";
import Swal from 'sweetalert2'
import CardHeader from "../../partoals/miniComponents/CardHeader";

const OrderList = () => {

  return (
    <>
      <Breadcrumb title={"Orders List"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
              title={'Orders List'}
              link={'/orders/create'}
              icon={'fa-plus'}
              button_text={'Add'}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderList
import React, { useEffect, useState } from "react";
import Barcode from "react-barcode";
import GlobalFunction from "../../../assets/GlobalFunction";
import "../../../assets/css/PrintInvoice.css";

const GiftInvoicePrint = ({ order, taxType }) => {
  const branch = JSON.parse(localStorage.getItem("branch"));
  const branchId = branch ? branch.id : null;
  const getBinNumber = (branchId) => {
    if (branchId === "9") {
      return "BIN: 004782306-0202";
    } else if (branchId === "8") {
      return "BIN: aaaac";
    } else if (branchId === "7") {
      return "BIN: 004734043-0101";
    }
    return "BIN : 004782306-0202";
  };

  const binNumber = getBinNumber(branchId);

  const totalOrders = order?.order_details.length;
  const ordersSubtotal = order?.total + order?.discount;
  const vat = order?.total * taxType;

  let totalQuantity = 0;
  order?.order_details.forEach((product) => {
    totalQuantity += product?.quantity;
  });
  let vatRateText;
  if (taxType == 0.075) {
    vatRateText = "7.5%";
  } else if (taxType == 0.05) {
    vatRateText = "5.0%";
  } else {
    // Handle other tax types here if needed
    vatRateText = "0.0%";
  }

  return (
    <div style={{padding: '0px', margin: '0px'}}>
      <div id="invoice-POS">
        <center id="top">
          <div className="logo"></div>
        </center>
        <div id="invoice-POS">
          <center id="top" style={{ textAlign: "center" }}>
            <div className="logo"></div>
            <div className="info">
              <img
                src="/static/media/hometex-logo.6cb4a390c04e43ae0736.png"
                alt={"shop Logo"}
                className="img-fluid"
                style={{
                  WebkitFilter: "grayscale(100%);",
                  filter: "grayscale(100%)",
                }}
              />
              <h2>Hometex Bangladesh</h2>
            </div>
          </center>
          <div id="mid">
            <div className="info">
              <div style={{ textAlign: "center" }}>
                <span>GIFT MEMO</span>
                <hr />
                <span style={{ textAlign: "center" }}>{binNumber}</span>
                <br />
                {order?.shop?.name}
              </div>
              <div>
                <br />
                User: {order?.sales_manager?.name}
                <br />
                Date: {order?.created_at}
                <br />
                Receipt No: {order?.order_number}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div style={{ textAlign: "justify" }}>
          Items may be exchanged subject to Hometex Bangladesh Sales & Exchange
          Policies within 15 days of Invoice Date. An item may be exchanged only
          once. An item must be unworn, unwashed, undamaged and unused [Fairly
          Enough Condition]. No Cash Refund is Applicable.
          <hr />
          Shop Online: www.hometex.ltd
          <br />
          Queries & Complaints: +8809610963839
          <br />
          Suggestions: support@hometex.ltd
        </div>
        <p style={{ textAlign: "center" }}>
          <Barcode value={order?.order_number} height={30} />
        </p>
      </div>
    </div>
  );
};

export default GiftInvoicePrint;

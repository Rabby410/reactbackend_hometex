import React from "react";
import Barcode from 'react-barcode';
import GlobalFunction from "../../../assets/GlobalFunction";

const tableCellStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const tdCellStyle = {
  border: "1px solid #000",
  padding: "8px",
};
const rightAlignedTdCellStyle = {
    ...tdCellStyle,
    textAlign: "right",
  };
  
const PrintInvoice = ({ order }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div id="invoice-POS">
        <center id="top">
          <div className="logo"></div>
        </center>
        <div id="invoice-POS">
          <center id="top">
            <div class="logo"></div>
            <div class="info">
              <img
                src={order?.shop?.logo}
                alt={"shop Logo"}
                className="img-fluid"
              />
              <h2>Hometex Bangladesh</h2>
            </div>
          </center>
          <div id="mid">
            <div class="info">
                <h5>{order?.shop?.address?.address}</h5>
                <p className="m-0">
                Email: {order?.shop?.email}<br/>
                Contact: {order?.shop?.phone}
                </p>
                <p className="bordered">Vat Reg: 004782306-0202</p>
            </div>
          </div>
          <table style={tableCellStyle}>
            <thead>
              <tr>
                <th style={tdCellStyle}>SL</th>
                <th style={tdCellStyle}>Name</th>
                <th style={tdCellStyle}>Quantity</th>
                <th style={tdCellStyle}>Amounts</th>
                <th style={tdCellStyle}>Sub Total</th>
              </tr>
            </thead>
            <tbody>
              {order?.order_details.map((product, index) => (
                <tr key={index}>
                  <td style={tdCellStyle}> {++index}</td>
                  <td style={tdCellStyle}>
                    <p>{product.name}<br /> {product.sku}</p>
                  </td>
                  <td style={tdCellStyle}>{product?.quantity}</td>
                  <td style={tdCellStyle}>
                    <p>Price : {product?.price}
                    <br/>
                    Discount :{" "}
                      {GlobalFunction.formatPrice(
                        product?.sell_price?.discount
                      )}
                    </p>
                  </td>
                  <td style={tdCellStyle}>
                    {GlobalFunction.formatPrice(
                      product?.sell_price?.price * product?.quantity
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={4} style={rightAlignedTdCellStyle}>Total</td>
                <td style={tdCellStyle}>{GlobalFunction.formatPrice(order?.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ textAlign: "center" }}><Barcode value={order?.order_number} width={2} format="CODE128" height={30} font="monospace"/></p>
        <div style={{ textAlign: "center" }}>
          <p>
            Contact: {order?.shop?.phone}
          </p>
          <p>Note: Thank you for Coming to Hometex Bangladesh & we look forward to serve you again!</p>
          <p>Please visit: https://hometex.ltd/ VAT payable at Center Registration</p>
        </div>
      </div>
    </div>
  );
};

export default PrintInvoice;

import React from "react";
import Barcode from "react-barcode";
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
const leftAlignedTdCellStyle = {
  textAlign: "left",
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
              {/* <h5>{order?.shop?.address?.address}</h5> */}
              <div style={leftAlignedTdCellStyle}>
                Govt. of the People's Republic of Bangladesh. National Board of
                Revenue Tax Invoice (MUSAK-6.3)
                <br />
                [Clauses(c)&(f) of Sub-rules(1) of Rule 40]
                <br />
                BIN: 004782306-0202
                <br />
                {order?.shop?.name}
              </div>
              <div style={leftAlignedTdCellStyle}>
                <br />
                User: {order?.sales_manager?.name}
                <br />
                Date: {order?.created_at}
                <br />
                Receipt No: {order?.order_number}
              </div>
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
                    <p>
                      {product.name}
                      <br /> {product.sku}
                    </p>
                  </td>
                  <td style={tdCellStyle}>{product?.quantity}</td>
                  <td style={tdCellStyle}>
                    <p>
                      Price : {product?.price}
                      <br />
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
                <td colSpan={4} style={rightAlignedTdCellStyle}>
                  Total
                </td>
                <td style={tdCellStyle}>
                  {GlobalFunction.formatPrice(order?.total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={leftAlignedTdCellStyle}>
          <p className="text-uppercase">
            Mode of Payment <br /> .................................
            <br />
            <span>{order?.payment_method?.name}</span> :{" "}
            {GlobalFunction.formatPrice(order?.paid_amount)}
          </p>
        </div>
        <div style={leftAlignedTdCellStyle}>
          <p className="text-uppercase">
            Customer:
            <br />
            Name: {order?.customer?.name}
            <br />
            Contact: {order?.customer?.phone}
          </p>
          ...................................
        </div>
        <div style={leftAlignedTdCellStyle}>
          <p>
            Items may be exchanged subject to Hometex Bangladesh Sales &
            Exchange Policies within 15 days of Invoice Date. An item may be
            exchanged only once. An item must be unworn, unwashed, undamaged and
            unused [Fairly Enough Condition]. No Cash Refund is Applicable.
            <br />
            ...................................
            <br />
            VAT Note: 7.5% VAT on ready-made products. No VAT on jute items.
            <br />
            Shop Online: www.hometex.ltd Queries & Complaints: +8809610963839
            <br/>
            Suggestions: support@hometex.ltd
          </p>
        </div>
        <p style={{ textAlign: "center" }}>
          <Barcode
            value={order?.order_number}
            width={2}
            format="CODE128"
            height={30}
            font="monospace"
          />
        </p>
      </div>
    </div>
  );
};

export default PrintInvoice;

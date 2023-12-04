import React, { useEffect, useState } from 'react';
import Barcode from 'react-barcode';
import GlobalFunction from '../../../assets/GlobalFunction';

const TruncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

const calculatePrice = (sell_price) => {
    if (sell_price.discount !== 0) {
        const mainPrice = sell_price.price;
        const symbol = "+";
        const number = 5;

        const calculatedPrice = mainPrice + number;
        return `${calculatedPrice} ${sell_price.symbol}`;
    }

    return `${sell_price.price} ${sell_price.symbol}`;
};


const RenderAttributes = ({ product }) => {
    if (product.attributes && product.attributes.length > 0) {
        const desiredAttribute = product.attributes.find(attribute => attribute.name === "Measurement:");

        if (desiredAttribute && desiredAttribute.values) {
            const { name: attributeName, values: { name: attributeValue } } = desiredAttribute;

            return (
                <p>
                    {`${attributeName}: ${attributeValue}`}
                </p>
            );
        }
    }

    return null;
};



// Inside BarCodePage component
const BarCodePage = ({ products, columnCount, printing, rowCount, ref, productSKU }) => {
    const [input, setInput] = useState({
        name: productSKU || '', // Set the initial value to productSKU
    });

    const pages = [];
    for (let i = 0; i < products.length; i += columnCount) {
        const pageProducts = products.slice(i, i + columnCount);
        pages.push(pageProducts);
    }

    return (
        <div className="print-page" style={{ width: '55mm', height: '25mm' }}>
            {pages.map((page, pageIndex) => (
                <div key={pageIndex} className="" ref={ref}>
                    {page.map((product, index) => (
                        <div
                            key={index}
                            className="bar-code-item"
                            style={{
                                flex: `1 0 ${100 / columnCount}%`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                fontSize: '9px',
                                letterSpacing: ".15em",
                                margin: "0px"
                            }}
                        >
                            <p>
                                <small style={{fontSize:"12px"}}><b>{product?.brand}</b></small>
                            </p>
                            <div className="barcode" style={{ textAlign: 'center', format: "CODE128" }}>
                                <Barcode value={product.sku} width={1} height={12} fontSize={8} margin={0} />
                            </div>
                            <p>
                                <strong>{TruncateText(product?.name, 20)}</strong>
                            </p>
                            <b>{product.attributes && product.attributes.length > 0 && RenderAttributes({ product })}</b>
                            <p>
                                <b>
                                    Price:
                                    {product?.sell_price?.discount !== 0
                                        ? GlobalFunction.formatPrice(product?.sell_price?.price)
                                        : ''}
                                    <span className={product?.sell_price?.discount !== 0 ? 'deleted ms-2' : ''}>
                                        {product?.price} {" + VAT"}
                                    </span>
                                </b>
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default BarCodePage;


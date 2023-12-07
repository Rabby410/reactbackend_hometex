import React, { useEffect, useState } from 'react';
import Barcode from 'react-barcode';
import GlobalFunction from '../../../assets/GlobalFunction';

const TruncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};


// Inside BarCodePage component
const BarCodePage = ({ products, columnCount, printing, rowCount, ref, productSKU, selectedAttribute }) => {
    const [input, setInput] = useState({
        name: productSKU || '', // Set the initial value to productSKU
    });

    const pages = [];
    for (let i = 0; i < products.length; i += columnCount) {
        const pageProducts = products.slice(i, i + columnCount);
        pages.push(pageProducts);
    }

    useEffect(() => {
    }, [selectedAttribute]);
    // Define a function to get the selected attribute value from product_attributes
    const getSelectedAttributeValue = (product, selectedAttr) => {
        console.log("product:", product);
        console.log("selectedAttr:", selectedAttr);
      
        if (!selectedAttr || !selectedAttr.attribute || !selectedAttr.attribute.attributes) {
          console.log("Returning empty string");
          return ''; // Return an empty string if selectedAttr or its properties are undefined
        }
      
        const matchingAttribute = product.product_attributes.find(
          attr => attr.attribute_id === selectedAttr.attribute.attributes.id
        );
      
        if (matchingAttribute) {
          return `${selectedAttr.attribute.attributes.name} - ${matchingAttribute.attribute_value.name}`;
        }
      
        return '';
      };
      
  

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
                                <small style={{ fontSize: "12px" }}><b>{product?.brand?.name}</b></small>
                            </p>
                            <div className="barcode" style={{ textAlign: 'center', format: "CODE128" }}>
                                <Barcode value={product.sku} width={1} height={12} fontSize={8} margin={0} />
                            </div>
                            <p>
                                <strong>{TruncateText(product?.name, 20)}</strong>
                            </p>
                            {getSelectedAttributeValue(product, selectedAttribute)}
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



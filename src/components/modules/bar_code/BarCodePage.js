import React from 'react';
import Barcode from 'react-barcode';
import GlobalFunction from '../../../assets/GlobalFunction';

const TruncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

const RenderAttributes = ({ product }) => {
    if (product.attributes && product.attributes.length > 0) {
        const attributeString = product.attributes.map((attribute) => {
            if (attribute && attribute.values) {
                return `${attribute.name}: ${attribute.values.name}`;
            }
            return '';
        }).join('  ');
        return (
            <p>
                {attributeString}
            </p>
        );
    }
    return null;
};


const BarCodePage = React.forwardRef((props, ref) => {
    const { products, columnCount, printing } = props;

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
                                margin: "0px",
                                letterSpacing: ".15em"
                            }}
                        >
                            <p>
                                <b><small style={{ fontSize: "12px" }}>{product?.brand}</small></b>
                            </p>
                            <div className="barcode" style={{ textAlign: 'center', format: "CODE128" }}>
                                <Barcode value={product.sku} width={1} height={20} fontSize={9} margin={2} />
                            </div>
                            <p>
                                <strong>{TruncateText(product?.name, 20)}</strong>
                            </p>
                            {/* Display attributes and their values */}
                            {product.attributes && product.attributes.length > 0 && RenderAttributes({ product })}
                            <b>
                                <p>
                                    Price:
                                    {product?.sell_price?.discount !== 0
                                        ? GlobalFunction.formatPrice(product?.sell_price?.price)
                                        : ''}
                                    <span className={product?.sell_price?.discount !== 0 ? 'deleted ms-2' : ''}>
                                        {product?.price}
                                    </span>
                                </p>
                            </b>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
});

export default BarCodePage;

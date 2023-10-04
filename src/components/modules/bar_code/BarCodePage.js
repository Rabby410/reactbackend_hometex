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
        const attributeString = product.attributes.map((attribute) => (
            `${attribute.name}: ${attribute.values.name}`
        )).join('  '); // Join attributes with double spaces
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
                            }}
                        >
                            <p>
                                <small>{product?.brand}</small>
                            </p>
                            <div className="barcode" style={{ textAlign: 'center' }}> {/* Center-align barcode */}
                                <Barcode value={product.sku} width={1} height={50} fontSize={10} />
                            </div>
                            <p>
                                <strong>{TruncateText(product?.name, 20)}</strong>
                            </p>
                            {/* Display attributes and their values */}
                            {RenderAttributes({ product })}
                            <p>
                                Price:
                                {product?.sell_price?.discount !== 0
                                    ? GlobalFunction.formatPrice(product?.sell_price?.price)
                                    : ''}
                                <span className={product?.sell_price?.discount !== 0 ? 'deleted ms-2' : ''}>
                                    {product?.price}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
});

export default BarCodePage;

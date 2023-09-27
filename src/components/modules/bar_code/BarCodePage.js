import React from 'react';
import Barcode from 'react-barcode';
import GlobalFunction from '../../../assets/GlobalFunction';

const BarCodePage = React.forwardRef((props, ref) => {
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const pages = [];
    for (let i = 0; i < props.products.length; i += props.columnCount) {
        const pageProducts = props.products.slice(i, i + props.columnCount);
        pages.push(pageProducts);
    }

    return (
        <div className="print-page">
            {pages.map((page, pageIndex) => (
                <div key={pageIndex} className="print-area" ref={ref}>
                    {page.map((product, index) => (
                        <div
                            key={index}
                            className="bar-code-item"
                            style={{
                                flex: `1 0 ${100 / props.columnCount}%`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <div className="barcode">
                                <Barcode value={product.sku} width={1} height={50} fontSize={10} />
                            </div>
                            <p>
                                <strong>{truncateText(product?.name, 20)}</strong>
                            </p>
                            <p>
                                <small>{product?.brand}</small>
                            </p>
                            <p>
                                Price:
                                {product?.sell_price?.discount !== 0
                                    ? GlobalFunction.formatPrice(product?.sell_price?.price)
                                    : ''}
                                <span className={product?.sell_price?.discount !== 0 ? 'deleted ms-2' : ''}>
                                    {product?.price}
                                </span>
                            </p>
                            <p>
                                SKU: {truncateText(product?.sku, 10)}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
});

export default BarCodePage;

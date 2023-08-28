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

    const itemsPerPage = props.columnCount * Math.floor(props.paperSize.height / 60); // Adjust 60 based on your content's height

    const pages = [];
    for (let i = 0; i < props.products.length; i += itemsPerPage) {
        const pageProducts = props.products.slice(i, i + itemsPerPage);
        pages.push(pageProducts);
    }

    return (
        <>
            {pages.map((page, pageIndex) => (
                <div
                    key={pageIndex}
                    className="print-area"
                    ref={ref}
                    style={{ width: `${props.paperSize.width}px`, height: `${props.paperSize.height}px` }}
                >
                    {page.map((product, index) => (
                        <div className="bar-code-items" key={index} style={{ width: `${100 / props.columnCount}%` }}>
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
                            <div className="barcode">
                                <Barcode value={product.sku} width={1} height={50} fontSize={10} />
                            </div>
                            <p>
                                SKU: {truncateText(product?.sku, 10)}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
});

export default BarCodePage;

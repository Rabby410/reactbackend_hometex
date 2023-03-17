import React from 'react'

const NoDataFound = () => {
  return (
    <div className={"no-data-found-container"}>
        <div className={'no-data-found text-center mt-3 w-100'}>
        <p className={"text-danger"}>
            No Data Found
        </p>
    </div>
    </div>
    );
};

export default NoDataFound;

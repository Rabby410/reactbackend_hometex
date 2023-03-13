import React from 'react'
import Breadcrumb from "../../partoals/Breadcrumb"

export default function Error500() {
  return (
    <>
    <Breadcrumb title={'Error 500'} />
      <div className="row justify-content-center">
        <div className='col-md-6'>
            <h1 className={'text-danger'}>Something is going wrong!</h1>
        </div>
        </div>

    </>
  )
}

import React from 'react'
import Modal from 'react-bootstrap/Modal';
import logo from '../../../assets/img/hometex-logo.png';
import { useState } from 'react';
import { useEffect } from 'react';
import Moment from 'react-moment';

const ShowOrderConfirmation = (props) => {
    const [branch, setBranch] = useState({})


    useEffect(()=>{
        if(localStorage.branch != undefined){
          setBranch(JSON.parse(localStorage.branch))
      
        }
      },[])
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Order Details Confirmation 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={'order-details-confirmation'}>
        <div className='row px-4r'>
            <div className='col-md-6'>
                {Object.keys(branch).length > 0? 
                <>
                <img src={logo} alt={'Hometex logo'} className={'img-thumbnail w-10'} />
                <p><strong>{branch.name}</strong></p>
                <p><address>{branch.address.address}, {branch.address.area}, {branch.address.district}, {branch.address.division}<br/> 
                Contact: {branch.phone}</address></p>
                </>:null
                }
                
                </div>
            <div className='col-md-6 text-end'>
                <h4>Order Details</h4>
                
            </div>
            <div className='col-md-12 text-end'>
                <p><strong>Date: 
                    <Moment format='YYYY/MM/DD'>
                        2023/04/01
                    </Moment>
                    </strong></p>
                <h5>Customer Details</h5>
                <p>Name: Shahadath Hossain</p>
                <p>Phone: 01309142161</p>
            </div>
            <div className='col-md-12'>
                <table className='table table-hover table-bordered table-stripped mt-4'>
                    <thead>
                        <tr>
                        <th>SL</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Sub Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Panjabi</td>
                        <td>1</td>
                        <td>2550</td>
                        <td className='text-end'>2550</td>
                        </tr>
                        <tr>
                        <td colSpan={4} className='text-end'>Sub total</td>
                        <td className='text-end'>2550</td>
                        </tr>
                        <tr>
                        <td colSpan={4} className='text-end'>Discount</td>
                        <td className='text-end'>- 50</td>
                        </tr>
                        <tr>
                        <th colSpan={4} className='text-end'>Total</th>
                        <th className='text-end'    >2500</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='px-4'>
        <button className={'btn btn-danger'} onClick={props.onHide}>Close</button>
        <button className={'btn theme-button ms-3'} onClick={props.onHide}>Confirmation</button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default ShowOrderConfirmation
import React from "react";
import { Link } from "react-router-dom";

const CardHeader = (props) => {
  return (
    <>
    <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-theme">{props.title}</h4>
                <button className="btn theme-button">
                  <Link to={props.link} >
                    <i className={`fa-solid ${props.icon}`}> </i><span className="p-2">{props.button_text}</span></Link>
                </button>
              </div>
              </>
  )
}

export default CardHeader

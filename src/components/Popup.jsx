import React from "react";

import "../styles/popup.css";

const Popup = (props) => {
  //any
  return props.active ? (
    <div className='Popup'>
      <div className='Content'>
        <h2>
          {props.error.properties.adress} {props.error.properties.description}{" "}
          error
        </h2>
        <p>{props.error.properties.message}</p>
        <button className='Button' onClick={() => props.setActive(false)}>
          Хорошо, переделаю
        </button>
      </div>
    </div>
  ) : (
    <span></span>
  );
};

export default Popup;

import axios from "axios";
import React, { useState } from "react";
import s from "./list.module.css";
const ContactItem = (props) => {
  // console.log(props.address)
  //   let arr = [
  //      { name: "John", phone: 1234123,id: 11 },
  //      { name: "Kevin", phone: 3523523, id: 12 },
  //    ];

  let [address, setAddress] = useState({});
  let [hideMode, setHide] = useState({
    hide: true,
  });


  
  let getAddress = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users/" + props.id)
      .then((response) => {
        setAddress({ ...response.data.address });
        setHide({
          hide: !hideMode.hide,
        });
      })
      .catch((e) => {
        alert("no more information");
      });

    //   console.log(address)
  };

  return (
    <>
      <li className={props.hide ? s.hide : null + " " + s.listItem}>
        <img className={s.avatar} src={`https://eu.ui-avatars.com/api/?name=${props.name}`} alt=""/>
        <p>{props.name}</p>
        
        <p>
          <a href={`tel:+${props.number}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-phone-call"
            >
              <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </a>
        </p>
        <button onClick={getAddress}>more</button>
      </li>
      <div className={hideMode.hide ? s.small : s.big + " " + s.more}>
        <span className={s.option}>City:</span> <span>{!address.city ? null : address.city}</span>
        <p>
          <span className={s.option}>Street:</span>{" "}
          <span>{!address.street ? null : address.street}</span>
        </p>
        <p>
            <span className={s.option}>Phone: </span>
            <span>{props.number}</span>
        </p>
        <button
          className={s.btnDelete + " " + (hideMode.hide ? s.hide : null)}
          onClick={() => props.removeContact(props.id, props.name)}
        >
          delete
        </button>
      </div>
    </>
  );
};

export default ContactItem;

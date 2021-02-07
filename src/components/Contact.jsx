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
      });

    //   console.log(address)
  };

  return (
    <>
      <li className={props.hide ? s.hide : null + " " + s.listItem}>
        <p>{props.name}</p>

        <p>
          <a href={`tel:+${props.number}`}>call</a>
        </p>
        <button onClick={getAddress}>more</button>
      </li>
      <div className={hideMode.hide ? s.small : s.big + " " + s.more}>
        <span>City:</span> <span>{!address.city ? null : address.city}</span>
        <p>
          <span>Street:</span>{" "}
          <span>{!address.street ? null : address.street}</span>
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

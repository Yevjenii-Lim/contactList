import axios from "axios";
import React, { useState } from "react";
import s from "./list.module.css";
const ContactItem = (props) => {
  // console.log(props.address)
  let arr = [
     { name: "John", phone: 1234123,id: 11 },
     { name: "Kevin", phone: 3523523, id: 12 },
   ];

  let [address, setAddress] = useState(" ");
  let getAddress = () => {
    // axios
    //   .get("https://jsonplaceholder.typicode.com/users/" + props.id)
    //   .then((responce) => setAddress([{
    //       gello: 'asdas'
    //     }
    // ])
  console.log(address)
  };

  return (
    <li className={props.hide ? s.hide : null + " " + s.listItem}>
      <p>{address}</p>
      <p>{props.name}</p>

      <p>
        <a href={`tel:+${props.number}`}>call</a>
      </p>
      <button onClick={() => props.removeContact(props.id)}>delete</button>
      <button onClick={getAddress}>show more</button>
    </li>
  );
};

export default ContactItem;

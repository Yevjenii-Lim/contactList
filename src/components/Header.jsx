
import s from "./list.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

let Header = ({onAdd}) => {
  let [contactName, setName] = useState("");
  let [contactNumber, setNumber] = useState("");
  let [worning, setWorning] = useState(false)
  let addContact = () => {
    if(contactName.length > 0) {
      setWorning(false)
      let result = {
      name: contactName,
      number: contactNumber
    }
    onAdd(result)
    setName("");
    setNumber("");
    }else {
      setWorning(true)
    }
    
  }
  
  return (
    <div >
      <h1>Your contact book</h1>
      <div className={s.wrapperInputs}>
        <input
          type="text"
        
          value={contactName}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          name=""
          id=""
          value={contactNumber}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button className={s.btnAdd} onClick={addContact}>
          add contacts
        </button>
        {worning && <p className={s.worning}>name is reqatide</p>}
        </div>
    </div>
  );
};


export default Header
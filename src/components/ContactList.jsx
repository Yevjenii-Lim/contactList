import axios from "axios";
import React, { useEffect, useState } from "react";
import ContactItem from "./Contact";
import s from "./list.module.css";

const ContactList = () => {
  let arr = [
    // { name: "John", phone: 1234123,id: 11 },
    // { name: "Kevin", phone: 3523523, id: 12 },
  ];
 
  let arr_EN = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  let [contacts, setContact] = useState(arr);
  const loadUsers = () => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((responce) =>
      setContact([
        ...responce.data.sort((a, b) => {
          return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
        }),
      ])
    );
  };
  useEffect(loadUsers, []);
  useEffect(() => {
      console.log('chnge')
    contacts.sort((a, b) => {
      return a.name[0] < b.name[0] ? -1 : 1;
    });
  }, [contacts]);
  let removeContact = (id) => {
    let agree = window.confirm("sure delete contact?");
    if (agree) {
      let item = contacts.findIndex((i) => i.id === id);
      contacts.splice(item, 1);
      setContact([...contacts]);
    }
  };
  let items = contacts.map((i, index) => (
    <ContactItem
      name={i.name}
      hide={i.hide}
      removeContact={removeContact}
      key={index}
      number={i.phone}
      id={i.id}
    ></ContactItem>
  ));
  let [contactName, setName] = useState("");
  let [contactNumber, setNumber] = useState("");
  let listLetters = new Set();
  contacts.forEach((i) => {
    for (let letter = 0; letter < arr_EN.length; letter++) {
      if (arr_EN[letter] === i.name[0].toUpperCase()) {
        listLetters.add(arr_EN[letter]);
        return true;
      }
    }
    //  return i.name[0] === arr_EN.map(i => i)
  });
  let alphabet = [];
  for (let item of listLetters) {
    alphabet.push(item);
  }

  let filter = (e) => {
    contacts.forEach((i) =>
      i.name[0].toUpperCase() !== e.target.innerText
        ? (i.hide = true)
        : (i.hide = false)
    );
    setContact([...contacts]);
  };
  let showAll = () => {
    contacts.forEach((i) => (i.hide = false));
    setContact([...contacts]);
  };
  alphabet.sort();
  alphabet = alphabet.map((i, index) => (
    <p
      key={index}
      onClick={(e) => {
        filter(e);
      }}
    >
      {i}
    </p>
  ));

  const addContact = () => {
    if (contactName.length < 1) {
      console.log("add name");
    } else {
      setContact([
        ...contacts,
        {
          name: contactName,
          phone: contactNumber,
        },
      ]);
      setName("");
      setNumber("");
    }
  };

  return (
    <div className={s.wrapper}>
      <h1>Your contact list</h1>
      <input
        type="text"
        value={contactName}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="number"
        name=""
        id=""
        value={contactNumber}
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      />
      <button className={s.btnAdd} onClick={addContact}>
        add contacts
      </button>
      <div className={s.list}>
        <ul className={s.listWrap}>{items}</ul>
        <div>{alphabet}</div>
      </div>
      <button onClick={showAll}>show all</button>
    </div>
  );
};

export default ContactList;

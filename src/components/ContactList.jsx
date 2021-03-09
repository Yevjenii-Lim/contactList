import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ContactItem from "./Contact";
import s from "./list.module.css";
import avatar from "./../assets/photo_2020-09-09_00-57-40.jpg";
import {
  addAllContacts,
  addContactActionCreator,
  removeContact,
  openMoreAC,
} from "../store";

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

let useLoadUser = (props) => {
  useEffect(() => {
    const loadUsers = async () => {
      if (props.state.contacts.length === 0) {
        console.log("mount");
        let result = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        result.data.forEach((i) => (i.openMore = true));
        props.dispatch(addAllContacts(result.data));
      }
    };
    loadUsers();
  }, []);
  useEffect(() => {
    props.state.contacts.sort((a, b) => {
      return a.name[0].toUpperCase() < b.name[0].toUpperCase() ? -1 : 1;
    });
    props.dispatch(addAllContacts(props.state.contacts));
  }, [props.state.contacts.length]);
};

let sortArrLetters = (arr) => {
  let listLetters = new Set();
  let alphabet = [];
  arr.forEach((i) => {
    for (let letter = 0; letter < arr_EN.length; letter++) {
      if (arr_EN[letter] === i.name[0].toUpperCase()) {
        listLetters.add(arr_EN[letter]);
        return true;
      }
    }
  });
  for (let item of listLetters) {
    alphabet.push(item);
  }
  return alphabet.sort();
};

const ContactList = (props) => {
  let [contacts, setContact] = useState([]);
  let [showWorning, setWorning] = useState(false);
  let [contactName, setName] = useState("");
  let [contactNumber, setNumber] = useState("");

  let alphabet = sortArrLetters(props.state.contacts);

  useLoadUser(props);

  let removeContactOld = (id, name) => {
    let agree = window.confirm("sure delete " + name + " contact?");
    if (agree) {
      props.dispatch(removeContact(id));
    }
  };

  let openMore = (id, bool) => {
    props.dispatch(openMoreAC(id, bool));
  };

  let oneLetterArr = [];
  let oneLetter = (letter) => {
    let search = oneLetterArr.findIndex((i) => i === letter.toUpperCase());
    if (search === -1) {
      oneLetterArr.push(letter.toUpperCase());
      return letter.toUpperCase();
    } else {
      return undefined;
    }
  };

  let items = props.state.contacts.map((i) => (
    <ContactItem
      name={i.name}
      hide={i.hide}
      removeContact={removeContactOld}
      key={i.id}
      number={i.phone}
      id={i.id}
      address={i.address}
      showWorning={showWorning}
      showMore={i.openMore}
      openMore={openMore}
      alphabet={oneLetter(i.name[0])}
    ></ContactItem>
  ));

  let filter = (e) => {
    props.state.contacts.forEach((i) =>
      i.name[0].toUpperCase() !== e.target.innerText
        ? (i.hide = true)
        : (i.hide = false)
    );
    props.dispatch(addAllContacts(props.state.contacts));
    // openMore(null);
  };
  let showAll = () => {
    props.state.contacts.forEach((i) => (i.hide = false));
    setContact([...contacts]);
  };
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
      setWorning(true);
    } else {
      setWorning(false);
      let newContact = {
        name: contactName,
        phone: contactNumber,
        id: props.state.contacts.length + 1,
        openMore: true,
      };
      props.dispatch(addContactActionCreator(newContact));
      setName("");
      setNumber("");
    }
  };

  return (
    <div className={s.wrapper}>
      <h1>Your contact book</h1>
      <div className={s.wrapperInputs}>
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
        <p className={(showWorning ? null : s.hide) + " " + s.worning}>
          name is reqatide!
        </p>
      </div>
      <div className={s.myPage}>
        <img src={avatar} alt="" />
        <NavLink className={s.link} to="myPage">
          My Page
        </NavLink>
      </div>

      <div className={s.list}>
        <ul className={s.listWrap}>{items}</ul>
        <div className={s.alphabet}>
          {alphabet}

          <button className={s.show} onClick={showAll}>
            show all
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactList;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ContactItem from "./Contact";
import s from "./list.module.css";
import avatar from "./../assets/photo_2020-09-09_00-57-40.jpg";
import {
  addAllContacts,
  hideContacts,
  openMoreAC,
} from "../store";
import Header from "./Header";

let arr_EN = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",];

let useLoadUsers = (props) => {
  useEffect(() => {
    const loadUsers = async () => {
      if (props.state.contacts.length === 0) {
        console.log("mount");
        let result = await axios.get(
          "http://localhost:5000/users"
        );
  
        result.data.forEach((i) => (i.openMore = true));
        props.dispatch(addAllContacts(result.data));
      }
    };
    loadUsers();
  }, []);
  useEffect(() => {
    let sortedArr = props.state.contacts.sort((a, b) => {
      return a.name[0].toUpperCase() < b.name[0].toUpperCase() ? -1 : 1;
    });
  
    props.dispatch(addAllContacts(sortedArr));
  }, [props.state.contacts.length]);
};

let sortLettersInArr = (arr) => {
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
  console.log('rended')
  let [contacts, setContact] = useState([]);
  let alphabet = sortLettersInArr(props.state.contacts);

  useLoadUsers(props);


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
      removeContact={props.deleteContact}
      key={i.id}
      number={i.phone}
      id={i.id}
      address={i.address}
      showMore={i.openMore}
      openMore={openMore}
      alphabet={oneLetter(i.name[0])}
    ></ContactItem>
  ));

  let filter = (letter) => {
  props.state.contacts.forEach( i =>{
     if( i.name[0].toUpperCase() !== letter) {
        (i.hide = true)
     }else {
       (i.hide = false)
     }
     return i
   })
    props.dispatch(hideContacts());
  }
  let showAll = () => {
    props.state.contacts.forEach((i) => (i.hide = false));
    props.dispatch(hideContacts())
  };
  alphabet = alphabet.map((i, index) => (
    <p key={index}
      onClick={() => {filter(i);}
    }
    >
      {i}
    </p>
  ));


  return (
    <div className={s.wrapper}>
      <Header 
      onAdd={props.addContact}
      />
     
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

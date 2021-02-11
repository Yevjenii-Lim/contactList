
import s from "./list.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

let Header = (props) => {
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
    let [contacts, setContact] = useState([]);
    let [showWorning, setWorning] = useState(false);
    let [showMore, setShowMore] = useState([]);
    let alphabet = [];
    let listLetters = new Set();
    contacts.forEach((i) => {
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
    alphabet.sort();
  
    // const loadUsers = () => {
    //   (async function getContacts() {
    //     let result = axios.get("https://jsonplaceholder.typicode.com/users");
    //     let getArrData = await result;
    //     setContact([...getArrData.data]);
    //     getArrData.data.forEach(() => showMore.push(true));
    //     showMore.push(true);
    //   })();
    // };
    useEffect(() => {
      const loadUsers = () => {
        (async function getContacts() {
          let result = axios.get("https://jsonplaceholder.typicode.com/users");
          let getArrData = await result;
          setContact([...getArrData.data]);
          getArrData.data.forEach(() => showMore.push(true));
          showMore.push(true);
        })();
      };
      loadUsers()
    }, []);
  
    useEffect(() => {
      contacts.sort((a, b) => {
        return a.name[0].toUpperCase() < b.name[0].toUpperCase() ? -1 : 1;
      });
      setContact(contacts => [...contacts]);
    }, [contacts.length]);
  
    let removeContact = (id, name) => {
      let agree = window.confirm("sure delete " + name + " contact?");
      if (agree) {
        let item = contacts.findIndex((i) => i.id === id);
        contacts.splice(item, 1);
        setContact([...contacts]);
      }
    };
  
    let openMore = (id) => {
      let boolean = !showMore[id];
      let showMoreCopy = showMore.map((i) => (i = true));
  
      showMoreCopy.splice(id, 1, boolean);
      setShowMore([...showMoreCopy]);
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
   
    let [contactName, setName] = useState("");
    let [contactNumber, setNumber] = useState("");
  
    let filter = (e) => {
      contacts.forEach((i) =>
        i.name[0].toUpperCase() !== e.target.innerText
          ? (i.hide = true)
          : (i.hide = false)
      );
      setContact([...contacts]);
      openMore(null);
    };
    let showAll = () => {
      contacts.forEach((i) => (i.hide = false));
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
        setContact([
          ...contacts,
          {
            name: contactName,
            phone: contactNumber,
            id: contacts.length + 1,
          },
        ]);
        setShowMore([...showMore, true]);
        setName("");
        setNumber("");
      }
    };
  


  return (
    <div>
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
        {/* {showWorning? null : <p>name is reqatide</p>} */}
        <p className={(showWorning ? null : s.hide) + " " + s.worning}>
          name is reqatide!
        </p>
      </div>
      
      <p className={(showWorning ? null : s.hide) + " " + s.worning}>
          name is reqatide!
        </p>
    </div>
  );
};


export default Header
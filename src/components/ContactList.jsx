import axios from "axios";
import React, { useEffect, useState } from "react";
import ContactItem from "./Contact";
import s from "./list.module.css";

const ContactList = () => {
  let arr = [
    { name: "John", phone: 1234123, id: 11 },
    { name: "Kevin", phone: 3523523, id: 12 },
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
    //  return i.name[0] === arr_EN.map(i => i)
  });
  for (let item of listLetters) {
    alphabet.push(item);
  }
  alphabet.sort();

  // let [alph, setAlph] = useState(alph)
  // setAlph(alphabet)
  const loadUsers = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((responce) => {
        setContact([
          ...responce.data.sort((a, b) => {
            return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
          }),
        ]);
        // console.log(contacts)
      })
      .then(() => {
        for (let i = 0; i < 11; i++) {
          showMore.push(true);
        }
        // console.log(contacts)
      });
  };
  useEffect(loadUsers, []);

  useEffect(() => {
    contacts.sort((a, b) => {
      return a.name[0].toUpperCase() < b.name[0].toUpperCase() ? -1 : 1;
    });
    setContact([...contacts]);

    contacts.forEach((i, index) => {
      i.showMore = showMore[index];
    });
      // console.log(showMore)
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
    // console.log(id)
    let boolean = !showMore[id]
   let showMoreCopy =  showMore.map(i => i = true)
    // console.log(showMoreCopy)
    showMoreCopy.splice(id, 1, boolean)
    setShowMore([...showMoreCopy])
    // console.log(showMoreCopy)
  }
  // console.log(contacts)
  let items = contacts.map((i, index) => (
    <ContactItem
      name={i.name}
      hide={i.hide}
      removeContact={removeContact}
      key={index}
      number={i.phone}
      id={i.id}
      address={i.address}
      showWorning={showWorning}
      showMore={showMore[i.id]}
      openMore={openMore}
      // alphabet={alph}
    ></ContactItem>
  ));
  let [contactName, setName] = useState("");
  let [contactNumber, setNumber] = useState("");

  let filter = (e) => {
    contacts.forEach((i) =>
      i.name[0].toUpperCase() !== e.target.innerText
        ? (i.hide = true)
        : (i.hide = false)
    );
    setContact([...contacts]);
    openMore(null)
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
        {/* {showWorning? null : <p>name is reqatide</p>} */}
        <p className={(showWorning ? null : s.hide) + " " + s.worning}>
          name is reqatide!
        </p>
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

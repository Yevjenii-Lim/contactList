import React, { useState } from "react";
import ContactItem from "./Contact";

const ContactList = () => {
  let [contacts, setContact] = useState([
    { name: "John", number: 1234123 },
    { name: "Kevin", number: 3523523 },
  ]);
  let items = contacts.map((i, index) => (
    <ContactItem name={i.name} key={index}></ContactItem>
  ));
  let [contactName, setName] = useState('')
  const addContact = () => {
      setContact([
          ...contacts,
          {
              name: contactName
          }
      ])
      setName('')
  }
  const enterName = (name) => {
      setName(name)
  }
  return (
    <div>
        <input type="text"
        value={contactName}
        onChange={(e) => {enterName(e.target.value)}}
        />
        <button onClick={addContact}>
            add contacts
        </button>
      <ul>{items}</ul>
    </div>
  );
};

export default ContactList;

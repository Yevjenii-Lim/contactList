import React from 'react';
import s from './list.module.css';
const ContactItem = (props) => {
   

    return <li className={props.hide ? s.hide: null}>
         <p>{props.name[0]}</p>
        name: {props.name}
        <br/>
        phone: {props.number}
        <button onClick={() => props.removeContact(props.id)}>delete</button>
        
    </li>
}


export default ContactItem
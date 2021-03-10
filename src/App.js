import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import ContactList from "./components/ContactList";
// import Header from './components/Header';
import MyPage from "./components/MyPage";
import Test from "./components/Test";
import store, { addContactActionCreator, removeContact } from "./store";

// console.log(store)
const addContact = async (value) => {
  let newContact = {
    name: value.name,
    phone: value.number,
    id: store.getState().contacts.length + 10,
    openMore: true,
  };
  let res = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newContact),
  });
  let data = await res.json();
  store.dispatch(addContactActionCreator(data));
};

let deleteContact = async (id, name) => {
  console.log(id);
  axios.delete("http://localhost:5000/users/" + id);
  store.dispatch(removeContact(id));
};

function App() {
  // initialstore = store
  // console.log(store)
  return (
    <BrowserRouter>
      <Route exact path="/">
        {" "}
        <ContactList
          state={store.getState()}
          dispatch={store.dispatch.bind(store)}
          addContact={addContact}
          deleteContact={deleteContact}
        ></ContactList>
      </Route>
      <Route exact path="/myPage">
        {" "}
        <MyPage></MyPage>{" "}
      </Route>
      <Test></Test>
    </BrowserRouter>
  );
}

export default App;

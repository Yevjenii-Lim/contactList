import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import ContactList from './components/ContactList';
// import Header from './components/Header';
import MyPage from './components/MyPage';
import store from './store';

// console.log(store)
function App() {
  // initialstore = store
  // console.log(store)
  return (
    <BrowserRouter>
    {/* <Header></Header> */}
    <Route exact path='/'> <ContactList state={store.getState()} dispatch={store.dispatch.bind(store)}></ContactList></Route>
    <Route exact path="/myPage"> <MyPage></MyPage> </Route>
    </BrowserRouter>
   
  );
}



export default App;

import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import ContactList from './components/ContactList';
import Header from './components/Header';
import MyPage from './components/MyPage';

function App() {
  return (
    <BrowserRouter>
    {/* <Header></Header> */}
    <Route exact path='/'> <ContactList></ContactList></Route>
    <Route exact path="/myPage"> <MyPage></MyPage> </Route>
    </BrowserRouter>
   
  );
}

export default App;

import React from 'react';
import { BrowserRouter as GS,Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Main from './Main';
import Resetpassword from './components/resetpassword';
import Profile from './components/Profile';
import Registration from './components/registration';
import Home from './components/Home';
import Noelement from './components/Noelement';
import Update from './components/Update';
function App() {
  return (
    <GS>
    <div className='App'>
      <Header/>
      <Routes>
        <Route exact path = "/" element={<Home/>}/>
        <Route exact path="/login" element={ <Main/>} />
            <Route exact path='/pro' element={<Profile/>} />
            <Route exact path='/for' element={<Resetpassword/>} />
            <Route exact path='/sign' element={<Registration/>} />
            <Route exact path='/update' element={<Update/>} />
            <Route path="*" element={<Noelement/>}/>
        </Routes>
     
    </div>
    </GS>
  );
}

export default App;

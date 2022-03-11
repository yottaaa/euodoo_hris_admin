import React from 'react';
import './App.css';
import LoginView from './pages/LoginView';
import AdminView from './pages/AdminView';
import AttendanceScan from './pages/AttendanceScan';
import AccountView from './pages/AccountView';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalContext } from './store';

const App = () => {
  const [global, setGlobal] = React.useContext(GlobalContext);

  React.useEffect(() => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    const userData = JSON.parse(localStorage.getItem('userData')) ? localStorage.getItem('userData') : '';
    setGlobal({token: token, username: userData['username']});
  },[]);

  if (global.token === null || global.token === '' || global.token === undefined) {
    return (
      <LoginView/>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<AdminView/>}>
        <Route index element={<AccountView/>}/>
        <Route path='scan' element={<AttendanceScan/>}/>
      </Route>
    </Routes>
  )
}

export default App;

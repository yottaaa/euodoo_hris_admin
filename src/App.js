import React from 'react';
import './App.css';
import LoginView from './pages/LoginView';
import AdminView from './pages/AdminView';
import AttendanceScan from './pages/AttendanceScan';
import AttendanceLogs from './pages/AttendanceLogs';
import AttendanceExport from './pages/AttendanceExport';
import AttendanceCalculate from './pages/AttendanceCalculate';
import AccountView from './pages/AccountView';
import { Routes, Route } from 'react-router-dom';
import { GlobalContext } from './store';
import axios from 'axios';
import { BACKEND_DEV, BACKEND_PROD } from './assets/config';

const App = () => {
  const [global, setGlobal] = React.useContext(GlobalContext);

  React.useEffect(() => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    const userData = JSON.parse(localStorage.getItem('userData')) ? localStorage.getItem('userData') : '';
    setGlobal({token: token, userData: userData});
  },[]);

  if (global.token === null || global.token === '' || global.token === undefined) {
    return (
      <LoginView/>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<AdminView/>}>
        <Route index element={<AttendanceLogs/>}/>
        <Route path='export' element={<AttendanceExport/>}/>
        <Route path='account' element={<AccountView/>}/>
        <Route path='scan' element={<AttendanceScan/>}/>
        <Route path='calculator' element={<AttendanceCalculate/>}/>
      </Route>
    </Routes>
  )
}

export default App;

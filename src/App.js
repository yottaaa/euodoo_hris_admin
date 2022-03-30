import React from 'react';
import './App.css';
import LoginView from './pages/LoginView';
import AdminView from './pages/AdminView';
import AttendanceScan from './pages/AttendanceScan';
import AttendanceLogs from './pages/AttendanceLogs';
import AttendanceCalculate from './pages/AttendanceCalculate';
import AccountView from './pages/AccountView';
import { Routes, Route } from 'react-router-dom';
import { GlobalContext } from './store';
import axios from 'axios';
import { BACKEND_DEV } from './assets/config';

const App = () => {
  const [global, setGlobal] = React.useContext(GlobalContext);

  React.useEffect(() => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    console.log(token);
    (async () => {
      await axios({
        method: 'get',
        url: `${BACKEND_DEV}/api/v1/auth/ping/`,
        headers: {
          'Authorization': `token ${token}`
        }
      }).then((res) => {
        console.log(res.data['detail'])
        const userData = JSON.parse(localStorage.getItem('userData')) ? localStorage.getItem('userData') : '';
        setGlobal({token: token, userData: userData});
      }).catch((err) => {
        console.log(err)
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setGlobal({token: null, userData:{
          username: '',
          first_name: '',
          last_name: ''
        }});
      })
    })();
  },[setGlobal]);

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
        <Route path='logs' element={<AttendanceLogs/>}/>
        <Route path='calculator' element={<AttendanceCalculate/>}/>
      </Route>
    </Routes>
  )
}

export default App;

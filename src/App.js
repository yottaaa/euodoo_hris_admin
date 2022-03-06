import React from 'react';
import { Button } from 'antd';
import './App.css';
import AttendanceView from './pages/AttendanceView';

const App = () => (
  <div className="App">
    <AttendanceView text="hello world"/>
    <Button type="primary">Button</Button>
  </div>
);

export default App;

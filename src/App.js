import {Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './dashboard/Login';
import Dashboard from './dashboard/app/';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route exact path="login" element={<Login/>} />
      <Route exact path="dashboard" element={<Dashboard/>} />
    </Routes>
  );
}

export default App;

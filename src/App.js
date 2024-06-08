import {Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './dashboard/Login';
import Dashboard from './dashboard/app/';
import Signup from './dashboard/signup';
import ComplaintMain from './dashboard/complaint/ComplaintMain';
import { ProtectedRoutes } from './dashboard/ProtectedRoutes';
import { useAuth } from './hooks/useAuth';
import ParkMain from './dashboard/park/ParkMain';
import SlotMain from './dashboard/slot/SlotMain';
import ReservationMain from './dashboard/reservation/ReservationMain';
import Profile from './dashboard/app/Profile';

function App() {

  return (
    <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route exact path="signup" element={<Signup/>} />
      <Route exact path="login" element={<Login/>} />
      <Route element={<ProtectedRoutes/>}>
        <Route exact path="profile" element={<Profile/>} />
        <Route exact path="complaints" element={<ComplaintMain/>} />
        <Route exact path="parks" element={<ParkMain/>} />
        <Route exact path="slots" element={<SlotMain/>} />
        <Route exact path="reservations" element={<ReservationMain/>} />
      </Route>
    </Routes>
  );
}

export default App;

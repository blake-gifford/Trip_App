import './App.css';
import Header from './components/Header';
import { Router, navigate } from '@reach/router';
import CreateUser from './views/user/CreateUser';
import EditUser from './views/user/CreateUser';
import ViewUser from './views/user/CreateUser';
import Dashboard from './views/Dashboard';
import InfoPage from './views/InfoPage';
import CreateTrip from "./views/trip/CreateTrip";
import DisplayAllTrips from "./views/trip/DisplayAllTrips";
import DisplayTrip from "./views/trip/DisplayOneTrip";
import EditTrip from "./views/trip/EditTrip";
import LogReg from "./views/LogReg";

import axios from 'axios';
import { useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    axios
      .post(
        "http://localhost:8000/api/logout",
        {},
        {
          // need to send the cookie in request so server can clear it
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setIsLoggedIn(false);
      })
      .catch(console.log);

    navigate("/");
  };

  return (
    <>
      <Header></Header>
        {isLoggedIn && <button onClick={logout}>Logout</button>}
        <Router>
          <Dashboard path ="/"/>
          <CreateUser path="/user/create"/>
          <ViewUser path="/user/view/:id"/>
          <EditUser path="/user/edit/:id"/>


        <CreateTrip path="/trip/create"/>
        <DisplayAllTrips path="/trip/display/:id/:trip_id/all"/>
        <DisplayTrip path="/trip/display/:id/:trip_id"/>
        <EditTrip path="/trip/display/:id/:trip_id/edit"/>


          <InfoPage path="/info"/>
          
          <LogReg setLoggedIn={() => setIsLoggedIn(true)} path="/user/login" />

        </Router>
    </>
  );
}

export default App;

import './App.css';
import Header from './components/Header';
import { Router, navigate } from '@reach/router';
import CreateUser from './views/user/CreateUser';
import EditUser from './views/user/EditUser';
import ViewUser from './views/user/ViewUser';
import Dashboard from './views/Dashboard';
import InfoPage from './views/InfoPage';
import CreateTrip from "./views/trip/CreateTrip";
import DisplayAllTrips from "./views/trip/DisplayAllTrips";
import DisplayTrip from "./views/trip/DisplayOneTrip";
import EditTrip from "./views/trip/EditTrip";
import LogReg from "./views/LogReg";
import SearchPage from './views/trip/SearchPage';
import SignIn from "./components/LoginReg/SignIn";
import axios from 'axios';
import { useState } from 'react';
import Context from './components/Context';
import Blog from './views/Blog';

const initialUser = {
  _id: "",
  firstName: "",
  lastName:"",
  userName:"",
  email:"",
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser]= useState(initialUser);


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

  //this is to change osmethign to push again
  return (
    <div className="container">
      <Context.Provider value={{loggedInUser, setLoggedInUser}}>
        <Header></Header>
          {isLoggedIn && <button onClick={logout}>Logout</button>}
          <Router>
            <Dashboard path ="/"/>
            <CreateUser path="/user/create"/>
            <ViewUser path="/user/view"/>
            <EditUser path="/user/edit"/>
            <SearchPage path="/trip/search"/>
            <CreateTrip path="/trip/create/:location2" />
            <DisplayAllTrips path="/trip/display/all"/>
            <DisplayTrip path="/trip/display/:trip_id"/>
            <EditTrip path="/trip/display/:trip_id/edit"/>
            <Blog path="/blog" />

            <InfoPage path="/info"/>
            
            {/* <LogReg setLoggedIn={() => setIsLoggedIn(true)} path="/user/login" /> */}
            <SignIn path="/user/login"/>
            

          </Router>
        </Context.Provider>
    </div>
  );
}

export default App;

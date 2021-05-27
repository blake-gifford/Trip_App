import './App.css';
import Header from './components/Header';
import { Router } from '@reach/router';
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



function App() {
  return (
    <div className="container">
      <Header></Header>
        <Router>
          <Dashboard path ="/"/>
          <CreateUser path="/user/create"/>
          <ViewUser path="/user/view/:id"/>
          <EditUser path="/user/edit/:id"/>


          <SearchPage path="/trip/search"/>
          <CreateTrip path="/trip/create"/>
          <DisplayAllTrips path="/trip/display/:id/all"/>
          <DisplayTrip path="/trip/display/:id/:trip_id"/>
          <EditTrip path="/trip/display/:id/:trip_id/edit"/>


          <InfoPage path="/info"/>
          <LogReg path="/user/login"></LogReg>
        </Router>
    </div>
  );
}

export default App;

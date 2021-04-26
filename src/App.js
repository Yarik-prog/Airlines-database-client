import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './components/Home'
import Forms from './components/Forms'
import Views from './components/Views'
import Queries from './components/Queries'


import AviaCompany from './components/Forms/avia_company';
import Routes from './components/Forms/route';
import Crew from './components/Forms/crew';
import Staff from './components/Forms/staff';
import Plane from './components/Forms/plane';
import PlaneMaintance from './components/Forms/plane_maintance';
import Flight from './components/Forms/flight';
import Passenger from './components/Forms/passenger';
import Ticket from './components/Forms/ticket';
import Transfer from './components/Forms/transfer';

import PlaneQuery from './components/Queries/Plane.query';
import RouteQuery from './components/Queries/Route.query';
import CompanyQuery from './components/Queries/AviaCompany.query';
import StaffQuery from './components/Queries/Staff.query';
import FlightQuery from './components/Queries/Flight.query';
import PassengerQuery from './components/Queries/Passenger.query';
import TicketQuery from './components/Queries/Ticket.query';
import PlaneMaintanceQuery from './components/Queries/PlaneMaintance.query';
import TestQuery from './components/Queries/TestQuery';

import CompanyView from './components/Views/avia_company.view'
import CrewView from './components/Views/crew.view'
import PassengerView from './components/Views/passenger.view'
import FlightView from './components/Views/flight.view'
import StaffView from './components/Views/staff.view'
import RouteView from './components/Views/route.view'
import PlaneView from './components/Views/plane.view'
import TicketView from './components/Views/ticket.view'
import MaintananceView from './components/Views/plane_maintanance.view'



function App() {
  return (
    <Router>
       <div className="App"/>
      <Route path="/" exact component={Home} />
      
  <div style={{display:'flex'}}>
    <Route path="/Forms"  component={Forms} />
    <Route path="/Queries"component={Queries} />
    <Route path="/Views"  component={Views} />
    <Route path="/Forms/company"  component={AviaCompany} />
    <Route path="/Forms/route"  component={Routes} />
    <Route path="/Forms/crew"  component={Crew} />
    <Route path="/Forms/staff"  component={Staff} />
    <Route path="/Forms/plane"  component={Plane} />
    <Route path="/Forms/maintance"  component={PlaneMaintance} />
    <Route path="/Forms/flight"  component={Flight} />
    <Route path="/Forms/passenger"  component={Passenger} />
    <Route path="/Forms/ticket"  component={Ticket} />
    <Route path="/Forms/transfer" component={Transfer} />
  
    <Route path="/Queries/plane" component={PlaneQuery} />
    <Route path="/Queries/route" component={RouteQuery} />
    <Route path="/Queries/company" component={CompanyQuery} />
    <Route path="/Queries/staff" component={StaffQuery} />
    <Route path="/Queries/flight" component={FlightQuery} />
    <Route path="/Queries/passenger" component={PassengerQuery} />
    <Route path="/Queries/ticket" component={TicketQuery} />
    <Route path="/Queries/maintenance" component={PlaneMaintanceQuery} />
    <Route path="/Queries/test" component={TestQuery} />

    <Route path="/Views/company" component={CompanyView} />
    <Route path="/Views/crew" component={CrewView} />
    <Route path="/Views/passenger" component={PassengerView} />
    <Route path="/Views/flight" component={FlightView} />
    <Route path="/Views/staff" component={StaffView} />
    <Route path="/Views/route" component={RouteView} />
    <Route path="/Views/plane" component={PlaneView} />
    <Route path="/Views/ticket" component={TicketView} />
    <Route path="/Views/maintenance" component={MaintananceView} />

    <Route path="/company/edit/:id" exact component={AviaCompany} />
    <Route path="/route/edit/:id" exact component={Routes} />
    <Route path="/crew/edit/:id" exact component={Crew} />
    <Route path="/staff/edit/:id" exact component={Staff} />
    <Route path="/plane/edit/:id" exact component={Plane} />
    <Route path="/maintenance/edit/:id" exact component={PlaneMaintance} />
    <Route path="/flight/edit/:id" exact component={Flight} />
    <Route path="/passenger/edit/:id" exact component={Passenger} />
    <Route path="/ticket/edit/:id" exact component={Ticket} />
  </div>
    </Router>
  );
}

export default App;

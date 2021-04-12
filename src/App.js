import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AviaCompany from './components/avia_company';
import Routes from './components/route';
import Crew from './components/crew';
import Staff from './components/staff';
import Plane from './components/plane';
import PlaneMaintance from './components/plane_maintance';
import Flight from './components/flight';
import Passenger from './components/passenger';
import Ticket from './components/ticket';


function App() {
  return (
    <Router>
      <div style={{display:'flex'}}>
<div>
  <div>
    <Link to="/company">Avia company</Link>
    </div>
    <div>
    <Link to="/route">route</Link>
    </div>
    <div>
    <Link to="/crew">crew</Link>
    </div>
    <div>
    <Link to="/staff">staff</Link>
    </div>
    <div>
    <Link to="/plane">plane</Link>
    </div>
    <div>
    <Link to="/maintance">maintance</Link>
    </div>
    <div>
    <Link to="/flight">flight</Link>
    </div>
    <div>
    <Link to="/passenger">passenger</Link>
    </div>
    <div>
    <Link to="/ticket">ticket</Link>
  </div>
</div>
    <Route path="/company" component={AviaCompany} />
    <Route path="/route" component={Routes} />
    <Route path="/crew" component={Crew} />
    <Route path="/staff" component={Staff} />
    <Route path="/plane" component={Plane} />
    <Route path="/maintance" component={PlaneMaintance} />
    <Route path="/flight" component={Flight} />
    <Route path="/passenger" component={Passenger} />
    <Route path="/ticket" component={Ticket} />
  </div>
    </Router>
  );
}

export default App;

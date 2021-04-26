import React, {useState} from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";
const Queries = ()=>{
  const [queries, setQueries] = useState([
    {id:1, route:"company",     name:"Авіа компанія" },
    {id:2, route:"route",       name:"Маршрут" },
    {id:3, route:"staff",       name:"Персонал" },
    {id:4, route:"plane",       name:"Літак" },
    {id:5, route:"maintenance", name:"Техн. обслуговування"},
    {id:6, route:"flight",      name:"Рейс" },
    {id:7, route:"passenger",   name:"Пасажир" },
    {id:8, route:"ticket",      name:"Білет" },
    {id:9, route:"test",      name:"Test" },
  ])

  const renderLinks = ()=>{
    return queries.map(obj=>(
      <li key={obj.id}><Link style={{color:'black', fontSize:24, fontWeight:400}} to={{pathname:`/Queries/${obj.route}`}}>{obj.name}</Link></li>
    ))
  }

    return (
<div>
<ul>
<Link to="/">Back</Link>
 {renderLinks()}
</ul>
</div>
    );
}
export default Queries
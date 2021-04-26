import React, {useState} from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";
const Views = ()=>{
  const [views, setViews] = useState([
    {id:1, route:"company",     name:"Авіа компанія" },
    {id:2, route:"route",       name:"Маршрут" },
    {id:3, route:"crew",        name:"Група" },
    {id:4, route:"staff",       name:"Персонал" },
    {id:5, route:"plane",       name:"Літак" },
    {id:6, route:"maintenance", name:"Техн. обслуговування"},
    {id:7, route:"flight",      name:"Рейс" },
    {id:8, route:"passenger",   name:"Пасажир" },
    {id:9, route:"ticket",      name:"Білет" },
  ])

  const renderLinks = ()=>{
    return views.map(obj=>(
      <li key={obj.id}><Link style={{color:'black', fontSize:24, fontWeight:400}} to={{pathname:`/Views/${obj.route}`}}>{obj.name}</Link></li>
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
export default Views
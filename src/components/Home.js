import React from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";
import Logo from '../photos/Home.png'
import './style/list.css'
const Home = ()=>{

    return (
<div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:200}}>
<div>
    <ul>
        <li><Link className="link" to="/Forms">Форми</Link></li>
        <li><Link className="link" to="/Views">Перегляд</Link></li>
        <li><Link className="link" to="/Queries">Запити</Link></li>
    </ul>
</div>
<img src={Logo} alt="logo"/>
</div>
    );
}
export default Home
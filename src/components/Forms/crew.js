import React, {useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {FormGroup, Button } from "reactstrap";
const Crew = ()=> {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [crew, setCrew] = useState({})
  const [crewTypes] = useState([
  {id:1, name:"Екіпаж"}, 
  {id:2, name:"Техн. обслуговування"}
])

const {id} = useParams()
useEffect(()=>{
  if(id){
    axios.get(`http://localhost:3030/api/crew/${id}`,{})
    .then(res => { setCrew(res.data[0])})
  .catch(err=>{alert("Smth went wrong")})
  }
},[])


useEffect(() => {
  if (crew) {
    setValue("crew_num", crew.crew_num );
    setValue("type_crew", crew.type_crew );
  }
}, [crew]);

  const onSubmit = data => {
    if(id){
      axios.put(`http://localhost:3030/api/crew/${id}`,data)
      .then(res => { alert(`Success`)})
      .catch(err=>{alert("Smth went wrong")})
    }
    else{
    axios.post(`http://localhost:3030/api/crew`,data)
    .then(res => { alert(`Success: ${res.data}`)})
    .catch(err=>{alert("Smth went wrong")})
    }
  }


  return (
  
    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <label htmlFor="crew_num">Номер групи</label>
     
      <input type="number" id="crew_num" {...register("crew_num", 
      {required:{
        value:true, 
        message:'This field is required'},
    })} />
      {errors.crew_num && <span style={{color:'red'}}>{errors.crew_num.message}</span>}
      
    </FormGroup>

    <FormGroup row>
      <label htmlFor="type_crew">Тип групи</label>
      <select {...register("type_crew")} >
      {crewTypes.map(type=>(
        <option key={type.id} value={type.name}>{type.name}</option>
      ))}
      </select>
  
    </FormGroup>
      <button type="submit"> 
     {id && <span>Edit</span>}
     {!id && <span>Create</span>}
      </button>
    </form>

  );
}

export default Crew;


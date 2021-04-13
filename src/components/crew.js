import React, {useState} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {FormGroup, Button } from "reactstrap";
const Crew = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [crewTypes] = useState([
  {id:1, name:"Екіпаж"}, 
  {id:2, name:"Техн. обслуговування"}
])

  const onSubmit = data => {
    //console.log(data);
    axios.post(`http://localhost:3030/api/crew`,data)
    .then(res => { alert(`Success: ${res.data}`)})
    .catch(err=>{alert("Smth went wrong")})
  }


  return (
  
    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <label htmlFor="crew_num">Номер групи</label>
     
      <input type="number" id="crew_num" {...register("crew_num", {required:true})} />
      {errors.crew_num && <span style={{color:'red'}}>this field is required</span>}
      
    </FormGroup>

    <FormGroup row>
      <label htmlFor="type_crew">Тип групи</label>
      <select {...register("type_crew")} >
      {crewTypes.map(type=>(
        <option key={type.id} value={type.name}>{type.name}</option>
      ))}
      </select>
  
    </FormGroup>
      <Button color="primary"> Submit </Button>
    </form>

  );
}

export default Crew;


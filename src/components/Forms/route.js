import React, {useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormGroup} from "reactstrap";
const Route = ()=> {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [route, setRoute] = useState({})

  const {id} = useParams()
  useEffect(()=>{
    if(id){
      axios.get(`http://localhost:3030/api/route/${id}`,{})
      .then(res => { setRoute(res.data[0])})
    .catch(err=>{alert("Smth went wrong")})
    }
  },[])

  useEffect(() => {
    if (route) {
      setValue("dep_airport", route.dep_airport );
      setValue("arrive_airport", route.arrive_airport );
      setValue("dep_country", route.dep_country );
      setValue("arrive_country", route.arrive_country );
      setValue("route_status", route.route_status );
    }
  }, [route]);

  const onSubmit = data => {
    if(id){
      axios.put(`http://localhost:3030/api/route/${id}`,data)
      .then(res => { alert(`Success`)})
      .catch(err=>{alert("Smth went wrong")})
    }else{
    axios.post(`http://localhost:3030/api/route`,data)
    .then(res => { alert(`Success: ${res.data}`)})
    .catch(err=>{ alert("Smth went wrong")})
  }
  }
  
  return (

    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <label htmlFor="dep_airport">Аеропорт вильоту</label>
     
      <input id="dep_airport" {...register("dep_airport",{required:true})} />
      {errors.dep_airport && <span style={{color:'red'}}>This field is required</span>}
      
    </FormGroup>

    <FormGroup row>
      <label htmlFor="arrive_airport">Аеропорт прибуття</label>
     
      <input id="arrive_airport" {...register("arrive_airport",{required:true})} />
      {errors.arrive_airport && <span style={{color:'red'}}>This field is required</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="dep_country">Країна вильоту</label>
       
      <input id="dep_country" {...register("dep_country")} />
    
   
    </FormGroup>

    <FormGroup row>
      <label htmlFor="arrive_country">Країна прибуття</label>
   
      <input id="arrive_country" {...register("arrive_country")} />
    
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="route_status">Статус маршруту</label>
   
      <input id="route_status" {...register("route_status")} />
 
  
    </FormGroup>

    <button type="submit"> 
     {id && <span>Edit</span>}
     {!id && <span>Create</span>}
      </button>
    </form>
  );
}

export default Route;
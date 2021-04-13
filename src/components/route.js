import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FormGroup, Button } from "reactstrap";
const Route = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    //console.log(data);
    axios.post(`http://localhost:3030/api/route`,data)
    .then(res => { alert(`Success: ${res.data}`)})
    .catch(err=>{ alert("Smth went wrong")})
  }

  
  return (

    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <label htmlFor="dep_airport">Аеропорт вильоту</label>
     
      <input id="dep_airport" {...register("dep_airport",{required:true, minLength:2,maxLength:7})} />
      {errors.dep_airport && errors.dep_airport?.types?.required && <span>This field is required</span>}
      {errors.dep_airport && errors.dep_airport?.types?.minLength && <span>min length 2</span>}
      {errors.dep_airport && errors.dep_airport?.types?.maxLength && <span>max length 7</span>}
      
    </FormGroup>

    <FormGroup row>
      <label htmlFor="arrive_airport">Аеропорт прибуття</label>
     
      <input id="arrive_airport" {...register("arrive_airport",{required:true, minLength:2,maxLength:7})} />
      {errors.arrive_airport && errors.arrive_airport?.types?.required && <span>This field is required</span>}
      {errors.arrive_airport && errors.arrive_airport?.types?.minLength && <span>min length 2</span>}
      {errors.arrive_airport && errors.arrive_airport?.types?.maxLength && <span>max length 7</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="dep_country">Країна вильоту</label>
       
      <input id="dep_country" {...register("dep_country",{minLength:3,maxLength:15})} />
      {errors.dep_country && <span>This field is required</span>}
   
    </FormGroup>

    <FormGroup row>
      <label htmlFor="arrive_country">Країна прибуття</label>
   
      <input id="arrive_country" {...register("arrive_country",{minLength:3,maxLength:15})} />
      {errors.arrive_country && <span>This field is required</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="route_status">Статус маршруту</label>
   
      <input id="route_status" {...register("route_status",{minLength:5,maxLength:30})} />
      {errors.route_status && <span>length renge must be (5-30) </span>}
  
    </FormGroup>

      <Button color="primary"> Submit </Button>
    </form>
  );
}

export default Route;
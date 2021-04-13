import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FormGroup, Button } from "reactstrap";

const RouteQuery = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    //console.log(data);
    //axios.post(`http://localhost:3030/api/route`,data)
    //.then(res => { alert(`Success: ${res.data}`)})
    //.catch(err=>{ alert("Smth went wrong")})
  }

  
  return (
<div>
    <form onSubmit={handleSubmit(onSubmit)}>

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

      <Button color="primary"> Submit </Button>
    </form>

</div>
  );
}

export default RouteQuery;
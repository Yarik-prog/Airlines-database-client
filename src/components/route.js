import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
const Route = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    axios.post(`http://localhost:3030/api/route`,data)
    .then(res => { console.log("Success",res)})
    .catch(err=>{console.log("Smth went wrong",err)})
  }

  
  return (
      <div style={{width:350,margin:'50px auto'}}>
    <Form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <Label for="dep_airport">Аеропорт вильоту</Label>
     
      <input id="dep_airport" {...register("dep_airport")} />
      
    </FormGroup>

    <FormGroup row>
      <Label for="arrive_airport">Аеропорт прибуття</Label>
     
      <input id="arrive_airport" {...register("arrive_airport")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="dep_country" >Країна вильоту</Label>
       
      <input id="dep_country" {...register("dep_country")} />
   
    </FormGroup>

    <FormGroup row>
      <Label for="arrive_country" >Країна прибуття</Label>
   
      <input id="arrive_country" {...register("arrive_country")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="route_status " >Статус маршруту</Label>
   
      <input id="route_status " {...register("route_status")} />
  
    </FormGroup>

      <Button color="primary"> Submit </Button>
    </Form>
    </div>
  );
}

export default Route;
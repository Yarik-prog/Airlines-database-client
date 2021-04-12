import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {Form, FormGroup, Label, Input, Button } from "reactstrap";
const Crew = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    axios.post(`http://localhost:3030/api/crew`,data)
    .then(res => { console.log(res)})
    .catch(err=>{console.log("Smth went wrong",err)})
  }


  return (
      <div style={{width:350,margin:'50px auto'}}>
    <Form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <Label for="crew_num">Номер групи</Label>
     
      <input type="number" id="crew_num" {...register("crew_num")} />
      
    </FormGroup>

    <FormGroup row>
      <Label for="type_crew">Тип групи</Label>
     
      <input id="type_crew" {...register("type_crew")} />
  
    </FormGroup>
      <Button color="primary"> Submit </Button>
    </Form>
    </div>
  );
}

export default Crew;


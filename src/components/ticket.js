import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
const Ticket = ()=> {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); 
  return (
      <div style={{width:350,margin:'50px auto'}}>
    <Form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <Label for="ticket_num">Номер білету</Label>
     
      <Input id="ticket_num" {...register("example")} />
      
    </FormGroup>

    <FormGroup row>
      <Label for="seat_num">Номер місця</Label>
     
      <Input id="seat_num" {...register("example")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="cost_ua">Ціна</Label>
     
      <Input id="cost_ua" {...register("example")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="type_class">Класс</Label>
     
      <Input id="type_class" {...register("example")} />
  
    </FormGroup>
    
    <FormGroup row>
      <Label for="ticket_status">Статус білету</Label>
     
      <Input id="ticket_status" {...register("example")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="passenger_id">Пасажир</Label>
     
      <Input id="passenger_id" {...register("example")} />
  
    </FormGroup>

    <FormGroup row>
      <Label>test2</Label>
     
      <Input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
  
    </FormGroup>

      <Button color="primary"> Submit </Button>
    </Form>
    </div>
  );
}

export default Ticket;
 
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
const Flight = ()=> {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); 
  return (
      <div style={{width:350,margin:'50px auto'}}>
    <Form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <Label for="flight_num">Номер рейсу</Label>
     
      <Input id="flight_num" {...register("example")} />
      
    </FormGroup>

    <FormGroup row>
      <Label for="dep_date">Дата вильоту</Label>
     
      <Input id="dep_date" {...register("example")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="route_id">Маршрут</Label>
     
      <Input id="route_id" {...register("example")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="tail_code">Літак</Label>
     
      <Input id="tail_code" {...register("example")} />
  
    </FormGroup>
    
    <FormGroup row>
      <Label for="add_luggage">Додатковий багаж</Label>
     
      <Input id="add_luggage" {...register("example")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="terminal_id">Термінал</Label>
     
      <Input id="terminal_id" {...register("example")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="runaway">Взлітно-посадкова смуга</Label>
     
      <Input id="runaway" {...register("example")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="flight_status">Статус рейсу</Label>
     
      <Input id="flight_status" {...register("example")} />
  
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

export default Flight;
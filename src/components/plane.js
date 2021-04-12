import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
const Plane = ()=> {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); 
  return (
      <div style={{width:350,margin:'50px auto'}}>
    <Form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <Label for="tail_code">Бортовий номер</Label>
     
      <Input id="tail_code" {...register("example")} />
      
    </FormGroup>

    <FormGroup row>
      <Label for="name_plane">Назва літака</Label>
     
      <Input id="name_plane" {...register("example")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="model">Модель</Label>
     
      <Input id="model" {...register("example")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="seats_count">Кількість місць</Label>
     
      <Input id="seats_count" {...register("example")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="flight_range_km">Дальність польоту</Label>
     
      <Input id="flight_range_km" {...register("example")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="crew_num">Екіпаж</Label>
     
      <Input id="crew_num" {...register("example")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="plane_condition">Стан літака</Label>
     
      <Input id="plane_condition" {...register("example")} />
  
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

export default Plane;

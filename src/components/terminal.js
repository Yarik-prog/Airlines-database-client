import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
const Terminal = ()=> {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); 
  return (
      <div style={{width:350,margin:'50px auto'}}>
    <Form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <Label for="name_terminal">Назва терміналу</Label>
     
      <Input id="name_terminal" {...register("example")} />
      
    </FormGroup>

    <FormGroup row>
      <Label for="gate">Гейт</Label>
     
      <Input id="gate" {...register("example")} />
  
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

export default Terminal;
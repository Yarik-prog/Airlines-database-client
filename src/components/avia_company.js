import React from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import {Form, FormGroup, Label, Input, Button } from "reactstrap";
const AviaCompany = ()=> {
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    axios.post(`http://localhost:3030/api/company`,data)
    .then(res => { console.log(res)})
    .catch(err=>{console.log("Smth went wrong",err)})
  }
  
  return (
      <div style={{width:350,margin:'50px auto'}}>
    <Form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <Label for="name_company">Назва компанії</Label>
    
      <Controller
        name="name_company"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Input {...field} />}
      />
      {errors.name_company && <span style={{color:'red'}}>This field is required</span>}
      
    </FormGroup>

    <FormGroup row>
      <Label for="country_location">Місце знаходження</Label>
      <Controller
        name="country_location"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Input {...field} />}
      />
      {errors.country_location && <span style={{color:'red'}}>This field is required</span>}
  
    </FormGroup>

    <FormGroup row>
      <Label for="address" >Адреса головного офісу</Label>
      <Controller
        name="address"
        control={control}
        render={({ field }) => <Input {...field} />}
      />
    </FormGroup>

    <FormGroup row>
      <Label for="phone_head_office" >Тел. головного офісу</Label>
      <Controller
        name="phone_head_office"
        control={control}
        render={({ field }) => <Input {...field} />}
      />
    </FormGroup>
      <Button color="primary"> Submit </Button>
    </Form>
    </div>
  );
}

export default AviaCompany;




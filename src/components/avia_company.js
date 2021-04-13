import React from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {FormGroup, Button } from "reactstrap";
import "../components/style/form.css"
const AviaCompany = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    axios.post(`http://localhost:3030/api/company`,data)
    .then(res => { alert(`Success: ${res.data}`)})
    .catch(err=>{ alert("Smth went wrong")})
  }
  
  return (

    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <label htmlFor="name_company">Назва компанії</label>
    
      <input name="name_company" {...register("name_company", {required:true}) }/>
      {errors.name_company && <span style={{color:'red'}}>this field is required</span>}
      
    </FormGroup>

    <FormGroup row>
      <label htmlFor="country_location">Місце знаходження</label>
      <input name="country_location"  {...register("country_location", {required:true})}/>
      {errors.country_location && <span style={{color:'red'}}>this field is required</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="address" >Адреса головного офісу</label>
      <input name="address" {...register("address",{required:true})}/>
      {errors.address && <span style={{color:'red'}}>this field is required</span>}
    </FormGroup>

    <FormGroup row>
      <label htmlFor="phone_head_office" >Тел. головного офісу</label>
      <input type="tel" name="phone_head_office" {...register("phone_head_office",{pattern:/^\+?([1-9])(\d{10})$/i})}/>
      {errors.phone_head_office && <span style={{color:'red'}}>invalid number</span>}
    </FormGroup>
      
      <Button color="primary"> Submit </Button>
    </form>

  );
}

export default AviaCompany;




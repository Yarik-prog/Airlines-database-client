import React, {useState, useEffect} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import {FormGroup} from "reactstrap";
import "../style/form.css"
const AviaCompany = ()=> {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [company, setCompany] = useState({})
  const {id} = useParams()
  useEffect(()=>{
    if(id){
      axios.get(`http://localhost:3030/api/avia_company/${id}`,{})
      .then(res => { setCompany(res.data[0])})
    .catch(err=>{alert("Smth went wrong")})
    }
  },[])

  useEffect(() => {
    if (company) {
      setValue("name_company", company.name_company );
      setValue("country_location", company.country_location );
      setValue("address", company.country_location );
      setValue("phone_head_office", company.country_location );
    }
  }, [company]);

  const onSubmit = data => {
    if(id){
      axios.put(`http://localhost:3030/api/avia_company/${id}`,data)
      .then(res => { alert(`Success`)})
      .catch(err=>{alert("Smth went wrong")})
    }else{
    axios.post(`http://localhost:3030/api/company`,data)
    .then(res => { alert(`Success: Company has been created!`)})
    .catch(err=>{ alert("Smth went wrong")})
    }
  }
  
  return (

    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <label htmlFor="name_company">Назва компанії</label>
    
      <input name="name_company" {...register("name_company", {required:true}) }/>
      {errors.name_company && <span style={{color:'red'}}>This field is required</span>}
      
    </FormGroup>

    <FormGroup row>
      <label htmlFor="country_location">Місце знаходження</label>
      <input name="country_location"  {...register("country_location", {required:true})}/>
      {errors.country_location && <span style={{color:'red'}}>This field is required</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="address" >Адреса головного офісу</label>
      <input name="address" {...register("address")}/>
    </FormGroup>

    <FormGroup row>
      <label htmlFor="phone_head_office" >Тел. головного офісу</label>
      <input type="tel" name="phone_head_office" {...register("phone_head_office",{pattern:/^\+?([1-9])(\d{10})$/i})}/>
      {errors.phone_head_office && <span style={{color:'red'}}>invalid number</span>}
    </FormGroup>
      
    <button type="submit"> 
     {id && <span>Edit</span>}
     {!id && <span>Create</span>}
      </button>
    </form>

  );
}

export default AviaCompany;




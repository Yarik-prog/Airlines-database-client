import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FormGroup, Button } from "reactstrap";
import MaterialTable from 'material-table'
const CompanyQuery = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const columns=[
    { title: 'Назва', field: 'name_company' },
    { title: 'Країна розташування', field: 'country_location'},
    { title: 'Адреса головного офісу', field: 'address'},
    { title: 'Тел. головного офісу', field: 'phone_head_office'},
  ]
const [companies, setCompanies] = useState([])


  const onSubmit = data => {
    //console.log(data);
    axios.post(`http://localhost:3030/api/company/query`,data)
    .then(res => { 
      alert(`Success: `)
      setCompanies(res.data)
      })
    .catch(err=>{ alert("Smth went wrong")})
  }

  
  return (
<div style={{margin:'0 auto'}}>
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

      <Button color="primary"> Submit </Button>
    </form>
    <MaterialTable
        options={{
          search: false,
          sorting: false,
          showTitle: false,
          toolbar:false
        }}
          columns={columns}
          data={companies}
        />
</div>
  );
}

export default CompanyQuery;
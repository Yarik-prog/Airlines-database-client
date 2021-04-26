import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FormGroup, Button } from "reactstrap";
import MaterialTable from 'material-table'
const TestQuery = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const columns=[
    { title: 'Назва авіакомпанії', field: 'name_company'},
    { title: 'Адрес', field: 'address'},
  ]
const [routes, setRoutes] = useState([])


  const onSubmit = data => {
    //console.log(data);
    axios.post(`http://localhost:3030/api/flight/test`,data)
    .then(res => { 
      alert(`Success: `)
      console.log(res.data)
      setRoutes(res.data)
      })
    .catch(err=>{ alert("Smth went wrong")})
  }

  
  return (
<div style={{margin:'0 auto'}}>
    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
      <label htmlFor="dep_airport">Аеропорт вильоту</label>
      <input id="dep_airport" {...register("dep_airport")} />
    </FormGroup>

    <FormGroup row>
      <label htmlFor="country_location">Країна прибуття</label>
      <input id="country_location" {...register("country_location")} />
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
          data={routes}
          title="Demo Title"
        />
</div>
  );
}

export default TestQuery;
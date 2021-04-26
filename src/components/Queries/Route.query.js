import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FormGroup, Button } from "reactstrap";
import MaterialTable from 'material-table'
const RouteQuery = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const columns=[
    { title: 'Аеропорт вильоту', field: 'dep_airport' },
    { title: 'Аеропорт прибуття', field: 'arrive_airport'},
    { title: 'Країна вильоту', field: 'dep_country'},
    { title: 'Країна прибуття', field: 'arrive_country'},
    { title: 'Статус маршруту', field: 'route_status'}
  ]
const [routes, setRoutes] = useState([])


  const onSubmit = data => {
    //console.log(data);
    axios.post(`http://localhost:3030/api/route/query`,data)
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
      <label htmlFor="dep_country">Країна вильоту</label>
       
      <input id="dep_country" {...register("dep_country",{minLength:3,maxLength:15})} />
      {errors.dep_country && <span>This field is required</span>}
   
    </FormGroup>

    <FormGroup row>
      <label htmlFor="arrive_country">Країна прибуття</label>
   
      <input id="arrive_country" {...register("arrive_country",{minLength:3,maxLength:15})} />
      {errors.arrive_country && <span>This field is required</span>}
  
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

export default RouteQuery;
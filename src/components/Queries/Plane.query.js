import React, { useState} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FormGroup, Button } from "reactstrap";
import MaterialTable from 'material-table'
const PlainQuery = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [plane, setPlane] = useState([]);
  const columns=[
    { title: 'Бортовий номер', field: 'tail_code' },
        { title: 'Назва літака', field: 'name_plane'},
        { title: 'Модель літака', field: 'model'},
        { title: 'Число місць', field: 'seats_count'},
        { title: 'Дальність польоту', field: 'flight_range_km'},
        { title: 'Екіпаж', field: 'crew_num'},
        { title: 'Стан літака', field: 'plane_condition'}
  ]
  

  const onSubmit = data => {
    axios.post(`http://localhost:3030/api/plane/query`,data)
  .then(res => { 
     alert(`Success: `)
     setPlane(res.data)})
   .catch(err=>{ alert("Smth went wrong")})
  }

  
  return (
<div style={{margin:'50px auto'}}>
    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
      <label htmlFor="seats_count">Кількість місць</label>
     
      <input type="number" id="seats_count" {...register("seats_count",{max:700})} />
      {errors.seats_count && <span style={{color:'red'}}>max seats 700</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="flight_range_km">Дальність польоту</label>
     
      <input type="number" id="flight_range_km" {...register("flight_range_km",{max:50000})} />
      {errors.flight_range_km && <span style={{color:'red'}}>max range 50000</span>}
  
    </FormGroup>

      <Button color="primary"> Submit </Button>
    </form>
    <div style={{marginTop:130}}>
    <MaterialTable
        options={{
          search: false,
          sorting: false,
          showTitle: false,
          toolbar:false
        }}
          columns={columns}
          data={plane}
        />
      </div>
</div>
  );
}

export default PlainQuery;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FormGroup, Button } from "reactstrap";
import MaterialTable from 'material-table'
const StaffQuery = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [staff, setStaff] = useState([])
  const [crews, setCrews] = useState([]);
  const columns=[
    { title: 'ПІБ персоналу', field: 'fullname_staff' },
    { title: 'Посада', field: 'work_position'},
    { title: 'Номер групи', field: 'crew_num'},
    { title: 'Тип групи', field: 'type_crew'},
    { title: 'Кількість годин в польоті', field: 'flight_hours'},
  ]

  useEffect(() => {
    axios.get(`http://localhost:3030/api/crew`)
    .then(res => { 
  console.log("Crews has been inserted!")
  setCrews([...res.data])
  })
    .catch(err=>{console.log("Smth went wrong",err)})
  },[setCrews]);

  const onSubmit = data => {
    //console.log(data);
    axios.post(`http://localhost:3030/api/staff/query`,data)
    .then(res => { 
      alert(`Success: `)
      setStaff(res.data)
      })
    .catch(err=>{ alert("Smth went wrong")})
  }

  
  return (
<div style={{margin:'0 auto'}}>
    <form onSubmit={handleSubmit(onSubmit)}>

   
    <FormGroup row>
      <label htmlFor="work_position">Посада</label>
     
      <input id="work_position" {...register("work_position",{ required: true })} />
      {errors.work_position && <span>this field is required</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="crew_num">Група</label>
      <select {...register("crew_num")} >
{crews.map((crew)=>(
       <option key={crew.crew_id} value={crew.crew_id}>{crew.crew_num} {crew.type_crew}</option>
    ))}
</select>
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
          data={staff}
        />
</div>
  );
}

export default StaffQuery;
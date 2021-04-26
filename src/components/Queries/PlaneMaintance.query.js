import React, { useState, useEffect} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FormGroup, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import MaterialTable from 'material-table'
const PlainMaintanceQuery = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [maintanances, setMaintanances] = useState([])
  const [planes, setPlanes] = useState([]);
  const [dateEvent, setDateEvent] = useState(new Date());
  const columns=[
    { title: 'Дата проведення', field: 'event_date' },
    { title: 'Номер обслуг. бригади', field: 'service_crew_num'},
    { title: 'Бортовий номер', field: 'tail_code'},
    { title: 'Результат', field: 'result'}
  ]
  
  useEffect(() => {
    axios.get(`http://localhost:3030/api/plane`)
    .then(res => { 
  console.log("Planes has been inserted!")
  setPlanes([...res.data])
  })
    .catch(err=>{console.log("Smth went wrong",err)})
  },[setPlanes]);

  const onSubmit = data => {

    data.search_date = `${dateEvent.getFullYear()}-${("0" + (dateEvent.getMonth() + 1)).slice(-2)}-${dateEvent.getDate()}`
    
    axios.post(`http://localhost:3030/api/maintenance/query`,data)
  .then(res => { 
     alert(`Success: `)
    res.data.map(obj=>{
    const date = new Date(obj.event_date)
     obj.event_date = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getDate()}`
    })
    setMaintanances([...res.data])})
   .catch(err=>{ alert("Smth went wrong")})
  }

  const getPlanes = (data)=>{
    return data.map((plane)=>(
      <option key={plane.tail_code} value={plane.tail_code}>{plane.tail_code} {plane.name_plane} {plane.model}</option>
    ))
  }
  
  return (
<div style={{margin:'0 auto'}}>
    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <label htmlFor="event_date">Дата проведення</label>
     
      <DatePicker 
    selected={dateEvent} 
    onChange={date => setDateEvent(date)} 
    dateFormat="yyyy-MM-dd"
    />
      
    </FormGroup>

    <FormGroup row>
      <label htmlFor="tail_code">Літак, що обслуговувався</label>
     
      <select {...register("tail_code")} >
      {getPlanes(planes)}
</select>
  
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
          data={maintanances}
          style={{width:800}}
        />
      </div>
</div>
  );
}

export default PlainMaintanceQuery;
import React,{useState, useEffect} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import {FormGroup, Button } from "reactstrap";
const PlaneMaintanance = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [crews, setCrews] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [dateEvent, setDateEvent] = useState(new Date());
  
  

  useEffect(() => {
    axios.get(`http://localhost:3030/api/crew`)
    .then(res => { 
  console.log("Crews has been inserted!")
  setCrews([...res.data])
  })
    .catch(err=>{console.log("Smth went wrong",err)})
  },[setCrews]);

  useEffect(() => {
    axios.get(`http://localhost:3030/api/plane`)
    .then(res => { 
  console.log("Planes has been inserted!")
  setPlanes([...res.data])
  })
    .catch(err=>{console.log("Smth went wrong",err)})
  },[setPlanes]);

  const onSubmit = data => {
    console.log(data);
    console.log("Crews",crews);
    data.event_date = dateEvent
    //axios.post(`http://localhost:3030/api/crew`,data)
   // .then(res => { console.log(res)})
   // .catch(err=>{console.log("Smth went wrong",err)})
  }

  const getCrews = (data)=>{
    data = data.filter(obj=>{
      if (obj.type_crew == "Техн. обслуговування") return true
      else return false
    })
    return data.map((crew)=>(
      <option key={crew.crew_id} value={crew.crew_num}>{crew.crew_num} {crew.type_crew}</option>
    ))
  }

  const getPlanes = (data)=>{
    return data.map((plane)=>(
      <option key={plane.tail_code} value={plane.tail_code}>{plane.tail_code} {plane.name_plane} {plane.model}</option>
    ))
  }
  
  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <label htmlFor="event_date">Дата проведення</label>
     
      <DatePicker 
    selected={dateEvent} 
    onChange={date => setDateEvent(date)} 
    dateFormat="yyyy-MM-dd hh:mm"
    showTimeSelect
    />
      
    </FormGroup>

    <FormGroup row>
      <label htmlFor="service_crew_num">Група</label>
      <select {...register("service_crew_num")} >
      {getCrews(crews)}
</select>
    
    </FormGroup>

    <FormGroup row>
      <label htmlFor="tail_code">Літак, що обслуговувався</label>
     
      <select {...register("tail_code")} >
      {getPlanes(planes)}
</select>
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="result">Результат проведення тех. обслуговування</label>
     
      <input type="text" id="result" {...register("result")} />
  
    </FormGroup>

      <Button color="primary"> Submit </Button>
    </form>
  );
}

export default PlaneMaintanance;
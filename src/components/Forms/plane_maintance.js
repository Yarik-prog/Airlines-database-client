import React,{useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import {FormGroup} from "reactstrap";
const PlaneMaintanance = ()=> {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [maintance, setMaintance] = useState({})
  const [crews, setCrews] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [dateEvent, setDateEvent] = useState(new Date());
  
  const {id} = useParams()
  useEffect(()=>{
    if(id){
      axios.get(`http://localhost:3030/api/maintenance/${id}`,{})
      .then(res => { 
        setMaintance(res.data[0])
        setDateEvent(new Date(res.data[0].event_date))
      })
    .catch(err=>{alert("Smth went wrong")})
    }
  },[])

  useEffect(() => {
    if (maintance) {
      setValue("service_crew_num", maintance.service_crew_num );
      setValue("tail_code", maintance.tail_code );
      setValue("result", maintance.result );
    }
  }, [maintance]);

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
    console.log(data)
    if(id){
      data.event_date = dateEvent
      axios.put(`http://localhost:3030/api/maintenance/${id}`,data)
      .then(res => { alert(`Success`)})
      .catch(err=>{alert("Smth went wrong")})
    }else{
    data.event_date = dateEvent
    axios.post(`http://localhost:3030/api/maintenance`,data)
   .then(res => { alert(`Succes: ${res.data}`)})
   .catch(err=>{ alert("Smth went wrong")})
  }
}
  const getCrews = (data)=>{
    data = data.filter(obj=>{
      if (obj.type_crew == "Техн. обслуговування") return true
      else return false
    })
    return data.map((crew)=>(
      <option key={crew.crew_id} value={crew.crew_id}>{crew.crew_num} {crew.type_crew}</option>
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
    dateFormat="yyyy-MM-dd"
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
     
      <textarea type="text" id="result" {...register("result")} />
  
    </FormGroup>

    <button type="submit"> 
     {id && <span>Edit</span>}
     {!id && <span>Create</span>}
      </button>
    </form>
  );
}

export default PlaneMaintanance;
import React ,{useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { FormGroup} from "reactstrap";

const Flight = ()=> {
  const [flight, setFlight] = useState({})
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [planes, setPlanes] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [depDate, setDepDate] = useState(new Date());


  const {id} = useParams()
  useEffect(()=>{
    if(id){
      axios.get(`http://localhost:3030/api/flight/${id}`,{})
      .then(res => { 
        console.log(res.data[0])
        setFlight(res.data[0])
       setDepDate(new Date(res.data[0].dep_date))
      })
    .catch(err=>{alert("Smth went wrong")})
    }
  },[])

  useEffect(() => {
    if (flight) {
      setValue("flight_num", flight.flight_num );
      setValue("route_id", flight.route_id );
      setValue("tail_code", flight.tail_code );
      setValue("add_luggage", flight.add_luggage );
      setValue("terminal", flight.terminal );
      setValue("runaway", flight.runaway );
      setValue("flight_status", flight.flight_status );
    }
  }, [flight]);

  useEffect(() => {
    axios.get(`http://localhost:3030/api/plane`)
    .then(res => { 
  console.log("Planes has been inserted!")
  setPlanes([...res.data])
  })
    .catch(err=>{console.log("Smth went wrong",err)})
  },[setPlanes]);

  useEffect(() => {
    axios.get(`http://localhost:3030/api/route`)
    .then(res => { 
  console.log("Routes has been inserted!")
  setRoutes([...res.data])
  })
    .catch(err=>{console.log("Smth went wrong",err)})
  },[setRoutes]);

  const getPlanes = (data)=>{
    return data.map((plane)=>(
      <option key={plane.tail_code} value={plane.tail_code}>{plane.tail_code} {plane.name_plane} {plane.model}</option>
    ))
  }

  const getRoutes = (data)=>{
    return data.map(route=>(
      <option key={route.route_id} value={route.route_id}>
        {route.dep_airport}-{route.arrive_airport} ({route.dep_country}-{route.arrive_country})
      </option>
    ))
  }

  const onSubmit = data => {
   // data.dep_date = `${depDate.getUTCFullYear()}-${(depDate.getUTCMonth()+1)}-${depDate.getUTCDate()} ${depDate.getUTCHours()}:${depDate.getUTCMinutes()}`
   console.log(data)
   if(id){
    if(!data.add_luggage){data.add_luggage = null}
    data.dep_date = depDate
    axios.put(`http://localhost:3030/api/flight/${id}`,data)
    .then(res => { alert(`Success`)})
    .catch(err=>{alert("Smth went wrong")})
  }
  else{
    if(!data.add_luggage){data.add_luggage = null}
  data.dep_date = depDate
  axios.post(`http://localhost:3030/api/flight`,data)
 .then(res => { alert(`Success: ${res.data}`)})
  .catch(err=>{ alert("Smth went wrong")})
  }
}
  return (
  
    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <label htmlFor="flight_num">Номер рейсу</label>
     
      <input type="text" id="flight_num" {...register("flight_num",{required:true})} />
      {errors.flight_num && <span style={{color:'red'}}>This field is required</span>}
      
    </FormGroup>

    <FormGroup row>
      <label htmlFor="dep_date">Дата вильоту</label>
     
      <DatePicker 
    selected={depDate} 
    onChange={date => setDepDate(date)} 
    dateFormat="yyyy-MM-dd HH:mm"
    showTimeSelect
    timeFormat="HH:mm"
    />

    </FormGroup>

    <FormGroup row>
      <label htmlFor="route_id">Маршрут</label>
  
      <select {...register("route_id")} >
      {getRoutes(routes)}
</select>
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="tail_code">Літак</label>
      <select {...register("tail_code")} >
      {getPlanes(planes)}
</select>
  
    </FormGroup>
    
    <FormGroup row>
      <label htmlFor="add_luggage">Додатковий багаж</label>
     
      <input type="number" id="add_luggage" defaultValue={flight.add_luggage} {...register("add_luggage")} />
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="terminal">Термінал</label>
     
      <input type="text" id="terminal"  {...register("terminal")} />
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="runaway">Взлітно-посадкова смуга</label>
     
      <input type="text" id="runaway"  {...register("runaway")} />
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="flight_status">Статус рейсу</label>
     
      <input type="text" id="flight_status"  {...register("flight_status")} />
  
    </FormGroup>

    <button type="submit"> 
     {id && <span>Edit</span>}
     {!id && <span>Create</span>}
      </button>
    </form>

  );
}

export default Flight;
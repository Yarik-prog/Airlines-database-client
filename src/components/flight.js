import React ,{useState, useEffect} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { FormGroup, Button } from "reactstrap";

const Flight = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [planes, setPlanes] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [depDate, setDepDate] = useState(new Date());

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
  console.log(depDate)
  data.dep_date = depDate
  axios.post(`http://localhost:3030/api/flight`,data)
 .then(res => { alert(`Success: ${res.data}`)})
  .catch(err=>{ alert("Smth went wrong")})
  }

  return (
  
    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <label htmlFor="flight_num">Номер рейсу</label>
     
      <input type="text" id="flight_num" {...register("flight_num",{required:true})} />
      {errors.flight_num && <span>this field is required</span>}
      
    </FormGroup>

    <FormGroup row>
      <label htmlFor="dep_date">Дата вильоту</label>
     
      <DatePicker 
    selected={depDate} 
    onChange={date => setDepDate(date)} 
    dateFormat="yyyy-MM-dd hh:mm"
    showTimeSelect
    />

    </FormGroup>

    <FormGroup row>
      <label htmlFor="route_id">Маршрут</label>
  
      <select value="" {...register("route_id")} >
      {getRoutes(routes)}
</select>
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="tail_code">Літак</label>
      <select value="" {...register("tail_code")} >
      {getPlanes(planes)}
</select>
  
    </FormGroup>
    
    <FormGroup row>
      <label htmlFor="add_luggage">Додатковий багаж</label>
     
      <input type="number" id="add_luggage" {...register("add_luggage")} />
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="terminal_id">Термінал</label>
     
      <input type="text" id="terminal_id" {...register("terminal_id")} />
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="runaway">Взлітно-посадкова смуга</label>
     
      <input type="text" id="runaway" {...register("runaway")} />
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="flight_status">Статус рейсу</label>
     
      <input type="text" id="flight_status" {...register("flight_status")} />
  
    </FormGroup>

      <Button color="primary"> Submit </Button>
    </form>

  );
}

export default Flight;
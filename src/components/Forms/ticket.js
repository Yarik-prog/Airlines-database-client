import React, {useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormGroup } from "reactstrap";
const Ticket = ()=> {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [ticket, setTicket] = useState({})
  const [passengers, setPassengers] = useState([])
  const [routes, setRoutes] = useState([]);
  const [classTypes] = useState([
    {id:1,name:"економ"}, 
    {id:2,name:"бізнес"}, 
    {id:3,name:"перший"}, 
  ])

  useEffect(() => {
    axios.get(`http://localhost:3030/api/route`)
    .then(res => { 
  console.log("Routes has been inserted!")
  setRoutes([...res.data])
  })
    .catch(err=>{console.log("Smth went wrong",err)})
  },[setRoutes]);

  const {id} = useParams()
  useEffect(()=>{
    if(id){
      axios.get(`http://localhost:3030/api/ticket/${id}`,{})
      .then(res => { setTicket(res.data[0])})
    .catch(err=>{alert("Smth went wrong")})
    }
  },[])

  useEffect(() => {
    if (ticket) {
      setValue("ticket_num", ticket.ticket_num );
      setValue("seat_num", ticket.seat_num );
      setValue("dep_country", ticket.dep_country );
      setValue("cost_ua", ticket.cost_ua );
      setValue("type_class", ticket.type_class );
      setValue("ticket_status", ticket.ticket_status );
      setValue("route_id", ticket.route_id );
      setValue("passenger_id", ticket.passenger_id );
    }
  }, [ticket]);

  useEffect(() => {
    axios.get(`http://localhost:3030/api/passenger`)
    .then(res => { 
  console.log("Passengers has been inserted!")
  setPassengers([...res.data])
  })
    .catch(err=>{console.log("Smth went wrong",err)})
  },[]);

  const onSubmit = data => {
    if(!data.passenger_id){data.passenger_id = null}
    console.log(data)
    if(id){
      axios.put(`http://localhost:3030/api/ticket/${id}`,data)
      .then(res => { alert(`Success`)})
      .catch(err=>{alert("Smth went wrong")})
    }else{
    if(!data.passenger_id){data.passenger_id = null}
    axios.post(`http://localhost:3030/api/ticket`,data)
   .then(res => { alert('Success: Ticket has been added')})
    .catch(err=>{alert("Smth went wrong",err)})
  }
}

const getRoutes = (data)=>{
  return data.map(route=>(
    <option key={route.route_id} value={route.route_id}>
      {route.dep_airport}-{route.arrive_airport} ({route.dep_country}-{route.arrive_country})
    </option>
  ))
}

const getPassengers = (data)=>{
  return data.map((obj)=>(
    <option key={obj.passenger_id} value={obj.passenger_id}>{obj.fullname_passenger} {obj.passport_number}</option>
  ))
}

  return (

    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <label htmlFor="ticket_num">Номер білету</label>
     
      <input type="number" id="ticket_num" {...register("ticket_num",{required:true})} />
      {errors.ticket_num && <span style={{color:'red'}}>This field is required</span>}
      
    </FormGroup>

    <FormGroup row>
      <label htmlFor="seat_num">Номер місця</label>
     
      <input type="number" id="seat_num" {...register("seat_num",{
        required:{
        value:true, 
        message:'This field is required'
      },
      min:{value:1, 
        message:'Min value is 1'
     }
      })} />
      {errors.seat_num && <span style={{color:'red'}}>{errors.seat_num.message}</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="cost_ua">Ціна</label>
     
      <input type="number" id="cost_ua" {...register("cost_ua",{min:1000, max:100000})} />
      {errors.cost_ua && <span style={{color:'red'}}>Price must be in range(1000-100000)</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="type_class">Класс</label>
     
      <select {...register("type_class")} >
      {classTypes.map(obj=>(
        <option key={obj.id} value={obj.name}>{obj.name}</option>
      ))}
</select>
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="route_id">Маршрут</label>
  
      <select {...register("route_id")} >
      {getRoutes(routes)}
</select>
  
    </FormGroup>
    
    <FormGroup row>
      <label htmlFor="ticket_status">Статус білету</label>
     
      <input type="text" id="ticket_status" {...register("ticket_status")} />
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="passenger_id">Пасажир</label>
      <select {...register("passenger_id")} >
      {getPassengers(passengers)}
      </select>
  
    </FormGroup>

    <button type="submit"> 
     {id && <span>Edit</span>}
     {!id && <span>Create</span>}
      </button>
    </form>
  );
}

export default Ticket;
 
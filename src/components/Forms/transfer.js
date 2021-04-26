import React,{useState, useEffect} from "react";
import axios from "axios";
import { useForm} from "react-hook-form";
import { FormGroup} from "reactstrap";
const Transfer = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [flights, setFlights] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3030/api/flight`)
    .then(res => { 
  console.log("Flights has been inserted!")
  setFlights([...res.data])
  })
    .catch(err=>{console.log("Smth went wrong",err)})
  },[setFlights]);

  useEffect(() => {
    axios.get(`http://localhost:3030/api/ticket`)
    .then(res => { 
  console.log("Flights has been inserted!")
  setTickets([...res.data])
  })
    .catch(err=>{console.log("Smth went wrong",err)})
  },[setTickets]);

  const onSubmit = data => {

    axios.post(`http://localhost:3030/api/transfer`,data)
    .then(res => { alert(`Success: ${res.data}`)})
    .catch(err=>{  alert("Smth went wrong")})
  }

 
  return (
  
    <form onSubmit={handleSubmit(onSubmit)}>

<FormGroup row>
      <label htmlFor="ticket_id">Білети</label>
      <select {...register("ticket_id")} >
{tickets.map((ticket)=>(
       <option key={ticket.ticket_id} value={ticket.ticket_id}>{ticket.ticket_num}</option>
    ))}
</select>
    </FormGroup>

    <FormGroup row>
      <label htmlFor="flight_id">Рейс</label>
      <select {...register("flight_id")} >
{flights.map((flight)=>(
       <option key={flight.flight_id} value={flight.flight_id}>{flight.flight_num}</option>
    ))}
</select>
    </FormGroup>

      <button type="submit"> Submit </button>
    </form>
  );
}

export default Transfer;


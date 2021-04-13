import React, {useState} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FormGroup, Button } from "reactstrap";
const Ticket = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [classTypes] = useState([
    {id:1,name:"економ"}, 
    {id:2,name:"бізнес"}, 
    {id:3,name:"перший"}, 
  ])

  const onSubmit = data => {
    console.log(data)
    if(!data.passenger_id){data.passenger_id = null}
    axios.post(`http://localhost:3030/api/ticket`,data)
   .then(res => { console.log(res.data)})
    .catch(err=>{console.log("Smth went wrong",err)})
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <label htmlFor="ticket_num">Номер білету</label>
     
      <input id="ticket_num" {...register("ticket_num",{required:true})} />
      {errors.ticket_num && <span>This field is required</span>}
      
    </FormGroup>

    <FormGroup row>
      <label htmlFor="seat_num">Номер місця</label>
     
      <input type="number" id="seat_num" {...register("seat_num",{required:true})} />
      {errors.seat_num && <span>This field is required</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="cost_ua">Ціна</label>
     
      <input type="number" id="cost_ua" {...register("cost_ua",{min:3000, max:100000})} />
      {errors.cost_ua && <span>price must be range(3000-100000)</span>}
  
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
      <label htmlFor="ticket_status">Статус білету</label>
     
      <input type="text" id="ticket_status" {...register("ticket_status")} />
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="passenger_id">Пасажир</label>
     
      <input id="passenger_id" {...register("passenger_id")} />
  
    </FormGroup>

      <Button color="primary"> Submit </Button>
    </form>
  );
}

export default Ticket;
 
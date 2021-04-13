import React, {useState} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useForm} from "react-hook-form";
import { FormGroup, Button } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";

const Passenger = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [bookDate, setBookDate] = useState(new Date());
  const [visaType] = useState([
    {id:1,name:"туристична"}, 
    {id:2,name:"бізнес"}, 
    {id:3,name:"робоча"}, 
    {id:4,name:"студентська"}, 
    {id:5,name:"дипломатична"}, 
    {id:6,name:"імміграційна"}, 
    {id:7,name:"журналістська"}, 
    {id:8,name:"транзитна"}
  ])

  const onSubmit = data => {
    data.book_date = `${bookDate.getUTCFullYear()}-${(bookDate.getUTCMonth()+1)}-${bookDate.getUTCDate()}`
   // console.log(data)
    axios.post(`http://localhost:3030/api/passenger`,data)
    .then(res => { alert(`Success: ${res.data}`)})
    .catch(err=>{ alert("Smth went wrong")})
  }

  
  return (
 
    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <label htmlFor="fullname_passenger">ПІБ пасажира</label>
     
      <input id="fullname_passenger" {...register("fullname_passenger",{required:true})} />
      {errors.fullname_passenger && <span style={{color:'red'}}>this field is required</span>}
    </FormGroup>

    <FormGroup row>
      <label htmlFor="book_date">Дата бронювання</label>
     
      <DatePicker 
    selected={bookDate} 
    onChange={date => setBookDate(date)} 
    dateFormat="yyyy-MM-dd"
    />

    </FormGroup>

    <FormGroup row>
      <label htmlFor="passport_number">Номер паспорту</label>
     
      <input type="number" id="passport_number" {...register("passport_number",{pattern: /^([0-9]{6})$/i})} />
      {errors.passport_number && <span style={{color:'red'}}>invalid passport number</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="phone_number">Номер телефону</label>
     
      <input type="tel" name="phone_number" {...register("phone_number",{pattern: /^\+?3?8?(0\d{9})$/i})}/>
      {errors.phone_number && <span style={{color:'red'}}>invalid phone number</span>}
  
    </FormGroup>
      

    <FormGroup row>
      <label htmlFor="visa">Віза</label>
     
      <select {...register("visa")} >
      {visaType.map(visa=>(
        <option key={visa.id} value={visa.name}> {visa.name} </option>
      ))}
      </select>
  
    </FormGroup>
   
      <Button color="primary"> Submit </Button>
    </form>

  );
}

export default Passenger;
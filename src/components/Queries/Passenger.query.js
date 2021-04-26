import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FormGroup, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import MaterialTable from 'material-table'
const PassengerQuery = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [passengers, setPassengers] = useState([])
  const [bookDate, setBookDate] = useState(new Date());
  const columns=[
    { title: 'ПІБ', field: 'fullname_passenger' },
    { title: 'Дата бронювання', field: 'book_date'},
    { title: 'Номер паспорту', field: 'passport_number'},
    { title: 'Номер тел.', field: 'phone_number'},
    { title: 'Номер білету', field: 'ticket_num'},
    { title: 'Віза', field: 'visa'}

  ]

  const onSubmit = data => {
    //console.log(data);
    data.book_date = `${bookDate.getFullYear()}-${("0" + (bookDate.getMonth() + 1)).slice(-2)}-${bookDate.getDate()} ${("0"+bookDate.getHours()).slice(-2)}:${("0"+bookDate.getMinutes()).slice(-2)}`
  
    axios.post(`http://localhost:3030/api/passenger/query`,data)
   .then(res => { 
      alert(`Success: `)
      setPassengers(res.data)
    })
    .catch(err=>{ alert("Smth went wrong")})
  }

  
  return (
<div style={{margin:'0 auto'}}>
    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
      <label htmlFor="book_date">Дата бронювання</label>
     
      <DatePicker 
    selected={bookDate} 
    onChange={date => setBookDate(date)} 
    dateFormat="yyyy-MM-dd HH:mm"
    showTimeSelect
    timeFormat="HH:mm"
    />
</FormGroup>

    <FormGroup row>
        <label htmlFor="fullname_passenger">ПІБ пасажира</label>
     
      <input id="fullname_passenger" {...register("fullname_passenger",{required:true})} />
      {errors.fullname_passenger && <span style={{color:'red'}}>this field is required</span>}
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
          data={passengers}
          style={{width:800}}
        />
    </div>
</div>
  );
}

export default PassengerQuery;
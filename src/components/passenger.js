import React from "react";
import DateTimePicker from 'react-datetime-picker';
import { useForm } from "react-hook-form";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
const Passenger = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = data => {
    console.log(data);
    //axios.post(`http://localhost:3030/api/passenger`,data)
   // .then(res => { console.log(res)})
   // .catch(err=>{console.log("Smth went wrong",err)})
  }

  
  return (
      <div style={{width:350,margin:'50px auto'}}>
    <Form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <Label for="fullname_passenger">ПІБ пасажира</Label>
     
      <input id="fullname_passenger" {...register("fullname_passenger")} />
      
    </FormGroup>

    <FormGroup row>
      <Label for="passport_number">Номер паспорту</Label>
     
      <input id="passport_number" {...register("passport_number")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="book_date">Дата бронювання</Label>
     
      <input id="book_date" {...register("book_date")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="visa">Віза</Label>
     
      <input id="visa" {...register("visa")} />
  
    </FormGroup>
    
    <FormGroup row>
      <Label for="ticket_num">Номер білету</Label>
     
      <input id="ticket_num" {...register("ticket_num")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="luggage_code">Код багажу</Label>
     
      <input id="luggage_code" {...register("luggage_code")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="weight">Вага багажу</Label>
     
      <input id="weight" {...register("weight")} />
  
    </FormGroup>

      <Button color="primary"> Submit </Button>
    </Form>
    </div>
  );
}

export default Passenger;
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FormGroup, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import MaterialTable from 'material-table'
const FlightQuery = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [flights, setFlights] = useState([])
  const [depDate, setDepDate] = useState(new Date());
  const columns=[
    { title: 'Номер рейсу', field: 'flight_num' },
    { title: 'Дата вильоту', field: 'dep_date'},
    { title: 'Бортовий номер', field: 'tail_code'},
    { title: 'Додатковий багаж', field: 'add_luggage'},
    { title: 'Термінал', field: 'terminal'},
    { title: 'Взлідно-посадкова смуга', field: 'runaway'},
    { title: 'Аеропорт вильоту', field: 'dep_airport'},
    { title: 'Аеропорт прибуття', field: 'arrive_airport'},
    { title: 'Статус рейсу', field: 'flight_status'},

  ]

  const onSubmit = data => {
    
    data.search_date = `${depDate.getFullYear()}-${("0" + (depDate.getMonth() + 1)).slice(-2)}-${depDate.getDate()} ${("0"+depDate.getHours()).slice(-2)}:${("0"+depDate.getMinutes()).slice(-2)}`
 
    axios.post(`http://localhost:3030/api/flight/query`,data)
   .then(res => { 
      alert(`Success: `)
      setFlights(res.data)
      })
    .catch(err=>{ alert("Smth went wrong")})
  }

  
  return (
<div style={{margin:'0 auto'}}>
    <form onSubmit={handleSubmit(onSubmit)}>

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
      <label htmlFor="terminal">Термінал</label>
     
      <input type="text" id="terminal" {...register("terminal")} />
  
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
          data={flights}
          style={{width:800}}
        />
      </div>
</div>
  );
}

export default FlightQuery;
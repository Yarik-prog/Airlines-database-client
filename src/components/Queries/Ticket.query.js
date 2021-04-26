import React, { useState, useEffect} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FormGroup, Button } from "reactstrap";
import {ErrorBoundary} from 'react-error-boundary'
import MaterialTable from 'material-table'

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const TicketQuery = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [tickets, setTickets] = useState([])
  const [firstTicket, setFirstTicket] = useState([])
  const [routes, setRoutes] = useState([])
  const columns=[
    { title: 'Номер білету', field: 'ticket_num' },
    { title: 'Номер місця', field: 'seat_num'},
    { title: 'Цінп', field: 'cost_ua'},
    { title: 'Класс', field: 'type_class'},
    { title: 'Статус білету', field: 'ticket_status'},
    { title: 'Пасажир id', field: 'passenger_id'}
  ]
  const columnsFlight=[
    { title: 'Номер рейсу', field: 'flight_num' },
    { title: 'Дата вильоту', field: 'dep_date'},
    { title: 'Маршрут', field: 'route_id'},
    { title: 'Аеропорт вильоту', field: 'dep_airport' },
    { title: 'Аеропорт прибуття', field: 'arrive_airport'},
    { title: 'Країна вильота', field: 'dep_country'},
    { title: 'Країна прибуття', field: 'arrive_country'},
    { title: 'Статус маршруту', field: 'route_status'}
  ]

  useEffect(() => {
    axios.get(`http://localhost:3030/api/route`)
    .then(res => { 
  console.log("Routes has been inserted!")
  setRoutes([...res.data])
  })
    .catch(err=>{console.log("Smth went wrong",err)})
  },[]);

  const onSubmit = data => {
    
    axios.post(`http://localhost:3030/api/ticket/query`,data)
   .then(res => { 
      alert(`Success: `)
      console.log(res.data)
      if(res.data){
      setFirstTicket([res.data[0]])
      setTickets(res.data)
   }
  }).catch(err=>{ alert("Smth went wrong")})
  }
  
  const getRoutes = (data)=>{
    return data.map(route=>(
      <option key={route.route_id} value={route.route_id}>
        {route.dep_airport}-{route.arrive_airport} ({route.dep_country}-{route.arrive_country})
      </option>
    ))
  }
  
  return (
    <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}
  >
<div style={{margin:'50px auto'}}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <FormGroup row>
        <label htmlFor="ticket_num">Номер білету</label>
     
      <input id="ticket_num" {...register("ticket_num",{required:true})} />
      {errors.ticket_num && <span>This field is required</span>}
      
    </FormGroup>

    <FormGroup row>
      <label htmlFor="route_id">Маршрут</label>
  
      <select {...register("route_id")} >
      {getRoutes(routes)}
</select>
  
    </FormGroup>
    
      <Button color="primary"> Submit </Button>
    </form>
    <MaterialTable
        options={{
          search: false,
          sorting: false,
          showTitle: false,
          toolbar:false
        }}
          columns={columns}
          data={firstTicket}
        />
    {tickets &&
        <div style={{marginTop:30}}>
          <h3>Пересадки</h3>
            <MaterialTable

        options={{
          search: false,
          sorting: false,
          showTitle: false,
          toolbar:false
        }}
          columns={columnsFlight}
          data={tickets}
        />
        </div>
}
</div>
</ErrorBoundary>
  );
}

export default TicketQuery;
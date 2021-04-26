import React, {useState, useEffect} from "react";
import axios from 'axios'
import { Redirect } from "react-router";
import MaterialTable from 'material-table'
const FlightView = ()=> {
    const [flights, setFlights] = useState([])
    const [edit, SetEdit] = useState()
    const columns=[
        { title: 'Номер рейсу', field: 'flight_num' },
        { title: 'Дата вильоту', field: 'dep_date'},
        { title: 'Маршрут', field: 'route_id'},
        { title: 'Літак', field: 'tail_code'},
        { title: 'Додатковий багаж', field: 'add_luggage'},
        { title: 'Термінал', field: 'terminal'},
        { title: 'Взлітно-посадкова смуга', field: 'runaway'},
        { title: 'Статус рейсу', field: 'flight_status'}
      ]

      useEffect(() => {
        axios.get(`http://localhost:3030/api/flight`)
        .then(res => { 
      console.log("Flights has been inserted!")
      res.data.map(obj=>{
        obj.dep_date = new Date(obj.dep_date).toLocaleString()
      })
      setFlights([...res.data])
      })
        .catch(err=>{console.log("Smth went wrong",err)})
      },[]);

      const remove = (id)=>{
            axios.delete(`http://localhost:3030/api/flight/${id}`)
            .then(res=>{alert(`Success ${res.data}`)})
            .catch(err=>{alert(`Error: ${err.response.data.mes}`)})
      }

  return (
  
<div style={{margin:'0 auto'}}>
<MaterialTable
        options={{
          search: false,
          sorting: false,
          showTitle: false,
          toolbar:false,
          actionsColumnIndex: -1
        }}
          columns={columns}
          data={flights}
          actions={[
            rowData=>(
              {
                icon:'edit',
                tooltip:'Edit crew',
                onClick: (event, rowData) => SetEdit(rowData.flight_id)
                  
              }
            ),
              rowData=>({
                icon:'delete',
                tooltip:'Delete crew',
                onClick: (event, rowData) => {
                if(window.confirm(`Do you want to delete flight num:${rowData.flight_num}?`)){remove(rowData.flight_id)}
                }
              })
          ]}
        />
        {edit && <Redirect to={{pathname:`/flight/edit/${edit}`}}/>}
</div>

  );
}

export default FlightView;


import React, {useState, useEffect} from "react";
import axios from 'axios'
import { Redirect } from "react-router";
import MaterialTable from 'material-table'
const TicketView = ()=> {
    const [tickets, setTickets] = useState([])
    const [edit, SetEdit] = useState()
    const columns=[
        { title: 'Номер білету', field: 'ticket_num' },
        { title: 'Номер місця', field: 'seat_num'},
        { title: 'Цінп', field: 'cost_ua'},
        { title: 'Класс', field: 'type_class'},
        { title: 'Статус білету', field: 'ticket_status'},
        { title: 'Пасажир', field: 'passenger_id'}
      ]

      useEffect(() => {
        axios.get(`http://localhost:3030/api/ticket`)
        .then(res => { 
      console.log("Tickets has been inserted!")
      setTickets([...res.data])
      })
        .catch(err=>{console.log("Smth went wrong",err)})
      },[]);

      const remove = (id)=>{
            axios.delete(`http://localhost:3030/api/ticket/${id}`)
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
          data={tickets}
          actions={[
            rowData=>(
              {
                icon:'edit',
                tooltip:'Edit crew',
                onClick: (event, rowData) => SetEdit(rowData.ticket_id)
                  
              }
            ),
              rowData=>({
                icon:'delete',
                tooltip:'Delete crew',
                onClick: (event, rowData) => {
                if(window.confirm(`Do you want to delete ticket with id: ${rowData.ticket_id}?`)){remove(rowData.ticket_id)}
                }
              })
          ]}
        />
            {edit && <Redirect to={{pathname:`/ticket/edit/${edit}`}}/>}
</div>

  );
}

export default TicketView;


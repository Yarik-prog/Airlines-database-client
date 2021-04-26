import React, {useState, useEffect} from "react";
import axios from 'axios'
import { Redirect } from "react-router";
import MaterialTable from 'material-table'
const PassengerView = ()=> {
    const [passengers, setPassengers] = useState([])
    const [edit, SetEdit] = useState()
    const columns=[
        { title: 'ПІБ', field: 'fullname_passenger' },
        { title: 'Дата бронювання', field: 'book_date'},
        { title: 'Номер паспорту', field: 'passport_number'},
        { title: 'Номер телефону', field: 'phone_number'},
        { title: 'Номер білету', field: 'ticket_num'}
      ]

      useEffect(() => {
        axios.get(`http://localhost:3030/api/passenger`)
        .then(res => { 
      console.log("Passengers has been inserted!")
      res.data.map(obj=>{
        obj.book_date = new Date(obj.book_date).toLocaleString()
      })
      setPassengers([...res.data])
      })
        .catch(err=>{console.log("Smth went wrong",err)})
      },[]);


      
      const remove = (id)=>{
            axios.delete(`http://localhost:3030/api/passenger/${id}`)
            .then(res=>{alert(`Success ${res.data}`)})
            .catch(err=>{alert(`Error: ${err.response.data.mes}`)})
      }

  return (
  
<div style={{margin:'50px auto'}}>
<MaterialTable
        options={{
          search: false,
          sorting: false,
          showTitle: false,
          toolbar:false,
          actionsColumnIndex: -1
        }}
          columns={columns}
          data={passengers}
          actions={[
            rowData=>(
              {
                icon:'edit',
                tooltip:'Edit crew',
                onClick: (event, rowData) => SetEdit(rowData.passenger_id)
                  
              }
            ),
              rowData=>({
                icon:'delete',
                tooltip:'Delete crew',
                onClick: (event, rowData) => {
                if(window.confirm(`Do you want to delete passenger with id: ${rowData.passenger_id}?`)){remove(rowData.passenger_id)}
                }
              })
          ]}
        />
            {edit && <Redirect to={{pathname:`/passenger/edit/${edit}`}}/>}
</div>

  );
}

export default PassengerView;


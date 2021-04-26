import React, {useState, useEffect} from "react";
import axios from 'axios'
import { Redirect } from "react-router";
import MaterialTable from 'material-table'
const PlaneView = ()=> {
    const [planes, setPlanes] = useState([])
    const [edit, SetEdit] = useState()
    const columns=[
        { title: 'Бортовий номер', field: 'tail_code' },
        { title: 'Назва літака', field: 'name_plane'},
        { title: 'Модель літака', field: 'model'},
        { title: 'Число місць', field: 'seats_count'},
        { title: 'Дальність польоту', field: 'flight_range_km'},
        { title: 'Екіпаж', field: 'crew_num'},
        { title: 'Стан літака', field: 'plane_condition'}
      ]

      useEffect(() => {
        axios.get(`http://localhost:3030/api/plane`)
        .then(res => { 
      console.log("Planes has been inserted!")
      setPlanes([...res.data])
      })
        .catch(err=>{console.log("Smth went wrong",err)})
      },[]);

      const remove = (id)=>{
            axios.delete(`http://localhost:3030/api/plane/${id}`)
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
          data={planes}
          actions={[
            rowData=>(
              {
                icon:'edit',
                tooltip:'Edit crew',
                onClick: (event, rowData) => SetEdit(rowData.plane_id)
                  
              }
            ),
              rowData=>({
                icon:'delete',
                tooltip:'Delete crew',
                onClick: (event, rowData) => {
                if(window.confirm(`Do you want to delete plane with id: ${rowData.plane_id}?`)){remove(rowData.plane_id)}
                }
              })
          ]}
        />
            {edit && <Redirect to={{pathname:`/plane/edit/${edit}`}}/>}
</div>

  );
}

export default PlaneView;


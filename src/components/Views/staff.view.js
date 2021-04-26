import React, {useState, useEffect} from "react";
import axios from 'axios'
import { Redirect } from "react-router";
import MaterialTable from 'material-table'
const StaffView = ()=> {
    const [staff, setStaff] = useState([])
    const [edit, SetEdit] = useState()
    const columns=[
        { title: 'ПІБ персоналу', field: 'fullname_staff' },
        { title: 'Посада', field: 'work_position'},
        { title: 'Номер групи', field: 'crew_num'},
        { title: 'Кількість годин в польоті', field: 'flight_hours'}
      ]

      useEffect(() => {
        axios.get(`http://localhost:3030/api/staff`)
        .then(res => { 
      console.log("Staff has been inserted!")
      setStaff([...res.data])
      })
        .catch(err=>{console.log("Smth went wrong",err)})
      },[]);

      const remove = (id)=>{
            axios.delete(`http://localhost:3030/api/staff/${id}`)
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
          data={staff}
          actions={[
            rowData=>(
              {
                icon:'edit',
                tooltip:'Edit crew',
                onClick: (event, rowData) => SetEdit(rowData.staff_id)
                  
              }
            ),
              rowData=>({
                icon:'delete',
                tooltip:'Delete crew',
                onClick: (event, rowData) => {
                if(window.confirm(`Do you want to delete staff with id: ${rowData.staff_id}?`)){remove(rowData.staff_id)}
                }
              })
          ]}
        />
            {edit && <Redirect to={{pathname:`/staff/edit/${edit}`}}/>}
</div>

  );
}

export default StaffView;


import React, {useState, useEffect} from "react";
import axios from 'axios'
import { Redirect } from "react-router";
import MaterialTable from 'material-table'
const MaintanceView = ()=> {
    const [maintenances, setMaintenances] = useState([])
    const [edit, SetEdit] = useState()
    const columns=[
        { title: 'Дата проведення', field: 'event_date' },
        { title: 'Обслуг. бригада', field: 'service_crew_num'},
        { title: 'Літак, що обслуговувався', field: 'tail_code'},
        { title: 'Результат', field: 'result'}
      ]


      useEffect(() => {
        axios.get(`http://localhost:3030/api/maintenance`)
        .then(res => { 
      console.log("Maintenances has been inserted!")
      setMaintenances([...res.data])
      })
        .catch(err=>{console.log("Smth went wrong",err)})
      },[]);

      const remove = (id)=>{
            axios.delete(`http://localhost:3030/api/maintenance/${id}`)
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
          data={maintenances}
          actions={[
            rowData=>(
              {
                icon:'edit',
                tooltip:'Edit crew',
                onClick: (event, rowData) => SetEdit(rowData.plane_maintenance_id)
                  
              }
            ),
              rowData=>({
                icon:'delete',
                tooltip:'Delete crew',
                onClick: (event, rowData) => {
                if(window.confirm(`Do you want to delete maintance with id: ${rowData.plane_maintenance_id}?`)){remove(rowData.plane_maintenance_id)}
                }
              })
          ]}
        />
            {edit && <Redirect to={{pathname:`/maintenance/edit/${edit}`}}/>}
</div>

  );
}

export default MaintanceView;


import React, {useState, useEffect} from "react";
import axios from 'axios'
import { Redirect } from "react-router";
import MaterialTable from 'material-table'
const RouteView = ()=> {
    const [routes, setRoutes] = useState([])
    const [edit, SetEdit] = useState()
    const columns=[
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

      const remove = (id)=>{
            axios.delete(`http://localhost:3030/api/route/${id}`)
            .then(res=>{alert(`Success ${res.data}`)})
            .catch(err=>{alert(`Error: ${err.response.data.mes}`)})
      }

  return (
  
<div style={{margin:'50px auto'}}>
<MaterialTable style={{width:'100%',overflow:'auto'}}
        options={{
          paging:false,
          search: false,
          sorting: false,
          showTitle: false,
          toolbar:false,
          actionsColumnIndex: -1
        }}
          columns={columns}
          data={routes}
        
          actions={[
            rowData=>(
              {
                icon:'edit',
                tooltip:'Edit crew',
                onClick: (event, rowData) => SetEdit(rowData.route_id)
                  
              }
            ),
              rowData=>({
                icon:'delete',
                tooltip:'Delete crew',
                onClick: (event, rowData) => {
                if(window.confirm(`Do you want to delete route with id: ${rowData.route_id}?`)){remove(rowData.route_id)}
                }
              })
          ]}
        />
            {edit && <Redirect to={{pathname:`/route/edit/${edit}`}}/>}
</div>

  );
}

export default RouteView;


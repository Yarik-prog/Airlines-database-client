import React, {useState, useEffect} from "react";
import axios from 'axios'
import MaterialTable from 'material-table'
import { Redirect } from "react-router";
const CrewView = ()=> {
    const [crews, setCrews] = useState([])
    const [edit, SetEdit] = useState()
    const columns=[
        { title: 'Номер групи', field: 'crew_num' },
        { title: 'Тип групи', field: 'type_crew'},
      ]

      useEffect(() => {
        axios.get(`http://localhost:3030/api/crew`)
        .then(res => { 
      console.log("Crews has been inserted!")
      setCrews([...res.data])
      })
        .catch(err=>{console.log("Smth went wrong",err)})
      },[]);

      const remove = (id)=>{
            axios.delete(`http://localhost:3030/api/crew/${id}`)
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
          data={crews}
          actions={[
              rowData=>(
                {
                  icon:'edit',
                  tooltip:'Edit crew',
                  onClick: (event, rowData) => SetEdit(rowData.crew_id)
                    
                }
              ),
              rowData=>(
                {
                icon:'delete',
                tooltip:'Delete crew',
                onClick: (event, rowData) => {
                if(window.confirm(`Do you want to delete crew ${rowData.crew_num}?`)) remove(rowData.crew_id)
                }
              })
          ]}
        />
        {edit && <Redirect to={{pathname:`/crew/edit/${edit}`}}/>}
</div>

  );
}

export default CrewView;


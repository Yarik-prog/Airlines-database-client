import React, {useState, useEffect} from "react";
import axios from 'axios'
import MaterialTable from 'material-table'
import { Redirect } from "react-router";
const CompanyView = ()=> {
    const [companies, setCompanies] = useState([])
    const [edit, SetEdit] = useState()
    const columns=[
      { title: 'Назва компанії', field: 'name_company' },
      { title: 'Країна розташування', field: 'country_location'},
      { title: 'Адреса головного офісу', field: 'address'},
      { title: 'Тел. головного офісу', field: 'phone_head_office'}
    ]

      useEffect(() => {
        axios.get(`http://localhost:3030/api/company`)
        .then(res => { 
      console.log("Companies has been inserted!")
      setCompanies([...res.data])
      })
        .catch(err=>{console.log("Smth went wrong",err)})
      },[]);

      const remove = (id)=>{
            axios.delete(`http://localhost:3030/api/company/${id}`)
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
          data={companies}
          actions={[
              rowData=>(
                {
                  icon:'edit',
                  tooltip:'Edit crew',
                  onClick: (event, rowData) => SetEdit(rowData.avia_company_id)
                    
                }
              ),
              rowData=>(
                {
                icon:'delete',
                tooltip:'Delete crew',
                onClick: (event, rowData) => {
                if(window.confirm(`Do you want to delete comapny ${rowData.avia_company_id}?`)) remove(rowData.avia_company_id)
                }
              })
          ]}
        />
        {edit && <Redirect to={{pathname:`/company/edit/${edit}`}}/>}
</div>

  );
}

export default CompanyView;


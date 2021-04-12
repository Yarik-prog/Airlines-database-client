import React,{useState, useEffect} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
const PlaneMaintanance = ()=> {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [crews, setCrews] = useState([]);
  
  

  useEffect(() => {
    axios.get(`http://localhost:3030/api/crew`)
    .then(res => { 
  console.log("Crews has been inserted!")
  setCrews([...res.data])
  })
    .catch(err=>{console.log("Smth went wrong",err)})
  },[setCrews]);



  const onSubmit = data => {
    console.log(data);
    console.log("Crews",crews);
    //axios.post(`http://localhost:3030/api/crew`,data)
   // .then(res => { console.log(res)})
   // .catch(err=>{console.log("Smth went wrong",err)})
  }

  const getCrews = (data)=>{
    data = data.filter(obj=>{
      if (obj.type_crew == "service") return true
      else return false
    })
    return data.map((crew)=>(
      <option key={crew.crew_id} value={crew.crew_num}>{crew.crew_num} {crew.type_crew}</option>
    ))
  }
  
  return (
      <div style={{width:350,margin:'50px auto'}}>
    <Form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <Label for="event_date">Дата проведення</Label>
     
      <input id="event_date" {...register("event_date")} />
      
    </FormGroup>

    <FormGroup row>
      <Label for="service_crew_num">Група</Label>
      <select {...register("service_crew_num")} >
      {getCrews(crews)}
</select>
    
    </FormGroup>

    <FormGroup row>
      <Label for="tail_code">Літак, що обслуговується</Label>
     
      <input id="tail_code" {...register("tail_code")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="result">Результат проведення тех. обслуговування</Label>
     
      <input id="result" {...register("result")} />
  
    </FormGroup>

      <Button color="primary"> Submit </Button>
    </Form>
    </div>
  );
}

export default PlaneMaintanance;
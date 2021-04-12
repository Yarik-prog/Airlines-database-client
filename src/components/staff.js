import React,{useState, useEffect} from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
const Staff = ()=> {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
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
  if(!data.crew_num){data.crew_num = null}
  if(!data.flight_hours){data.flight_hours = null}
    axios.post(`http://localhost:3030/api/staff`,data)
    .then(res => { console.log("Success",res.data)})
    .catch(err=>{console.log("Smth went wrong",err)})
  }

 
  return (
      <div style={{width:350,margin:'50px auto'}}>
    <Form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <Label for="fullname_staff">ПІБ</Label>
     
      <input id="fullname_staff" {...register("fullname_staff",{ required: true })} />
      {errors.fullname_staff && <span>This field is required</span>}
      
    </FormGroup>

    <FormGroup row>
      <Label for="work_position">Посада</Label>
     
      <input id="work_position" {...register("work_position",{ required: true })} />
      {errors.work_position && <span>This field is required</span>}
  
    </FormGroup>

    <FormGroup row>
      <Label for="flight_hours">Кількість годин в польоті</Label>
     
      <input type="number" id="flight_hours" {...register("flight_hours")} />
  
    </FormGroup>

    <FormGroup row>
      <Label for="crew_num">Група</Label>
      <select {...register("crew_num")} >
{crews.map((crew)=>(
       <option key={crew.crew_id} value={crew.crew_num}>{crew.crew_num} {crew.type_crew}</option>
    ))}
</select>
    
    </FormGroup>

      <Button color="primary"> Submit </Button>
    </Form>
    </div>
  );
}

export default Staff;


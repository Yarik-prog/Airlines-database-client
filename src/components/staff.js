import React,{useState, useEffect} from "react";
import axios from "axios";
import { useForm} from "react-hook-form";
import { FormGroup, Button } from "reactstrap";
const Staff = ()=> {
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
  if(!data.crew_num){data.crew_num = null}
  if(!data.flight_hours){data.flight_hours = null}
    axios.post(`http://localhost:3030/api/staff`,data)
    .then(res => { alert(`Success: ${res.data}`)})
    .catch(err=>{  alert("Smth went wrong")})
  }

 
  return (
  
    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <label htmlFor="fullname_staff">ПІБ</label>
     
      <input id="fullname_staff" {...register("fullname_staff",{ required: true })} />
      {errors.fullname_staff && <span>this field is required</span>}
      
    </FormGroup>

    <FormGroup row>
      <label htmlFor="work_position">Посада</label>
     
      <input id="work_position" {...register("work_position",{ required: true })} />
      {errors.work_position && <span>this field is required</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="flight_hours">Кількість годин в польоті</label>
     
      <input type="number" id="flight_hours" {...register("flight_hours",{min:100, max:30000})} />
      {errors.flight_hours && <span>value must be in range(100-30000)</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="crew_num">Група</label>
      <select {...register("crew_num")} >
{crews.map((crew)=>(
       <option key={crew.crew_id} value={crew.crew_num}>{crew.crew_num} {crew.type_crew}</option>
    ))}
</select>
    
    </FormGroup>

      <Button color="primary"> Submit </Button>
    </form>
  );
}

export default Staff;


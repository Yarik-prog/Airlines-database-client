import React, {useState, useEffect} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FormGroup, Button } from "reactstrap";
const Plane = ()=> {
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
   // console.log(data)
    axios.post(`http://localhost:3030/api/plane`,data)
   .then(res => { alert(`Success: ${res.data}`)})
    .catch(err=>{ alert("Smth went wrong")})
  }

  const getCrews = (data)=>{
    data = data.filter(obj=>{
      if (obj.type_crew === "Екіпаж") return true
      else return false
    })
    return data.map((crew)=>(
      <option key={crew.crew_id} value={crew.crew_num}>{crew.crew_num} {crew.type_crew}</option>
    ))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <label htmlFor="tail_code">Бортовий номер</label>
     
      <input type="text" id="tail_code" {...register("tail_code",{required:true})} />
      {errors.tail_code && <span style={{color:'red'}}>this field is required</span>}
    </FormGroup>

    <FormGroup row>
      <label htmlFor="name_plane">Назва літака</label>
     
      <input type="text" id="name_plane" {...register("name_plane",{required:true})} />
      {errors.name_plane && <span style={{color:'red'}}>this field is required</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="model">Модель</label>
     
      <input type="text" id="model" {...register("model",{required:true})} />
      {errors.model && <span style={{color:'red'}}>this field is required</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="seats_count">Кількість місць</label>
     
      <input type="number" id="seats_count" {...register("seats_count",{max:700})} />
      {errors.seats_count && <span style={{color:'red'}}>max seats 700</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="flight_range_km">Дальність польоту</label>
     
      <input type="number" id="flight_range_km" {...register("flight_range_km",{max:10000})} />
      {errors.flight_range_km && <span style={{color:'red'}}>max range 1000</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="crew_num">Екіпаж</label>
     
      <select {...register("crew_num")} >
      {getCrews(crews)}
</select>
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="aviacompany_name">Назва авіакомпанії</label>
     
      <input type="text" id="aviacompany_name" {...register("aviacompany_name")} />
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="plane_condition">Стан літака</label>
     
      <textarea type="text" id="plane_condition" {...register("plane_condition",{minLength:10,maxLength:244})} />
      {errors.plane_condition && <span style={{color:'red'}}>length must be in range(10-244)</span>}
  
    </FormGroup>

      <Button color="primary"> Submit </Button>
    </form>
  );
}

export default Plane;

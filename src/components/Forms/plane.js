import React, {useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormGroup} from "reactstrap";
const Plane = ()=> {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [plane, setPlane] = useState({})
  const [crews, setCrews] = useState([]);
  const [companies, setCompanies] = useState([]);

  const {id} = useParams()
  useEffect(()=>{
    if(id){
      axios.get(`http://localhost:3030/api/plane/${id}`,{})
      .then(res => { setPlane(res.data[0])})
    .catch(err=>{alert("Smth went wrong")})
    }
  },[])

  useEffect(() => {
    axios.get(`http://localhost:3030/api/crew`)
    .then(res => { 
  console.log("Crews has been inserted!")
  setCrews([...res.data])
  })
    .catch(err=>{console.log("Smth went wrong",err)})
  },[setCrews]);

  useEffect(() => {
    axios.get(`http://localhost:3030/api/company`)
    .then(res => { 
  console.log("Companies has been inserted!")
  setCompanies([...res.data])
  })
    .catch(err=>{console.log("Smth went wrong",err)})
  },[setCompanies]);

  useEffect(() => {
    if (plane) {
      setValue("tail_code", plane.tail_code );
      setValue("name_plane", plane.name_plane );
      setValue("model", plane.model );
      setValue("seats_count", plane.seats_count );
      setValue("flight_range_km", plane.flight_range_km );
      setValue("crew_num", plane.crew_num );
      setValue("aviacompany_name", plane.aviacompany_name );
      setValue("plane_condition", plane.plane_condition );
    }
  }, [plane]);

  const onSubmit = data => {
    if(id){
      axios.put(`http://localhost:3030/api/plane/${id}`,data)
      .then(res => { alert(`Success`)})
      .catch(err=>{alert("Smth went wrong")})
    }else{
    axios.post(`http://localhost:3030/api/plane`,data)
   .then(res => { alert(`Success: ${res.data}`)})
    .catch(err=>{ alert("Smth went wrong")})
  }
}
  const getCrews = (data)=>{
    data = data.filter(obj=>{
      if (obj.type_crew === "Екіпаж") return true
      else return false
    })
    return data.map((crew)=>(
      <option key={crew.crew_id} value={crew.crew_id}>{crew.crew_num} {crew.type_crew}</option>
    ))
  }

  const getCompanies = (data)=>{
    return data.map((obj)=>(
      <option key={obj.avia_company_id} value={obj.avia_company_id}>{obj.name_company}</option>
    ))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

    <FormGroup row>
        <label htmlFor="tail_code">Бортовий номер</label>
     
      <input type="text" id="tail_code" {...register("tail_code",{required:true})} />
      {errors.tail_code && <span style={{color:'red'}}>This field is required</span>}
    </FormGroup>

    <FormGroup row>
      <label htmlFor="name_plane">Назва літака</label>
     
      <input type="text" id="name_plane" {...register("name_plane",{required:true})} />
      {errors.name_plane && <span style={{color:'red'}}>This field is required</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="model">Модель</label>
     
      <input type="text" id="model" {...register("model",{required:true})} />
      {errors.model && <span style={{color:'red'}}>This field is required</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="seats_count">Кількість місць</label>
     
      <input type="number" id="seats_count" {...register("seats_count",{min:2, max:700})} />
      {errors.seats_count && <span style={{color:'red'}}>Seats must be in range(2-700)</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="flight_range_km">Дальність польоту</label>
     
      <input type="number" id="flight_range_km" {...register("flight_range_km",{min:1000, max:50000})} />
      {errors.flight_range_km && <span style={{color:'red'}}> Flight range must be in (1000-50000)</span>}
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="crew_num">Екіпаж</label>
     
      <select {...register("crew_num")} >
      {getCrews(crews)}
</select>
  
    </FormGroup>

    <FormGroup row>
      <label htmlFor="avia_company_id">Авіа компанія</label>
     
      <select {...register("avia_company_id")} >
      {getCompanies(companies)}
</select>
  
    </FormGroup>


    <FormGroup row>
      <label htmlFor="plane_condition">Стан літака</label>
     
      <textarea type="text" id="plane_condition"{...register("plane_condition")} />
  
    </FormGroup>

    <button type="submit"> 
     {id && <span>Edit</span>}
     {!id && <span>Create</span>}
      </button>
    </form>
  );
}

export default Plane;

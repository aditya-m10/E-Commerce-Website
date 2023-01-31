import React from 'react'
import {Box} from '@mui/material';
import "./styles/product.css"
import { useNavigate } from "react-router-dom";
const Slideroffers = () => {
  const a=[1,2,3,4,5,6]
  const navigate = useNavigate()

  return (
    <div>
       <Box   sx={{mt:1 ,color:"whitesmoke"}}>
      <div  id="carouselExampleIndicators" className="carousel slide "  data-bs-ride="true">

<div style={{ maxHeight: 280 }}  className="carousel-inner">
  <div className="carousel-item active">
    <img   maxHeight="280"  src={require(`./images/5.jpg`)} className="d-block w-100" alt="..."/>
  </div>
  {a.map((i)=><div key={i}  className="carousel-item">
    <img maxHeight="280" src={require(`./images/${i}.jpg`)} className="d-block w-100" alt="..."/>
  </div>)}
  
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>
</div>
   


<div onClick={()=>navigate("/product")} className='offers '>
<div className='offers2 row justify-content-md-center'>
  <img     src={require(`./images/hirt2.png`)} className="img-fluid" alt="..."/>
  <img     src={require(`./images/cosmetics.png`)} className="img-fluid" alt="..."/>
  <img     src={require(`./images/shoe.png`)} className="img-fluid" alt="..."/>


  </div>
<div className='offers1 row justify-content-md-center' >
    <img    src={require(`./images/h1.png`)} className="img-fluid" alt="..."/>
    <img   src={require(`./images/h2.png`)} className="img-fluid" alt="..."/>
    <img   src={require(`./images/kids.png`)} className="img-fluid" alt="..."/>
    <img   src={require(`./images/h3.png`)} className="img-fluid" alt="..."/>




  </div>
  
  </div>
 
</Box>

    </div>
  )
}

export default Slideroffers;

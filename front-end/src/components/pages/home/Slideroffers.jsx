import React from 'react'
import {Box} from '@mui/material';

const Slideroffers = () => {
  const a=[1,2,3,4,5,6]
  console.log(`./images/${1}.jpg`)

  return (
    <div>
    <Box sx={{mt:8,mb:5 ,color:"whitesmoke"}}>

<div  id="carouselExampleIndicators" className="carousel slide "  data-bs-ride="true">
<div className="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
  {a.map((i)=><><button key={i} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={`${i}`}aria-label={`Slide ${i}`}></button></>)}

</div>
<div style={{ height: 250 }}  className="carousel-inner">
  <div className="carousel-item active">
    <img   height="250"  src="https://images-eu.ssl-images-amazon.com/images/G/31/img16/vineet/Amazon-Pay-Later/Sept_22/Jupiter_22/Headers/GW-editorial_2300x646._CB611152745_.jpg" className="d-block w-100" alt="..."/>
  </div>
  {a.map((i)=><div key={i}  className="carousel-item">
    <img height="250" src={require(`./images/${i}.jpg`)} className="d-block w-100" alt="..."/>
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
</Box>
    </div>
  )
}

export default Slideroffers;

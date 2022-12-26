import React from 'react'
import {Box} from '@mui/material';

const Slideroffers = () => {
  return (
    <div>
    <Box sx={{my:2}}>

<div  id="carouselExampleIndicators" className="carousel slide "  data-bs-ride="true">
<div className="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div style={{ height: 420 }}  className="carousel-inner">
  <div className="carousel-item active">
    <img   height="400"  src="https://images-eu.ssl-images-amazon.com/images/G/31/img16/vineet/Amazon-Pay-Later/Sept_22/Jupiter_22/Headers/GW-editorial_2300x646._CB611152745_.jpg" className="d-block w-100" alt="..."/>
  </div>
  <div className="carousel-item">
    <img height="400" src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" className="d-block w-100" alt="..."/>
  </div>
  <div className="carousel-item">
    <img  height="400" src="https://i0.wp.com/www.smartprix.com/bytes/wp-content/uploads/2022/08/amazon-Freedom.png?w=1200&ssl=1" className="d-block w-100" alt="..."/>
  </div>
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

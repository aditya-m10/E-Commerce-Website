import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';
import ToysIcon from '@mui/icons-material/Toys';
import StorefrontIcon from '@mui/icons-material/Storefront';
import WomanIcon from '@mui/icons-material/Woman';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import React, { useState } from 'react'
import { Box, Container } from '@mui/system';
import {  Typography } from '@mui/material';
import {   useCategoryProductQuery } from '../../../services/ProductApi';
// import {  storeProduct } from '../../../services/LocalStorage';
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProductdata } from '../../../features/productSlice';



const Category = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate();

  const[category,setCategory]=useState("All")
  const{data: categoryProduct,isFetching,isLoading}=useCategoryProductQuery(category,{ refetchOnMountOrArgChange: true })    
  dispatch(setProductdata(categoryProduct));


  const getProducts= async (cat)=>{

              setCategory(cat)  

              navigate("/product")

  }

  return (
    <div>
        <Container>
    <Box sx={{mt:7,}} justifyContent="center" alignContent="center"  alignItems="center" columnGap={{xs:2,md:5}} display="flex" >
       <Box  >   
       <Box  style={{cursor: 'pointer'}} onClick={()=>getProducts("All")} >  
       <StorefrontIcon sx={{fontSize:30 ,color:"black"}}/></Box> 
       <Typography sx={{fontSize:15 ,color:"black"}}>ALL</Typography>
</Box> 
<Box style={{cursor: 'pointer'}} onClick={()=>getProducts("Men")} >
            <img   height="35px" src={require(`../home/assets/men.png`)} sx={{color:"black"}} alt='...'/>
            <Typography sx={{fontSize:15 ,color:"black"}}>Men</Typography>

        </Box> 
<Box style={{cursor: 'pointer'}} onClick={()=>getProducts("Women")} >      <WomanIcon sx={{fontSize:30 ,color:"black"}}/>
       <Typography sx={{fontSize:15 ,color:"black"}}> Women</Typography>

</Box> 
       <Box style={{cursor: 'pointer'}} onClick={()=>getProducts("Mobile")} >      <StayCurrentPortraitIcon sx={{fontSize:30 ,color:"black"}}/>
       <Typography sx={{fontSize:15 ,color:"black"}}>Mobile</Typography>

</Box> 

      

       <Box style={{cursor: 'pointer'}} onClick={()=>getProducts("Laptop")} >      <LaptopMacIcon sx={{fontSize:30 ,color:"black"}}/>
       <Typography sx={{fontSize:15 ,color:"black"}}>Laptop</Typography>

</Box> 

       <Box  style={{cursor: 'pointer'}} onClick={()=>getProducts("Toys")} >      <ToysIcon sx={{fontSize:30 ,color:"black"}}/>
       <Typography sx={{fontSize:15 ,color:"black"}}>Toys</Typography>

</Box> 

       

      </Box>
      </Container>
    </div>
  )
}

export default Category

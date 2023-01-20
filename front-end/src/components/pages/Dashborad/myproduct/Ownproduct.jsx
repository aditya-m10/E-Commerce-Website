import {  Typography,Grid} from "@mui/material";
import Myproduct from "./Myproduct"
import AddProduct from "./Addproduct";



export default function Ownproduct() {

  return (<Grid sx={{my:3,width: "100%",display:"flex",p:2}} container
  rowSpacing={1}
  columnSpacing={1}
 >
    <Grid xs={12} md={6} p={1} >
    <Typography textAlign='center' sx={{mb:2,fontSize:20, fontWeight:600, color:"green"}}>My Product</Typography>
      <Myproduct  />
    </Grid>
    <Grid xs={12} md={6} p={2} >
    <AddProduct />
  


</Grid></Grid>
  );
}
   

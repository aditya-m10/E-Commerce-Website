import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteProductMutation, useMyProductQuery } from '../../../../services/ProductApi';
import { getToken } from '../../../../services/LocalStorage';



export default function Myproduct() {
  const { access_token } = getToken();
  const{data: myproduct}=useMyProductQuery(access_token,{ refetchOnMountOrArgChange: true })    
  console.log(myproduct)
  const [deleteProduct] = useDeleteProductMutation();

  const delProduct=(id)=>{
     deleteProduct({id,access_token})
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,height:400 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{backgroundColor:"orange"}}>
            <TableCell sx={{fontWeight:"bold"}} >Product</TableCell>
            <TableCell sx={{fontWeight:"bold"}} align="right">Image</TableCell>
            <TableCell sx={{fontWeight:"bold"}}  align="right">Price</TableCell>
            <TableCell sx={{fontWeight:"bold"}}  align="right">Stock</TableCell>
            <TableCell sx={{fontWeight:"bold"}}  align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myproduct && myproduct.map((product) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.product_name}
              </TableCell>
              <TableCell align="right"><img  width="100"
                    height="100" src={`http://localhost:8000${product.image}`}  alt="..."/></TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell align="right">{product.countInStock}</TableCell>
              <TableCell align="right"><DeleteIcon onClick={()=>delProduct(product.id)} sx={{color:"darkred",}}/></TableCell>
            </TableRow>
          )).reverse()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
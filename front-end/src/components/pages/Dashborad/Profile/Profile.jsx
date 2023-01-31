import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import { useMyOrdersQuery } from '../../../../services/Orderapi';
import { getToken } from '../../../../services/LocalStorage';



export default function Profile() {
  const { access_token } = getToken()

  const{data: myorders}=useMyOrdersQuery(access_token)    
  console.log(myorders)


  return (
    <Container>
    <TableContainer  sx={{mt:2}} component={Paper}>
      <Table sx={{ minWidth: 650,height:400 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{backgroundColor:"orange"}}>
            <TableCell align="right">ID</TableCell>
            <TableCell align="center">OrderId</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right">Delivery Date</TableCell>
            <TableCell align="right">Shipping Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myorders && myorders.map((orders) => (
            <TableRow
              key={orders._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='right' >
                {orders._id}
              </TableCell>
              <TableCell align="center">{orders.order_id.toLowerCase()}</TableCell>

              <TableCell align="right">{orders.totalPrice}</TableCell>
              <TableCell align="right">{orders.delivery.split("-").reverse().join("-")}</TableCell>
              <TableCell align="right">{orders.shipping_Address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}
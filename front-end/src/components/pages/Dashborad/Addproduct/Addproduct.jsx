import { Container,  TextField ,Button, Typography} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGetDataUserQuery } from '../../../../services/Authenticationapi';
import { getToken } from '../../../../services/LocalStorage';

export default function AddProduct() {
  const { access_token } = getToken()

  const { data, isSuccess } = useGetDataUserQuery(access_token)

  const [image, setImage] = useState(null);

  const [name, setName] = useState(null);

    const [brand, setBrand] = useState(null)
    const [category, setCategory] = useState(null)
    const [price, setPrice] = useState(null)
    const [stock, setStock] = useState(null)
    const [description, setDescription] = useState(null)

    const addNewProduct = async () => {
 
        let formField = new FormData()
        // formField.append('user',data.email.charCodeAt(0))
        formField.append('product_name',name)
        formField.append('brand',brand)
        formField.append('category',category)
        formField.append('price',price)
        formField.append('countInStock',stock)
        formField.append('description',description)


        if(image !== null) {
          formField.append('image', image)
        }
        await axios({
          method: 'post',
          
          url:'http://localhost:8000/api/product/create/',
          data: formField,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }).then(response=>{
          console.log(response.data);
        })
    }
  return (<Box sx={{my:3}}>
    <Typography textAlign='center' sx={{fontSize:20, fontWeight:600, color:"green"}}>Sell Your  Own Product</Typography>
    <Container 
    maxWidth="sm" sx={{my:2}} >
      
     <input type="file" className="form-control" onChange={(e)=>setImage(e.target.files[0])}/>

    <Box  sx={{ display: 'grid', gap: 1,mt:2,gridTemplateColumns: 'repeat(2, 1fr)' }} >
    <Box >
    <TextField value={name} onChange={(e)=>setName(e.target.value)}size="small" autoComplete='off'  required fullWidth id="product_name" name="product_name" label="Product name"/>
    <TextField  value={brand} onChange={(e)=>setBrand(e.target.value)}size="small" autoComplete='off' sx={{my:2}} required fullWidth id="brand" name="brand" label="Brand"/>
    <TextField  value={category} onChange={(e)=>setCategory(e.target.value)}size="small" autoComplete='off'   required fullWidth id="category" name="category" label="Category"/>
    <Box   sx={{ display: 'grid',gap: 1, gridTemplateColumns: 'repeat(2, 1fr)' }}>

    <TextField value={price} onChange={(e)=>setPrice(e.target.value)} size="small"  autoComplete='off'margin="normal" required type="number"  fullWidth id="price" name="price" label="Price(INR)"/>
    <TextField value={stock} onChange={(e)=>setStock(e.target.value)}  size="small" autoComplete='off' margin="normal" type="number" required fullWidth id="stock" name="stock" label="Stock"/>
    </Box>
    </Box>
     <Box>
    <TextField value={description} onChange={(e)=>setDescription(e.target.value)} multiline rows={7.5} autoComplete='off'   required fullWidth id="description" name="description" label="Description"/>
    </Box> 
    </Box>
        <Box textAlign='center'>
        <Button type="submit"  margin="normal" onClick={addNewProduct} variant="contained"  color="success" sx={{mt: 2 ,color: "white",maxWidth:200 }} >
          Add Product
        </Button></Box>
</Container></Box>
  );
}
   

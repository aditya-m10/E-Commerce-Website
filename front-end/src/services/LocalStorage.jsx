const storeToken = (value)=>{
    if (value){
           const {access,refresh}=value
           localStorage.setItem('access_token', access)
           localStorage.setItem('refresh_token', refresh)

}
}
// const storeProduct = (product)=>{
//   console.log(product)
//   if (product){
//          localStorage.setItem('product', product)
// }
// }
// const getProduct = () => {
//   let product = localStorage.getItem('product')
//   return {product} 
// }
// const removeProduct = () => {
//   localStorage.removeItem('product')
// }
const getToken = () => {
    let access_token = localStorage.getItem('access_token')
    let refresh_token = localStorage.getItem('refresh_token')
    return { access_token, refresh_token }
  }

const removeToken = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  
  
  export { storeToken, getToken, removeToken }
import * as React from 'react';

import Slideroffers from './Slideroffers';
import { Box } from '@mui/material';
import Category from './Category';

function Media() {

  return (<>
  <Category/>
  <Box sx={{color:"whitesmoke"}}>
  <Slideroffers />
  </Box></>
  );
}
  




export default Media ;


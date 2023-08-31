import React, {useState}  from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';



function HeaderBox({status, handleChange}) {

  return (      
   <Box className="boxInput" >
     <FormControl>
      <InputLabel id="demo-simple-select-label">View</InputLabel>
        <Select
           labelId="demo-simple-select-label"
           id="demo-simple-select"
           value={status}
           label="Status"
           onChange={handleChange}
         >
          <MenuItem>All</MenuItem>
          <MenuItem value={1}>Completed</MenuItem>
          <MenuItem value={2}>Incompleted</MenuItem>
        </Select>
    </FormControl>
  </Box>
  )
}

export default HeaderBox
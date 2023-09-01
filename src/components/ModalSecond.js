import React from 'react'
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

  //modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid ',
    boxShadow: 24,
    pt: 4,
    pl: 15,
    pr: 0,
    pb: 4,
  };

function ModalSecond({openEdit, edit, setEdit, modalEditChange, handleEditItem, editModalClose}) {
  return (
    <Modal id='modalSecond'
    open={openEdit}
    //onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Edit the task
      </Typography>
      <Box
  component="form"
  sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
  noValidate
  autoComplete="off">
  <TextField
  id="modalText"
  label="Editing..."
  variant="standard"
  value={edit.value}
  //aldığımız input değerini onChange ile set edicez yani yeni dizi olusturucaz.
  onChange={e=>setEdit(e.target.value)}/>
</Box>
<FormControl id="modalStatus2" variant="standard" >
    <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
    <Select
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={edit.status} 
      onChange={modalEditChange}
    >
      <MenuItem key={1} value={1}>Completed</MenuItem>
      <MenuItem key={2} value={2}>Incompleted</MenuItem>
    </Select>
  </FormControl>
  <div className='modalButtons'> 
<Button
  variant="contained"
  id="addTask"
  onClick={()=> handleEditItem()}
  >UPDATE
  </Button>
<Button 
variant="contained"
onClick={()=>editModalClose()}  
id="cancelTask"
>Cancel</Button>
</div>
    </Box>
  </Modal>
  )
}

export default ModalSecond
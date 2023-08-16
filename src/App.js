import './App.css';
import React ,{useState}  from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



function App() {

  const [status, setStatus] = React.useState('');
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const [modalStatus, setModalStatus] = React.useState('');
  const modalChange = (event) => {
    setModalStatus(event.target.value);
    };
  // const[modalEdit, setModalEdit]= React.useState('');
  // const modalEditChange = (event)=>{
  //   setModalEdit(event.target.value);
  // }



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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [newItem, setNewItem]=useState("");
  const [items, setItems]=useState([]);

  
  function addItem() {

    if (!newItem) {
      alert("Please enter an item");
      return;
    }
    const item = {
      //id için random bir sayı oluşturup 10 ile çarpıcak
      id: Math.floor(Math.random()*10),
      //newItem inputtan aldığımız değer
      value: newItem
    }
    setItems(oldItems => [...oldItems, item]);
    setNewItem("");
  }
  const currentDate=new Date().toLocaleString('tr-TR');
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  //modal cancel butonu
  function cancelTask(){
    handleClose();
  }
  //yeni bir dizi oluştur: id si boş olmayanlardan
  //filter kullanırsak dizi döndürür
  function deleteItem(id){
    const newArray =items.filter(item=> item.id !== id);
    setItems(newArray);
  };
  //nesne döndürdüğü için find kullandık
  function editItem(id){
    setOpen(true);
    const editTask = items.find(item=> item.id === id);
    setNewItem(editTask.value);
  };

  

  return (
  <div className="App">
      <Button onClick={handleOpen} variant="contained" className='addButton' >Create a new task</Button>
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
          <MenuItem value={1}>Completed</MenuItem>
          <MenuItem value={2}>Incompleted</MenuItem>
          <MenuItem value={3}>All</MenuItem>
        </Select>
      </FormControl>
    </Box>
    
      <Modal id='modalAdd'
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a new task
          </Typography>
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
      id="modalText"
      label="Writting..."
      variant="standard"
      value={newItem}
      //aldığımız input değerini onChange ile set edicez yani yeni dizi olusturucaz.
      onChange={e=>setNewItem(e.target.value)}/>
    </Box>
    <FormControl id="modalStatus"variant="standard" >
        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={modalStatus}
          onChange={modalChange}
        >
         <MenuItem value={1}>Completed</MenuItem>
         <MenuItem value={2}>Incompleted</MenuItem>
         <MenuItem value={3}>All</MenuItem>

        </Select>
      </FormControl>
      <div className='modalButtons'> 
    <Button
      variant="contained"
      id="addTask"
      onClick={()=> addItem()}
      >Add task</Button>
    <Button 
    variant="contained"
    onClick={()=>cancelTask()}  
    id="cancelTask"
    >Cancel</Button>
    </div>
        </Box>
      </Modal>

      <ul>
        {items.map(item=>{// map ile key kullanmak gerekli. 
          return(
            //her bir iteme gelen id ve value
            <li key={item.id}><Checkbox {...label} />{item.value}
            <Button id={"lineDelete"} onClick={()=>deleteItem(item.id)} variant="text" ><DeleteIcon></DeleteIcon></Button>
            <Button id={"editButton"} onClick={()=>editItem(item.id)} variant="text" ><EditIcon></EditIcon></Button>
            <div id='currentDate'>
            {currentDate}
            </div>
            </li>
          )
        })}
      </ul>
      {/* <Modal id='modalEdit'
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit the task
          </Typography>
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
      id="modalText"
      label="Editing..."
      variant="standard"
      value={newItem}
      //aldığımız input değerini onChange ile set edicez yani yeni dizi olusturucaz.
      onChange={e=>setNewItem(e.target.value)}/>
    </Box>
    <FormControl id="modalStatus"variant="standard" >
        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={modalEdit}
          onChange={modalEditChange}
        >
          <MenuItem id='modalMenu' >Completed</MenuItem>
          <MenuItem id='modalMenu' >Incompleted</MenuItem>
          <MenuItem id='modalMenu' >All</MenuItem>
        </Select>
      </FormControl>
      <div className='modalButtons'> 
    <Button
      variant="contained"
      id="addTask"
      onClick={()=> editItem()}
      >UPDATE</Button>
    <Button 
    variant="contained"
    onClick={()=>cancelTask()}  
    id="cancelTask"
    >Cancel</Button>
    </div>
        </Box>
      </Modal> */}
  </div>
  );
}

export default App;

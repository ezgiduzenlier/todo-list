import './App.css';
import React, {useState}  from 'react';
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
import Icon from '@mui/material/Icon';
import AddIcon from '@mui/icons-material/Add';
import background from "./img/boshjk.png";



function App() {

  const [status, setStatus] = useState('');
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const [modalStatus, setModalStatus] = React.useState('');
  const modalChange = (event) => {
    setModalStatus(event.target.value);
    };
  const[modalEdit, setModalEdit]= React.useState('');
  const modalEditChange = (event)=>{
    
    setEditStatus(event.target.value);
    
  }

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
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(0);
  const [editStatus, setEditStatus] = React.useState(''); //yeni
  const [newItem, setNewItem]= React.useState("");
  const [items, setItems]= React.useState([]);
  const [editItem, setEditItem] = React.useState(null);
  const [editedValue, setEditedValue] = React.useState('');

  const addModalOpen = () => setOpenAdd(true);
  const addModalClose = () => setOpenAdd(false);
  const editModalOpen = () => setOpenEdit(true);
  const editModalClose = () => setOpenEdit(false);


  //metinde değişiklik yapıldığında bu method çağırılır, setEditedValue ile güncelleme işlemini yapar.
  // const handleInputChange = (event) => {
  //   setEditedValue(event.target.value);
  // };

  // save butonuna tıklandığında bu method çalışır günceller ve modalı kapatır.
  const handleAddItem = () => {

    if (editedValue.trim() !== '') {
      if (editItem !== null) {
        // Düzenlenen öğeyi güncelle
        const updatedItems = [...items];
        updatedItems[editItem] = editedValue;
        setItems(updatedItems);
        setEditItem(null);
      } else {
        // Yeni öğe ekle
        setItems([...items, editedValue]);
      }
      setEditedValue('');
    }
  };
// id değerine sahip ögeyi items dizisinde bulur ve düzenleme moduna geçer.
  const handleEditItem = () => {
    editItem.id = editItem.id;
    editItem.value = editedValue;
    editItem.status = editStatus;

    setEditItem(editItem)
    setEditStatus(editItem.status);
    setEditedValue(editItem.value)
    setOpenEdit(false);

    // setSelectedId(editItem.id)
    // setModalEdit(editItem.status)

  };

  // const handleDeleteItem = (index) => {
  //   const updatedItems = items.filter((_, i) => i !== index);
  //   setItems(updatedItems);
  // };

  //const [editItem, setEditItem]=useState("");


  
  function addItem() {

    if (!newItem) {
      alert("Please enter an item");
      return;
    }
    const item = {
      //id için random bir sayı oluşturup 10 ile çarpıcak
      id: Math.floor(Math.random()*10000),
      //newItem inputtan aldığımız değer
      value: newItem,
      status : modalStatus
    }
    setItems(oldItems => [...oldItems, item]);
    setNewItem("");
    setOpenAdd(false);
  }
  const currentDate=new Date().toLocaleString('tr-TR');
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


  const handleDeleteItem = (item) => {
    const deletedItems = items.filter((_, i) => i !== item);
    setItems(deletedItems);
  };
  //yeni bir dizi oluştur: id si boş olmayanlardan
  //filter kullanırsak dizi döndürür
  function deleteItem(id){
    const newArray =items.filter(item=> item.id !== id);
    setItems(newArray);
  };


  //nesne döndürdüğü için find kullandık
   function openEditModal(item){
    setOpenEdit(true);
    // const editTask = items.find(item=> item.id === id);
    // setNewItem(editTask);
    // setSelectedId(id);
    setEditItem(item)
    setEditedValue(item.value)
    setEditStatus(item.status)
    console.log(item)
   };

  

  return (
  <div className="App">
      <Button onClick={addModalOpen} variant="contained" className='addButton' ><AddIcon></AddIcon></Button>
      {/* <Box className="boxInput" >
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={status}
          onChange={handleChange}
          label="Status"
        >

          <MenuItem value={1}>Completed</MenuItem>
          <MenuItem value={2}>Incompleted</MenuItem>
          <MenuItem value={3}>All</MenuItem>
        </Select>
        </FormControl>
        </Box> */}
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
    
      <Modal id='modalFirst'
        open={openAdd}
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
    onClick={()=>addModalClose()}  
    id="cancelTask"
    >Cancel</Button>
    </div>
        </Box>
      </Modal>

      <ul>
        {items.map(item=>{// map ile key kullanmak gerekli. 
          return(
            //her bir iteme gelen id ve value
            <li key={item.id}><Checkbox {...label} />
                  {item.value} 
            <Button id={"lineDelete"} onClick={()=>deleteItem(item.id)} variant="text" ><DeleteIcon></DeleteIcon></Button>
            <Button id={"editButton"} onClick={()=>openEditModal(item)} variant="text" ><EditIcon></EditIcon></Button>
            <div id='currentDate'>
              
            {currentDate} {"("} {item.status} {")"}
            </div>
            </li>
          )
        })}
      </ul>
      <Modal id='modalSecond'
        open={openEdit}
        //onClose={handleClose}
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
      value={editedValue}
      //aldığımız input değerini onChange ile set edicez yani yeni dizi olusturucaz.
      onChange={e=>setEditedValue(e.target.value)}/>
    </Box>
    <FormControl id="modalStatus2" variant="standard" >
        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={editStatus} 
          onChange={modalEditChange}
        >
          <MenuItem key={1} value={1}>Completed</MenuItem>
          <MenuItem key={2} value={2}>Incompleted</MenuItem>
          <MenuItem key={3} value={3}>All</MenuItem>
        </Select>
      </FormControl>
      <div className='modalButtons'> 
    <Button
      variant="contained"
      id="addTask"
      onClick={()=> handleEditItem()}
      >UPDATE</Button>
    <Button 
    variant="contained"
    onClick={()=>editModalClose()}  
    id="cancelTask"
    >Cancel</Button>
    </div>
        </Box>
      </Modal>
  </div>
  );
}

export default App;

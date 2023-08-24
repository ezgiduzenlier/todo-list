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
import AddIcon from '@mui/icons-material/Add';



function App() {

  const [status, setStatus] = useState('');
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const [modalStatus, setModalStatus] = React.useState('');
  const modalChange = (event) => {
    setModalStatus(event.target.value);
    };
  // const[modalEdit, setModalEdit]= React.useState('');
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
  const [checkClick, setCheckClick] = useState(true);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editStatus, setEditStatus] = React.useState(null);
  const [newItem, setNewItem]= React.useState("");
  const [items, setItems]= React.useState([]);
  const [editItem, setEditItem] = React.useState(null);
  const [editedValue, setEditedValue] = React.useState('');
  const [checked, setChecked]=useState(false);

  const addModalOpen = () => setOpenAdd(true);
  const addModalClose = () => setOpenAdd(false);
  const checkClickChange = () => setCheckClick(false);
  // const editModalOpen = () => setOpenEdit(true); bunun yerine array function kullandım
  const editModalClose = () => setOpenEdit(false);

// id değerine sahip ögeyi items dizisinde bulur ve düzenleme moduna geçer.
  const handleEditItem = () => {
    editItem.id = editItem.id;
    editItem.value = editedValue;
    editItem.status = editStatus;
    setEditItem(editItem)
    setEditStatus(editItem.status);
    setEditedValue(editItem.value)
    setOpenEdit(false);
  };
  //prevTextFields, TextFields'in önceki durumunu temsil eden bir isimlendirme. items ile aynı isi yapmaz mı? değiştireyim mi?
  //Güncellemeler önceki duruma dayalı olarak yeni bir durum oluşturarak yapılmalı.
  //Bu şekilde önceki state değişmez bu da React'ın immutable state kavramına uygun bir yaklasımdır.


  // listede idye göre değişiklik yapar.
  const CheckboxChange = (id) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, 
          checked: !item.checked, // mevcut checked değerini tersine çevirir
          status: item.status ===1 ? item.status=2 : item.status=1 // yeni bir status değeri atayın

        };
      }
      return item;
    });
  
    setItems(updatedItems);
  };



  const textFieldChange = (e) => {
    setNewItem(e.target.value);
  };
  const textFieldStyle = {
    textDecoration : checked ? 'line-through' : 'none',
  };
  
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
      status : modalStatus,
      checked : checked
    }
    setItems(oldItems => [...oldItems, item]);
    setNewItem("");
    setOpenAdd(false);
    setCheckClick(checked)

  }
  const currentDate=new Date().toLocaleString('tr-TR');
  //label, inputProps özelliğine sahip bir nesnedir. Bu özellik chechbox'ın etiket özelliklerini tanımlamak için kullanılır.
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  //yeni bir dizi oluştur: id si boş olmayanlardan
  //dizi döndürdüğü için filter kullandık, nesne döndürseydik find kullanıcaktık.
  function deleteItem(id){
    const newArray =items.filter(item=> item.id !== id);
    setItems(newArray);
  };
   function openEditModal(item){
    setOpenEdit(true);
    setEditItem(item)
    setEditedValue(item.value)
    setEditStatus(item.status)
   };
   const filteredItems = status ? items.filter(item => item.status===status) : items;


  return (
<div className="App">
<div className='appLittle'>
    <div className='title'>TODO LIST</div>
      <Button onClick={addModalOpen} variant="contained" className='addButton' ><AddIcon></AddIcon></Button>
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
        {filteredItems.map(item=>{// map=her bir item için çalış.
          return(
            //her bir iteme gelenler
            <li key={item.id}
            className="listItem"
            style={textFieldStyle}
            onChange={textFieldChange}
            >
             <span style={
              { 
                textDecoration: item.checked ? 'line-through' : 'none',
                color:item.checked ? '#3658AB' : 'black',
               }
              }>
        {item.value} 
      </span>
                <Checkbox
                  checked={item.checked}
                  onChange={() => CheckboxChange(item.id)}
                  {...label} />
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
  </div>
  </div>
  );
}
export default App;

import './App.css';
import React, {useEffect, useState}  from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ModalFirst from './components/ModalFirst'
import ModalSecond from './components/ModalSecond';

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

function App() {

  const [status, setStatus] = useState('');
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const [modalStatus, setModalStatus] = useState(2);
  const modalChange = (event) => {
    console.log(event.target.value)
    setModalStatus(event.target.value);
    };
  const modalEditChange = (event)=>{
    setEditStatus(event.target.value);
  };
  //const [selectedItem, setSelectedItem] = useState(null);


  const [openAdd, setOpenAdd] = React.useState(false);
  const [checkClick, setCheckClick] = useState(true);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editStatus, setEditStatus] = React.useState(null);
  const [newItem, setNewItem]= React.useState("");
  const [items, setItems]= React.useState([]);
  const [editItem, setEditItem] = React.useState();
  const [editedValue, setEditedValue] = React.useState('');
  const [checked, setChecked]=useState(false);
  const addModalOpen = () => setOpenAdd(true);
  const addModalClose = () => setOpenAdd(false);
  const checkClickChange = () => setCheckClick(false);
  // const editModalOpen = () => setOpenEdit(true); bunun yerine array function kullandım
  const editModalClose = () => setOpenEdit(false);

// id değerine sahip ögeyi items dizisinde bulur ve düzenleme moduna geçer.

  const handleEditItem = () => {// item listesini güncellersen düzelebilir.
console.log('çalıstı');
  const temp={
    id:editItem.id,
    value:editedValue,
    status:editStatus,
    checked:!editItem.checked
  }
  console.log(temp);
    
    setEditItem(temp)
    setEditStatus(temp.status);
    setEditedValue(temp.value);
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
      alert("Please enter an item!");
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
    setEditItem(item);
    setEditedValue(item.value);
    setEditStatus(item.status)
   };
   const filteredItems = status ? items.filter(item => item.status===status) : items;
   const currentDate=new Date().toLocaleString('tr-TR');

   useEffect(()=>{

   },[filteredItems])

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

      <ModalFirst
      openAdd={openAdd}
      newItem={newItem}
      setNewItem={setNewItem}// array func. ile aynı şey
      modalStatus={modalStatus}
      modalChange={modalChange}
      addItem={addItem}
      addModalClose={addModalClose}
      />
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
                paddingRight: '75%',
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

        <ModalSecond
        openEdit={openEdit}
        editedValue={editedValue}
        setEditedValue={setEditedValue}
        editStatus={editStatus}
        modalEditChange={modalEditChange}
        handleEditItem={handleEditItem}
        editModalClose={editModalClose}
        />
  </div>
  </div>
  );
}
export default App;

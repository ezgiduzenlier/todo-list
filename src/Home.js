import './App.css';
import React, {useState}  from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ModalFirst from './components/ModalFirst'
import ModalSecond from './components/ModalSecond';
import ListItems from './components/ListItems';
import HeaderBox from './components/HeaderBox';


function Home() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [checkClick, setCheckClick] = useState(true);
  const [openEdit, setOpenEdit] = React.useState(false);
  //const [editStatus, setEditStatus] = React.useState(null);
  const [newItem, setNewItem]= React.useState("");
  const [items, setItems]= React.useState([]);
  //const [editItem, setEditItem] = React.useState();
  //const [editedValue, setEditedValue] = R eact.useState('');
  const [checked, setChecked]=useState(false);
  const [status, setStatus] = useState('');
  const [modalStatus, setModalStatus] = useState(2);
  const [edit, setEdit]=useState({});
  const editModalClose = () => setOpenEdit(false);
  const addModalOpen = () => setOpenAdd(true);
  const addModalClose = () => setOpenAdd(false);
  const handleChange = (e) => {
    setStatus(e.target.value);
  };
  const modalChange = (e) => {
    console.log(e.target.value)
    setModalStatus(e.target.value);
  };
  const modalEditChange = (e)=>{
    setEdit(
      {
      ...edit,
      status: e.target.value,//statusun value değeri.
    }
    );
  };
  const handleEditItem = (id) => {// **********   burası yanlış, item listesini güncellersen düzelebilir *********
    const updatedItemsEdit = items.map(item => {
      if (item.id === id) {
        return { ...item, 
          value: item.value,
          checked: item.checked,
          status: item.status
        };
      }
      return item;
    });
    setItems(updatedItemsEdit);
  };
  

  // listede idye göre değişiklik yapar.
  const CheckboxChange = (id) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, 
          checked: !item.checked,
          status: item.status ===1 ? item.status=2 : item.status=1 // yeni bir status değeri atar
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
      id: Math.floor(Math.random()*10000),
      //newItem inputtan aldığımız değer
      value: newItem,
      status : modalStatus,
      checked : checked,
      currentDate : new Date().toLocaleDateString('tr-TR', 
      {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    }
    setItems(oldItems => [...oldItems, item]);
    setNewItem("");
    setOpenAdd(false);
    setCheckClick(checked)
  }
  //label, inputProps özelliğine sahip bir nesnedir. Bu özellik chechbox'ın etiket özelliklerini tanımlamak için kullanılır.
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  //dizi döndürdüğü için filter kullandık, nesne döndürseydik find kullanıcaktık.
  function deleteItem(id){
    const newArray =items.filter(item=> item.id !== id);
    setItems(newArray);
  };
    function openEditModal(item){
     setOpenEdit(true);
     setEdit({
       ...edit,
       value:item.value,
       status:item.status
     })
  };
   const handleSort = () => {
    const sortedItems = [...items].sort();
    setItems(sortedItems);
  };

   const filteredItems = status ? items.filter(item => item.status===status) : items;

   const sortFilteredItems = () => {
    const sortedItems = [...items].sort((a, b) => {
      return a.value.localeCompare(b.value);
    });
    setItems(sortedItems);
  };

  const currentDate = new Date().toLocaleString('tr-TR');

  return (
    <div className="App">
        <div className='appLittle'>
          <div className='title'>TODO LIST</div>
              <Button onClick={addModalOpen} variant="contained" className='addButton' ><AddIcon></AddIcon></Button>
              <Button className='sortButton' onClick={sortFilteredItems} variant="contained">Sort from A to B</Button>
              <HeaderBox
                status={status}
                handleChange={handleChange}
              />  
              <ModalFirst
              openAdd={openAdd}
              newItem={newItem}
              setNewItem={setNewItem}// parantez içinde array func. yazmak ile aynı şey.
              modalStatus={modalStatus}
              modalChange={modalChange}
              addItem={addItem}
              addModalClose={addModalClose}
              />
              <ListItems
              filteredItems={filteredItems}
              textFieldStyle={textFieldStyle}
              textFieldChange={textFieldChange}
              CheckboxChange={CheckboxChange}
              deleteItem={deleteItem}
              openEditModal={openEditModal}
              currentDate={currentDate}
              label={label}
              />
              <ModalSecond
              openEdit={openEdit}
              edit={edit}
              setEdit={setEdit}
             // editStatus={edit.status}
              modalEditChange={modalEditChange}
              handleEditItem={handleEditItem}
              editModalClose={editModalClose}
              />
          </div>
    </div>
  );
}
export default Home;

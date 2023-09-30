import './App.css';
import axios from 'axios'
import React, {useState, useEffect}  from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddModal from './components/AddModal'
import EditModal from './components/EditModal';
import ListItems from './components/ListItems';
import HeaderBox from './components/HeaderBox';
import Background from './components/Background';


function Home() {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [checkClick, setCheckClick] = useState(true);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [newItem, setNewItem]= React.useState("");
  const [items, setItems]= React.useState([]);
  const [checked, setChecked]=useState(false);
  const [status, setStatus] = useState('');
  const [modalStatus, setModalStatus] = useState(2);
  const [edit, setEdit]=useState({});
  const editModalClose = () => setOpenEdit(false);
  const addModalOpen = () => setOpenAdd(true);
  const addModalClose = () => setOpenAdd(false);
  const [isSorted, setIsSorted] = useState(false);
  const [initialItems, setInitialItems] = useState([]);
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
      status: e.target.value,//statusun value değeri. 1 ya da 2
    }
    );
  };
  const handleEditItem = () => {
    const updatedItemsEdit = items.map(item => {
      if (item.id === edit.id) {
        return { 
          ...item, 
          value: edit.value,
          checked: edit.status === 1,
          status: edit.status
        };
      }
      return item;
    });
    setItems(updatedItemsEdit);
    setOpenEdit(false);
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
    setCheckClick(checked);
    setOpenAdd(false)
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
       id:item.id,
       value:item.value,
       status:item.status,
       checked:item.checked
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

  // useEffect(() => {
  //   // İlk renderda, başlangıçtaki öğeleri initialItemsde sakla.
  //   setInitialItems([...items]);
  // }, []);
  // const sortFilteredItems = () => {
  //   if (isSorted) {
  //     // Sıralama aktifse, öğeleri orijinal sıraya döndür.
  //     const originalOrder = [...initialItems];
  //     setItems(originalOrder);
  //     setIsSorted(true);
  //   } else {
  //     // Sıralama aktif değilse, öğeleri sırala.
  //     const sortedItems = [...items].sort((a, b) => {
  //       return a.value.localeCompare(b.value);
  //     });
  //     setItems(sortedItems);
  //     setIsSorted(false);
  //   }
  // };


  const currentDate = new Date().toLocaleString('tr-TR');


  return (
    <div className="App">
          <div className='title'>TODO LIST</div>
              <div className='addButton'>
                <Button onClick={addModalOpen}><AddIcon></AddIcon></Button>
              </div>
              <div className='sortButton'>
                <Button  onClick={sortFilteredItems}>Sort from A to B</Button>
                </div>
                 <HeaderBox
                status={status}
                handleChange={handleChange}
                />  
                
              <AddModal
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
              <EditModal
              openEdit={openEdit}
              edit={edit}
              setEdit={setEdit}
              modalEditChange={modalEditChange}
              handleEditItem={handleEditItem}
              editModalClose={editModalClose}
              />
              <Background></Background>
    </div>
    
  );
}
export default Home;

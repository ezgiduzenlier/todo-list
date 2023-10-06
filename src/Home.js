import './App.css';
import axios from 'axios'
import React, {useState, useEffect}  from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddModal from './components/AddModal'
import EditModal from './components/EditModal';
import ListItems from './components/ListItems';
import HeaderBox from './components/HeaderBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Home() {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [checkClick, setCheckClick] = useState(true);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [newItem, setNewItem]= React.useState("");
  const [items, setItems]= React.useState([]);
  const [checked, setChecked]=useState(false);
  const [status, setStatus] = useState(null);
  const [modalStatus, setModalStatus] = useState(2);
  const [edit, setEdit]=useState({});
  const editModalClose = () => setOpenEdit(false);
  const addModalOpen = () => setOpenAdd(true);
  const addModalClose = () => setOpenAdd(false);
  const [isSorted, setIsSorted] = useState(false);
  const [initialItems, setInitialItems] = useState([]);
  const [todos, setTodos] = useState([]);
  const [refreshButton, setRefreshButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    const item = {
      text: edit.value,
      status : modalStatus,
      id:edit.id,
    }
    axios.post('https://localhost:7065/api/todo/updateTodo',item )
    .then(response => {
      toast.success('Data successfully fetched!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setRefreshButton(!refreshButton)
    })
    .catch(error => {
      console.error('There was an error adding the item!', error);
    });
    editModalClose(false);
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
      text: newItem,
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
    axios.post('https://localhost:7065/api/todo/addTodo', item)
      .then(response => {
        console.log('Response:', response.data);
        console.log(response)
        // Response'dan dönen datayı kullanarak state'i güncelle
        setItems(oldItems => [...oldItems, response.data]);
        toast.success('Data added successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRefreshButton(!refreshButton)
      })
      .catch(error => {
        console.error('There was an error adding the item!', error);
      });
    setNewItem("");
    setCheckClick(checked);
    setOpenAdd(false); 
  }
  //label, inputProps özelliğine sahip bir nesnedir. Bu özellik chechbox'ın etiket özelliklerini tanımlamak için kullanılır.
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  //dizi döndürdüğü için filter kullandık, nesne döndürseydik find kullanıcaktık.
  
  function deleteItem(id){
    const item =
    {
      id:id//sağdaki deleteItem in idsi, soldakide backende gönderilen id
    }
    axios.post('https://localhost:7065/api/todo/DeleteTodo', item)
        .then(response => {
          console.log('Response:',response.id);
          console.log(response);
          toast.delete('Data deleted successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setRefreshButton(!refreshButton)
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
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
   useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true); // Veri çekmeye başlamadan önce yükleme durumunu true yap
          try {
            console.log(status)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImV6Z2lAZ21haWwuY29tICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwibmJmIjoxNjk2NTkwODc3LCJleHAiOjE2OTcxOTU2NzcsImlhdCI6MTY5NjU5MDg3N30.dfpBfpFQKo3hTZ9j2Fbqa7zclX6vceNixeMYgMjErjc";
            const response = await axios.get('https://localhost:7065/api/todo/GetAllTodo?status='+status);
            setTodos(response.data);
          } catch (error) {
            console.error('There was an error fetching the data!', error);
          }
        setIsLoading(false); // Veri çekme işlemi bittiğinde yükleme durumunu false yap
        };
    fetchData();
  }, [refreshButton,status]);
  const currentDate = new Date().toLocaleString('tr-TR');


  return (
    <div className="App">
          <div className='title'>TODO LIST</div>
              <div className='addButton'>
                <Button onClick={addModalOpen}><AddIcon></AddIcon></Button>
              </div>
              <div className='sortButton'>
                <Button  onClick={sortFilteredItems}>Sort from A to B</Button>
                <ToastContainer />

                </div>
              <HeaderBox
              status={status}
              handleChange={handleChange}
              />
              <AddModal
              refreshButton={refreshButton}
              setRefreshButton={setRefreshButton}
              openAdd={openAdd}
              newItem={newItem}
              setNewItem={setNewItem}// parantez içinde array func. yazmak ile aynı şey.
              modalStatus={modalStatus}
              modalChange={modalChange}
              addItem={addItem}
              addModalClose={addModalClose}
              />
              <ListItems
              todos={todos}
              refreshButton={refreshButton}
              setRefreshButton={setRefreshButton}
              isLoading={isLoading}
              textFieldStyle={textFieldStyle}
              textFieldChange={textFieldChange}
              CheckboxChange={CheckboxChange}
              deleteItem={deleteItem}
              openEditModal={openEditModal}
              currentDate={currentDate}
              label={label}
              />
              <EditModal
              refreshButton={refreshButton}
              setRefreshButton={setRefreshButton}
              openEdit={openEdit}
              edit={edit}
              setEdit={setEdit}
              modalEditChange={modalEditChange}
              handleEditItem={handleEditItem}
              editModalClose={editModalClose}
              />
    </div>
  );
}
export default Home;

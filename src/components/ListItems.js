import React, {useState}  from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



function ListItems({filteredItems, textFieldStyle, textFieldChange, CheckboxChange, deleteItem, openEditModal, currentDate, label}) {


  return (
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
              {...label}
              />
        <Button id={"deleteButton"} onClick={()=>deleteItem(item.id)} variant="text" ><DeleteIcon></DeleteIcon></Button>
        <Button id={"editButton"} onClick={()=>openEditModal(item)} variant="text" ><EditIcon></EditIcon></Button>
        <div id='currentDate'>
        {/* {currentDate} {"("} {item.status} {")"} */}
        {item.currentDate} ({item.status})
        </div>
        </li>
      )
    })}
  </ul>
  )
}

export default ListItems
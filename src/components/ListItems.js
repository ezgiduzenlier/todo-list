import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function ListItems({filteredItems, textFieldStyle, textFieldChange, CheckboxChange, deleteItem, openEditModal, label}) {

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
            paddingRight: '86%',
            textDecoration: item.checked ? 'line-through' : 'none',
            color:item.checked ? '#3658AB' : 'black',
           }
          }>
    {item.value} 
  </span>
          <div className='checkBox'>            
            <Checkbox
              checked={item.checked}
              onChange={() => CheckboxChange(item.id)}
              {...label}
              />
          </div>
        <Button id={"deleteIcon"} onClick={()=>deleteItem(item.id)}  ><DeleteIcon></DeleteIcon></Button>
        <Button variant="text" id={"editIcon"} onClick={()=>openEditModal(item)}><EditIcon></EditIcon></Button>
        <div id='currentDate'>
        {/* {currentDate} {"("} {item.status} {")"} */}
        {item.currentDate}
        </div>
        </li>
      )
    })}
  </ul>
  )
}

export default ListItems
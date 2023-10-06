import './App.css';
import React from 'react';
import LoginItems from './components/LoginItems';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


 function Login() {



   return (
    <div className="App">
     <div>
        <LoginItems
        TextField={TextField}
        Button={Button}
        />
     </div>
     </div>
   )
 }
 
 export default Login
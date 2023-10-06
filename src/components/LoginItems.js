import React, {useState}  from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function LoginItems({TextField, Button}) {

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
console.log("mail: ",mail)
    const item = {
      mail: mail,
      password : password
    }
    axios.post('https://localhost:7065/api/user/login', item)
      .then(response => {
        console.log('Response:', response.data);
        console.log(response)
        localStorage.setItem("token", response.data.token)
        toast.success('Data added successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(error => {
        console.error('There was an error adding the item!', error);
      });
  }


  return (
    <div>
    <div className='sign_inputs'>
      <div id="signIn">Sign In</div>
      <TextField id="name" label="Name" variant="standard"/><br></br>
      <TextField id="lastName" label="Last Name" variant="standard"/> <br></br>
      <TextField id="mail" label="E-mail" variant="standard"/><br></br>
      <TextField id="password" label="Password" type="password" variant="standard"/><br></br>
      <TextField id="password" label="Confirm Password" type="password" variant="standard"/><br></br>
        <Button id='signBtn'variant="outlined">Sign In</Button>
   </div> 
   <div className='login_inputs'>
      <div id="LogIn">Log In</div>
      <TextField  
      onChange={e=>setMail(e.target.value)}
      id="mailLogin" 
      label="E-mail" 
      variant="standard"
      /><br></br>
      <TextField
          id="passwordLogin"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          onChange={e=>setPassword(e.target.value)}
        /><br></br>
        <Button 
        id='loginBtn'
        variant="outlined"
        onClick={()=> login()}
        >Log In</Button>
   </div>

    </div>
  );
}
export default LoginItems
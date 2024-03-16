import { TextField, Button, Box,Paper, Alert,FormControl,InputLabel,OutlinedInput,InputAdornment,IconButton } from "@mui/material";
import React, { useState } from "react";
import {Visibility,VisibilityOff} from '@mui/icons-material'


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("")
  const [passwordErrorMessage, setpasswordErrorMessage] = useState("")
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const submitValue = async (e: any) => {
    e.preventDefault();
    // setMessage(email);
    // setMessage(password);
    if (!email) {
      setEmailError(true)
      setEmailErrorMessage("Email Should not be Empty")
      setMessage("Email Should not be Empty")
      return
    }
    else if (!isEmail(email)) {
      setEmailError(true)
      setEmailErrorMessage("Enter Valid Email")
      setMessage("Enter Valid Email")
      return
    }
    if (!password) {
      setPasswordError(true)
      setpasswordErrorMessage("Password should not be Empty")
      setMessage("Password should not be Empty")
      return
    }
    else if (password.length < 4 || password.length > 14) {
      console.log(password.length)
      setPasswordError(true)
      setpasswordErrorMessage("Password range must between 4-10")
      setMessage("Password range must between 4-10")
      return
    }
 
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_id: email, password })
    };
    let data: any = await fetch('http://localhost:4000/login', requestOptions)
    data = await data.json()
    console.log(data.msg)
    setMessage(data.msg)
  }

  const showCred: Function = () => {
    console.log(message, 'mess')

    if (message === 'Success') {
      return <Alert variant="outlined" sx={{ mb: 2 }} severity="success">Success.</Alert>
    }
    else if (message === 'user not found') {
      return <Alert variant="outlined" sx={{ mb: 2 }} severity="warning">User Not Found.</Alert>
    }
    else if (message === 'invalid password') {
      return <Alert variant="outlined" sx={{ mb: 2 }} severity="error">Invalid Password.</Alert>
    }
    else if (message == 'Email Should not be Empty') {
      return  <Alert variant="outlined" sx={{ mb: 2 }} severity="error">Email Should not be Empty.</Alert>
    }
    else if (message == 'Enter Valid Email') {
      return  <Alert variant="outlined" sx={{ mb: 2 }} severity="error">Enter Valid Email.</Alert>
    }
    else if (message == "Password should not be Empty") {
      return  <Alert variant="outlined" sx={{ mb: 2 }} severity="error">Password should not be Empty.</Alert>
      }
      else if (message == "Password range must between 4-10") {
        return  <Alert variant="outlined" sx={{ mb: 2 }} severity="error">Password range must between 4-10.</Alert>
        }
    else if (message) {
      return <Alert variant="outlined" sx={{ mb: 2 }} severity="error">Internal Server Error.</Alert>
    }
    else {
      return ""
    }
  }
  const isEmail = (email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.]+\.[A-Z]{2,}$/i.test(email);
  const handleEmailHelper: any = () => {
    if (!email) {
      setEmailError(true)
      setEmailErrorMessage("Email Should not be Empty")
      return
    }
    if (!isEmail(email)) {
      setEmailError(true)
      setEmailErrorMessage("Enter Valid Email")
      return
    }
    setEmailError(false)
    setEmailErrorMessage("")
    // else if (email.length < 12) return "Email is Not Valid"
  }

  const handlePassHelper: any = () => {
    if (!password) {
      setPasswordError(true)
      setpasswordErrorMessage("Password should not be Empty")
      return
    }
    else if (password.length < 4 || password.length > 14) {
      setPasswordError(true)
      setpasswordErrorMessage("Password range must between 4-10")
      return
    }
    setPasswordError(false)
    setpasswordErrorMessage("")
    // else if (password.length < 5) return "Password is Not Valid"
  }


  const myStyle: object = {
    height: "auto",
    // width: "auto",
    padding: "0rem 2rem 1rem 2rem",
    backgroundColor: "white",
    // backgroundColor: "#c2bbc2",
    // color: "red",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "0.5rem",
  };
  return (
    <Box style={myStyle} sx={{
      width: 500,
      maxWidth: '100%',
    }} >
      <h2 style={{ color: "rgb(62 48 58)", textAlign: "center" }}> LOG - IN </h2>
      < TextField
        id="outlined"
        label="ENTER EMAIL ID"
        variant="outlined"
        required
        fullWidth
        error={emailError}
        helperText={emailErrorMessage}
        onBlur={handleEmailHelper}
        name="email"
        type="email"
        autoComplete="email"
        // autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      < TextField
        id="basic"
        label="ENTER PASSWORD"
        variant="outlined"
        required
        error={passwordError}
        helperText={passwordErrorMessage}
        onBlur={handlePassHelper}
        name="password"
        type="password"
        autoComplete="current-password"
        sx={{ mt: 2 }}
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
            <FormControl sx={{ m: 1 }}  fullWidth
          required variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">ENTER PASSWORD</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
         
            label="ENTER PASSWORD"
          />
        </FormControl>
      < Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, mb: 2,backgroundColor:'#0cecbc',color:'black'}}
        onClick={submitValue}
        fullWidth
        size="large"
        
        // onClick={() => {
        //   alert(`email is ${email} ans password is ${password}`);
        // }}
        color="success"
      >
        Login
      </Button>
      {/* {arr.length > 0 ? <h2>your Email is {email} and password is {password}</h2> :<div>Hello</div>} */}

      {showCred()}

    </Box>

  );
};

export default Login;

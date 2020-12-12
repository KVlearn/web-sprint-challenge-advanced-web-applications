import React,{useState} from "react";
import {useHistory} from 'react-router-dom';
import {Form,Button,Input,Label} from 'reactstrap';
import {axiosWithAuth} from '../utils/axiosWithAuth';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history=useHistory();

  const [credentials,setCredentials]=useState({
    username:'',
    password:''
  })

  const handleChange=(e)=>{
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log('cred on submit=',credentials)
    axiosWithAuth()
    .post('/api/login',credentials)
    .then(res=>{
      console.log('res=',res)
      window.localStorage.setItem('token',res.data.payload);
      history.push('/bubblepage')
    })
    .catch(err=> console.log(err))
  }
  return (
    <>
      <Form className="login-form" onSubmit={handleSubmit}>
       <h1>Welcome to the Bubble App!</h1>
        <Label htmlFor="username">Username
        <Input id="username"
        className="username"
        name="username"
        placeholder="Enter your Username"
        value={credentials.username}
        onChange={handleChange}/> </Label>

        <Label htmlFor="password">Password
        <Input id="password"
        className="password"
        type="password"
        name="password"
        placeholder="Enter your Password"
        value={credentials.password}
        onChange={handleChange}/></Label>

        <Button color="primary" className="loginButton">Login</Button>
      </Form>
    </>
  );
};

export default Login;

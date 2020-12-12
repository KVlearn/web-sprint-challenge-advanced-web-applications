import React from 'react';
import {Route, Redirect} from 'react-router-dom';

//return the same Route api - but it will have the logic to check 
//if the token exist render Component, else redirect to login page
//destructure the component and the rest of the props
function PrivateRoute({component:Component,...rest}){
    const token=window.localStorage.getItem('token');
    return(
        <Route 
         {...rest}
         render={(props)=>{
             if(token)
               return <Component {...props}/>
             else
               return <Redirect to="/"/> 
         }}
        />
    )
}
export default PrivateRoute;
import axios from 'axios';

export const axiosWithAuth=()=>{
    //get  the token from local storage
    const token=window.localStorage.getItem('token')
      //create axios instance to build config obj with the authorization
return axios.create({
        headers:{
            authorization: token
        },
        baseURL:"http://localhost:5000"
    })
}
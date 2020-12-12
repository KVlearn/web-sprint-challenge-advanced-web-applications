import React from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';

export const fetchColorList=()=>{
   return axiosWithAuth()
    .get('api/colors')
    .then(res=>{
      return res;
    })
    .catch(err=>{
      return err;
    })
}
import React, { useState, useEffect } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {fetchColorList} from '../api/fetchColorList';


import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(()=>{
    fetchColorList()
    .then(res=>{
      //set the page state - colorList
        setColorList(res.data)
    })
    .catch(err=> console.log(err))
  },[])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

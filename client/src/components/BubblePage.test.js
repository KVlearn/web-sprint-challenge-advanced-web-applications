import React from "react";
import { render, screen,findByText,waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import ColorList from "./ColorList";
import Bubbles from "./Bubbles";
import {fetchColorList as mockFetchColorList} from '../api/fetchColorList';


jest.mock('../api/fetchColorList')
const mockColorList=[
  {
    color: 'aliceblue',
    code: {
      hex: '#f0f8ff'
    },
    id: 1
  },
  {
    color: 'limegreen',
    code: {
      hex: '#99ddbc'
    },
    id: 2
  },
  {
    color: 'aqua',
    code: {
      hex: '#00ffff'
    },
    id: 3
  },
  {
    color: 'aquamarine',
    code: {
      hex: '#7fffd4'
    },
    id: 4
  },
];

test("Fetches data and renders the bubbles", async() => {
mockFetchColorList.mockResolvedValueOnce(mockColorList)

// const {getAllByTestId}= render (<BubblePage/>)

const {getAllByTestId}= render (<ColorList colors={mockColorList} />)


await waitFor(()=>{
  expect(screen.getAllByTestId(/color/)).toHaveLength(4);
})  
});


test("Fetches data and renders the bubbles", async() => {
  //user mock api get to get colors
  // intercept the api call using mockFetchColorList
  // mockFetchColorList.mockResolvedValueOnce(newColorList)
  // render (<BubblePage />)

  const {getAllByTestId} =render (<ColorList colors={mockColorList} />)

  // const checkColors=findAllByTestId('colors');
  await waitFor(()=>{
    expect(screen.getAllByTestId(/color/)).toHaveLength(4);
  })
});


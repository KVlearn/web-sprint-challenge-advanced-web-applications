import React, { useState } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    console.log('colorToEdit=',colorToEdit)
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`,colorToEdit)
    .then(res=>{
      console.log(res)
      //returns the update color
      //set the updatecolor and update that matching ID with the res.data
      const newColors= colors.map(item=>{
        if(item.id == res.data.id){
          return res.data
        }else return item
      })
      updateColors(newColors);
     //close the edit form for the user
     setEditing(false)
    })
    .catch(err=> console.log(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res=>{
      console.log('res in delete',res)
      //returns the id that is deleted
      //remove this id from the state colors
      const newList= colors.filter(item=> item.id !== res.data)
      updateColors(newList);

    })
    .catch(err=> console.log(err))
  };

const addColor=(e)=>{
  e.preventDefault();
  axiosWithAuth()
  .post('/api/colors',colorToAdd)
  .then(res=>{
    console.log(res)
    //returns the full list
    updateColors(res.data)
    //reset add form
    setColorToAdd(initialColor);
  })
  .catch(err=>console.log(err))
}

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li data-testid="color" 
          key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {!editing && (
      <form onSubmit={addColor}>
          <legend>Add Color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd
                  , color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Add me!</button>
            <button onClick={(e) =>{ 
              e.preventDefault();
              setAdding(false)}
              }>cancel</button>
          </div>
        </form>
       )}
    </div>
  );
};

export default ColorList;

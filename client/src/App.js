import './App.css';
import React, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';


function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newFoodNames, setNewFoodNames] = useState({});
  const [updateUI,setUpdateUI]=useState(false)
  const addToList = () => {
    console.log(foodName + days);
    axios
      .post("http://localhost:3001/insert", { foodName: foodName, daysSinceIAte: days })
      .then((res) =>{
        console.log(res.data)
        setUpdateUI((prevState)=>!prevState);
        setFoodName("");
        setDays("");
      } 
      )
      .catch((error) => console.error(error));
  };

  const updateFood = (id) => {
    axios.put("http://localhost:3001/update", { id: id, newFoodName: newFoodNames[id] })
    .then((res)=>
    {
      console.log("updated")
      setUpdateUI((prevState)=>!prevState)
    })
    .catch((error)=>console.log(error));
  };

  const deleteFood = (id) => {
    const url = `http://localhost:3001/delete/${id}`;
    console.log("DELETE URL:", url);
  
    axios.delete(url)
      .then(() => {
        setUpdateUI((prevState) => !prevState);
      })
      .catch((error) => console.log(error));
  };
  
  useEffect(() => {
    axios.get("http://localhost:3001/read")
      .then((res) => setFoodList(res.data))
      .catch((error) => console.error(error));
  }, [updateUI]);

  return (
    <div className='App'>
      <h1>Crud app with MERN</h1>
      <label>Food Name:</label>
      <input type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
      <label>Days since you Ate:</label>
      <input type="number" value={days} onChange={(e) => setDays(e.target.value)} />
      <button onClick={addToList}>Add to List</button>

      <h1>Food List</h1>
      {foodList.map((item, key) => {
        return (
          <div key={key} className='food'>
            <h1>{item.foodName}</h1>
            <h1>{item.daysSinceIAte}</h1>
            <input
              type="text"
              placeholder='New Food Name...'
              value={newFoodNames[item._id] || ''}
              onChange={(e) => {
                setNewFoodNames((prev) => ({ ...prev, [item._id]: e.target.value }));
              }}
            />
            <button onClick={() => updateFood(item._id)}>Update</button>
            <button onClick={()=>deleteFood(item._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
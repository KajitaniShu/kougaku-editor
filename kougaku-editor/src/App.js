import './App.css';
import {Title} from "./components/Title";
import {InputForm} from "./components/InputForm";
import {ItemList} from "./components/ItemList";
import { DrawCanvas } from './components/DrawCanvas';
import Sidebar from "./components/Sidebar";
import React, {useState} from 'react'

function App() {
  const [itemList, setItemList] = useState([]);

  return (
    <div className="body">
      <div className="editArea">
        <Sidebar />
        <div className="displayArea">
            <DrawCanvas />
        </div>
        <div className="itemListArea">
          <Title />
          <InputForm itemList={itemList} setItemList={setItemList}/>
          <ItemList itemList={itemList} setItemList={setItemList}/>
        </div>
      </div>
      
      
    </div>
  );
}

export default App;
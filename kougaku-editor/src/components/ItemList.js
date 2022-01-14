import React from 'react'
import { ElementData } from "./ElementData";
import Detail from "./Detail";

export const ItemList = ({itemList, setItemList}) => {

    const handleCompleted = (id) => {
        setItemList(itemList.map((item) => {
            if(id == item.id){
                return{
                    ...item, 
                    completed: !item.completed
                };
            }
            return item;
        }))
    };

    const handleDelete = (id) => {
        /* タスクを削除する */
        setItemList(itemList.filter((item) => item.id !== id));
        console.log(id);
    }

    const handleSelected = (id) => {
        setItemList(itemList.map((item) => {
            if(id == item.id){
                return{
                    ...item, 
                    selected: !item.selected
                };
            }
            return item;
        }))
    }

    return (
        <div className="itemList">
            {itemList.map((item, index) => (
                <div className={`item ${item.completed ? "completed" : ""}`} key={index}>
                    <div className="element">
                        <div 
                            className={`itemText radiusTopLeft ${item.selected ? "" : "radiusBottomLeft"}`}
                            onClick={() => handleSelected(item.id)}
                        >
                            <span>{item.text}</span>
                        </div>
                        <div className="icons">
                            <button onClick={() => handleCompleted(item.id)}>
                                
                            </button>
                            <button onClick={() => handleDelete(item.id)}>
                                <i className={`fas fa-trash radiusTopRight ${item.selected ? "" : "radiusBottomRight"}`}></i>
                            </button>
                        </div>
                    </div>
                    {item.selected ? <Detail/> : ""}
                </div>
            ))}
        </div>
    )
}

import React, {useState} from 'react'

export const InputForm = ({itemList, setItemList}) => {

    const [inputText, setInputText] = useState("");

    const handleChange = (e) => {
        setInputText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // タスクを追加する
        setItemList([
            ...itemList, 
            {
                id: itemList.length,
                type: 'camera',
                text: inputText,
                completed: false,
                selected: false
            }
        ]);
        setInputText("");
    }

    return (
        <div className="inputForm">
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={inputText}/>
                <button><i className="fas fa-plus-circle"></i></button>
            </form>
        </div>
    )
}

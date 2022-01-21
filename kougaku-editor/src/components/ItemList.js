import React from 'react'
import { Item } from './Item';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';

export const ItemList = ({itemList, setItemList}) => {
    return (
        <div className="itemList">
            <TransitionGroup>
                {itemList.map((item, index) => (
                    <Collapse key={index}>
                        <Item item={item}  itemList={itemList} setItemList={setItemList}/>
                    </Collapse>
                ))}
            </TransitionGroup>
        </div>
    )
}

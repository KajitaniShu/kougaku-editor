import React from 'react';
import { Draw3D } from './Draw3D';
import { Draw2D } from './Draw2D';
import { Tabbar } from './Tabbar';
import TabContext from '@mui/lab/TabContext';

export const DisplayArea = ({itemList, setItemList}) => {
    const [value, setValue] = React.useState("2D");

    return (
        <TabContext value={value}>
            <Tabbar value={value} setValue={setValue} />
            {value==="2D" ? <Draw2D itemList={itemList} setItemList={setItemList}/> : <Draw3D itemList={itemList}/>}
        </TabContext>
    );
}

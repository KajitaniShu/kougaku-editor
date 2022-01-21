import React from 'react';
import { Draw3D } from './Draw3D';
import { Draw2D } from './Draw2D';
import { Tabbar } from './Tabbar';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';

export const DisplayArea = (itemList) => {
    const [value, setValue] = React.useState("2D");

    return (
        <TabContext value={value}>
            <Tabbar value={value} setValue={setValue} />
            {value==="2D" ? <Draw2D /> : <Draw3D itemList={itemList}/>}
        </TabContext>
    );
}

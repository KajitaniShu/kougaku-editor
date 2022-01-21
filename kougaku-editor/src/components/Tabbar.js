import React, {useState}from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    text: {
        background: "#282c34", 
        color: '#B2BAC2',
        fontWeight: 'light'
    }
});

export const Tabbar = ({value, setValue}) => {
    const style = useStyles();
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', fontWeight: 'light'}} >
            <Tabs 
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                centered
            >
                <Tab label="2D" value="2D" className={style.text}/>
                <Tab label="3D" value="3D" className={style.text}/>
            </Tabs>
        </Box>
            
    );
}

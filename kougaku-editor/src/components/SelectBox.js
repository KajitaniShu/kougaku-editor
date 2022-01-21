import React, {useState} from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {ElementData} from './ElementData';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    text: {
        color: '#B2BAC2'
    }
});

export const SelectBox = ({itemList, setItemList}) => {

    const style = useStyles();

    const handleChange = (event) => {
        console.log(event);
        setItemList([
            ...itemList, 
            {
                id: event.target.value + itemList.length,
                type: event.target.value,
                name: event.target.value,
                selected: false,
                x:0.0,
                y:0.0,
                z:0.0,
                rotate: 0
            }
        ]);
    };

    return (
        <Box sx={{ minWidth: 120}}>
        <FormControl fullWidth>
            <InputLabel className={style.text}>素子を追加</InputLabel>
            <Select
                value={itemList}
                label="素子を追加"
                onChange={handleChange}
            >
                {ElementData.map((value, key) => {
                    return (
                        <MenuItem key={key} value={value.value}>{value.dispName}</MenuItem>
                    )
                })}
                <MenuItem key={-1} value={""}>戻る</MenuItem>
            </Select>
        </FormControl>
        </Box>
    );
}
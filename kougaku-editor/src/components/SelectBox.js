import React, {useState} from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {ElementData} from './ElementData';
import { makeStyles } from '@mui/styles';
import * as THREE from 'three'


const useStyles = makeStyles({
    text: {
        color: '#B2BAC2'
    }
});

export const SelectBox = ({itemList, setItemList}) => {

    const style = useStyles();
    

    const handleChange = (event) => {
        ElementData.map((value, key) => {
            // 同じ素子の何個使われているか調べる
            var count = 0;
            {itemList.map((value, key) => {
                if(value.type == event.target.value) count++;
            })}
            
            if(value.value === event.target.value){
                setItemList([
                    ...itemList, 
                    {
                        id: event.target.value + itemList.length,
                        input_path: value.input_path,
                        type: event.target.value,
                        name: value.name+count,
                        selected: false,
                        pos: [0, 0, 0],
                        rotate: 0
                    }
                ]);
            }
        });
        
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
                        <MenuItem key={key} value={value.value}>{value.name}</MenuItem>
                    )
                })}
                <MenuItem key={-1} value={""}>戻る</MenuItem>
            </Select>
        </FormControl>
        </Box>
    );
}
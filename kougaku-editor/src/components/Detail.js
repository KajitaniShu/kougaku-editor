import React, {useState} from 'react'
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    dark: {
        background: "#282c34", 
        color: '#DDDDDD',
    },
    button: {
        textAlign: 'right'
    }
});

export const Detail = ({item, itemList, setItemList}) => {
    const style = useStyles();
    
    const Delete = (id) => {
        /* タスクを削除する */
        setItemList(itemList.filter((item) => item.id !== id));
    }

    return (
        <div className="detail">
            <ul className="coordX detailInput">
                <Typography>x</Typography>
                <input type="number" />
            </ul>
            <ul className="coordY detailInput">
                <Typography>y</Typography>
                <input type="number" />
            </ul>
            <ul className="coordZ detailInput">
                <Typography>z</Typography>
                <input type="number" />
            </ul>
            <ul className="angle detailInput">
                <Typography>角度</Typography>
                <input type="number"/>
            </ul>
            <ul className={style.button}>
                <Tooltip onClick={() => Delete(item.id)} title="Remove" >
                    <IconButton>
                        <Typography className={style.dark}><DeleteIcon /></Typography>
                    </IconButton>
                </Tooltip>
            </ul>
        </div>
    )
}

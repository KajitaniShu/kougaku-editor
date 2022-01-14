import React, {useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';

export const Item = ({item, itemList, setItemList, index}) => {
    const useStyles = makeStyles({
        dark: {
            background: "#282c34", 
            color: '#DDDDDD',
        },
        gray: {
            background: "#383c44", 
            color: '#DDDDDD',
        }
    });
    const style = useStyles();


    const Delete = (id) => {
        /* タスクを削除する */
        setItemList(itemList.filter((item) => item.id !== id));
    }

    return (
        <Accordion key={index} className="item">
            <AccordionSummary className={style.dark} expandIcon={<ExpandMoreIcon className={style.dark}/>}>
                <Typography>{item.text}</Typography>
            </AccordionSummary>
            <AccordionDetails className={style.gray}>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                    <Tooltip onClick={() => Delete(item.id)} title="Remove" >
                        <IconButton >
                            <DeleteIcon className={style.gray}/>
                        </IconButton>
                    </Tooltip>
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

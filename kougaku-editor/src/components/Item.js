import React, {useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import { Detail } from './Detail';

export const Item = ({item, itemList, setItemList}) => {
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

    return (
        <Accordion key={item.id} className="item">
            <AccordionSummary className={style.dark} expandIcon={<ExpandMoreIcon className={style.dark}/>}>
                <Typography>{item.name}</Typography>
            </AccordionSummary>
            <AccordionDetails className={style.dark}>
                <Detail item={item} itemList={itemList} setItemList={setItemList} />
            </AccordionDetails>
        </Accordion>
    )
}

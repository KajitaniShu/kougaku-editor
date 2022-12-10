import { useState } from 'react';
import { Button, createStyles, Box, Group, Affix } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { storage, db } from './firebase';
import { ref, uploadString } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';


const useStyles = createStyles((theme) => ({
  buttonlist: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    zIndex:2
  }
}));


async function uploadData(data: any, setIsUploading: any) {

await setDoc(doc(db, "user-data", "id1234"), {json: JSON.stringify(data.values.value), uuid:"uuid-1234"});
  
}


export function EditorButton({data}: any) {
  const { classes } = useStyles();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useHotkeys([
    ['ctrl+s', () => uploadData(data, setIsUploading)],
  ]);

  function addObj() {
    data.insertListItem('value', 
    {
      'type':     "box", 
      'position': [0.0, 0.0, 0.0],
      'rotation': [0.0, 0.0, 0.0],
      'scale':    [1.0, 1.0, 1.0],
    }, 
    data.values.value.length);
  }
  

  return (
      <Button.Group className={classes.buttonlist}>
      <Button variant="default" onClick={addObj}>追加</Button>
      <Button variant="default">表示</Button>
      <Button variant="default" onClick={() => console.log('保存')}>保存</Button>
    </Button.Group>
  );
}
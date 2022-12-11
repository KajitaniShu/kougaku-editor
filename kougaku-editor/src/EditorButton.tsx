import { useState } from 'react';
import { Button, createStyles, Box, Group, Affix } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { storage, db } from './firebase';
import { ref, uploadString } from "firebase/storage";
import { doc, setDoc, Timestamp } from 'firebase/firestore';


const useStyles = createStyles((theme) => ({
  buttonlist: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    zIndex:2
  }
}));


async function uploadData(data: any, setIsUploading: any) {
  const id     = data.id;
  const json   = JSON.stringify(data.json);
  const update = Timestamp.now();
  const uuid   = data.uuid;
  const name   = data.name;
  await setDoc(doc(db, "user-data", id), {uuid: uuid, name: name, json: json, update: update});
}


export function EditorButton({data, database,  setData}: any) {
  const { classes } = useStyles();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useHotkeys([
    ['ctrl+s', () => uploadData(data, setIsUploading)],
  ]);

  async function addObj() {
    console.log(data)
    let _data = data;

    _data.json.push({
      'type':     "box", 
      'position': [0.0, 0.0, 0.0],
      'rotation': [0.0, 0.0, 0.0],
      'scale':    [1.0, 1.0, 1.0],
    });
    setData({id: data.id, name: data.name, uuid: data.uuid, json: _data.json, update: data.update});
    console.log(data)
  }
  

  return (
      <Button.Group className={classes.buttonlist}>
      <Button variant="default" onClick={addObj}>追加</Button>
      <Button variant="default">表示</Button>
      <Button variant="default" onClick={() => uploadData(data, setIsUploading)}>保存</Button>
    </Button.Group>
  );
}
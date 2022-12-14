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


export function EditorButton({database, setDatabase, contentsIndex}: any) {
  const { classes } = useStyles();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useHotkeys([
    ['ctrl+s', () => uploadData(database[contentsIndex], setIsUploading)],
  ]);

  async function addObj() {
    let _database = await database.slice(0, database.length);
    const index = database[contentsIndex].length;

    _database[contentsIndex].json.push({
      'type':     "box",
      'name':     "box",
      'position': [0.0, 0.0, 0.0],
      'rotation': [0.0, 0.0, 0.0],
      'scale':    [1.0, 1.0, 1.0],
    });

    setDatabase(_database);
  }
  

  return (
      <Button.Group className={classes.buttonlist}>
      <Button variant="default" onClick={addObj}>追加</Button>
      <Button variant="default">表示</Button>
      <Button variant="default" onClick={() => uploadData(database[contentsIndex], setIsUploading)}>保存</Button>
    </Button.Group>
  );
}
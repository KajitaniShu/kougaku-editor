import { Button, createStyles, Box, Group, Affix } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  buttonlist: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    zIndex:2
  }
}));


export function EditorButton({data}: any) {
  const { classes } = useStyles();

  data.insertListItem('value', 
  {
    'type':     "box", 
    'position': [0.0, 0.0, 0.0],
    'rotation': [0.0, 0.0, 0.0],
    'scale':    [1.0, 1.0, 1.0],
  }, 
  data.values.value.length);

  return (
      <Button.Group className={classes.buttonlist}>
      <Button variant="default">追加</Button>
      <Button variant="default">表示</Button>
      <Button variant="default">Third</Button>
    </Button.Group>
  );
}
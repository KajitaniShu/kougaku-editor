import { useState } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Group, Avatar, Text, Container, Button, Paper } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },
}));

interface ContentsListProps {
  database:  any,
  setContentsId: any
}

export function ContentsList({ database, setContentsId }: ContentsListProps) {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState([1]);
  
  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) => (current.length === database.length ? [] : database.map((item: any) => item.id)));

    

  return (
    <Container>
        <Group mt={30} mb={60}>
                <Button radius="sm" color="indigo.5" size="sm" className={classes.control}>
                  新規作成
                </Button>
                {selection.length > 0 && 
                  <Button variant="subtle" color="red" radius="sm" size="sm" className={classes.control}>
                    削除
                  </Button>
                }
                
              </Group>
      <Paper p="xl" withBorder>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} horizontalSpacing="xl" verticalSpacing="xs" fontSize="xs">
          <thead>
            <tr>
              <th>
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === database.length}
                  indeterminate={selection.length > 0 && selection.length !== database.length}
                  transitionDuration={0}
                />
              </th>
              <th>id</th>
              <th>name</th>
              <th>update</th>
            </tr>
          </thead>
          <tbody>{
          database.map((item: any) => {
            const selected = selection.includes(item.id);
            return (
              <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
                <td>
                  <Checkbox
                    checked={selection.includes(item.id)}
                    onChange={() => toggleRow(item.id)}
                    transitionDuration={0}
                  />
                </td>
                <td>
                    <Text size="sm" weight={500}>
                      {item.id}
                    </Text>
                </td>
                <td>
                    <Text size="sm" weight={500}>
                      {item.name}
                    </Text>
                </td>
                <td>
                    <Text size="sm" weight={500}>
                      {String(item.update.toDate().toLocaleString())}
                    </Text>
                </td>
              </tr>
          )})
          }</tbody>
        </Table>
      </ScrollArea>
      </Paper>
    </Container>
  );
}
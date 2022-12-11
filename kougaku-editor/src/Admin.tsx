import { useState, useEffect } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Avatar,
  MediaQuery,
  Group,
  Code,
  Title,
  Burger,
  createStyles,
  useMantineTheme,
  ScrollArea,
  Button,
  Image,
  Box,
  Card
} from '@mantine/core';
import {
  IconLogout,
  IconDeviceTv,
  IconEdit,
  IconUserCircle 
} from '@tabler/icons';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { PageNotFound } from './PageNotFound';
import { Login } from './Login';
import { db }  from './firebase';
import {collection, doc, getDocs, query, where } from 'firebase/firestore';
import { auth } from './firebase'
import { useAuthState, useSignInWithFacebook } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'
import { ContentsList } from './ContentsList'
import { Editor } from './Editor'
import { ColorModeSwitch } from './ColorModeSwitch'


const data = [
  { link: '/', label: 'プレビュー', icon: IconDeviceTv },
  { link: '/edit-subtitles', label: '字幕編集', icon: IconEdit },
  { link: '/account', label: 'アカウント', icon: IconUserCircle },
];

const useStyles = createStyles((theme, _params, getRef) => {
  const icon:any = getRef('icon');
    return {
      header: {
      color: '#393E46',
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: "indigo.1" })
          .background,
        color: theme.fn.variant({ variant: 'light', color: "indigo.6" }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: 'light', color: "indigo.6" }).color,
        },
      },
    },
  }
});


export default function Admin() {
  const [contentsId, setContentsId] = useState<string>("");
  const [user, initialising] = useAuthState(auth);
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState('一覧');
  const [database, setDatabase] = useState<any>(); 
  
  useEffect(() => {
    if(user && database === undefined){
      // データを取得
      let _database: any = [];
      const dataList = query(collection(db, "user-data"), where("uuid", "==", user.uid));
      getDocs(dataList).then((snapShot)=>{
        const _data = JSON.stringify(snapShot.docs.map((doc) => {
          const data = doc.data();
          _database.push({
            id:     doc.ref.id,
            name:   data.name,
            uuid:   data.uuid,
            update: data.update,
            json:   JSON.parse(data.json || "[]")
          })
        }));
        setDatabase(_database);
      })
    }
    
  }, [user]);

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        toggle();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : "#ffffff",
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
          
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <ScrollArea offsetScrollbars scrollbarSize={6}>
            <Navbar.Section grow>
              {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>

              <a href="/" className={classes.link} onClick={() => auth.signOut()}>
                <IconLogout className={classes.linkIcon} stroke={1.5} />
                <span>Logout</span>
              </a>

            
            </Navbar.Section>  
            <Navbar.Section className={classes.footer}>
              <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                <span>お問い合わせ</span>
              </a>
              <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                <span>使い方</span>
              </a>
              <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                <span>リリース</span>
              </a>
            
            </Navbar.Section>
            </ScrollArea>
          </Navbar>
        
      }
      header={
        <Header height={70} p="md">
        <Group className={classes.header} >
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger opened={opened} onClick={toggle} size="sm" />
          </MediaQuery>
          <Button color="gray" variant="subtle"  component="a" href="/"><Title color="gray.7" order={3} >光学系配置ツール</Title></Button>
          
          <Code sx={{ fontWeight: 700 }}>v0.6.0</Code>
          <ColorModeSwitch/>
        </Group>
        <Group position="center" my="xl">
        </Group>

        </Header>
      }

      
      
    >
      <Card 
        w={"100%"} h={"100%"} sx={{position:"relative"}} withBorder
      >
        <Card.Section>
        
      {(() => {
        console.log(contentsId)
        if(!user) return <Login />;   // ユーザー情報がない → ログイン画面を表示
        else if (database !== undefined){                        // ユーザー情報がある
          if(!contentsId) return <ContentsList database={database} setDatabase={setDatabase} setContentsId={setContentsId} uuid={user.uid}/>   // コンテンツID (編集用ID) がない → コンテンツ一覧を表示
          
          // コンテンツID (編集用ID) がある & データが取得できている → 編集画面へ
          else if(contentsId !== "") return <Editor database={database} setDatabase={setDatabase} contentsId={contentsId} setContentsId={setContentsId} uuid={user.uid}/>;
          else return  <PageNotFound />;
        }else return  <PageNotFound />;
      })()}
      </Card.Section>
      </Card>
    </AppShell>
  );
}
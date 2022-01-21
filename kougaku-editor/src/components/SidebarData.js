import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import HelpIcon from '@mui/icons-material/Help';

export const SidebarData = [
    {
        title: "ホーム",
        icon: <HomeIcon/>,
        selected: false
    },
    {
        title: "エディタ",
        icon: <EditIcon/>,
        selected: true
    },
    {
        title: "ヘルプ",
        icon: <HelpIcon/>,
        selected: false
    },
];

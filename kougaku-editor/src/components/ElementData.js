import React from 'react'
import LightModeIcon from '@mui/icons-material/LightMode';
import FlashlightOnIcon from '@mui/icons-material/FlashlightOn';
import SearchIcon from '@mui/icons-material/Search';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export const ElementData = [
    {
        type: "light",
        icon: <LightModeIcon/>,
    },
    {
        type: "lightSource",
        icon: <FlashlightOnIcon/>,
    },
    {
        type: "lens",
        icon: <SearchIcon/>,
    },
    {
        type: "beamExpander",
        icon: <NetworkWifiIcon/>,
    },
    {
        type: "camera",
        icon: <CameraAltIcon/>,
    },
];

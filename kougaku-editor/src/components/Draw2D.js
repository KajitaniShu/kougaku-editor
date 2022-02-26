import React, {useState} from 'react'
import * as Fiber from '@react-three/fiber';
import * as Drei from "@react-three/drei";
import { Model2D } from './Model2D';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import * as THREE from 'three'


Drei.softShadows()
export const Draw2D = ({itemList, setItemList}) => {
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    return (
        <React.Suspense centered fallback={
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress /></Box>
        }>
            <Fiber.Canvas>
                {itemList.map((value, key) => {
                    return (
                        <Model2D value={value} plane={plane} itemList={itemList} setItemList={setItemList} key={key}/>
                    )
                })}
                <Drei.OrbitControls minZoom={5} maxZoom={50} enableRotate={false}/>
                <Drei.OrthographicCamera makeDefault zoom={50} position={[0, 0, 200]} />
                <gridHelper rotation-x={Math.PI/2} position={[0,  0, 0]} args={[1000, 1000, `#565656`, `#2B2B2B`]} />
            </Fiber.Canvas>
        </React.Suspense>
    );
};

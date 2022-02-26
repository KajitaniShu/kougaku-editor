import React from 'react'
import * as Fiber from '@react-three/fiber';
import * as Drei from "@react-three/drei";
import { Model3D } from './Model3D';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


Drei.softShadows()
export const Draw3D = ({itemList}) => {

    return (
        <React.Suspense centered fallback={
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress /></Box>
        }>
            <Fiber.Canvas shadows={true} shadowMap camera={{
                position: [0, 100, 100],
                fov: 20,
                aspect: window.innerWidth / window.innerHeight,
                near: 0.1,
                far: 2000
            }}>
                <Drei.OrbitControls enablePan={true} enableRotate={true} />
                <Drei.Environment preset="city" />
                <ambientLight intensity={0.4} />
                <directionalLight
                    castShadow
                    intensity={0.3}
                    position={[0, 0, 100]}
                    shadow-mapSize-height={1024}
                    shadow-mapSize-width={1024}
                />
                    
                    {itemList.map((value, key) => {
                        return (
                            <Model3D value={value} key={key}/>
                        )
                    })}
                    <Drei.ContactShadows position={[0, 0, 0]} opacity={0.4} width={1000} height={1000} blur={0.2} far={4.5} />
                    <Drei.BakeShadows />
                    <gridHelper position={[0, -0.1, 0]} args={[1000, 200, `#565656`, `#2B2B2B`]} divisions={10} />
                    
                    </Fiber.Canvas>
        </React.Suspense>
    );
};

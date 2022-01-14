import React from 'react'
import * as Drei from "@react-three/drei";

export const Model = () => {
    const { scene } = Drei.useGLTF("./models/laser.glb");

    return (
            <primitive scale={[1, 1, 1]} object={scene} />
    )
}
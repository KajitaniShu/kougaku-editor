import React, {useState, useRef} from 'react'
import * as Drei from "@react-three/drei";
import { Html, Stats } from "@react-three/drei";

// 文字数をカウント (半角に対応)
function count(text){
    var length = 0.0;
    for(var i=0; i < text.length; i++) {
        text[i].match(/[ -~]/) ? length += 0.5 : length += 1.0;
    }
    return length;
}

export const Model3D = ({value}) => {
    const { scene } = Drei.useGLTF(value.input_path);
    const [pos, setPos] = useState([Math.round(value.pos[0])*5, Math.round(value.pos[1])*5, Math.round(value.pos[2])*5]);
    return (
    <mesh receiveShadow>
        <Html position={[pos[0], pos[1]+5, pos[2]]} center={true} className="innerText" style={{width: count(value.name)+1+'em'}} distanceFactor={30} occlude={true}>
            <p>{value.name}</p>
        </Html>
        <primitive position={pos} object={scene} roughness={0} smoothness={10} key={value.id}/>
        
    </mesh>        
    )
}
import React, {useState, useRef} from 'react'
import { useDrag } from "@use-gesture/react";
import * as Drei from "@react-three/drei";
import { Html, Stats } from "@react-three/drei";
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, extend, useThree } from "react-three-fiber"
import * as THREE from 'three'
import ReactDOM from 'react-dom'
import { animated, useSpring } from "@react-spring/three";

// 文字数をカウント (半角に対応)
function count(text){
    var length = 0.0;
    for(var i=0; i < text.length; i++) {
        text[i].match(/[ -~]/) ? length += 0.5 : length += 1.0;
    }
    return length;
}

extend({ DragControls })

export const Model2D = ({ value, plane, itemList, setItemList }) => {
    const [needUpdate, setNeedUpdate] = useState(false);
    const [pos, setPos] = useState([Math.round(value.pos[0]), Math.round(value.pos[1]), Math.round(value.pos[2])]);
    const [isActive, setIsActve] = useState(false);
    const {box} = new THREE.BoxGeometry( 1, 1, 1 );

    var _pos = new THREE.Vector3();
    
    const dragObj = useRef();
    const bind = useDrag(
        ({active, event}) => {
            setIsActve(active);
            if(active) {
                event.ray.intersectPlane(plane, _pos);
                setPos([_pos.x, _pos.y, _pos.z]);
                setNeedUpdate(true);
            }else if(needUpdate){
                setPos([Math.round(pos[0]), Math.round(pos[1]), Math.round(pos[2])]);
                
                var newItemList = itemList;
                {newItemList.map((item, key) => {
                    if(value === item) item.pos = pos;
                })}
                setItemList(newItemList);
                
                setNeedUpdate(false);
            }
            
        }
    );

    return (
    <mesh {...bind()}>
        <Html position={[pos[0], pos[1]+2, pos[2]]} center={true} className="innerText" style={{width: count(value.name)+1+'em'}} >
            <p>{value.name}</p>
        </Html>
    
        <Drei.Box  obejct={box} position={pos} scale={isActive ? 1.2 : 1} ref={dragObj}/>
    </mesh>       
    )
}
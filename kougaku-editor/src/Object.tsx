import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, TransformControls, Select, Line, GizmoHelper, GizmoViewcube, GizmoViewport, OrbitControls, Center, softShadows, PivotControls } from '@react-three/drei'
import { TransformButton } from './TransformButton'
import { EditorButton } from './EditorButton'
import { useForm } from '@mantine/form';
import { Vector3, Quaternion } from 'three';
import { Object3D } from 'three'
import { Group } from '@mantine/core';
import { Timestamp } from 'firebase/firestore';




interface ObjectProps {
  database: any,
  setDatabase: any,
  data:     any,
  setData:  any,
  index:    number,
  mode:     "none" | "translate" | "rotate" | "scale"
}

export function Object({database, setDatabase, data, setData, index, mode}: ObjectProps) {
  async function hundleChange (ref: any) {
    const _data = data;
    _data.json[index] = {
      name:     data.json[index].name,
      type:     data.json[index].type,
      position: [ref.current.parent.position.x, ref.current.parent.position.y, ref.current.parent.position.z], 
      rotation: [ref.current.parent.rotation._x, ref.current.parent.rotation._y, ref.current.parent.rotation._z], 
      scale: [ref.current.parent.scale.x, ref.current.parent.scale.y, ref.current.parent.scale.z]};
    _data.update = Timestamp.now();
    setData(_data);

    let _database = await database.slice(0, database.length);

    _database[index] = _data;
    setDatabase(_database);
  }

  const props = {
    ...(mode !== "none" && {mode:mode}),
    ...(mode === "none" && {enabled:true})
  };
  
  const ref = useRef<any>();
  
  return (
        <TransformControls 
          {...props} 
          onMouseUp={(e) => {  if(e) hundleChange(ref) }} 
          translationSnap={1} 
          position={[data.json[index].position[0], data.json[index].position[1], data.json[index].position[2]]}
          rotation={[data.json[index].rotation[0], data.json[index].rotation[1], data.json[index].rotation[2]]}
          scale=   {[data.json[index].scale[0],    data.json[index].scale[1],    data.json[index].scale[2]]}
        >
          <mesh castShadow matrixAutoUpdate={true} ref={ref} receiveShadow >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial />
          </mesh>
        </TransformControls>
  )
}

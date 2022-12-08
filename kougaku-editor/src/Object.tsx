import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, TransformControls, Select, Line, GizmoHelper, GizmoViewcube, GizmoViewport, OrbitControls, Center, softShadows, PivotControls } from '@react-three/drei'
import { TransformButton } from './TransformButton'
import { EditorButton } from './EditorButton'
import { useForm } from '@mantine/form';
import { Vector3, Quaternion } from 'three';
import { Object3D } from 'three'
import { Group } from '@mantine/core';




interface ObjectProps {
  data:   any,
  index:  number,
  mode:   "none" | "translate" | "rotate" | "scale"
}

export function Object({data, index, mode}: ObjectProps) {
  const position = new Vector3();
  const quaternion = new Quaternion();
  const scale = new Vector3();

  function hundleChange (ref: any) {
    console.log(ref.current.parent.position)
    console.log(ref.current.parent.scale)
    console.log(ref.current.parent.rotation._x, ref.current.parent.rotation._y, ref.current.parent.rotation._z)

    data.insertListItem('value', 
      {
        'type': data.values.value[index].type, 
        'position': [ref.current.parent.position.x, ref.current.parent.position.y, ref.current.parent.position.z],
        'rotation': [ref.current.parent.rotation._x, ref.current.parent.rotation._y, ref.current.parent.rotation._z],
        'scale':    [ref.current.parent.scale.x, ref.current.parent.scale.y, ref.current.parent.scale.z],
      }, 
      index);
      data.removeListItem('value', index+1);
  }

  const props = {
    ...(mode !== "none" && {mode:mode}),
    ...(mode === "none" && {enabled:true})
  };
  
  const ref = useRef<any>();

  useEffect(() => {
    ref.current.parent.position.set(data.values.value[index].position[0], data.values.value[index].position[1], data.values.value[index].position[2]);
    ref.current.parent.rotation.set(data.values.value[index].rotation[0], data.values.value[index].rotation[1], data.values.value[index].rotation[2]);
    console.log(data.values.value[index].scale[0])
  }, []);
  
  return (
        <TransformControls {...props} onMouseUp={(e) => {  if(e) hundleChange(ref) }} translationSnap={1} >
          <mesh castShadow matrixAutoUpdate={true} ref={ref} receiveShadow scale={[data.values.value[index].scale[0], data.values.value[index].scale[1],data.values.value[index].scale[2]]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial />
          </mesh>
        </TransformControls>
  )
}

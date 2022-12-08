import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { useGLTF, TransformControls, Line, Text, GizmoHelper, GizmoViewcube, GizmoViewport, OrbitControls, Center, softShadows, PivotControls } from '@react-three/drei'
import { TransformButton } from './TransformButton'
import { EditorButton } from './EditorButton'
import { Object } from './Object'
import { useForm } from '@mantine/form';
import {
  Card, Code
} from '@mantine/core';

softShadows()

function hundleChange (ref: any) {
  console.log(ref.current.position, ref.current.rotation, ref.current.scale);
}

export function Editor() {
  const [mode, setMode] = useState<"none" | "translate" | "rotate" | "scale">("none");
  const objectData = useForm({
    initialValues: {
      value: [{type: "box", position: [0.0, 0.0, 0.0], rotation: [0.0, 0.0, 0.0], scale: [1.0, 1.0, 1.0]}]
    },
  });

  return (
    <>
      <EditorButton data={objectData} />
      <TransformButton setMode={setMode} />
      <Canvas 
        
        shadows 
        style={{
          position: 'absolute',
          top: 0,
        }}
        raycaster={{ params: { Line: { threshold: 0.15 } } }} 
        camera={{ position: [-10, 10, 10], fov: 20 }}>
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[2.5, 5, 5]} intensity={1.5} shadow-mapSize={[1024, 1024]}>
          <orthographicCamera attach="shadow-camera" args={[-5, 5, 5, -5, 1, 50]} />
        </directionalLight>

        {objectData.values.value.map((data: any, index: number) => (
          <Object data={objectData} index={index} mode={mode}/>
        ))}
        
        
        <mesh scale={1000} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry />
          <shadowMaterial transparent opacity={0.5} />
        </mesh>
        <OrbitControls makeDefault />
        <gridHelper args={[100, 100]} />
        <axesHelper args={[50]} />
        <GizmoHelper alignment="top-right" margin={[80,120]}>
      
        <group scale={1} position={[-10, -10, -10]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} hideNegativeAxes />
        </group>
        
      </GizmoHelper>
      </Canvas>
          <Code>{JSON.stringify(objectData.values)}</Code>
    </>
  )
}
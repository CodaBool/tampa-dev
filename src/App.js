// code example https://codesandbox.io/s/react-three-fiber-orbit-controls-without-drei-7c11y?file=/src/App.js:962-1023
// code gen https://gltf.pmnd.rs
// environment options https://github.com/pmndrs/drei/blob/master/src/helpers/environment-assets.ts
// cool ascii render example 😁 https://threejs.org/examples/#webgl_effects_ascii
// three.js docs https://threejs.org/docs
// fiber + drei docs https://docs.pmnd.rs

import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei'

function Model(props) {
  const group = useRef()
  const [hovered, set] = useState(false)
  const { nodes, materials } = useGLTF("/model.glb")
  useFrame(() => {
    if (hovered) group.current.rotation.y += 0.008
    if (!hovered) group.current.rotation.y += 0.001
  })

  return (
    <group ref={group} {...props} dispose={null} onPointerOver={() => set(true)} onPointerOut={() => set(false)}>
      <group rotation={[Math.PI / 2, 0, 7]} scale={[50, 20, 50]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Curve006_1.geometry}
          material={materials["SVGMat.006"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Curve006_2.geometry}
          material={materials["SVGMat.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Curve006_3.geometry}
          material={materials["SVGMat.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Curve006_4.geometry}
          material={materials["SVGMat.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Curve006_5.geometry}
          material={materials["SVGMat.004"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Curve006_6.geometry}
          material={materials["SVGMat.005"]}
        />
      </group>
    </group>
  )
}

export default function App() {
  return (
    <>
      <Canvas>
        <OrbitControls />
        <Suspense fallback={null}>
          <PerspectiveCamera />
          <Model />
          <Environment files="beach.hdr" background />
        </Suspense>
        <pointLight position={[0, 10, 0]} intensity={1} />
        <ambientLight intensity={.3} />
      </Canvas>
    </>
  )
}

useGLTF.preload("/model.glb")
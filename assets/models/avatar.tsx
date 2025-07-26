import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/native'
import { Asset } from 'expo-asset';

export default function Avatar() {
  const modelUri = Asset.fromModule(require("~/assets/models/avatar.glb")).uri;
  const { nodes, materials } = useGLTF(modelUri)
  return (
    <group dispose={null}>
      <group scale={0.01}>
        <skinnedMesh
          geometry={nodes.char1.geometry}
          material={nodes.char1.material}
          skeleton={nodes.char1.skeleton}
        />
        <primitive object={nodes.Hips} />
      </group>
    </group>
  )
}
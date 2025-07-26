import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber/native';
import { OrbitControls } from '@react-three/drei/native';

export default function CanvasComponent({ children }: { children: React.ReactNode }) {
    return (
        <Canvas 
        camera={{ position: [0, 1, 2.5], fov: 50 }}
        onCreated={(state) => {
            const _gl = state.gl.getContext()
            const pixelStorei = _gl.pixelStorei.bind(_gl)
            _gl.pixelStorei = function (...args) {
                const [parameter] = args
                switch (parameter) { case _gl.UNPACK_FLIP_Y_WEBGL: return pixelStorei(...args) }
            }
        }}>
            <directionalLight position={[5, 10, 15]} intensity={1} castShadow />
            <directionalLight position={[-10, 10, 15]} intensity={1} />
            <directionalLight position={[10, 10, 15]} intensity={1} />
            <Suspense fallback={null}>
                {children}
                <mesh
                    receiveShadow
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -1, 0]}>
                    <planeGeometry args={[10, 10]} />
                    <shadowMaterial opacity={0.5} />
                </mesh>
            </Suspense>
            <OrbitControls target={[0, 1, 0]} enableZoom />
        </Canvas>
    )
}
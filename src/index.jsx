import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { OrbitControls } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <div className='webgl-container'>

    <Canvas
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 4, 2, 6 ]
        } }
    >   
        <OrbitControls makeDefault />
        <Experience />

    </Canvas>
    </div>
)
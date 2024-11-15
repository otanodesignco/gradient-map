import { shaderMaterial, useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import vertex from '../../shaders/vertex.glsl'
import fragment from '../../shaders/fragment.glsl'
import { DoubleSide, RepeatWrapping, Vector2 } from 'three'
import { useRef } from 'react'

export default function MeshGradientMap( 
{ 
    intensity = 1, 
    pan = true,
    panVal = new Vector2( 0.7, 0.0 ),
    stretch = false,
    stretchVal = new Vector2( 1.0, 20. ),
    band = false,
    bandVal = 10,
    polar = false,
    noise = 'value',
    gmap = 'a',

}, props ) 
{

    const self = useRef()

    let noised = ''
    let mapGradient = ''

    const noise1 = useTexture( './textures/noiseValue.png' )
    noise1.wrapS = RepeatWrapping
    noise1.wrapT = RepeatWrapping

    const noise2 = useTexture( './textures/noisePerlin.png' )
    noise2.wrapS = RepeatWrapping
    noise2.wrapT = RepeatWrapping

    const noise3 = useTexture( './textures/noiseVoronoi.png' )
    noise3.wrapS = RepeatWrapping
    noise3.wrapT = RepeatWrapping

    switch( noise.toLowerCase() )
    {
        case 'value':
            noised = noise1
        break;

        case 'perlin':
            noised = noise2
        break;

        case 'voronoi':
            noised = noise3
        break;

        default:
            noised = noise1
        break;
    }
    
    const gradientMap = useTexture( './textures/gradientmap.png' )
    gradientMap.wrapS = RepeatWrapping
    gradientMap.wrapT = RepeatWrapping

    const gradientMap1 = useTexture( './textures/gradientmap1.png' )
    gradientMap1.wrapS = RepeatWrapping
    gradientMap1.wrapT = RepeatWrapping

    const gradientMap2 = useTexture( './textures/gradientmap2.png' )
    gradientMap2.wrapS = RepeatWrapping
    gradientMap2.wrapT = RepeatWrapping

    const gradientMap3 = useTexture( './textures/gradientmap3.png' )
    gradientMap3.wrapS = RepeatWrapping
    gradientMap3.wrapT = RepeatWrapping

    switch( gmap.toLowerCase() )
    {
        case 'a':
            mapGradient = gradientMap
        break;

        case 'b':
            mapGradient = gradientMap1
        break;

        case 'c':
            mapGradient = gradientMap2
        break;

        case 'd':
            mapGradient = gradientMap3
        break;

        default:
            mapGradient = gradientMap
        break;
    }

    const uniforms =
    {
        uNoise: noised,
        uGradientMap: mapGradient,
        uIntensity: intensity,
        time: 0,
        panned: pan,
        uPanned: panVal,
        stretched: stretch,
        uStretched: stretchVal,
        banding: band,
        uBands: bandVal,
        polar: polar,
    }

    useFrame( ( state, delta ) =>
    {
        self.current.uniforms.time.value += delta
    })

    const MeshGradientMap = shaderMaterial( uniforms, vertex, fragment )
    extend( { MeshGradientMap } )

    return (
        <meshGradientMap 
            key={ MeshGradientMap.key }
            ref={ self }
            side={ DoubleSide }
            { ...props }
        />
    )
}

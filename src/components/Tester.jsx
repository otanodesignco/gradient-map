import React from 'react'
import MeshGradientMap from './materials/MeshGradientMap'
import { Vector2 } from 'three'
import { folder, useControls } from 'leva'

export default function Tester() 
{

    const { noises, colorMap, colorBlend, pan, panAmt, stretched, stretchAmt, banding, bandingAmt, polar  } = useControls('UV Transforms',
        {
            noiseOptions: folder({
                noises: {
                    options: [ 'value', 'perlin', 'voronoi' ],
                    label: 'Pick a Noise'
                }

            }),
            gradientMap: folder({
                colorMap:
                {
                    options: [ 'a', 'b', 'c', 'd' ],
                    label: 'Select Gradient'
                },
                colorBlend:
                {
                    value: 1.0,
                    min: 0.001,
                    max: 5,
                    step: 0.01
                }
            }),
            panning: folder({
                pan: true,
                panAmt:
                {
                    value: [ 0.7, 0.0 ]
                }
            }),
            stretch: folder({
                stretched: false,
                stretchAmt:
                {
                    value: [ 1.0, 20.0 ]
                }
            }),
            colorBanding: folder({
                banding: false,
                bandingAmt:
                {
                    value: 7,
                    min: 0.001,
                    max: 20,
                    step: 0.01
                }
            }),
            polarCoords: folder({
                polar: false
            })
        })

        console.log( panAmt )

  return (
    <mesh>
        <planeGeometry
            args={[ 4, 4, 64, 64 ]}
        />
        <MeshGradientMap
            intensity={ colorBlend }
            pan={ pan }
            panVal={ new Vector2( panAmt[0], panAmt[1] ) }
            stretch={ stretched }
            stretchVal={ new Vector2( stretchAmt[0], stretchAmt[1] ) }
            band={ banding }
            bandVal={ bandingAmt }
            polar={ polar }
            noise={ noises }
            gmap={ colorMap }
        />
    </mesh>
  )
}

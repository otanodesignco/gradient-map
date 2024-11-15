uniform sampler2D uNoise;
uniform sampler2D uGradientMap;
uniform float uIntensity;
uniform float time;
uniform bool panned;
uniform vec2 uPanned;
uniform bool stretched;
uniform vec2 uStretched;
uniform bool banding;
uniform float uBands;
uniform bool polar;

in vec2 vUv;

#include ./util/colorGradientMap.glsl
#include ./util/colorBanding.glsl
#include ./uv/uvPan.glsl
#include ./uv/polarCoords.glsl
#include ./uv/uvStretch.glsl

void main()
{

    vec2 uv = vUv;

    if( polar )
    {
        uv = polarCoords( uv );

        if( panned && ! stretched )
        {
            
            uv = uvPan( uv, time, uPanned, false, false );

        }
        else if( panned && stretched )
        {
            uv = uvStretch( uv, uStretched );
            uv = uvPan( uv, time, uPanned, false, false );
        }
        else if( !panned && stretched )
        {
            uv = uvStretch( uv, uStretched );

        }
    }
    else
    {
        if( panned && ! stretched )
        {
            
            uv = uvPan( uv, time, uPanned, false, false );

        }
        else if( panned && stretched )
        {
            uv = uvStretch( uv, uStretched );
            uv = uvPan( uv, time, uPanned, false, false );
        }
        else if( !panned && stretched )
        {
            uv = uvStretch( uv, uStretched );

        }
    }

    vec4 noise = texture( uNoise, uv );

    vec4 colorFinal = colorGradientMap( noise, uGradientMap, uIntensity );
    colorFinal = ( banding ) ? colorBanding( colorFinal, uBands, 0 ) : colorFinal;


    gl_FragColor = colorFinal;

    #include <tonemapping_fragment>
    #include <colorspace_fragment>

}
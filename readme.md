# gl-util [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Set of practical functions for webgl.

[![npm install gl-util](https://nodei.co/npm/gl-util.png?mini=true)](https://npmjs.org/package/gl-util/)


### `program(gl, program?)`
### `program(gl, vertSource, fragSource)`

Get/set active program or create new program from vertex and fragment sources. The _WebGLProgram_ instance is returned.

### `uniform(gl, name?, data?, program?)`
### `uniform(gl, {name: data, ...}, program?)`

Get/set uniform or multiple uniforms. Returns object with uniform parameters: `{name, location, data, type}`. Uniforms are stored per-program instance, so to make sure right program is active before updating uniforms a `program` can be passed as the last argument.

### `texture(gl, name?, data|parameters?, program?)`
### `texture(gl, {name: data|parameters, ...}, program?)`

Set texture[s] data or parameters:

| Name | Meaning |
|---|---|
| `data` | Data passed to texture. Can be array, typed array, image, canvas or string denoting the URL of image to load. |
| `index` | Texture unit number, if undefined - calculated automatically. |
| `filter` | Sets texture scaling for both min and mag. Can be defined as two separate properties `minFilter` and `magFilter`. By default `gl.LINEAR`. |
| `wrap` | Defines texture tiling vertically and horizontally. Can be defined precisely as `wrapS` and `wrapT`. By default `gl.CLAMP_TO_EDGE`, can be `gl.MIRRORED_REPEAT` or `gl.`. |
| `width` | In pixels |
| `height` | In pixels |
| `format` | `gl.ALPHA`, `gl.RGB`, `gl.RGBA` (default), `gl.LUMINANCE`, `gl.LUMINANCE_ALPHA`, `gl.DEPTH_COMPONENT`, `gl.DEPTH_STENCIL`, [etc](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D) |
| `type` | `gl.UNSIGNED_BYTE`, can be `gl.FLOAT` with proper extension enabled |
| `level` | `0`, mipmap level. |

Returns object with texture properties `{data, index, location, minFilter, magFilter, wrapS, wrapT, width, height, format, type, texture}`.

### `attribute(gl, name?, data|parameters?, program?)`
### `attribute(gl, {name: data|parameters, ...}, program?)`

Set attribute[s] data or parameters:

| Name | Default | Meaning |
|---|---|---|
| `data` | `null` | Data for the attribute, can be array or typed array |
| `size` | `2` | Number of data items per vertex |
| `stride` | `0` | Offset in bytes between the beginning of consecutive vertex attributes. |
| `offset` | `0` | Offset in bytes of the first component in the data. Must be a multiple of type. |
| `type` | `gl.FLOAT` | Data type of each component in the `data` array. Must be one of: `gl.BYTE`, `gl.UNSIGNED_BYTE`, `gl.SHORT`, `gl.UNSIGNED_SHORT`, `gl.FLOAT`. |
| `usage` | `gl.STATIC_DRAW` | Mode of draw: `gl.STATIC_DRAW` (rare changes), `gl.DYNAMIC_DRAW` (frequent changes) or `gl.STREAM_DRAW` (frequent updates) |
| `normalized` | `false` | If fixed-point data values should be normalized or are to converted to fixed point values when accessed. |
| `index` | `0` | Attribute unit number, detected automatically if omitted. |
| `target` | `gl.ARRAY_BUFFER` | |
| `buffer` | `null` | WebGLBuffer to use for attribute |

Returns attribute properties `{data, size, stride, offset, usage, type, normalized, index, target, buffer}`.

## Motivation

There are [regl](https://github.com/regl-project/regl) and other [stack.gl](https://github.com/stackgl/) components like _gl-texture_, _gl-shader_ etc, so why bother?

Because their API may give hard time remembering, same as pure webgl methods. Also _gl-utils_ do not supersede webgl API, so that allows for debugging pure webgl for a moment if one need to. Also if one need minimalistic webgl setup it may be better to opt for a couple of functions over relatively massive stack.gl components.

_gl-util_ is like functions from any webgl tutorial. Tiny, handy and already familiar, so.

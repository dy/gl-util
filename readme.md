# gl-util [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Set of practical functions for webgl.

[![npm install gl-util](https://nodei.co/npm/gl-util.png?mini=true)](https://npmjs.org/package/gl-util/)


### `program(gl, vertSource|program?, fragSource?)`

Create program from vertex and fragment sources, make it active. Return _WebGLProgram_ instance.

### `uniform(gl, name, data?)`, `uniform(gl, {name: data, ...})`

Set uniform[s] for the webgl context, returns object with uniform parameters: `{name, location, data, type}`.

### `texture(gl, name, data|parameters?)`, `texture(gl, {name: data|parameters, ...})`

Set texture[s] data or parameters:

| Name | Default | Meaning |
|---|---|---|
| `data` | [0, 1, 0, 1] | |
| `index` | 1 | |
| `minFilter` | gl.LINEAR | |
| `magFilter` | gl.NEAREST | |
| `filter` | gl.LINEAR | |
| `wrapS` | gl.CLAMP_TO_EDGE | |
| `wrapT` | gl.MIRRORED_REPEAT | |
| `wrap` | gl.MIRRORED_REPEAT | |
| `width` | 1 | |
| `height` | 1 | |
| `format` | gl.RGBA | |
| `type` | gl.FLOAT or gl.UNSIGNED_BYTE | |

Returns full texture properties `{}`.

### `attribute(gl, name, data|parameters?)`, `attribute(gl, {name: data|parameters, ...})`

Set data or parameters for attribute[s]:

| Name | Default | Meaning |
|---|---|---|
| `data` | `null` | Data for the attribute, can be array or typed array |
| `size` | `2` | Number of data items per vertex |
| `stride` | `0` | |
| `offset` | `0` | |
| `usage` | `gl.STATIC_DRAW` | Mode of draw: `gl.STATIC_DRAW` (rare changes), `gl.DYNAMIC_DRAW` (frequent changes) or `gl.STREAM_DRAW` (frequent updates) |
| `type` | `gl.FLOAT` | |
| `normalized` | `false` | |
| `index` | `0` | |
| `target` | `gl.ARRAY_BUFFER` | |
| `buffer` | `null` | WebGLBuffer to use for attribute |

Returns created attribute properties `{data, size, stride, offset, usage, type, normalized, index, target, buffer}`



## Motivation

There are [regl](https://github.com/regl-project/regl), [stack.gl](https://github.com/stackgl/) and other assorted libs, so why bother?

Because their APIs are difficult to remember, same as vanilla webgl. Also they supersede native API, so that if one would like to debug vanilla webgl for a moment it would be utterly impossible. Also they tend to be relatively massive.

_gl-util_ is like the functions created in any webgl tutorial. It is tiny, handy and familiar, so...

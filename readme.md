# gl-util [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Set of small practical and familiar functions for WebGL that you end up doing anyways.

[![npm install gl-util](https://nodei.co/npm/gl-util.png?mini=true)](https://npmjs.org/package/gl-util/)

```js
import {context, program, attribute, uniform} from 'gl-util'

let gl = context(canvas)

let prog = program(gl, `
	precision mediump float;

	attribute vec2 position;

	void main() {
		gl_Position = vec4(position * 2. - 1., 0, 1);
	}
`, `
	precision mediump float;

	uniform vec4 color;

	void main () {
		gl_FragColor = color;
	}
`);
attribute(prog, {position: [0,0, 1,0, 0,1]});
uniform(prog, {color: [1, .2, 0, 1.]});

gl.drawArrays(gl.TRIANGLES, 0, 3);
```

## API

### `context(canvas, options?)`

Create or get WebGL context for a canvas element, possibly based on options.

| Option | Meaning |
|---|---|
| `width` | If specified, will set the canvas width. |
| `height` | If specified, will set the canvas height. |
| `pixelRatio` | Multiplier for `width` and `height`. |
| `attributes` | Attributes object. Available attributes: `alpha`, `depth`, `stencil`, `antialias`, `premultipliedAlpha`, `preserveDrawingBuffer` and `failIfMajorPerformanceCaveat`. |

```js
import {context} from 'gl-util'

// create canvas element in the document.body and retrieve context for it
let gl = context(canvas, {
	attributes: {
		antialias: true
	}
})
```

### `prog = program(gl, prog|vert?, frag?)`

Set active program or create a new program from vertex and fragment sources. Programs are cached for the context by source. The _WebGLProgram_ instance is returned.

```js
import {program} from 'gl-util'

// create and set program
let prog = program(gl, `
	precision mediump float;

	attribute vec2 position;

	void main() {
		gl_Position = vec4(position * 2. - 1., 0, 1);
	}
`, `
	precision mediump float;

	uniform sampler2D image;
	uniform vec2 shape;
	uniform float x;

	void main () {
		gl_FragColor = texture2D(image, gl_FragCoord.xy / shape);
	}
`)

// set active program
program(gl, prog)
```

### `unif = uniform(gl|program, uniforms)`

Get/set uniforms. Returns an object with uniform parameters: `{name, location, data, type}`. Uniforms are stored per-program instance.

```js
import {uniform} from 'gl-util'

let {color: {name, location, data, type}} = uniform(gl, {color: [1, .2, 0, 1]});
```

### `txt = texture(gl, textures)`

Set textures data or parameters:

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

```js
import {texture} from 'gl-util'

let {image: {width, height}} = texture(gl, {image: './picture.gif'});
```

### `attr = attribute(gl, attributes)`

Set attribute data or parameters:

| Name | Default | Meaning |
|---|---|---|
| `data` | `null` | Data for the attribute, can be array, typed array or array buffer |
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

```js
import {attribute} from 'gl-util'

let { position: { data, size, stride, offset, usage, type, normalized, index, target, buffer } }
	= attribute(gl, {position: [0,0,1,0,0,1]});
```

### `clear(gl, options?)`

Clear the viewport.

Name | Default | Meaning
---|---|---
`depth` | `true` | Clear depth buffer
`stencil` | `true` | Clear stencil buffer
`viewport` | `null` | Apply viewport. An object `{x,y,width,height}`

## Motivation

There is [regl](https://github.com/regl-project/regl), [stack.gl](https://github.com/stackgl/) and many other WegGL components or frameworks, why gl-util?

* WebGL frameworks API is usually difficult to remember, not much better than pure WebGL, although _regl_ does a great job. _gl-util_ is like functions from any WebGL tutorial - tiny, handy and already familiar.
* _gl-util_ does not supersede WebGL API - that allows for debugging pure WebGL at any moment.
* _gl-util_ is tiny - if one needs minimalistic WebGL setup it may be better to opt for a couple of functions than massive stack.gl components or regl (70kb+).
* regl API may be cumbersome for organizing components


## License

(c) 2018 Dmitry Iv. MIT License


so

const gl = require('webgl-context')()
const util = require('./')

document.body.appendChild(gl.canvas);

let p1 = util.program(gl, `
	precision mediump float;

	attribute vec2 position;

	void main() {
		gl_Position = vec4(position * 2. - 1., 0., 1.);
	}
`, `
	precision mediump float;

	uniform vec4 color;

	void main () {
		gl_FragColor = color;
	}
`);

let p2 = util.program(gl, `
	precision mediump float;

	attribute vec3 position;

	void main() {
		gl_Position = vec4(position * 2. - 1., 1.);
	}
`, `
	precision mediump float;

	uniform vec3 color;

	void main () {
		gl_FragColor = vec4(color, 1.);
	}
` )

let p3 = util.program(gl, `
	precision mediump float;

	attribute vec2 position;

	void main() {
		gl_Position = vec4(position * 2. - 1., 0., 1.);
	}
`, `
	precision mediump float;

	uniform sampler2D color;
	uniform vec4 viewport;
	uniform float x;

	void main () {
		vec2 coord = (gl_FragCoord.xy - viewport.xy) / viewport.zw;
		gl_FragColor = texture2D(color, coord);
	}
`)


util.program(gl, p1);
util.attribute(gl, 'position', {data: [0,0,1,0,0,1]});
util.uniform(gl, 'color', [1, .2, 0, 1.]);
gl.drawArrays(gl.TRIANGLES, 0, 3);

setTimeout(() => {
	util.program(gl, p2);
	util.attribute(gl, 'position', {data: [0,0,0,.5,0,0,0,.5,0]});
	util.uniform(gl, 'color', [.8, .9, 0])
	gl.drawArrays(gl.TRIANGLES, 0, 3);

	setTimeout(() => {
		util.program(gl, p3);
		util.uniform(gl, 'x', 1);
		util.attribute(gl, 'position', {data: [0,0,1,0,0,1]});
		util.texture(gl, 'color', './texture.gif');
		util.uniform(gl, 'viewport', [0,0,gl.drawingBufferWidth, gl.drawingBufferHeight]);
		setTimeout(() => {
			gl.drawArrays(gl.TRIANGLES, 0, 3);
		}, 100)
	}, 500)
}, 500);

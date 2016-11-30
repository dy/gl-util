const gl = require('webgl-context')()
const util = require('./')


document.body.appendChild(gl.canvas);

util.program(gl, `
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


util.attribute(gl, 'position', {data: [0,0,1,0,0,1], size: 2});
util.uniform(gl, 'color', [1, .2, 0, 1.]);
gl.drawArrays(gl.TRIANGLES, 0, 3);


setTimeout(function () {
	util.attribute(gl, 'position', {data: [0,0,.5,0,0,.5], size: 2});
	util.uniform(gl, 'color', [1, .8, 0, 1.]);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}, 1000);

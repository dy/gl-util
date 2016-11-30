/* @module gl-util/unifrom */

'use strict'

const isPlainObject = require('is-plain-obj');
const isInt = require('number-is-integer');
const extend = require('object-assign');


let uniformsCache = new WeakMap();

module.exports = function setUniform (gl, name, options) {
	if (!gl) throw Error('WebGL context is not provided');

	//object with uniforms passed
	if (name && typeof name != 'string') {
		let result = {};
		let uniforms = name;

		for (let name in uniforms) {
			result[name] = setUniform(gl, name, uniforms[name]);
		}

		return result;
	}

	let program = gl.getParameter(gl.CURRENT_PROGRAM);
	if (!program) throw Error('Context has no active program');

	let uniforms = uniformsCache.has(gl) ? uniformsCache.get(gl) : uniformsCache.set(gl, {}).get(gl);

	//return all uniforms if no name provided
	if (!name) return uniforms;

	let uniform = uniforms[name];

	//autoinit uniform(s)
	if (!uniform) {
		let count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

		for (var i=0; i < count; ++i) {
			let info = gl.getActiveUniform(program, i);
			if (!info) continue;
			//ignore textures
			if (info.type === gl.SAMPLER_2D || info.type === gl.SAMPLER_CUBE) {
			}
			else {
				uniforms[name] = {name: info.name, type: info.type, data: null}
			}
		}

		if (!uniforms[name]) uniforms[name] = {name: name, data: null, type: null}

		uniform = uniforms[name];
	}

	//detect location
	if (uniform.location == null) {
		uniform.location = gl.getUniformLocation(program, name);
	}

	//if no options passed - just return known uniform info
	if (options == null) return uniform;

	if (!isPlainObject(options)) options = {data: options};

	extend(uniform, options);

	//detect type
	if (uniform.type == null && uniform.data) {
		if (typeof uniform.data === 'number') {
			if (isInt(uniform.data)) {
				uniform.type = gl.INT;
			}
			else uniform.type = gl.FLOAT;
		}

		else if (uniform.data.length === 16) {
			uniform.type = gl.FLOAT_MAT4;
		}
		else if (uniform.data.length === 9) {
			uniform.type = gl.FLOAT_MAT3;
		}
		else if (uniform.data.length <= 4 ) {
			if (uniform.data instanceof Float32Array) {
				uniform.type = gl.FLOAT_VEC2 + (uniform.data.length-2);
			}
			else if (ArrayBuffer.isView(uniform.data)) {
				uniform.type = gl.INT_VEC2 + (uniform.data.length-2);
			}
			else if (Array.isArray(uniform.data)) {
				if (uniform.data.every(isInt)) {
					uniform.type = gl.INT_VEC2 + (uniform.data.length-2);
				}
				else {
					uniform.type = gl.FLOAT_VEC2 + (uniform.data.length-2);
				}
			}
		}
	}

	//make sure data is typed array
	if (Array.isArray(uniform.data)) {
		switch (uniform.type) {
			case gl.INT_VEC2:
			case gl.INT_VEC3:
			case gl.INT_VEC4:
				uniform.data = new Int32Array(uniform.data);
				break;
			default:
				uniform.data = new Float32Array(uniform.data);
		}
	}

	//put data to shader
	if (uniform.location && uniform.data) {
		switch (uniform.type) {
			case gl.FLOAT_VEC4:
			case gl.FLOAT_MAT2:
				gl.uniform4fv(uniform.location, uniform.data);
				break;
			case gl.INT_VEC4:
				gl.uniform4iv(uniform.location, uniform.data);
				break;
			case gl.FLOAT_VEC3:
				gl.uniform3fv(uniform.location, uniform.data);
				break;
			case gl.INT_VEC3:
				gl.uniform3iv(uniform.location, uniform.data);
				break;
			case gl.FLOAT_VEC2:
				gl.uniform2fv(uniform.location, uniform.data);
				break;
			case gl.INT_VEC2:
				gl.uniform2iv(uniform.location, uniform.data);
				break;
			case gl.FLOAT:
				gl.uniform2f(uniform.location, uniform.data);
				break;
			case gl.INT:
				gl.uniform2i(uniform.location, uniform.data);
				break;
		}
	}

	return uniform;
}

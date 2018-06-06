/** @module  gl-util/context */
'use strict'

var pick = require('pick-by-alias')

module.exports = function setContext (o) {
	if (!o) o = {}

	// HTMLCanvasElement
	if (isCanvas(o)) {
		o = {container: o}
	}
	// HTMLElement
	else if (isElement(o)) {
		o = {container: o}
	}
	// WebGLContext
	else if (isContext(o)) {
		o = {gl: o}
	}
	// options object
	else {
		o = pick(o, {
			container: 'container target element el canvas holder parent parentNode wrapper use ref root node',
			gl: 'gl context webgl glContext',
			attrs: 'attributes attrs contextAttributes',
			pixelRatio: 'pixelRatio pxRatio px ratio pxratio pixelratio'
		}, true)
	}

	if (!o.pixelRatio) o.pixelRatio = window.pixelRatio || 1

	// make sure there is container and canvas
	if (o.gl) {
		if (!o.container) o.container = o.gl.canvas
	}

	if (o.container) {
		if (typeof o.container === 'string') {
			let c = document.querySelector(o.container)
			if (!o.container) throw Error(`Element '${o.container}' is not found`)
			o.container = c
		}
		if (isCanvas(o.container)) {
			o.canvas = o.container
			o.container = o.canvas.parentNode
		}
		else {
			o.canvas = document.createElement('canvas')
			o.container.appendChild(o.canvas)
		}
	}
	else {
		o.container = document.body || document.documentElement
		o.canvas = document.createElement('canvas')
		o.container.appendChild(o.canvas)
	}

	// resize canvas
	if (o.container != document.body) {
		var bounds = o.container.getBoundingClientRect()
		o.canvas.width = o.width || (bounds.right - bounds.left)
		o.canvas.height = o.height || (bounds.bottom - bounds.top)
	}
	else {
		if (!document.body.style.width) o.canvas.width = o.pixelRatio * window.innerWidth
		if (!document.body.style.height) o.canvas.height = o.pixelRatio * window.innerHeight
	}

	// make sure there is context
	if (!o.gl) {
		try {
			o.gl = o.canvas.getContext('webgl', o.attrs)
		} catch (e) {
			try {
				o.gl = o.canvas.getContext('experimental-webgl', o.attrs)
			}
			catch (e) {
				o.gl = o.canvas.getContext('webgl-experimental', o.attrs)
			}
		}
	}

	return o.gl
}



function isCanvas (e) {
	return typeof e.getContext === 'function'
		&& 'width' in e
		&& 'height' in e
}

function isElement (e) {
	return typeof e.nodeName === 'string' &&
		typeof e.appendChild === 'function' &&
		typeof e.getBoundingClientRect === 'function'
}

function isContext (e) {
	return typeof e.drawArrays === 'function' ||
		typeof e.drawElements === 'function'
}

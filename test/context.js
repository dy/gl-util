'use strict'

let t = require('tape')
let context = require('../context')

t('context over context', t => {
	let gl = context()

	t.equal(gl, context(gl))

	t.end()
})

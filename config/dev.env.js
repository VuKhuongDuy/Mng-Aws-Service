'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AWS_KEY: 'dfaksjdfhakjsdhfakshdf'
  // SERVERHOST: '"http://back-end:3000"'
})


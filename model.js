'use strict'

const Freezer = require('freezer-js')

module.exports = function (handlers)
{
  let state = {}
  
  Object.keys(handlers).forEach((k) => 
  {
    let handler = handlers[k]
    state[k] = handler.initial_state()
    handler.get = () => this.freezer.get()[k]
    handler.set = (v) => this.freezer.get().set(k, v)
    this[k] = handler
  })
  
  this.freezer = new Freezer(state, { live: true, mutable: true })
  
  this.state = () => this.freezer.get()
}
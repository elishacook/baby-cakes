'use strict'

function Thunk (get_state, render)
{
  this.state = get_state()
  this.wrapped_render = render
}

Thunk.prototype.type = 'Thunk'

Thunk.prototype.render = function (prev)
{
  const prev_state = prev ? prev.state : null
  
  if (prev_state && this.state_equals(prev_state))
  {
    return prev.vnode
  }
  else
  {
    return this.wrapped_render(this.state)
  }
}

Thunk.prototype.state_equals = function (other)
{
  const state = this.state
  if (other === state)
  {
    return true
  }
  else
  {
    const keys = new Set(new Array(...Object.keys(other),...Object.keys(state))).values()
    return ![...keys].find((k) => other[k] !== state[k])
  }
}

module.exports = function (get_state, render)
{
  return () => new Thunk(get_state, render)
}
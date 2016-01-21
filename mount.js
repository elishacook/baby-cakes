'use strict'

const diff = require('virtual-dom/diff');
const patch = require('virtual-dom/patch');
const create_element = require('virtual-dom/create-element');

module.exports = function (parent, store, render)
{
  let tree = render()
  let root_node = create_element(tree)
  parent.appendChild(root_node)
  
  const redraw = () =>
  {
    redraw_scheduled = false
    const new_tree = render()
    const patches = diff(tree, new_tree)
    root_node = patch(root_node, patches)
    tree = new_tree
  }
  
  let redraw_scheduled = false
  store.freezer.on('update', function ()
  {
    if (!redraw_scheduled)
    {
      redraw_scheduled = true
      requestAnimationFrame(redraw)
    }
  })
}
#baby-cakes

This is a tiny framework that does little more than glue together [virtual-dom](https://github.com/Matt-Esch/virtual-dom) and [freezer-js](https://github.com/arqex/freezer). What's the point? I wanted:

* Reactive design
* Single, immutable application state
* Fast rendering
* A single import/require

Here's what it looks like:

```js
'use strict'

const babycakes = require('baby-cakes')
const Model = babycakes.Model
const CacheView = babycackes.CacheView
const mount = babycakes.mount
const h = require('virtual-dom/h')

const model = new Model(
{
  tasks: {
  
    initial_state: function ()
    {
      return {
        tasks: [
          { id: 0, summary: 'Do stuff', done: false },
          { id: 1, summary: 'Don\'t do stuff', done: false },
          { id: 2, summary: 'Have a donut', done: false }
        ],
        last_task_id: 3
      }
    },
    
    create: function (summary)
    {
      if (!summary.trim())
      {
        return
      }
      
      var state = this.get()
      state.tasks.push({ id: state.last_task_id, summary: summary.trim(), done: false })
      state.set('last_task_id', state.last_task_id + 1)
    },
    
    complete: function (id)
    {
      this.get().tasks.find((x) => x.id == id).set('done', true)
    }
  }
})

mount(
  document.body,
  model,
  CacheView(
    () => model.state().tasks.tasks,
    (tasks) => h('div.tasks', [
      h('div', [
        h(
          'input',
          {
            type: 'text',
            onkeypress: (e) => {
              if (e.which == 13)
              {
                model.tasks.create(e.target.value)
                e.target.value = ''
              }
            }
          })
      ]),
      h('ul', [
        tasks
          .filter(x => !x.done)
          .map(x => h('li', [
            h('span', x.summary),
            h(
              'button',
              {
                onclick: () => model.tasks.complete(x.id)
              },
              'Done!'
            )
          ]))
      ])
    ])
  )
)
```

This isn't intended to ever be a big community project but perhaps you'll get some use out of the concept.

-- Elisha
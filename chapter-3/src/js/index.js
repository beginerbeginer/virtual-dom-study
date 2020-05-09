import h from './createElement'
import { render, mount } from './render'

const view = h('div', {
  attrs: {
    id: 'app'
  },
  children: [
    h('p', {
      attrs: {},
      children: ['仮想DOMの学習スタート！']
    })
  ]
})

const $app = render(view)

console.log('*****************')
console.log($app)
console.log('*****************')
mount($app, document.getElementById('app'))

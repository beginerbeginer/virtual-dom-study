import h from './vdom/createElement'
import { render } from './vdom/render'

const view = h('p', {
  attrs: {},
  children: ['仮想DOMの学習スタート！', 'このように仮想DOMを作ることができる。', '仮想DOMは、DOMとは違うものである。']
})

const $app = render(view)
const el = document.getElementById('app')
el.appendChild($app)

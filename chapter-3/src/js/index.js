import h from './vdom/createElement'
import { render } from './vdom/render'

const view = h('p', {
  attrs: {},
  children: ['仮想DOMの学習スタート！', 'このように仮想DOMを作ることができる。', 222222]
})

// 仮想DOMであるviewをrender関数に渡しリアルDOMを作成
const $app = render(view)
const el = document.getElementById('app')
el.appendChild($app)

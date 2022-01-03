import { isEventAttr } from './utils'

const setAttrs = (target, attrs) => {
  for (const attr in attrs) {
    if (isEventAttr(attr)) {
      target.addEventListener(attr.slice(2), attrs[attr])
    } else {
      target.setAttribute(attr, attrs[attr])
    }
  }
}
// 渡された要素のtagNameを元にリアルDOM要素を作成 (createElement) する。
function renderElement({ tagName, attrs, children }) {
  const $el = document.createElement(tagName)

  setAttrs($el, attrs)

  for (const child of children) {
    $el.appendChild(render(child))
  }

  return $el
}

// 渡された要素が文字列か数字かを判定する
export function render(vNode) {
  // 文字列または数字の場合はそのまま返す
  if (typeof vNode === 'string') {
    // 文字列をDOMに変換して返す
    return document.createTextNode(vNode)
  }
  // 文字列でない場合 (オブジェクトの場合)renderElement関数が呼ばれる
  return renderElement(vNode)
}
// 渡された要素のtagNameを元にリアルDOM要素を作成 (createElement) する。
function renderElement({ tagName, attrs, children }) {
  // 仮想DOMをリアルDOMに変換する
  // tagNameはpなのでリアルDOMでは<p></p>に変換される
  const $el = document.createElement(tagName)
  console.log('$el', $el)
  /*
  <p>
    "仮想DOMの学習スタート！"
    "このように仮想DOMを作ることができる。"
    "仮想DOMは、DOMとは違うものである。"
  </p>
  */

  // 仮想DOMに属性を追加する
  // 作成されたDOM要素$elにclass、id、typeなどの属性を付与する
  for (const [k, v] of Object.entries(attrs)) {
    $el.setAttribute(k, v)
  }
  // 仮想DOMに子要素を追加する(childrenは配列)
  for (const child of children) {
    $el.appendChild(render(child))
  }
  // リアルDOMを返す
  return $el
}

// 渡された要素が文字列か数字かを判定する
export function render(vNode) {
  // 文字列または数字の場合はそのまま返す
  if (typeof vNode === 'string' || typeof vNode === 'number') {
    // 文字列をDOMに変換して返す
    return document.createTextNode(vNode)
  }
  // 文字列でない場合 (オブジェクトの場合)renderElement関数が呼ばれる
  return renderElement(vNode)
}

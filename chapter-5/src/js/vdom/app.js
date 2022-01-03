import { render } from './render'

// 変数appを定義しroot,initialState,viewを受け取るようにする
export const app = ({ root, initialState, view }) => {

  // appendChildで追加したいリアルDOMを取得する
  const $el = document.querySelector(root)

  // リアルDOMに反映する仮想DOM用の変数newNodeを定義
  let newNode = view(initialState)

  // newNodeを使って作成したリアルDOMをrootに反映するrenderDOMメソッドを実行
  const renderDOM = function () {
    $el.appendChild(render(newNode))
  }

  renderDOM()
}

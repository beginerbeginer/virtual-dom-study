export default (tagName, { attrs = {}, children = [] }) => {
  const vElement = Object.create(null)
  // h()に渡された引数をtagName, attrs, children を持っている JSのオブジェクトに変換
  //vElementとは? →仮想DOMの要素を表すオブジェクト
  Object.assign(vElement, {
    tagName,
    attrs,
    children
  })

  return vElement
}

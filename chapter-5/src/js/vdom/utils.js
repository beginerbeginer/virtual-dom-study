// 渡されたattrsがonClickやonChengeなど先頭にZ"on"が着くかでイベントかどうか判定
// testメソッドを使って真偽値を返す
export const isEventAttr = (attr) => {
  return /^on/.test(attr) //イベント名が"on"で始まる場合true（onClickなど）
}

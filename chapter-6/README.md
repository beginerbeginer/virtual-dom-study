# 6 章

actions を作る
follow するアクションを作る
app に渡す
dispatchAction を定義 constructor に定義
dispatchAction の実装

view.js の作成
updateElements の実装
isChanged の newNode と oldNode を比較する
updateElements で再帰的に処理をして DOM に反映する

appRender の中身を書き換え
oldNode と newNode を updateElements に渡す

view に action を渡す

accountItem コンポーネントにも action と state を渡す

ブラウザで確認

フォローボタンを連打すると動作しなくなる
render を遅らせる
delayRender の実装

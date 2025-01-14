import h from './vdom/createElement'
import { render } from './vdom/render'

// アカウント一覧のデータを元にINITIAL_STATEを作成
// 変更不可であることを明示的にするために全て大文字にする
const INITIAL_STATE = {
  accounts: [
    {
      id: 1,
      name: 'リオネル・メッシ',
      team: 'FCバルセロナ',
      description:
        'アルゼンチンサンタフェ州ロサリオ出身のイタリア系アルゼンチン人サッカー選手。リーガ・エスパニョーラ・FCバルセロナ所属。アルゼンチン代表。ポジションはフォワード (wikipedia)',
      isFollow: false
    },
    {
      id: 2,
      name: 'クリスティアーノ・ロナウド',
      team: 'Juventus',
      description:
        'ポルトガル・フンシャル出身のサッカー選手。セリエA・ユヴェントスFC所属。ポルトガル代表。ポジションはフォワード (wikipedia)',
      isFollow: true
    },
    {
      id: 3,
      name: 'ネイマール',
      team: 'パリサンジェルマン',
      description:
        'ブラジル・サンパウロ州モジ・ダス・クルーゼス出身のサッカー選手。ブラジル代表。リーグ・アン・パリ・サンジェルマンFC所属。ポジションはフォワード (wikipedia)',
      isFollow: false
    }
  ]
}

// viewを書き換えて、アカウント一覧が表示されるようにする
const accountItem = (account) => {
  return h('div', {
    attrs: {},
    children: [
      h('div', {
        attrs: {
          class: 'account__summary'
        },
        children: [
          h('div', {
            attrs: {},
            children: [
              h('p', {
                attrs: {
                  class: 'account__name'
                },
                children: [account.name]
              }),
              h('p', {
                attrs: {
                  class: 'account__team'
                },
                children: [account.team]
              })
            ]
          }),
          h('div', {
            attrs: {},
            children: [
              h('button', {
                attrs: {
                  type: 'button',
                  class: `followBtn ${account.isFollow ? 'isFollow' : ''}`
                },
                children: [account.isFollow ? 'フォロー中' : 'フォローする']
              })
            ]
          })
        ]
      }),
      h('p', {
        attrs: {
          class: 'account__description'
        },
        children: [account.description]
      })
    ]
  })
}

// viewにstateを渡せるよう関数に変更する
const view = (props) =>
  h('ul', {
    attrs: {
      class: 'accountList'
    },
    children: props.accounts.map((e) => {
      return h('li', {
        attrs: {
          class: 'accountList__item'
        },
        children: [accountItem(e)]
      })
    })
  })

// renderをする仮想DOMであるviewにINITIAL_STATEを渡す
const $app = render(view(INITIAL_STATE))
const el = document.getElementById('app')
el.appendChild($app)

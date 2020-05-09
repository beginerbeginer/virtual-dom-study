import h from './createElement'
import { render, mount } from './render'

const state = {
  accounts: [
    {
      id: 1,
      name: 'リオネル・メッシ',
      team: 'FCバルセロナ',
      isFollow: false
    },
    {
      id: 2,
      name: 'クリスティアーノ・ロナウド',
      team: 'Juventus',
      isFollow: true
    },
    {
      id: 3,
      name: 'ネイマール',
      team: 'パリサンジェルマン',
      isFollow: false
    }
  ]
}

const accountItem = (account) => {
  return h('li', {
    attrs: {},
    children: [
      h('div', {
        attrs: {},
        children: [
          h('h3', {
            attrs: {},
            children: [account.name]
          }),
          h('p', {
            attrs: {},
            children: [account.team]
          })
        ]
      }),
      h('button', {
        attrs: {
          type: 'button'
        },
        children: [account.isFollow ? 'フォロー中' : 'フォローする']
      })
    ]
  })
}

const view = (state) =>
  h('div', {
    attrs: {
      id: 'app'
    },
    children: [
      h('ul', {
        attrs: {},
        children: state.accounts.map((e) => {
          return h('li', {
            attrs: {},
            children: [accountItem(e)]
          })
        })
      })
    ]
  })

const $app = render(view(state))
mount($app, document.getElementById('app'))

import h from './createElement'
import { App } from './app'

const state = {
  accounts: [
    {
      id: 1,
      name: 'リオネル・メッシ',
      team: 'FCバルセロナ',
      description:
        '現在はフリーランスとして活動中。TypeScript + Reactでの開発をメインにお仕事いただいてます。フロントエンドネタを中心に呟きます。GraphQL | Node.js | GatsbyJs | Next.js',
      isFollow: false
    },
    {
      id: 2,
      name: 'クリスティアーノ・ロナウド',
      team: 'Juventus',
      description:
        '現在はフリーランスとして活動中。TypeScript + Reactでの開発をメインにお仕事いただいてます。フロントエンドネタを中心に呟きます。GraphQL | Node.js | GatsbyJs | Next.js',
      isFollow: true
    },
    {
      id: 3,
      name: 'ネイマール',
      team: 'パリサンジェルマン',
      description:
        '現在はフリーランスとして活動中。TypeScript + Reactでの開発をメインにお仕事いただいてます。フロントエンドネタを中心に呟きます。GraphQL | Node.js | GatsbyJs | Next.js',
      isFollow: false
    }
  ]
}

const actions = {
  follow(state, id) {
    const accounts = state.accounts.map((f) => {
      if (f.id === id) {
        return { ...f, isFollow: !f.isFollow }
      } else {
        return f
      }
    })

    return { ...state, accounts }
  }
}

const accountItem = (account, action, state) => {
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
                  class: `followBtn ${account.isFollow ? 'isFollow' : ''}`,
                  onclick: () => {
                    action.follow(state, account.id)
                  }
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

const view = (state, action) =>
  h('ul', {
    attrs: {
      class: 'accountList'
    },
    children: state.accounts.map((e) => {
      return h('li', {
        attrs: {
          class: 'accountList__item'
        },
        children: [accountItem(e, action, state)]
      })
    })
  })

new App({
  el: '#app',
  view,
  state,
  actions
})

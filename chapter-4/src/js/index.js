import h from './createElement'
import { render, mount } from './render'

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

const view = (state) =>
  h('div', {
    attrs: {
      id: 'app'
    },
    children: [
      h('ul', {
        attrs: {
          class: 'accountList'
        },
        children: state.accounts.map((e) => {
          return h('li', {
            attrs: {
              class: 'accountList__item'
            },
            children: [accountItem(e)]
          })
        })
      })
    ]
  })

const $app = render(view(state))
mount($app, document.getElementById('app'))

import { patch } from './patch'

export const app = ({ root, state, view, actions }) => {
  const $el = document.querySelector(root)
  let newNode
  let oldNode

  const dispatcher = (actions) => {
    const dispatched = {}

    for (const key in actions) {
      const action = actions[key]

      dispatched[key] = (state, option) => {
        action(state, option)
        renderDOM()
      }
    }

    return dispatched
  }

  const dispachedActions = dispatcher(actions)

  const updateNode = () => {
    newNode = view(state, dispachedActions)
  }

  const renderDOM = () => {
    updateNode()
    patch($el, newNode, oldNode)
    oldNode = newNode
  }

  renderDOM()
}

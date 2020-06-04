import { patch } from './patch'
import { dispatcher } from './dispatcher'

export const app = ({ root, state, view, actions }) => {
  const $el = document.querySelector(root)
  let newNode
  let oldNode

  const dispachedActions = dispatcher(actions, () => renderDOM())

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

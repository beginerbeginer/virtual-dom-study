import { updateElements, render } from './view'

export class App {
  constructor(params) {
    this.el = typeof params.el === 'string' ? document.querySelector(params.el) : params.el
    this.view = params.view
    this.state = params.state
    this.actions = this.dispatchAction(params.actions)
    this.newNode = this.view(this.state, this.actions)

    this.resolveNode()
  }

  dispatchAction(actions) {
    const dispatched = {}

    for (const key in actions) {
      const action = actions[key]

      dispatched[key] = (state, option) => {
        this.state = action(state, option)
        this.resolveNode()
      }
    }

    return dispatched
  }

  resolveNode() {
    this.newNode = this.view(this.state, this.actions)
    this.delayRender()
  }

  delayRender() {
    if (!this.isDelay) {
      this.isDelay = true

      setTimeout(this.appRender.bind(this))
    }
  }

  appRender() {
    if (this.oldNode) {
      updateElements(this.el, this.newNode, this.oldNode)
    } else {
      this.el.appendChild(render(this.newNode))
    }

    this.isDelay = false

    this.oldNode = this.newNode
  }
}

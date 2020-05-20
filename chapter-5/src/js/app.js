import { mount, render } from './view'

export class App {
  constructor(params) {
    this.el = typeof params.el === 'string' ? document.querySelector(params.el) : params.el
    this.view = params.view
    this.state = params.state
    this.newNode = this.view(this.state)
    this.resolveNode()
  }

  resolveNode() {
    this.appRender()
  }

  appRender() {
    this.el.appendChild(render(this.newNode))
  }
}

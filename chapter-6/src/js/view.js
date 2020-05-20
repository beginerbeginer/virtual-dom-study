//

import { render } from './render'

function renderElement({ tagName, attrs, children }) {
  const $el = document.createElement(tagName)

  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'onclick') {
      $el.addEventListener('click', v)
    } else {
      $el.setAttribute(k, v)
    }
  }

  for (const child of children) {
    $el.appendChild(render(child))
  }

  return $el
}

export function render(vNode) {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode)
  }
  return renderElement(vNode)
}

function isChanged(node1, node2) {
  return typeof node1 !== typeof node2 || (typeof node1 === 'string' && node1 !== node2) || node1.attrs !== node2.attrs
}

export const updateElements = (parent, newNode, oldNode, index = 0) => {
  if (!oldNode) {
    parent.appendChild(render(newNode))
  }
  if (!newNode) {
    parent.removeChild(parent.childNodes[index])
  }
  if (isChanged(newNode, oldNode)) {
    parent.replaceChild(render(newNode), parent.childNodes[index])
  }
  if (newNode.tagName) {
    const newLength = newNode.children.length
    const oldLength = oldNode.children.length
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(parent.childNodes[index], newNode.children[i], oldNode.children[i], i)
    }
  }
}

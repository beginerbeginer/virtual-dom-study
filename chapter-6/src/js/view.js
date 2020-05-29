//

const isVNode = (node) => {
  return typeof node !== 'string' && typeof node !== 'number'
}

const isEventAttr = (attr) => {
  return /^on/.test(attr)
}

const setAttributes = (target, attrs) => {
  for (const [k, v] of Object.entries(attrs)) {
    if (isEventAttr(k)) {
      target.addEventListener('click', v)
    } else {
      target.setAttribute(k, v)
    }
  }
}

const updateAttrs = (target, oldAttrs, newAttrs) => {
  for (const [k, v] of Object.entries(oldAttrs)) {
    if (!isEventAttr(k)) {
      target.removeAttribute(k)
    }
  }

  for (const [k, v] of Object.entries(newAttrs)) {
    if (!isEventAttr(k)) {
      target.setAttribute(k, v)
    }
  }
}

function renderElement({ tagName, attrs, children }) {
  const $el = document.createElement(tagName)

  setAttributes($el, attrs)

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

const hasChanged = (a, b) => {
  if (typeof a !== typeof b) {
    return 'Type'
  }

  if (!isVNode(a) && a !== b) {
    return 'Text'
  }

  if (isVNode(a) && isVNode(b)) {
    if (a.tagName !== b.tagName) {
      return 'Node'
    }

    if (JSON.stringify(a.attrs) !== JSON.stringify(b.attrs)) {
      return 'Attr'
    }
  }

  return 'None'
}

export const updateElements = (parent, newNode, oldNode, index = 0) => {
  if (!oldNode) {
    parent.appendChild(render(newNode))
  }
  if (!newNode) {
    parent.removeChild(parent.childNodes[index])
  }
  const changeType = hasChanged(oldNode, newNode)

  switch (changeType) {
    case 'Type':
    case 'Text':
    case 'Node':
      parent.replaceChild(render(newNode), parent.childNodes[index])
      return

    case 'Attr':
      updateAttrs(parent.childNodes[index], oldNode.attrs, newNode.attrs)
      return
  }

  if (newNode.tagName) {
    const newLength = newNode.children.length
    const oldLength = oldNode.children.length
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElements(parent.childNodes[index], newNode.children[i], oldNode.children[i], i)
    }
  }
}

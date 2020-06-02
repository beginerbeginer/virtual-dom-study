//

const isVNode = (node) => {
  return typeof node !== 'string'
}

const isEventAttr = (attr) => {
  return /^on/.test(attr)
}

const setAttrs = (target, attrs) => {
  for (const [k, v] of Object.entries(attrs)) {
    if (isEventAttr(k)) {
      target.addEventListener('click', v)
    } else {
      target.setAttribute(k, v)
    }
  }
}

const updateAttrs = (target, oldAttrs, newAttrs) => {
  for (const [k] of Object.entries(oldAttrs)) {
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

  setAttrs($el, attrs)

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

const hasTextChild = (node) => {
  return node && node.children && node.children.length > 0 && typeof node.children[0] === 'string'
}

const hasChanged = (a, b) => {
  if (typeof a !== typeof b) {
    return 'TYPE'
  }

  if (hasTextChild(a) && hasTextChild(b)) {
    if (b.children[0] !== a.children[0]) {
      return 'TEXT'
    }
  }

  if (isVNode(a) && isVNode(b)) {
    if (a.tagName !== b.tagName) {
      return 'NODE'
    }

    if (JSON.stringify(a.attrs) !== JSON.stringify(b.attrs)) {
      return 'ATTR'
    }
  }

  return 'NONE'
}

export const updateElements = (parent, newNode, oldNode, index = 0) => {
  if (!oldNode) {
    parent.appendChild(render(newNode))
  }
  const target = parent.childNodes[index]
  if (!newNode) {
    parent.removeChild(target)
  }
  const type = hasChanged(oldNode, newNode)

  switch (type) {
    case 'TYPE':
    case 'TEXT':
    case 'NODE':
      parent.replaceChild(render(newNode), target)
      return

    case 'ATTR':
      updateAttrs(target, oldNode.attrs, newNode.attrs)
      return
  }

  if (newNode.tagName) {
    const newLength = newNode.children.length
    const oldLength = oldNode.children.length
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElements(target, newNode.children[i], oldNode.children[i], i)
    }
  }
}

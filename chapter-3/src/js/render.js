function renderElement({ tagName, attrs, children }) {
  const $el = document.createElement(tagName)

  for (const [k, v] of Object.entries(attrs)) {
    $el.setAttribute(k, v)
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

export const mount = ($node, $target) => {
  $target.replaceWith($node)
  return $node
}

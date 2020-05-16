import { render } from './render'

const zip = (xs, ys) => {
  const zipped = []
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]])
  }
  return zipped
}

const updateAttrs = (oldAttrs, newAttrs) => {
  const patches = []

  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push(($node) => {
      if (k === 'onclick') {
        $node.addEventListener('click', v)
      } else {
        $node.setAttribute(k, v)
      }

      return $node
    })
  }

  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push(($node) => {
        $node.removeAttribute(k)
        return $node
      })
    }
  }

  return ($node) => {
    for (const patch of patches) {
      patch($node)
    }
    return $node
  }
}

const updateChildren = (oldVChildren, newVChildren) => {
  const childPatches = []
  oldVChildren.forEach((oldVChild, i) => {
    childPatches.push(updateElement(oldVChild, newVChildren[i]))
  })

  const additionalPatches = []
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push(($node) => {
      $node.appendChild(render(additionalVChild))
      return $node
    })
  }

  return ($parent) => {
    for (const [patch, $child] of zip(childPatches, $parent.childNodes)) {
      patch($child)
    }

    for (const patch of additionalPatches) {
      patch($parent)
    }
    return $parent
  }
}

const updateElement = (oldVTree, newVTree) => {
  const upd = newVTree || oldVTree

  if (upd === undefined) {
    return ($node) => {
      $node.remove()
      return undefined
    }
  }

  if (typeof oldVTree === 'string' || typeof upd === 'string') {
    if (oldVTree !== upd) {
      return ($node) => {
        const $newNode = render(upd)
        $node.replaceWith($newNode)
        return $newNode
      }
    } else {
      return ($node) => $node
    }
  }

  if (oldVTree.tagName !== upd.tagName) {
    return ($node) => {
      const $newNode = render(upd)
      $node.replaceWith($newNode)
      return $newNode
    }
  }

  const patchAttrs = updateAttrs(oldVTree.attrs, upd.attrs)
  const patchChildren = updateChildren(oldVTree.children, upd.children)

  return ($node) => {
    patchAttrs($node)
    patchChildren($node)
    return $node
  }
}

export default updateElement

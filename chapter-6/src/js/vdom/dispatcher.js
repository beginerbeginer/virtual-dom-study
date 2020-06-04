export const dispatcher = (actions, render) => {
  const dispatched = {}

  for (const key in actions) {
    const action = actions[key]

    dispatched[key] = (state, option) => {
      action(state, option)
      render()
    }
  }

  return dispatched
}

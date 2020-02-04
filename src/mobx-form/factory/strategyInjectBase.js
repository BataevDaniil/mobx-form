const strategyInjectBase = form => {
  const keys = Object.keys(form)
  Object.values(form).forEach(field => {
    keys.forEach(key => {
      if (field.hasOwnProperty(key)) {
        field[key] = form[key]
      }
    })
    field.injectedFields()
  })
}

export default strategyInjectBase

import createInstanceBase from './createInstanceBase'
import iteratorBase from './iteratorBase'
import strategyInjectBase from './strategyInjectBase'

const factoryForm = (
  form,
  {
    createInstance = createInstanceBase,
    iterator = iteratorBase,
    strategyInject = strategyInjectBase,
  } = {},
) => {
  // create field`s form
  const instanceIterator = iterator(form)
  let newForm = {}
  let status = instanceIterator.next()
  while (!status.done) {
    status = instanceIterator.next(createInstance(status.value))
  }
  newForm = status.value

  // inject fields
  strategyInject(newForm)

  return {
    form: newForm,
    map: mapName =>
      Object.entries(newForm).reduce((acc, [name, field]) => {
        if (field.constructor[mapName]) {
          acc[field.constructor[mapName].nameField || name] = field.constructor[
            mapName
          ](field.value)
        }
        return acc
      }, {}),
  }
}

export default factoryForm

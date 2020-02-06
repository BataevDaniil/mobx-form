import { AbstractFieldArray } from '../structures'

const iteratorBase = function* recursion(form, newForm = {}) {
  for (const [key, value] of Object.entries(form)) {
    if (AbstractFieldArray.isPrototypeOf(value[0])) {
      const [Field, formArray, ...args] = value
      const newFormArray = []
      for (const f of formArray) {
        newFormArray.push(yield* recursion(f))
      }
      newForm[key] = yield [Field, newFormArray, ...args]
    } else if (!Array.isArray(form[key])) {
      newForm[key] = yield* recursion(form[key])
    } else {
      newForm[key] = yield value
    }
  }
  return newForm
}

export default iteratorBase

import { AbstractFieldArray } from '../structures'

const iteratorBase = function* recursion(form, newForm = {}) {
  for (const [key, value] of Object.entries(form)) {
    const [Field] = value
    if (AbstractFieldArray.isPrototypeOf(Field)) {
      const [Field, formArray, ...args] = value
      const newFormArray = []
      for (const f of formArray) {
        newFormArray.push(yield* recursion(f))
      }
      newForm[key] = yield [Field, newFormArray, ...args]
    } else {
      newForm[key] = yield value
    }
  }
  return newForm
}

export default iteratorBase

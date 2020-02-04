import { when } from './utils'

const lengthLessThen = (
  length,
  message = `Длина должна быть меньше ${length}`,
) => when(errors => [...errors, message])(string => string.length < length)

export default lengthLessThen

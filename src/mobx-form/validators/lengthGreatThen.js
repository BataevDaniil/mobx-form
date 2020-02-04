import { when } from './utils'

const lengthGreatThen = (
  length,
  message = `Длина должна быть больше ${length}`,
) => when(errors => [...errors, message])(string => string.length > length)

export default lengthGreatThen

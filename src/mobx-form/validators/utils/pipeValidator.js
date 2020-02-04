import { pipe } from '../../utils'

const pipeValidator = functions => arg => pipe(functions)([[], arg])[0]

export default pipeValidator

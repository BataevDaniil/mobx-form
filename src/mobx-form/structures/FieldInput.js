import Field from './Field'

class FieldInput extends Field {
  static mapToSetField = event => event.target.value
}

export default FieldInput

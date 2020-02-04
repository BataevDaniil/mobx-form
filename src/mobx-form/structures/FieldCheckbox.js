import Field from './Field'

class FieldCheckbox extends Field {
  static mapToSetField = event => event.target.checked
}

export default FieldCheckbox

import { computed, decorate, observable } from 'mobx'

import AbstractField from './AbstractField'
import { identity } from '../utils'

class Field extends AbstractField {
  _onBlur = () => {
    this.touched = true
  }
  value
  touched = false
  errors = []
  get isValidate() {
    return !this.errors.length
  }
  _validate = value => {
    this.errors = this.constructor.validate(
      this.constructor.mapToSetField(value),
      this,
    )
  }

  onBlurEventListener = new Set([this._onBlur])
  onChangeEventListener = new Set([this._validate])
  onFocusEventListener = new Set()

  injectedFields() {
    this.errors = this.constructor.validate(this.value, this)
  }

  constructor(initialValue) {
    super()
    this.value = initialValue
  }
  static validate = () => []
  static mapToRequest = identity
  static mapToResponse = identity
  static mapToSetField = identity
  static mapToField = identity
}

decorate(Field, {
  value: observable,
  touched: observable,
  errors: observable,
  isValidate: computed,
})

export default Field

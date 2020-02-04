import { decorate, observable } from 'mobx'

import AbstractFieldArray from './AbstractFieldArray'

class FieldArray extends AbstractFieldArray {
  value
  push = field => {
    this.value.push(field)
  }
  pop = () => {
    this.value.pop()
  }
  unshift = () => {
    this.value.unshift()
  }
  move = (startIndex, finishIndex) => {
    const field = this.value[startIndex]
    this.remove(startIndex)
    this.insert(finishIndex, field)
  }
  remove = index => {
    this.value.splice(index, 1)
  }
  replace = (index, field) => {
    this.value[index] = field
  }
  swap = (index1, index2) => {
    ;[this.value[index1], this.value[index2]] = [
      this.value[index2],
      this.value[index1],
    ]
  }
  insert = (index, field) => {
    this.value.splice(index, 0, field)
  }
  constructor(initialValues = []) {
    super()
    this.value = initialValues
  }
}

decorate(FieldArray, {
  value: observable,
})

export default FieldArray

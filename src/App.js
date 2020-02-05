import React from 'react'
import { observer } from 'mobx-react'

import { FieldInput, FieldCheckbox, FieldArray } from './mobx-form/structures'
import { factoryForm } from './mobx-form/factory'
import { lengthGreatThen, lengthLessThen } from './mobx-form/validators'
import { pipeValidator } from './mobx-form/validators/utils'
import { Form, Field } from './mobx-form/components'

class Name1 extends FieldInput {
  name2 = null
  static validate = (value, { name2 }) => {
    if (name2.value) {
      return pipeValidator([lengthLessThen(10), lengthGreatThen(5)])(value)
    }
    return []
  }
  onChangeName2 = () => {
    this.errors = this.constructor.validate(this.value, this)
  }
  injectedFields() {
    super.injectedFields()
    this.name2.onChangeEventListener.add(this.onChangeName2)
  }
}

class Name2 extends FieldCheckbox {}

const form = factoryForm({
  name1: [Name1, ''],
  name2: [Name2, false],
  nameArray: [
    FieldArray,
    [
      {
        n1: [Name2, '123'],
      },
    ],
  ],
})

const Input = observer(({ field: { errors } = {}, ...props }) => {
  return (
    <div>
      <input {...props} />
      {errors.map(error => (
        <div>{error}</div>
      ))}
    </div>
  )
})
const FieldArrayRender = observer(({ path, field: { push, pop, value } }) => {
  return (
    <div>
      {value.map((_, index) => (
        <Field path={form => path(form).value[index].n1} component={Input} />
      ))}
      <button
        onClick={() =>
          push({
            n1: new Name1('123'),
          })
        }
      >
        push
      </button>
      <button onClick={pop}>pop</button>
    </div>
  )
})

const App = () => {
  return (
    <Form form={form.form} onSubmit={event => event.preventDefault()}>
      <Field name="name1" component={Input} />
      <Field name="name2" type="checkbox" component="input" />
      <Field path={form => form.nameArray} component={FieldArrayRender} />
    </Form>
  )
}

export default App

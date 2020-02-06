import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Field, Form } from './../components'
import { factoryForm } from '../factory'
import { FieldArray, FieldInput } from '../structures'

describe('integration test', () => {
  test('<Field/> should emit onChange, onBlur, onFocus define input', () => {
    class FieldInputMy extends FieldInput {
      onChange = jest.fn(event => event.persist())
      onBlur = jest.fn(event => event.persist())
      onFocus = jest.fn(event => event.persist())
      constructor(...args) {
        super(...args)
        this.onChangeEventListener.add(this.onChange)
        this.onBlurEventListener.add(this.onBlur)
        this.onFocusEventListener.add(this.onFocus)
      }
    }

    const { form } = factoryForm({
      name1: [FieldInputMy, ''],
      name2: [FieldInputMy, ''],
    })

    const { getByTestId } = render(
      <Form form={form}>
        <Field name="name1" component="input" data-testid="input1" />
        <Field name="name2" component="input" data-testid="input2" />
      </Form>,
    )

    const event = { target: { value: 'value' } }
    fireEvent.change(getByTestId('input1'), event)
    fireEvent.focus(getByTestId('input1'), event)
    fireEvent.blur(getByTestId('input1'), event)

    expect(form.name1.onChange).toHaveBeenCalled()
    expect(form.name1.onBlur).toHaveBeenCalled()
    expect(form.name1.onFocus).toHaveBeenCalled()

    expect(form.name2.onChange).not.toHaveBeenCalled()
    expect(form.name2.onBlur).not.toHaveBeenCalled()
    expect(form.name2.onFocus).not.toHaveBeenCalled()
  })

  test('<Field/> should get field by any path', () => {
    const { form } = factoryForm({
      path1: { name1: [FieldInput, 'path1.name1'] },
      name2: [FieldInput, 'name2'],
      array1: [
        FieldArray,
        [
          {
            name3: [FieldInput, 'array1.value[0].name3'],
          },
        ],
      ],
    })

    const { getByTestId } = render(
      <Form form={form}>
        <Field
          path={form => form.path1.name1}
          component="input"
          data-testid="input1"
        />
        <Field
          path={form => form.name2}
          component="input"
          data-testid="input2"
        />
        <Field
          path={form => form.array1.value[0].name3}
          component="input"
          data-testid="input3"
        />
      </Form>,
    )

    expect(getByTestId('input1').value).toBe('path1.name1')
    expect(getByTestId('input2').value).toBe('name2')
    expect(getByTestId('input3').value).toBe('array1.value[0].name3')
  })

  test('<Field/> should set value object when emit onChange and map value', () => {
    class FieldInputMy extends FieldInput {
      static mapToSetField = value => super.mapToSetField(value) + 'AddYetValue'
    }

    const { form } = factoryForm({
      name: [FieldInputMy, ''],
    })

    const { getByTestId } = render(
      <Form form={form}>
        <Field name="name" component="input" data-testid="input" />
      </Form>,
    )
    expect(getByTestId('input').value).toBe('')

    const event = { target: { value: 'value' } }
    fireEvent.change(getByTestId('input'), event)

    expect(getByTestId('input').value).toBe('valueAddYetValue')
  })

  test('touched should be === true when emit first onBlur', () => {
    const { form } = factoryForm({
      name: [FieldInput, ''],
    })

    const { getByTestId } = render(
      <Form form={form}>
        <Field name="name" component="input" data-testid="input" />
      </Form>,
    )
    expect(form.name.touched).toBeFalsy()

    fireEvent.blur(getByTestId('input'))

    expect(form.name.touched).toBeTruthy()
  })

  test('validate call should be when did inject and on every onChange', () => {
    class FieldInputMy extends FieldInput {
      static validate = jest.fn(() => ['error1', 'error2'])
    }

    const { form } = factoryForm({
      name: [FieldInputMy, ''],
      name1: [FieldInput, ''],
    })
    expect(form.name1.isValidate).toBeTruthy()
    expect(form.name.isValidate).toBeFalsy()
    expect(form.name.errors).toEqual(['error1', 'error2'])
    expect(FieldInputMy.validate.mock.calls.length).toBe(1)

    const { getByTestId } = render(
      <Form form={form}>
        <Field name="name" component="input" data-testid="input" />
      </Form>,
    )

    {
      const event = { target: { value: 'value' } }
      fireEvent.change(getByTestId('input'), event)
      expect(FieldInputMy.validate.mock.calls.length).toBe(2)
    }
    {
      const event = { target: { value: 'value1' } }
      fireEvent.change(getByTestId('input'), event)
      expect(FieldInputMy.validate.mock.calls.length).toBe(3)
    }
  })
})

import React from 'react'
import { MobXProviderContext, observer } from 'mobx-react'

const Field = observer(
  ({
    name,
    component,
    onBlur = () => {},
    onChange = () => {},
    onFocus = () => {},
    path = form => form[name],
    ...props
  }) => {
    const form = React.useContext(MobXProviderContext)
    const field = path(form)

    return React.createElement(component, {
      onChange: event => {
        field.value = field.constructor.mapToSetField?.(event)
        field.onChangeEventListener.forEach(handler => handler(event))
        onChange(event)
      },
      onBlur: event => {
        field.onBlurEventListener.forEach(handler => handler(event))
        onBlur(event)
      },
      onFocus: event => {
        field.onFocusEventListener.forEach(handler => handler(event))
        onFocus(event)
      },
      value: field.constructor.mapToField?.(field.value),
      form,
      field,
      ...((typeof path == 'number' || typeof path === 'string') &&
      typeof component === 'string'
        ? { path }
        : {}),
      name,
      ...props,
    })
  },
)

export default Field

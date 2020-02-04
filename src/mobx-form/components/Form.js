import { observer, Provider } from 'mobx-react'
import React from 'react'

const Form = observer(({ children, form, ...props }) => {
  return (
    <Provider {...form.form}>
      <form {...props}>{children}</form>
    </Provider>
  )
})

export default Form

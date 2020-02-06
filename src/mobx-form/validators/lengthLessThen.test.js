import { pipeValidator } from './utils'
import lengthLessThen from './lengthLessThen'

describe('lengthLessThen', () => {
  it('should show error when length string less number', () => {
    const validate = pipeValidator([lengthLessThen(2), lengthLessThen(4)])
    expect(validate('1').length).toBe(0)
    expect(validate('12').length).toBe(1)
    expect(validate('123').length).toBe(1)
    expect(validate('1234').length).toBe(2)
  })
})

import { pipeValidator } from './utils'
import lengthGreatThen from './lengthGreatThen'

describe('lengthGreatThen', () => {
  it('should show error when length string less number', () => {
    const validate = pipeValidator([lengthGreatThen(1), lengthGreatThen(3)])
    expect(validate('1234').length).toBe(0)
    expect(validate('123').length).toBe(1)
    expect(validate('12').length).toBe(1)
    expect(validate('').length).toBe(2)
  })
})

import pipeValidator from './pipeValidator'
import lengthLessThen from '../lengthLessThen'
import lengthGreatThen from '../lengthGreatThen'

describe('pipeValidator', () => {
  it('should return array error string when validate it functions lengthGreatThen and lengthLessThen', () => {
    const message1 = '1'
    const message2 = '2'

    const validator = pipeValidator([
      lengthLessThen(5, message1),
      lengthGreatThen(3, message2),
    ])
    expect(validator('1234')).toEqual([])

    expect(validator('12')).toEqual([message2])

    expect(validator('123456')).toEqual([message1])
  })
})

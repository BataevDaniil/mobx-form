import identity from './identity'

describe('identity', () => {
  it('should return identity to the one that came', () => {
    const arg = []
    expect(identity(arg)).toEqual(arg)
  })
})

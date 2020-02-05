import identity from './identity'

describe('identity', () => {
  it('should return identity to the one that came', () => {
    const arg = 10
    expect(identity(arg)).toBe(10)
  })
})

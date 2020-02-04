import pipe from './pipe'

describe('pipe', () => {
  it('should execute function sequence transfer result executed to arguments next function', () => {
    const sum = a => b => a + b
    const multi = a => b => a * b
    expect(pipe([multi(2), sum(5)])(3)).toEqual(11)
  })
})

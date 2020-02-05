import tap from './tap'

describe('tap', () => {
  it('should execute function and return arg', () => {
    const arg = 0
    const f = jest.fn(() => 12)
    expect(tap(f)(arg)).toBe(arg)
    expect(f).toHaveBeenLastCalledWith(0)
    expect(f).toHaveBeenCalled()
  })
})

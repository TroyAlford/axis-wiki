import unique from './unique'

describe('unique', () => {
  it('removes simple duplicates', () => {
    expect(unique([1, 'a', true, 1, 'a', true])).toEqual([1, 'a', true])
  })
  it('handles multiple params', () => {
    expect(unique(1, 'a', true, 1, 'a', true)).toEqual([1, 'a', true])
  })
})

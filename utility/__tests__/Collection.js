jest.unmock('../Collection')
jest.unmock('../Guid')

import TestUtils from 'react-addons-test-utils'
import Collection from '../Collection'

describe('Collection', () => {
  it('generates ids if needed', () => {
    const original = [{}, {}, {}]
    const collection = new Collection(original)

    collection.forEach(item => {
      expect(typeof item.id).toEqual('string')
      expect(item.id).toBeTruthy()

      expect(typeof item.key).toEqual('string')
      expect(item.key).toBeTruthy()

      expect(item.key).toEqual(item.id)
    })
  })
  it('returns keys', () => {
    const original = [{ key: 'a' }, { key: 'b' }, { key: 'c' }]
    const collection = new Collection(original)
    expect(collection.keys).toEqual(['a','b','c'])
  })
  it('updates correctly per filter type', () => {
    const original = [{ key: 'a' }, { key: 'b' }, { key: 'b' }]
    const collection = new Collection(original)

    collection.update(
      { key: 'b' },
      item => item.value = 'byObject'
    )
    expect(collection.items.map(item => item.value))
      .toEqual([undefined, 'byObject', 'byObject'])

    collection.update(
      item => item.value === undefined,
      item => item.value = 'byFunction'
    )
    expect(collection.items.map(item => item.value))
      .toEqual(['byFunction', 'byObject', 'byObject'])

    collection.update(
      ['key', 'b', 'value', 'byObject'],
      item => item.value = 'byArray'
    )
    expect(collection.items.map(item => item.value))
      .toEqual(['byFunction', 'byArray', 'byArray'])
  })
  it('updates correctly via merge & function', () => {
    const original = [{ key: 'a' }, { key: 'b' }, { key: 'c' }]
    const collection = new Collection(original)

    collection.update({ key: 'a' }, { key: 'A', value: 1 })
    expect(collection.keys).toEqual(['A', 'b', 'c'])
    expect(collection.filter({ key: 'A' })[0].value).toEqual(1)

    collection.update({ key: 'A' }, item => { item.key = 'a'; item.value = 2 })
    expect(collection.keys).toEqual(['a', 'b', 'c'])
    expect(collection.filter({ key: 'a' })[0].value).toEqual(2)
  })
  it('sorts correctly', () => {
    const original = [
      { first: 'bob', last: 'boskowitz' },
      { first: 'alexander', last: 'appleseed' },
      { first: 'chuck', last: 'chowderhead' },
      { first: 'aaron', last: 'appleseed' },
    ]
    const collection = new Collection(original, {
      orderBy: {
        fieldNames: ['last', 'first'],
        directions: ['desc', 'asc']
      }
    })

    let names = collection.sorted.map(el =>
      `${el.first} ${el.last}`
    )
    expect(names).toEqual([
      'chuck chowderhead',
      'bob boskowitz',
      'aaron appleseed',
      'alexander appleseed'
    ])

    collection.settings.orderBy = el => `${el.first} ${el.last}`
    names = collection.sorted.map(el => `${el.first} ${el.last}`)
    expect(names).toEqual([
      'aaron appleseed',
      'alexander appleseed',
      'bob boskowitz',
      'chuck chowderhead'
    ])
  })
  it('removes items', () => {
    const original = [{ key: 'a' }, { key: 'b' }, { key: 'c' }]
    const collection = new Collection(original)

    collection.remove({ key: 'a' })
    expect(collection.keys).toEqual(['b','c'])

    collection.remove(['key', 'b'])
    expect(collection.keys).toEqual(['c'])

    collection.remove(item => item.key === 'c')
    expect(collection.keys).toEqual([])
  })
})

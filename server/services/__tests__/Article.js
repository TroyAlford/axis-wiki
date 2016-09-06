jest.unmock('cheerio')
jest.unmock('lodash')
jest.unmock('../Article')
jest.unmock('../../../utility/Slugs')

jest.mock('../cleaners', () => [])
jest.mock('../renderers', () => [])

import Article from '../Article'

describe('Article', () => {
  it('slugifies slugs', () => {
    const before = 'A и၀и-Slugified Slug'
    const expected = 'a-slugified-slug'

    // Test based on constructor assignment
    let article = new Article(before)
    expect(article.slug).toEqual(expected)

    // Test based on property assignment
    article.slug = before
    expect(article.slug).toEqual(expected)

    article.slug = null
    expect(article.slug).toEqual('')

    article.slug = {}
    expect(article.slug).toEqual('')

    article.slug = () => {}
    expect(article.slug).toEqual('')
  })

  it('slugifies aliases & tags, but eliminates own slug', () => {
    const slug = 'test'
    const before = ['Cr4zy+ ', '--A$$-', '--TEST--', '$!Sl_g']
    const expected = ['a', 'cr-4-zy', 'sl-g']

    let article = new Article(slug, '', { aliases: before, tags: before })
    expect(article.aliases).toEqual(expected)
    expect(article.tags).toEqual(expected)

    article.aliases = before
    expect(article.aliases).toEqual(expected)
    article.tags = before
    expect(article.tags).toEqual(expected)

    article.aliases = [() => {}, 'test', '-TEST-']
    expect(article.aliases).toEqual([])
  })

  it('ignores invalid renderers', () => {
    const fn = jest.fn(() => null)
    const all = [fn, '', null]
    const article = new Article('', '', {
      cleaners: all,
      renderers: all
    })

    expect(article.cleaners).toEqual([fn])
    expect(article.renderers).toEqual([fn])
  })

  it('runs all renderers at proper times', () => {
    const cleaner = jest.fn(() => null)
    const renderer = jest.fn(() => null)
    const article = new Article('', '', {
      cleaners: [cleaner], renderers: [renderer]
    })

    // Function should not be called yet
    expect(cleaner).not.toBeCalled()
    expect(renderer).not.toBeCalled()

    // asking for .clean should run all renderers once
    article.clean
    expect(cleaner.mock.calls.length).toEqual(1); cleaner.mockClear()
    expect(renderer).not.toBeCalled()

    // asking for .rendered should call .clean, then render
    article.rendered
    expect(cleaner.mock.calls.length).toEqual(1); cleaner.mockClear()
    expect(renderer.mock.calls.length).toEqual(1); renderer.mockClear()
  })

  it('binds "this" to cleaners & renderers correctly', () => {
    const article = new Article('', '')

    let calls = 0
    function fn(param) {
      expect(this).toEqual(article)
      expect(param).toEqual(article)
      calls++

      return param
    }

    article.cleaners = [fn]
    article.renderers = [fn]

    article.rendered
    expect(calls).toEqual(2)
  })
})

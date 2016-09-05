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

  it('runs all cleaners and renderers at proper times', () => {
    const fn = jest.fn(value => value),
          removed = ''
    const before = [fn, removed]

    let article = new Article('', 'original html')
    article.cleaners = before
    article.renderers = before

    // Removes non-fn's, and calls nothing on construction
    expect(article.cleaners).toEqual([fn])
    expect(article.renderers).toEqual([fn])
    expect(fn).not.toBeCalled(); fn.mockClear()

    // fn() should be called when renderedHTML is requested first time
    let rendered = article.renderedHTML
    expect(fn).toBeCalled(); fn.mockClear()

    // renderedHTML is cached, subsequent call = no re-render
    rendered = article.renderedHTML
    expect(fn).not.toBeCalled(); fn.mockClear()

    article.html = 'original html'
    // Setting the same HTML again should not pop the cache
    expect(fn).not.toBeCalled(); fn.mockClear()
    rendered = article.renderedHTML
    expect(fn).not.toBeCalled(); fn.mockClear()

    article.html = 'new html'
    // Setting new HTML should pop the cache
    rendered = article.renderedHTML
    expect(fn).toBeCalled(); fn.mockClear()
  })

  it('binds "this" to cleaners & renderers correctly', () => {
    const article = new Article('', '')
    let calls = 0
    function fn(value) {
      expect(this).toEqual(article)
      calls++
    }

    article.renderers = [fn]
    article.cleaners = [fn]

    article.renderedHTML
    expect(calls).toEqual(2)
  })
})

jest.unmock('../Article.new')
jest.unmock('../Slug')
jest.unmock('cheerio')
jest.unmock('lodash')
import Article from '../Article.new'

describe('Article', () => {
  it('slugifies slugs', () => {
    const before = 'Cr4zy+  S1ug with $P3(14L (|-|4r4(73r$'
    const expected = 'cr4zy-s1ug-with-p3-14l-4r4-73r'

    // Test based on constructor assignment
    let article = new Article({ slug: before })
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
    const expected = ['a', 'cr4zy', 'sl_g']

    let article = new Article({ slug, aliases: before, tags: before })
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
    const first = jest.fn(value => value),
          second = jest.fn(value => value),
          third = jest.fn(),
          removed = ''
    const before = [first, second, third, removed]

    let article = new Article({ cleaners: before, renderers: before })
    expect(article.cleaners).toEqual([first, second, third])
    expect(article.renderers).toEqual([first, second, third])

    // Each fn() should call once on construction, when HTML is set
    expect(first).toBeCalled(); first.mockClear()
    expect(second).toBeCalled(); second.mockClear()
    expect(third).toBeCalled(); third.mockClear()

    // Each fn() should call once as a renderer, to get renderedHTML
    let rendered = article.renderedHTML
    expect(first).toBeCalled(); first.mockClear()
    expect(second).toBeCalled(); second.mockClear()
    expect(third).toBeCalled(); third.mockClear()

    // renderedHTML is cached, so a subsequent call shouldn't rerender
    rendered = article.renderedHTML
    expect(first).not.toBeCalled(); first.mockClear()
    expect(second).not.toBeCalled(); second.mockClear()
    expect(third).not.toBeCalled(); third.mockClear()

    // changing HTML should de-cache the renderedHTML, and force re-cleaning
    article.html = ''
    expect(first).toBeCalled(); first.mockClear()
    expect(second).toBeCalled(); second.mockClear()
    expect(third).toBeCalled(); third.mockClear()

    // Another call to renderedHTML should now call all renderers again
    rendered = article.renderedHTML
    expect(first).toBeCalled(); first.mockClear()
    expect(second).toBeCalled(); second.mockClear()
    expect(third).toBeCalled(); third.mockClear()

    // But again, this should be cached.
    rendered = article.renderedHTML
    expect(first).not.toBeCalled(); first.mockClear()
    expect(second).not.toBeCalled(); second.mockClear()
    expect(third).not.toBeCalled(); third.mockClear()
  })
})

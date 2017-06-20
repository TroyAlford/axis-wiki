import { connect } from 'camo'
import Article from './Article'

jest.unmock('./Article')
jest.mock('../../../config/server', () => ({
  folders: { articles: '' },
}))

/* eslint-disable no-multi-str */
describe('db/Article', () => {
  const url = 'nedb://memory'
  let database = null
  let article = {}

  beforeEach((done) => {
    connect(url).then((db) => {
      database = db
      return database.dropDatabase()
    }).then(() => {
      article = Article.create({ _initialLoad: true })
      return done()
    })
  })
  afterEach((done) => { database.dropDatabase().then(() => {}).then(done, done) })

  describe('parseLinks', () => {
    it('marks external links correctly', () => {
      article.html = '<a href="https://external.url/blah">blah</a>'
      const expected = '<a href="https://external.url/blah" target="_new" class="external">blah</a>'

      article.parseLinks()
      expect(article.html).toEqual(expected)
    })
    it('rebases internal page links', () => {
      article.html = '<a href="path/to/existing-link">blah</a>'
      const expected = '<a href="/page/existing-link">blah</a>'

      article.parseLinks()
      expect(article.html).toEqual(expected)
    })
    it('rebases internal media links', () => {
      article.html = '<a href="path/to/existing-media.jpg">image</a>'
      const expected = '<a href="/media/existing-media.jpg">image</a>'

      article.parseLinks()
      expect(article.html).toEqual(expected)
    })
  })

  describe('findMissingLinks', () => {
    it('finds missing links', () => {
      article.html = '<a href="path/to/missing-link">page</a>'
      return article.save().then(() => {
        Article.findMissingLinks(article.links).then((missing) => {
          expect(missing).toContain('missing-link')
        })
      })
    })

    it('de-duplicates missing links', () => {
      article.html = '\
        <a href="path/to/missing-link">page</a>\
        <a href="path/to/missing-link">page</a>\
      '
      return article.save().then(() => {
        Article.findMissingLinks(article.links).then((missing) => {
          expect(missing).toEqual(['missing-link'])
          expect(missing).toHaveLength(1)
        })
      })
    })
  })

  describe('transclude', () => {
    let a
    let b
    let c
    beforeEach(() => {
      a = Article.create({
        _initialLoad: true,

        slug: 'a',
        html: '\
          <h1>Header A</h1>\
          <span id="a">Contents of A</span>\
        ',
      })
      b = Article.create({
        _initialLoad: true,

        slug: 'b',
        html: '\
          <h1>Header B</h1>\
          <span id="b">1st B</span>\
          <span id="b">2nd B</span>\
          <span id="other">Other</span>\
        ',
      })
      c = Article.create({
        _initialLoad: true,

        slug: 'c',
        html: '\
          <h1>Header C</h1>\
          <include from="a" sections="*" />\
        ',
      })
      return Promise.all([a.save(), b.save(), c.save()])
    })

    it('transcludes articles', () =>
      Article.transclude(
        '<include from="a" sections="a" />'
      ).then(({ html, links, missing }) => {
        expect(html).toMatch(/Contents of A/)
        expect(links).toEqual(['a'])
        expect(missing).toEqual([])
      })
    )

    it('transcludes whole articles if sections="*"', () => {
      Article.transclude(
        '<include from="b" sections="*" />'
      ).then(({ html, links, missing }) => {
        expect(html).toMatch(/Header B/)
        expect(html).toMatch(b.html)
        expect(links).toEqual(['b'])
        expect(missing).toEqual([])
      })
    })

    it('includes multiple sections with the same name, in order', () =>
      Article.transclude('\
        <h1>Header</h1>\
        <include from="b" sections="b" />\
      ').then(({ html, links, missing }) => {
        expect(html).toMatch(/1st B/)
        expect(html).toMatch(/2nd B/)
        expect(html.indexOf(/1st B/) < html.indexOf(/2nd B/))
        expect(links).toEqual(['b'])
        expect(missing).toEqual([])
      })
    )

    it('includes sections in the correct order', () =>
      Article.transclude(
        '<include from="b" sections="other,b" />'
      ).then(({ html, links, missing }) => {
        expect(html).toMatch(/Other/)
        expect(html).toMatch(/1st B/)
        expect(html).toMatch(/2nd B/)
        expect(html.indexOf(/Other/) < html.indexOf(/1st B/))
        expect(html.indexOf(/1st B/) < html.indexOf(/2nd B/))
        expect(links).toEqual(['b'])
        expect(missing).toEqual([])
      })
    )

    it('handles missing articles', () =>
      Article.transclude(
        '<include from="missing" sections="missing" />'
      ).then(({ html, links, missing }) => {
        expect(html).toMatch(/does not exist/)
        expect(links).toEqual(['missing'])
        expect(missing).toEqual(['missing'])
      })
    )

    it('handles nested transcludes', () =>
      Article.transclude('\
        <include from="c" sections="*" />\
        <include from="missing" sections="*" />\
      '
      ).then(({ html, links, missing }) => {
        expect(html).toMatch(/Header C/)
        expect(html).toMatch(/Header A/)
        expect(html.indexOf(/Header C/) < html.indexOf(/Header A/))
        expect(html).toMatch(/Article 'missing' does not exist/)
        expect(links).toEqual(['c', 'missing', 'a'])
        expect(missing).toEqual(['missing'])
      })
    )

    it('de-duplicates links', () =>
      Article.transclude('\
        <include from="a" sections="*" />\
        <include from="a" sections="*" />\
        <include from="missing" sections="m1" />\
        <include from="missing" sections="m2" />\
      ').then(({ html, links, missing }) => {
        expect(html.match(/Header A/g)).toHaveLength(2)
        expect(links).toEqual(['a', 'missing'])
        expect(missing).toEqual(['missing'])
      })
    )

    it('treats no sections as sections="*" (whole article)', () =>
      Article.transclude(
        '<include from="b" />'
      ).then(({ html }) => {
        expect(html).toMatch(b.html)
      })
    )
  })
})

import { connect } from 'camo'
import Article from './Article'

jest.unmock('./Article')
jest.mock('../../../config/server', () => ({
  folders: { articles: '' },
}))

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
    (async () => { await connect('nedb://memory') })()

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
      article.save().then(() => {
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
      article.save().then(() => {
        Article.findMissingLinks(article.links).then((missing) => {
          expect(missing).toEqual(['missing-link'])
          expect(missing).toHaveLength(1)
        })
      })
    })
  })
})

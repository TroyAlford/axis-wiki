jest.unmock('../Transclude')
jest.unmock('cheerio')
jest.unmock('path')
jest.unmock('url')

jest.unmock('../../../../utility/Slugs')

jest.mock('../../Config', () => ({ folders: { articles: '', media: '' } }))
jest.mock('../../Storage', () => ({
  getArticle: from => from === "duplicates" ? {
    html: '<div id="a">First A Text</div><span id="a">Second A Text</span>',
  } : {
    html: '<div id="a">A Text</div><span id="b">B Text</span>',
    links_to: [],
    missing_links: [],
  }
}))

jest.mock('fs-utils', () => ({
  exists: path => {
    return !!path.match(/duplicates|existing|resolved/)
  },
}))

jest.mock('../../Links', () => ({
  resolve: slug => slug === 'redirect' ? 'resolved' : slug
}))

import Transclude from '../Transclude'

describe('Transclude', () => {
  it('transcludes existing section text', () => {
    const before = '<include from="existing" sections="*"></include>'
    const expected =
      '<include from="existing" sections="*" class="noedit">' +
        '\n<!-- This content is transcluded from \'existing\'; edits may only be made to the original article -->\n' +
        '<div id="a">A Text</div>' +
        '<span id="b">B Text</span>' +
      '</include>'

    const after = Transclude({ html: before })
    expect(after.html).toEqual(expected)
    expect(after.links_to).toEqual(['existing'])
    expect(after.missing_links).toEqual([])
  })
  it('transcludes missing sections as "missing" comment', () => {
    const before = '<include from="missing" sections="*"></include>'
    const expected =
      '<include from="missing" sections="*" class="noedit">' +
        '\n<!-- Article \'missing\' does not exist -->\n' +
      '</include>'

    const after = Transclude({ html: before })
    expect(after.html).toEqual(expected)
    expect(after.links_to).toEqual([])
    expect(after.missing_links).toEqual(['missing'])
  })
  it('transcludes aliased article references', () => {
    const before = '<include from="redirect" sections="*"></include>'
    const expected =
      '<include from="redirect" sections="*" class="noedit">' +
        '\n<!-- This content is transcluded from \'redirect\'; edits may only be made to the original article -->\n' +
        '<div id="a">A Text</div>' +
        '<span id="b">B Text</span>' +
      '</include>'

    const after = Transclude({ html: before })
    expect(after.html).toEqual(expected)
    expect(after.links_to).toEqual(['redirect'])
    expect(after.missing_links).toEqual([])
  })
  it('transcludes named section outerHTML', () => {
    const before = '<include from="existing" sections="a"></include>'
    const expected =
      '<include from="existing" sections="a" class="noedit">' +
        '\n<!-- This content is transcluded from \'existing\'; edits may only be made to the original article -->\n' +
        '<div id="a">A Text</div>' +
      '</include>'

    const after = Transclude({ html: before })
    expect(after.html).toEqual(expected)
  })
  it('transcludes named sections in specified order', () => {
    const before = '<include from="existing" sections="b,a"></include>'
    const expected =
      '<include from="existing" sections="b,a" class="noedit">' +
        '\n<!-- This content is transcluded from \'existing\'; edits may only be made to the original article -->\n' +
        '<span id="b">B Text</span>' +
        '<div id="a">A Text</div>' +
      '</include>'

    const after = Transclude({ html: before })
    expect(after.html).toEqual(expected)
  })
  it('can transclude the same section twice', () => {
    const before = '<include from="existing" sections="a,a"></include>'
    const expected =
      '<include from="existing" sections="a,a" class="noedit">' +
        '\n<!-- This content is transcluded from \'existing\'; edits may only be made to the original article -->\n' +
        '<div id="a">A Text</div>' +
        '<div id="a">A Text</div>' +
      '</include>'

    const after = Transclude({ html: before })
    expect(after.html).toEqual(expected)
  })
  it('transcludes multiple references to the same section name in order', () => {
    const before = '<include from="duplicates" sections="a"></include>'
    const expected =
      '<include from="duplicates" sections="a" class="noedit">' +
        '\n<!-- This content is transcluded from \'duplicates\'; edits may only be made to the original article -->\n' +
        '<div id="a">First A Text</div>' +
        '<span id="a">Second A Text</span>' +
      '</include>'

    const after = Transclude({ html: before })
    expect(after.html).toEqual(expected)
  })
})

import titleCase from './titleCase'

it('converts camelCase words', () => {
  expect(titleCase('camelCaseWords')).toBe('Camel Case Words')
})

it('converts strings with spaces', () => {
  expect(titleCase('strings with spaces')).toBe('Strings With Spaces')
})

it('converts CAPITALIZED WORDS', () => {
  expect(titleCase('CAPITALIZED WORDS')).toBe('Capitalized Words')
})

it('converts kebab-case words', () => {
  expect(titleCase('kebab-case-words')).toBe('Kebab Case Words')
})

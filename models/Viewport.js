import { types } from 'mobx-state-tree'

export default types.model('Viewport', {
  height: 0,
  menuToggled: false,
  width: 0,
}).views(self => ({
  get showMenu() { return self.width >= 550 || self.menuToggled },
})).actions((self) => {
  /* eslint-disable no-param-reassign */
  window.addEventListener('resize', () => {
    self.setHeight(window.innerHeight)
    self.setWidth(window.innerWidth)
  })

  return {
    toggleMenu() { self.menuToggled = !self.menuToggled },
    setHeight(height) { self.height = height },
    setWidth(width) { self.width = width },
  }
  /* eslint-enable no-param-reassign */
})

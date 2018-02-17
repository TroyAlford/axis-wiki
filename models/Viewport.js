import { types } from 'mobx-state-tree'

const SCREEN_SM_WIDTH = 500
const SCREEN_LG_WIDTH = 980

const largeScreenQuery = `(min-width: ${SCREEN_LG_WIDTH}px)`
const mediumScreenQuery =
  `(max-width: ${SCREEN_LG_WIDTH - 1}px) and ` +
  `(min-width: ${SCREEN_SM_WIDTH + 1}px)`
const smallScreenQuery = `(max-width: ${SCREEN_SM_WIDTH}px)`

export default types.model('Viewport', {
  height: 0,
  menuToggled: false,
  size: 'large',
  width: 0,
}).views(self => ({
  get showMenu() { return self.width >= 550 || self.menuToggled },
})).actions(self => ({
  /* eslint-disable no-param-reassign */
  // Lifecycle
  afterCreate() {
    window.addEventListener('resize', self.onWindowResize)
    self.onWindowResize()
  },
  beforeDestroy() { window.removeEventListener('resize', self.onWindowResize) },

  // Setters
  onWindowResize() {
    if (window.matchMedia(smallScreenQuery).matches) self.size = 'small'
    if (window.matchMedia(mediumScreenQuery).matches) self.size = 'medium'
    if (window.matchMedia(largeScreenQuery).matches) self.size = 'large'

    self.setHeight(window.innerHeight)
    self.setWidth(window.innerWidth)
  },
  setHeight(height) { self.height = height },
  setWidth(width) { self.width = width },
  toggleMenu() { self.menuToggled = !self.menuToggled },
  /* eslint-enable no-param-reassign */
}))

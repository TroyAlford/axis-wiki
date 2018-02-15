import * as mobx from 'mobx'
import * as mobxReact from 'mobx-react'
import * as mobxStateTree from 'mobx-state-tree'
import * as react from 'react'
import * as reactDom from 'react-dom'
import * as reactRouter from 'react-router-dom'

window.mobx = mobx
window.react = react
window['mobx-react'] = mobxReact
window['mobx-state-tree'] = mobxStateTree
window['react-dom'] = reactDom
window['react-router-dom'] = reactRouter

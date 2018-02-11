import { types } from 'mobx-state-tree'
import ArticlePage from './ArticlePage'
import MediaPage from './MediaPage'
import SearchPage from './SearchPage'

export default types.union(ArticlePage, MediaPage, SearchPage)

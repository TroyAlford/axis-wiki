export default {
  auto_focus: true,
  autosave_ask_before_unload: false,
  inline: true,
  fixed_toolbar_container: '.article.page > .tab-set',
  formats: {
    aligncenter: {
      selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img',
      classes: 'is-text-centered'
    },
    underline: { inline: 'u', exact: true }
  },
  menubar: false,
  plugins:
    'anchor advlist autosave fullscreen hr image link lists paste table',
  toolbar:
    'formatselect | bold italic underline | bullist numlist ' +
    '| hr link anchor | alignleft aligncenter alignright alignjustify ' +
    '| image table | removeformat | undo redo',
  valid_elements:
    'a[href|target|class|style],img[src|class|style|height|width],' +
    '@[class|colspan|rowspan|style],th,td,' +
    '@[class|style],' +
    '-h1,-h2,-h3,-h4,-h5,-h6,' +
    '-table,-tr,br,hr,-blockquote,' +
    '-div,-p,-ul,-ol,-li,-b/strong,-i/em,-u,-s/strike/del,-center,-sup,-sub'
}

export default {
  auto_focus: true,
  autosave_ask_before_unload: false,
  inline: true,
  convert_fonts_to_spans: true,
  convert_urls: false,
  custom_elements: 'include',
  extended_valid_elements: 'include[class|from|sections]',
  fixed_toolbar_container: '.article.page > .tab-set',
  formats: {
    aligncenter: {
      selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img',
      classes: 'center',
    },
    underline: { inline: 'u', exact: true },
  },
  noneditable_noneditable_class: 'noedit',
  menubar: false,
  plugins:
    'anchor advlist autosave code fullscreen hr image link lists noneditable paste table',
  toolbar:
    'formatselect | bold italic underline ' +
    '| alignleft aligncenter alignright alignjustify ' +
    '| bullist numlist | hr link | image table | removeformat',
  valid_elements:
    'a[id|href|target|class|style],' +
    'img[id|src|class|style|height|width],' +
    '@[id|class|colspan|rowspan|style],th,td,' +
    '@[id|class|style],' +
    '-h1,-h2,-h3,-h4,-h5,-h6,' +
    '-table,-tr,br,hr,-blockquote,' +
    '-div,-span,-p,-ul,-ol,-li,-b/strong,-i/em,-u,-s/strike/del,-center,-sup,-sub',
}

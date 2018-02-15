// TinyMCE
import tinymce from 'tinymce/tinymce'

// Plugins
import 'tinymce/plugins/anchor/plugin'
import 'tinymce/plugins/advlist/plugin'
import 'tinymce/plugins/autosave/plugin'
import 'tinymce/plugins/code/plugin'
import 'tinymce/plugins/fullscreen/plugin'
import 'tinymce/plugins/hr/plugin'
import 'tinymce/plugins/image/plugin'
import 'tinymce/plugins/link/plugin'
import 'tinymce/plugins/lists/plugin'
import 'tinymce/plugins/noneditable/plugin'
import 'tinymce/plugins/paste/plugin'
import 'tinymce/plugins/table/plugin'

// Theme
import 'tinymce/themes/modern/theme'

// Skin
import 'tinymce/skins/lightgray/skin.min.css'
import 'tinymce/skins/lightgray/content.inline.min.css'

// React Component
import { Editor } from '@tinymce/tinymce-react'

Editor.defaultProps = Object.assign(Editor.defaultProps || {}, {
  init: {
    auto_focus: true,
    autosave_ask_before_unload: false,
    inline: true,
    convert_fonts_to_spans: true,
    convert_urls: false,
    custom_elements: 'include',
    extended_valid_elements: 'include[class|from|sections]',
    fixed_toolbar_container: '.wysiwyg-editor > .menubar',
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
    skin: false,
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
  },
})

export default Editor

Object.assign(window, { tinymce })

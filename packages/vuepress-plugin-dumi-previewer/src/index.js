const markdownItContainer = require('markdown-it-container')

module.exports = (options = {}) => {
  const { marker = 'demo', scopeMaker = 'demo[scope]' } = options

  function render (tokens, idx, endType, scope) {
    const { nesting } = tokens[idx]

    if (nesting === -1) {
      return '</template></Previewer>\n'
    }

    let htmlStr = ''
    let lastLine = 0

    for (let index = idx; index < tokens.length; index++) {
      const { map, type, content } = tokens[index]

      if (type === endType) break

      // add empty lines
      if (map) {
        const delta = map[0] - (lastLine || map[1])

        if (delta > 0) {
          htmlStr += '\n'.repeat(delta)
        }

        lastLine = map[1]
      }

      htmlStr += content
    }

    return `
      <Previewer
        :scope="${scope}"
        code="${encodeURIComponent(htmlStr)}"
      >
        <template slot="demo">
    `
  }

  function slotRender (tokens, index) {
    return render(tokens, index, `container_${marker}_close`, false)
  }

  function scopeRender (tokens, index) {
    return render(tokens, index, `container_${scopeMaker}_close`, true)
  }

  return {
    name: 'vuepress-plugin-dumi-previewer',
    enhanceAppFiles: [
      require.resolve('./enhanceAppFile.js')
    ],
    extendMarkdown: (md) => {
      md.use(markdownItContainer, marker, { render: slotRender })
      md.use(markdownItContainer, scopeMaker, { render: scopeRender })
    }
  }
}

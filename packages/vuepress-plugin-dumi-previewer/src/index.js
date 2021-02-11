const markdownItContainer = require('markdown-it-container')

module.exports = (options = {}) => {
  const { marker = 'demo' } = options
  const END_TYPE = `container_${marker}_close`

  function render (tokens, idx) {
    const { nesting } = tokens[idx]

    if (nesting === -1) {
      return '</template></Previewer>\n'
    }

    let htmlStr = ''
    let lastLine = 0

    for (let index = idx; index < tokens.length; index++) {
      const { map, type, content } = tokens[index]

      if (type === END_TYPE) break

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
        code="${encodeURIComponent(htmlStr)}"
      >
        <template slot="demo">
    `
  }

  return {
    name: 'vuepress-plugin-dumi-previewer',
    enhanceAppFiles: [
      require.resolve('./enhanceAppFile.js')
    ],
    extendMarkdown: (md) => {
      md.use(markdownItContainer, marker, { render })
    }
  }
}

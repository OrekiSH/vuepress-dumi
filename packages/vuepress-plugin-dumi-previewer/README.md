<h1 align="center">vuepress-plugin-dumi-previewer</h1>

<a href="https://github.com/OrekiSH/vuepress-dumi/blob/main/packages/vuepress-plugin-dumi-previewer/README.md">English</a> | 简体中文

💡attention: whitespace is in need before `demo`

```md
::: demo
<div @click="handleClick">click me</div>

<script>
export default {
  methods: {
    handleClick() {
      console.warn('clicked')
    }
  }
}
</script>
:::
```

## Install

* First of all, install [vuepress v1.x](https://github.com/vuejs/vuepress)

* Then install the plugin

```bash
$ npm i -D @vuepress-dumi/vuepress-plugin-dumi-previewer
# OR
$ yarn add -D @vuepress-dumi/vuepress-plugin-dumi-previewer
```

## Usage
Write vuepress config

```js
// .vuepress/config.js
module.exports = {
  plugins: ['@vuepress-dumi/dumi-previewer'],
}
```

## Thanks

This repo is inspired by the following projects, Thanks for their great work.

- [dumi](https://github.com/umijs/dumi)
- [vuepress-plugin-demo-code](https://github.com/BuptStEve/vuepress-plugin-demo-code)
<h1 align="center">vuepress-plugin-dumi-previewer</h1>

English | <a href="https://github.com/OrekiSH/vuepress-dumi/blob/main/packages/vuepress-plugin-dumi-previewer/README-zh_CN.md">简体中文</a>

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

## Preview

![code previewer](https://s3.ax1x.com/2021/02/12/yDNgQx.png)

💡attention: if you want to import element-ui like me, you need install async-validator@1.11.5

``` bash
$ npm i -D async-validator@1.11.5
# OR
$ yarn add -D async-validator@1.11.5
```

## Thanks

This repo is inspired by the following projects, Thanks for their great work.

- [dumi](https://github.com/umijs/dumi)
- [vuepress-plugin-demo-code](https://github.com/BuptStEve/vuepress-plugin-demo-code)
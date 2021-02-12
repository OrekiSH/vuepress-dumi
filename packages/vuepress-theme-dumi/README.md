<h1 align="center">vuepress-theme-dumi</h1>

📖 A dumi style theme for VuePress.

English | <a href="https://github.com/OrekiSH/vuepress-dumi/blob/main/packages/vuepress-theme-dumi/README-zh_CN.md">简体中文</a>

## Install

* First of all, install [vuepress v1.x](https://github.com/vuejs/vuepress)

* Then install the theme

```bash
$ npm i -D @vuepress-dumi/vuepress-theme-dumi
# OR
$ yarn add -D @vuepress-dumi/vuepress-theme-dumi
```

## Usage
Write vuepress config

```js
// .vuepress/config.js
module.exports = {
  theme: '@vuepress-dumi/dumi',
}
```

## Preview

![pc mode](https://s3.ax1x.com/2021/02/12/yDNldg.png)
![mobile mode](https://s3.ax1x.com/2021/02/12/yDUi60.png)
![code previewer](https://s3.ax1x.com/2021/02/12/yDNgQx.png)

💡attention: if you want to import element-ui like me, you need install async-validator@1.11.5

``` bash
$ npm i -D async-validator@1.11.5
# OR
$ yarn add -D async-validator@1.11.5
```
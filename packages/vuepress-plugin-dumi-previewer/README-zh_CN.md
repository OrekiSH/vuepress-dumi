<h1 align="center">vuepress-plugin-dumi-previewer</h1>

English | <a href="https://github.com/OrekiSH/vuepress-dumi/blob/main/packages/vuepress-plugin-dumi-previewer/README-zh_CN.md">简体中文</a>

💡注意: `demo`之前的空格是必需的

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

## 安装

* 首先安装 [VuePress v1.x](https://github.com/vuejs/vuepress)

* 接着安装插件

```bash
$ npm i -D @vuepress-dumi/vuepress-plugin-dumi-previewer
# OR
$ yarn add -D @vuepress-dumi/vuepress-plugin-dumi-previewer
```

## 用法

配置VuePress的config.js文件

```js
// .vuepress/config.js
module.exports = {
  plugins: ['@vuepress-dumi/dumi-previewer'],
}
```

## 致谢

本项目受到以下开源项目的启发, 感谢他们的杰出贡献

- [dumi](https://github.com/umijs/dumi)
- [vuepress-plugin-demo-code](https://github.com/BuptStEve/vuepress-plugin-demo-code)
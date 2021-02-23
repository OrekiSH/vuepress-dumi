<h1 align="center">vuepress-theme-dumi</h1>

📖 适配VuePress的dumi样式主题.

<a href="https://github.com/OrekiSH/vuepress-dumi/blob/main/README.md">English</a> | 简体中文

## 安装

* 首先安装 [VuePress v1.x](https://github.com/vuejs/vuepress)

* 接着安装主题

```bash
$ npm i -D @vuepress-dumi/vuepress-theme-dumi
# OR
$ yarn add -D @vuepress-dumi/vuepress-theme-dumi
```

## 用法

配置VuePress的config.js文件

```js
// .vuepress/config.js
module.exports = {
  theme: '@vuepress-dumi/dumi',
}
```

## 预览

![PC模式](https://s3.ax1x.com/2021/02/12/yDNldg.png)
![手机模式](https://s3.ax1x.com/2021/02/12/yDUi60.png)
![代码预览](https://s3.ax1x.com/2021/02/12/yDNgQx.png)

💡注意: 如果你需要引入element-ui, 则需要指定async-validator的版本:

``` bash
$ npm i -D async-validator@1.11.5
# OR
$ yarn add -D async-validator@1.11.5
```

## 代码预览器用法

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

如果你需要将代码限制在当前代码块的作用域内, 可以使用`demo[scope]`

💡注意: `<template></template>`标签是必需的, 并且你不能在scope模式下使用`import`语句。另外如果你在一个markdown文件中同时使用`demo[scope]`和`demo`，可能会出现一些报错

```md
::: demo[scope]
<template>
  <div>{{ foo }}</div>
</template>

<script>
export default {
  data() {
    return { foo: 'foo' }
  }
}
</script>
:::
```

```md
::: demo[scope]
<template>
  <div>{{ foo }}</div>
</template>

<script>
export default {
  data() {
    return { foo: 'bar' }
  }
}
</script>
:::
```
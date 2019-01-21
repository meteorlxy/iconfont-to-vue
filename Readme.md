# Iconfont to Vue

> A util to transform `iconfont.js` to `Iconfont.vue`

# 介绍

[Iconfont.cn](https://www.iconfont.cn) 提供了 “Symbol 引用” 的 js 代码，但是个人不喜欢直接引入那个 `iconfont.js` 文件，更喜欢作为一个函数式组件 `Iconfont.vue` 引入到 Vue 项目中。所以简单通过字符串处理把 `iconfont.js` 转换为 `Iconfont.vue`，顺便把样式也加进去。

> 参考 [Iconfont 帮助 - symbol 引用](https://www.iconfont.cn/help/detail?helptype=code)

## 使用方式

安装 `iconfont-to-vue`：

```sh
npm install -g iconfont-to-vue
```

将 `iconfont` 下载至本地后，会得到这么一堆文件：

```sh
download
├── demo.css
├── demo_index.html
├── iconfont.css
├── iconfont.eot
├── iconfont.js # Symbol 引用的 js 文件
├── iconfont.svg
├── iconfont.ttf
├── iconfont.woff
└── iconfont.woff2
```

运行 `iconfont-to-vue` 进行转换：

```sh
iconfont-to-vue iconfont.js
# 或者用短一点的别名 itv
itv iconfont.js
# 自定义生成的文件名
iconfont-to-vue iconfont.js MyIconfont.vue
```

默认会生成 `Iconfont.vue`：

```html
<template functional>
<svg v-show="false">
  <symbol
    id="icon-github"
    viewBox="0 0 1024 1024"
  >
    <path d="....." />
  </symbol>
</svg>
</template>

<script>
export default {
  name: 'Iconfont',
}
</script>

<style>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: #333;
  overflow: hidden;
}
</style>
```

在项目最外层引入 `Iconfont` 组件，然后自行创建一个 `Icon` 组件来使用即可，例如：

```html
<template>
  <svg
    class="icon"
    :style="{ fill: color }"
  >
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script>
export default {
  name: 'Icon',

  props: {
    name: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: false,
      default: '#333',
    },
  },
}
</script>
```

当然，把 `<style>` 标签放在这个组件里也是可以的，这个就随意发挥了。

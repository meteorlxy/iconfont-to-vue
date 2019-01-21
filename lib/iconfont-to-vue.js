const fs = require('fs')
const path = require('path')

module.exports = function iconfontToVue ({
  src,
  dest,
  force,
  functional,
  style,
}) {
  // check if the src file exists
  if (!fs.existsSync(src)) {
    console.error(`The src file does not exist.`)
    return false
  }

  // check if the dest file exists
  if (!force && fs.existsSync(dest)) {
    console.error(`The dest file already exists. Use '-f' to force rewrite it.`)
    return false
  }

  // get the component name according to the dest filename
  const componentName = path.basename(dest, '.vue')

  // get the src file content
  const srcContent = fs.readFileSync(src).toString()

  // get the svg content from srcContent
  let svgContent = srcContent
    // svg tag with v-show="false"
    .replace(/^.*<svg>(.*)<\/svg>.*$/, '<svg v-show="false">$1</svg>')
    // new line and indent for symbol tag
    .replace(/(<symbol)/g, '\n  $1')
    // new line and indent for symbol end tag
    .replace(/(<\/symbol>)/g, '\n  $1\n')
    // new line and indent for path tag
    .replace(/(<path)/g, '\n    $1')
    // new line and indent for path end tag
    .replace(/( *><\/path>)/g, ' />')
    // multiple lines for multiple attributes
    .replace(/<symbol (id=".*") (viewBox=".*")>/g, '<symbol\n    $1\n    $2\n  >')
    // remove fill attributes
    .replace(/( fill=".*")/g, '')
  
  // generate the content of .vue file
  const vueContent = `\
<template${functional ? ' functional' : ''}>
${svgContent}
</template>

<script>
export default {
  name: '${componentName}',
}
</script>
${style ? `
<style>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: #333;
  overflow: hidden;
}
</style>
` : ''}`

  // write Vue SFC
  fs.writeFileSync(dest, vueContent)
}

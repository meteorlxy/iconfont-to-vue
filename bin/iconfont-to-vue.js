#!/usr/bin/env node

const path = require('path')
const pkg = require('../package.json')
const program = require('commander')
const iconfontToVue = require('../lib/iconfont-to-vue')

program
  .version(pkg.version)
  .arguments('<src> [dest]')
  .option('-f, --force', 'Force rewrite the dest file even if it exists.')
  .option('--no-functional', 'Do not generate functional component.')
  .option('--no-style', 'Do not inject style tag in the Vue SFC.')
  .action((src, dest, { force, functional, style }) => {
    const srcPath = path.resolve(src)
    const destPath = dest ? path.resolve(dest) : path.resolve(`Iconfont.vue`)

    iconfontToVue({
      src: srcPath,
      dest: destPath,
      force,
      functional,
      style,
    })
  })

program.parse(process.argv)

import './css/index.scss'
import './js/index.js'

import axios from 'axios'

/*
// webpack-merge 合并与Object.assigin的差别：
import webpackMerge from 'webpack-merge'

const obj1 = {
  x: [{
    a: 1,
    b: 1
  }]
}

const obj2 = {
  x: [{
    a: 2,
    b: 2,
    c: 2
  }]
}
const obj3 = webpackMerge(obj1, obj2)
console.log('webpackMerge', obj3)

const obj4 = Object.assign(obj1, obj2)
console.log('Object.assign', obj4) */

/* axios.get('/mock/5d78af02fbadfc5fb86af526/example/mock').then(data => {
  console.log(data)
}) */

axios.get('/api/mock').then(data => {
  console.log(data)
})

console.log('main')

// console.log(aaa)
console.log(111)


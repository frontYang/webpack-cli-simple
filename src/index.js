
import './css/index.scss'
import './js/a'

import axios from 'axios'

if (process.env === 'development') {
  import('./mock/index')

  axios({
    method: 'get',
    url: '/api/test'
  }).then(function(response) {
    console.log(response)
  })
}

var ster = 'dsfsdf'
var a = 'dsfsdf'
var b = 'sdfsd'
console.log(a, ster, b)

const arr1 = [2, 222]
const arr2 = [3, 33, 2]

console.log([...arr1, ...arr2])

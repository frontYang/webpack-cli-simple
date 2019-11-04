
import './index.scss'
import './index1.scss'
import './b'

import axios from 'axios'
console.log(process.env)
if (process.env === 'DEV') {
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

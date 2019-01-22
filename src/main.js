import Vue from 'vue'
import axios from 'axios'


// let url = "https://jsonplaceholder.typicode.com/posts"
// new Vue({
//   el: '#app',
//   data: {
//     userId: 1,
//     title: '',
//     body: '',
//     response: ''
//   },
//   methods: {
//     submit() {
//       axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
//      //   this.response = JSON.stringify(response, null, ' ')
//      this.response = response.data
//       }).catch(error => {
//         this.response = 'Error: ' + error.response.status
//       })
//     }
//   }

// })
new Vue({
  el: '#app',
  data: {
  inProgress: false,
  requests: new Object(null),
  responses: new Object(null),
  counter: 0,
  impatientAxios: undefined
  },
  created () {
    this.impatientAxios = axios.create({
    timeout: 3000
    })
    },
    methods: {
      order (event, oldRequest) {
      let request = undefined
      if (oldRequest) {
      request = oldRequest
      } else {
      request = { req: ' ', id: this.counter++}
      }
      this.inProgress = true
      this.requests[request.id] = request
      this.impatientAxios.get('http://httpstat.us/200')
      .then(response => {
      this.inProgress = false
      this.responses[request.id] = this.requests[request.id]
      delete this.requests[request.id]
      })
      .catch(e => {
      this.inProgress = false
      console.error(e.message)
      console.error(this.requests.s)
      setTimeout(this.order(event, request), 1000)
      })
      }
    }
  })
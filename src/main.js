import Vue from 'vue'
import axios from 'axios'
import rxjs from 'rxjs'


new Vue({
  el: '#app',
  data: {
    messages: [],
    toAdd: ''
  },
  created() {
    axios.get('http://localhost:3030/messages/')
      .then(response => {
        this.messages = response.data.data
      })
  },
  methods: {
    add() {
      axios.post('http://localhost:3030/messages/', {
        text: this.toAdd
      })
        .then(response => {
          if (response.status === 201) {
            this.messages.push(response.data)
            this.toAdd = ''
          }
        })
    },
    deleteItem(id) {
      console.log('delete')
      axios.delete('http://localhost:3030/messages/' + id)
        .then(response => {
          if (response.status < 400) {
            this.messages.splice(
              this.messages.findIndex(e => e.id === id), 1)
          }
        })
    },
    edit(id, text) {
      axios.put('http://localhost:3030/messages/' + id, {
        text
      })
        .then(response => {
          if (response.status < 400) {
            console.info(response.status)
          }
        })
    },
    submitForm() {
  
    }
  }
})

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

// new Vue({
//   el: '#app',
//   data: {
//   inProgress: false,
//   requests: new Object(null),
//   responses: new Object(null),
//   counter: 0,
//   impatientAxios: undefined
//   },
//   created () {
//     this.impatientAxios = axios.create({
//     timeout: 3000
//     })
//     },
//     methods: {
//       order (event, oldRequest) {
//       let request = undefined
//       if (oldRequest) {
//       request = oldRequest
//       } else {
//       request = { req: ' ', id: this.counter++}
//       }
//       this.inProgress = true
//       this.requests[request.id] = request
//       this.impatientAxios.get('http://httpstat.us/200')
//       .then(response => {
//       this.inProgress = false
//       this.responses[request.id] = this.requests[request.id]
//       delete this.requests[request.id]
//       })
//       .catch(e => {
//       this.inProgress = false
//       console.error(e.message)
//       console.error(this.requests.s)
//       setTimeout(this.order(event, request), 1000)
//       })
//       }
//     }
//   })
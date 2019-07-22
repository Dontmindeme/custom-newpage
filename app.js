import Vue from 'vue'
import dayjs from 'dayjs'
console.log('🎉 Using Vue JS 🌈')
let w = window
let yt = w.options.yt
let links = w.options.links
w.Startup = () => {
  console.log('🚀 Setting Default Values. Press F5')
  w.localStorage.setItem('yt', JSON.stringify({ date: new Date().getDay() - 1 }))
  w.localStorage.setItem('quote', JSON.stringify({ date: new Date().getDate() - 1 }))
  w.localStorage.setItem('tasks', JSON.stringify([]))
  w.localStorage.setItem('wallpaper', JSON.stringify({ date: new Date().getDay() - 1 }))
}
getLatestWallpaper()
let App = new Vue({
  el: '#app',
  data: {
    date: dayjs().format('D MMMM YYYY'),
    time: dayjs().format('h:mm:ss a'),
    quote: {
      qt: 'Your time is limited, so dont waste it living someone elses life.',
      author: 'Steve Jobs'
    },
    yt: yt,
    links: links,
    tasks: JSON.parse(w.localStorage.getItem('tasks')),
    show: 1
  },
  methods: {
    genColor: (color) => {
      return `color: var(--${color})`
    },
    gSearch: (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        w.location.href = 'http://google.com/search?q=' + e.target.innerText
      }
    },
    removeTask: function (e) {
      this.tasks = this.tasks.filter(i => i !== e.target.innerText)
      w.localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    addTask: function (e) {
      this.tasks.push(e.target.innerText)
      e.target.innerText = 'My New Task'
      w.localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  }
})
Vue.config.devtools = true

function getQuote () {
  let store = JSON.parse(w.localStorage.getItem('quote'))
  if (store.date === new Date().getDay()) {
    console.log('♻️ Reusing Quote From LocalStorage')
    App.quote = store.quote
  } else {
    window.fetch('http://quotes.rest/qod.json?category=inspire').then(r => r.json()).then(res => {
      App.quote = {
        qt: res.contents.quotes[0].quote,
        author: res.contents.quotes[0].author
      }
      w.localStorage.setItem('quote', JSON.stringify({
        'date': new Date().getDay(),
        'quote': {
          qt: res.contents.quotes[0].quote,
          author: res.contents.quotes[0].author
        }
      }))
    })
  }
}
function getLatestVideo () {
  let store = JSON.parse(w.localStorage.getItem('yt'))
  yt.forEach(i => {
    if (store.date === new Date().getDay()) {
      console.log(`♻️ Reusing ${i.store} From LocalStorage`)
      App.yt[yt.findIndex(x => x.id === i.id)].url = store[i.store]
    } else {
      w.fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${i.id}&maxResults=1&order=date&type=video&key=${w.options.key}`).then(res => res.json()).then(res => {
        App.yt[yt.findIndex(x => x.id === i.id)].url = 'https://www.youtube.com/watch?v=' + res.items[0].id.videoId
        let obj1 = {
          [i.store]: 'https://www.youtube.com/watch?v=' + res.items[0].id.videoId
        }
        let obj2 = store
        store = Object.assign(obj1, obj2)
        store.date = new Date().getDay()
        w.localStorage.setItem('yt', JSON.stringify(store))
      })
    }
  })
}
function getLatestWallpaper () {
  let store = JSON.parse(w.localStorage.getItem('wallpaper'))
  if (store.date === new Date().getDay()) {
    console.log('♻️ Reusing Wallpaper From LocalStorage')
    document.body.style.backgroundImage = `url(${store.url})`
  } else {
    w.fetch(`https://www.reddit.com/r/${w.options.subreddit}/hot.json?sort=new&raw_json=1`).then(i => i.json()).then(res => {
      document.body.style.backgroundImage = `url(${res.data.children[0].data.preview.images[0].source.url})`
      w.localStorage.setItem('wallpaper', JSON.stringify({
        url: res.data.children[0].data.preview.images[0].source.url,
        date: new Date().getDay()
      }))
    })
  }
}
setInterval(() => {
  App.time = dayjs().format('h:mm:ss a')
}, 1000)
getLatestVideo()
getQuote()
w.App = App

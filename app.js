import moment from 'moment'
import shave from 'shave'

let w = window

function SearchBar () {
  let generatedMoment = moment()
  let searchBar = document.querySelector('.main-search-bar')
  let day = searchBar.querySelector('#day')
  let time = searchBar.querySelector('#time')
  day.innerHTML = generatedMoment.format('Do MMMM YYYY')
  time.innerHTML = generatedMoment.format('h:mm:ss a')
  let timer = setInterval(() => {
    time.innerHTML = moment().format('h:mm:ss a')
  }, 1000)
  searchBar.addEventListener('input', onInput)

  function onInput () {
    searchBar.innerHTML = ''
    clearInterval(timer)
    searchBar.removeEventListener('input', onInput)
    searchBar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        let query = searchBar.innerText
        w.location.href = 'http://google.com/search?q=' + query
      }
    })
  }
}

function Quote () {
  let capturedQuote = document.querySelector('.main-quote')
  let store = JSON.parse(w.localStorage.getItem('quote')) || { date: 0 }
  if (new Date().getDay() === store.date) {
    console.log('REUSING QUOTE!')
    capturedQuote.innerHTML = store.quote
  } else {
    w.fetch('http://quotes.rest/qod.json?category=inspire').then(res => res.json()).then(res => {
      console.log(res.contents.quotes[0].quote + ' -- ' + res.contents.quotes[0].author)
      capturedQuote.innerHTML = '<span id="quote-txt">' + res.contents.quotes[0].quote + '</span><br /> -- ' + res.contents.quotes[0].author
      shave('#quote-txt', 75)
      w.localStorage.setItem('quote', JSON.stringify({
        'quote': capturedQuote.innerHTML,
        'date': new Date().getDay()
      }))
    })
  }
}

function Buttons () {
  let capturedRegular = document.querySelector('#regular')
  let links = ['https://www.youtube.com/', 'spotify:/', 'https://github.com/', 'vscode:/']
  let used = 1
  capturedRegular.addEventListener('click', () => {
    let timer = setInterval(() => {
      w.open(links[used])
      if (used === links.length - 1) {
        console.log('Corvette')
        clearInterval(timer)
        w.location.href = links[0]
      } else {
        used += 1
      }
    }, 5000)
  })
}

function Links () {
  let capturedWrapper = document.querySelector('#site-links')
  let content = ''
  let links = [{
    nm: 'Youtube',
    url: 'https://youtube.com',
    img: 'fab fa-youtube',
    color: 'red'
  },
  {
    nm: 'Github',
    url: 'https://github.com',
    img: 'fab fa-github',
    color: 'black'
  },
  {
    nm: 'CSS-Tricks',
    url: 'https://css-tricks.com/',
    color: 'orange',
    img: 'fas fa-asterisk'
  },
  {
    nm: 'Reddit',
    url: 'https://www.reddit.com/',
    color: 'red',
    img: 'fab fa-reddit'
  },
  {
    nm: 'Fossbytes',
    url: 'https://fossbytes.com/',
    color: 'blue',
    img: 'far fa-newspaper'
  },
  {
    nm: 'OMG! Ubuntu!',
    url: 'https://www.omgubuntu.co.uk/',
    color: 'orange',
    img: 'fab fa-ubuntu'
  },
  {
    nm: 'xkcd',
    url: 'https://xkcd.com/',
    color: 'black',
    img: 'fas fa-rss'
  },
  {
    nm: 'CommitStrip',
    url: 'http://www.commitstrip.com/en/?',
    color: 'black',
    img: 'fas fa-rss'
  },
  {
    spacer: true
  },
  {
    nm: 'Spotify',
    url: 'spotify:/',
    img: 'fab fa-spotify',
    color: 'green'
  },
  {
    nm: 'VS Code',
    url: 'vscode:/',
    color: 'blue',
    img: 'fas fa-infinity'
  },
  {
    nm: 'Minecraft',
    url: 'minecraft:/',
    color: 'black',
    img: 'fas fa-cubes'
  }
  ]
  links.forEach(item => {
    let spacer = '<div class="list-spacer">-- Programs --</div>'
    content += (!item.spacer) ? `<a class="list-item" href="${item.url}">
    <i class="${item.img}" style="color: var(--${item.color || 'black'})"></i>
    <span>${item.nm || ''}</span>
    </a>` : spacer
  })
  capturedWrapper.innerHTML = content
}

function Youtube () {
  let channels = [
    {
      id: 'UC-lHJZR3Gqxm24_Vd_AJ5Yw',
      element: '#pewds',
      store: 'pewds'
    },
    {
      id: 'UCeeFfhMcJa1kjtfZAGskOCA',
      element: '#techlinked',
      store: 'techlinked'
    },
    {
      id: 'UCXuqSBlHAE6Xw-yeJA0Tunw',
      element: '#ltt',
      store: 'ltt'
    }
  ]
  channels.forEach(i => {
    console.log(i)
    let display = document.querySelector(i.element)
    console.log(w.localStorage.getItem('yt'))
    let store = JSON.parse(w.localStorage.getItem('yt'))
    if (store[i.store].date === new Date().getDay()) {
      console.log('REEE', store)
      display.href = store[i.store].url
    } else {
      w.fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + i.id + '&maxResults=1&order=date&type=video&key=AIzaSyCAO49V3neY14ZsWYRw6hCEhxj3LM0l1iY').then(i => i.json()).then(res => {
        display.href = 'https://www.youtube.com/watch?v=' + res.items[0].id.videoId
        let obj2 = JSON.parse(w.localStorage.getItem('yt'))
        let obj1 = {
          [i.store]: {
            'url': 'https://www.youtube.com/watch?v=' + res.items[0].id.videoId,
            'date': new Date().getDay()
          } }
        let obj3 = Object.assign(obj2, obj1)
        w.localStorage.setItem('yt', JSON.stringify(obj3))
      })
    }
  })
  /*  w.fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC-lHJZR3Gqxm24_Vd_AJ5Yw&maxResults=1&order=date&type=video&key=AIzaSyCAO49V3neY14ZsWYRw6hCEhxj3LM0l1iY').then(i => i.json()).then(res => {
      display.href = 'https://www.youtube.com/watch?v=' + res.items[0].id.videoId
      w.localStorage.setItem('pewds', JSON.stringify({
        'url': 'https://www.youtube.com/watch?v=' + res.items[0].id.videoId,
        'date': new Date().getDay()
      }))
    })
  } */
}
SearchBar()
Quote()
Buttons()
Links()
Youtube()

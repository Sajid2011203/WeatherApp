let weatherIcon = document.getElementById('condition')
let city = document.getElementById('city')
let country = document.getElementById('country')
let main = document.getElementById('main')
let des = document.getElementById('description')
let temp = document.getElementById('temp')
let pressure = document.getElementById('pressure')
let humidity = document.getElementById('humidity')
let inputCity = document.getElementById('city-input')
let historyElm = document.getElementById('history')
let masterHistory = document.getElementById('master-history')

const API_KEY = 'd45772a7c6c8853cec3ba7a257927f88'
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?`
const imageURL = 'http://openweathermap.org/img/wn/'

const DEFAULT_CITY = 'jessore,bd'

window.onload = function () {
  navigator.geolocation.getCurrentPosition(success => {
    getWeather(null, success.coords)
  },
  error => {
    getWeather()
    })
  
  axios.get('/api/history')
    .then(({ data }) => {
      if (data.length > 0) {
        updateHistory(data)
      } else {
        historyElm.innerHTML = 'There Is No History'
      }
    })
    .catch(e => {
      console.log(e);
      alert('Error Occurred on get request')
  })
  
  inputCity.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      if (e.target.value) {
        getWeather(e.target.value, null, weatherDataObj => {
          e.target.value = ''
          axios.post('/api/history', weatherDataObj)
            .then(({data}) => {
              updateHistory(data)
            })
            .catch(e => {
              console.log(e.response.data)
              alert('Error Occurred')
            })
        })
       
      } else {
        alert('Please Enter a Valid City')
      }
    }
  })
}

function getWeather(city = DEFAULT_CITY, coords, cb) {
  let url = BASE_URL
  let key = API_KEY
  city !== null
    ? url = `${url}q=${city}&appid=${key}`
    : url = `${url}lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}`
  axios.get(url)
    .then(({ data }) => {
      let weatherDataObj = {
        icon: `${imageURL}${data.weather[0].icon}.png`,
        city: data.name,
        country: data.sys.country,
        main: data.weather[0].main,
        description: data.weather[0].description,
        temp: data.main.temp,
        pressure: data.main.pressure,
        humidity: data.main.humidity
        
      }
      setWeatherData(weatherDataObj)
      if (cb) {
        cb(weatherDataObj)
      }
    })
    .catch(e => {
      console.log(e.message)
      alert('Error Occurred at Get Request')
    })
}

function setWeatherData(dataObj) {
  weatherIcon.src = dataObj.icon
  city.innerHTML = dataObj.city
  country.innerHTML = dataObj.country
  main.innerHTML = dataObj.main
  des.innerHTML = dataObj.description
  temp.innerHTML = dataObj.temp
  pressure.innerHTML = dataObj.pressure
  humidity.innerHTML = dataObj.humidity
}

function updateHistory(history) {
  historyElm.innerHTML = ''
  
  history = history.reverse()
  history.forEach(h => {
    let tempHistory = masterHistory.cloneNode(true)
    tempHistory.id = ''
    tempHistory.getElementsByClassName('condition')[0].src = h.icon
    tempHistory.getElementsByClassName('main')[0].innerText = h.main
    tempHistory.getElementsByClassName('description')[0].innerText = h.description
    tempHistory.getElementsByClassName('city')[0].innerText = h.city
    tempHistory.getElementsByClassName('country')[0].innerText = h.country
    tempHistory.getElementsByClassName('temp')[0].innerText = h.temp
    tempHistory.getElementsByClassName('pressure')[0].innerText = h.pressure
    tempHistory.getElementsByClassName('humidity')[0].innerText = h.humidity
    historyElm.appendChild(tempHistory)
  })
}
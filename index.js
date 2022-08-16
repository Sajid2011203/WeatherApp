const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/history', require('./api/route'))

const port = process.env.PORT || 4444

app.listen(port, () => {
  console.log('app is running on port ' + port)
  mongoose.connect(
    'mongodb+srv://admin:adminnaim@cluster0.mzbu66p.mongodb.net/weatherApp?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    },
    () => {
      console.log('Database Connected')
    }
  )
})


const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://moi:moi@ds237808.mlab.com:37808/star-wars-quotes', (err, client) => {

    if (err) return console.log('Error connecting db', err)

    let dbo = client.db('star-wars-quotes')

    app.listen(3000, () => {
        console.log('listening on 3000')
    })

    app.post('/quotes', (req, res) => {
        console.log('Body of the request :', req.body)
        dbo.collection('quotes').save(req.body, (err, result) => {
            console.log('Saved to database')
            res.redirect('/')
        })
    })

    app.get('/', (req, res) => {
        dbo.collection('quotes').find().toArray(function(err, results) {
            console.log(results)
        })
            res.sendFile(__dirname + '/index.html')
    })

})


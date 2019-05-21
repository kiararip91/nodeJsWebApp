const express = require("express")
const path = require("path")
const hbs = require("hbs")

const geocode = require("../utils/geocode")
const forecast = require("../utils/forecast") 

const publicFolderPath = path.join(__dirname, "../public")
const partialsFolderPath = path.join(__dirname, '../templates/partials')
const app = express()

const port = process.env.PORT || 3000

//Setup handleBars engine and views location 
app.set('view engine', 'hbs')
app.set('views', 'templates/views')
hbs.registerPartials(partialsFolderPath)

//Setup static directory to serve
app.use(express.static(publicFolderPath))

app.get('', (req, res) => {
    res.render("index", {
        "title": "Weather",
        "name":"Chiara Ripanti"
    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        "title": "About",
        "name":"Pluto"
    })
})

app.get('/help', (req, res) => {
    res.render("help", {
        "title": "Help",
        "name":"Pippo",
        "message": "this is the help page"
    })
})

app.get('/help/*', (req, res) => {
    res.render("error", {
        "errorMessage": "404 - Help article not found"
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
       })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})  => {
        if(error){
            return res.send({error})
        }
        
        forecast(latitude, longitude, (error, forecast) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast,
                location,
                "address" : req.query.address
            })
          })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
       })
    }
    res.send({
         products: []
    })
})

app.get('*', (req, res) => {
    res.render("error", {
        "errorMessage": "404 - Page not found"
    })
})


app.listen(port, () => {
    console.log("server is running")
})
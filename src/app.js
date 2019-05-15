const express = require("express")
const path = require("path")
const hbs = require("hbs")

const publicFolderPath = path.join(__dirname, "../public")
const partialsFolderPath = path.join(__dirname, '../templates/partials')
const app = express()

//Setup handleBars engine and views location 
app.set('view engine', 'hbs')
app.set('views', 'templates/views')
hbs.registerPartials(partialsFolderPath)

//Setup static directory to serve
app.use(express.static(publicFolderPath))

app.get('', (req, res) => {
    res.render("index", {
        "title": "ciao",
        "name":"paperino"
    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        "title": "about",
        "name":"pluto"
    })
})

app.get('/help', (req, res) => {
    res.render("help", {
        "title": "help",
        "name":"pippo",
        "message": "this is a message"
    })
})

app.get('/help/*', (req, res) => {
    res.render("error", {
        "errorMessage": "404 - Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render("error", {
        "errorMessage": "404 - Page not found"
    })
})


app.listen(3000, () => {
    console.log("server is running")
})
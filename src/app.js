const path = require('path')   //core node module
const express = require('express')   //it will return a function that we are storing in variable app

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const hbs = require('hbs')
const app = express()

//define path for express config
const publicDirectoryName = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')  //remember by default views file should be in views directory not under templates folder but standalone views folder in web-server
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location and partials file
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryName))  //this will handle home page pointing to index.html in public directory

// app.com
// app.get('/' , (req, res) => {    //when using express.static, this won't work now so no use of this now
//     res.send('Hello Express!')
// })

// app.com/help
app.get('/help' , (req, res) => {
    res.render('help', {
        message : 'This Page is built to help you with the functionalities of app!🙂',
        title : 'Help Section',  
        name: 'Kritika'
    })
})

// app.com/about
app.get('/about' , (req, res) => {
    res.render('about', {
        title : 'About Me',  
        name: 'Kritika'
    })
})

app.get('/' , (req, res) => {    //we use render when we want a view ( here index.hbs ) to get rendered
        res.render('index', {
            title : 'Weather App',  //second argument defines the list of values accessible by index.hsb file
            name: 'Kritika'
        })  
    })

// app.com/weather
app.get('/weather', (req, res) => {
    const address = req.query.address
        if (!address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error){
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
            return res.send({ error })
        }
            res.send({
                location,
                address,
                forecast : forecastData
            })
          })
    })
    
})

//using wildcard * to match a specific pattern, anyone who visits help page and then any sub page, in case of error this msg is displayed
app.get('/help/*',(req, res) => {
    res.render('error', {
        message: 'Sorry, help article could not found!',
        name: 'Kritika',
        title: '404'
    })
})

// * wildcard says that every url is a match and thus shows this error on every routed not mentioned above
app.get('*',(req, res) => {
    res.render('error', {
        title: '404 Page',
        message: 'Page could not be found!',
        name: 'Kritika'
    })
})

//3000 is port number
app.listen(3000, () => {
    console.log('Server has started functioning!')
})

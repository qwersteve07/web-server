const path = require('path');
const express = require("express");
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');
const hbs = require('hbs');

const app = express();

const port = process.env.PORT || 3000;

// const helpPagePath = path.join(__dirname,'../public/help.html');
// const aboutPagePath = path.join(__dirname,'../public/about.html');

// Define path for Express config
const publicPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve 
app.use(express.static(publicPath))
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Welcome to NodeJS template page',
        content: 'here we have so many thins to learn',
        footer: '@copyright by Steve'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'ABOUT',
        content: 'My name is Steve, and this is my testing backend website.',
        footer: '@copyright by Steve'
    })
})

app.get('/products',(req,res)=>{
    console.log(req.query)
    if(!req.query.search){
        res.send({
            error: 'you must have a query.'
        })
    }

    res.send({
        product: []
    })
})

app.get('/weather',(req,res) => {
    let address = req.query.addr;
    if(!address){
        return res.send({
            error: 'you must enter an address'
        })
    }else{
        geocode(address,(error,data)=>{
            if(error){
                res.send(error)
                return 'nothing happens'
            }
            weather(data,(error,data2)=>{
                let d = Object.assign(data,data2);
                res.send(d)
            })
        })
    }
})

app.get('/about/*',(req,res)=>{
    res.render('404',{
        title: '404 NOT FOUND',
        content: 'this is a page under About but found nothing',
        
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 NOT FOUND',
        content: 'this is a page but found nothing',
        
    })
})

// app.get("", (req, res) => {
//   res.send("Hello express!");
// });

// app.get('/help',(req, res)=>{
//     res.send('its a help page')
// })

// app.get('/about',(req,res) => {
//     res.send({
//         'title': 'about',
//         'page': '2'
//     })
// })



app.listen(port, () => {
  console.log("Server is up on port 3000.");
});


const path = require('path')
const express = require('express')
const data = require('./data')

const app = express()
const port = process.env.PORT || 3000


//define paths for express config
const publicDirPath = path.join(__dirname,'../public')
//const viewsPath = path.join(__dirname, '../templates/views')
app.use(express.static(publicDirPath))
//app.set('view engine', 'hbs')
//app.set('views', viewsPath)


app.get('', (req, res) => {
    res.render('index')
})

app.get('/search', (req, res) => {
    const email = req.query.email.toString().toLowerCase()
    if(!email) {
        return res.send({error : 'You must provide a valid email'})    
    }
    
    data(email, (error,body) => {
        if(error) {
            return res.send(error)
        }
        res.status(body.status).send(body.data)
    })
    
})

app.listen(port, () => {
    console.log('sever is up on port '+port)
})
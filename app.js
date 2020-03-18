const express = require('express')  
const app = express() 
const path = require('path') 
const createError = require('http-errors') 
const port = 3000  

const indexRouter = require('./routes/index') 
const loginRouter = require('./routes/login') 
const registerRouter = require('./routes/register') 
const dashboardRouter = require('./routes/dashboard') 

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); 
app.set('view options', {delimiter: '?'}); 

app.use(express.json()) 
app.use(express.urlencoded({ extended: false })) 
app.use(express.static(path.join(__dirname, 'public'))) 

app.use('/', indexRouter) 
app.use('/login', loginRouter) 
app.use('/register', registerRouter) 
app.use('/me', dashboardRouter) 

app.use(function(req, res, next) {     
     var err = createError(404)     
     next(err) 
}) 
 
app.use(function (err, req, res, next) {
    res.locals.pageData = {         
        title:'Error Page'     
        }         
        res.locals.message = err.message     
        res.locals.error = req.app.get('env') === 'development' ? err : {}     
             
        res.status(err.status || 500) 
        res.render('pages/error') }) 
app.listen(port, function() {     
    console.log(`Example app listening on port ${port}!`) 
})
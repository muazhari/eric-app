const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')

const app = express()

const http = require('http')

const server = http.createServer(app)
const io = require('socket.io').listen(server)

app.io = io

const chatSocketIOController = require('./controller/chat')(io)

// io.on("connection", socket => {
//     io.emit('send chat', 'users');
//     console.log("A user connected s");
// });
// io.emit('send chat', 'users');
// app.use((req, res, next) => {
//     req.io = io;
//     next()
// });

// console.log(io)
console.log('msak')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/mobile', indexRouter)
app.use('/web', usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

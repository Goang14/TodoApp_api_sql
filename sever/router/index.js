const student = require('./student')


function route(app){
  app.use('/', student)
}

module.exports = route
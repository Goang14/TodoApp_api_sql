const express =  require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.use(morgan('combined'))

app.use(express.urlencoded({ extended:true}))
app.use(bodyParser.json())

//router
require('./router')(app);
//port
const PORT = 7000;

//chay
app.listen(PORT, ()=> {
  console.log(`Server dang chay http://localhost:${PORT}`)
})



const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan')
const routes = require('./routers/routes')
const app = express();

dotenv.config()

mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    })
    .then((result) => console.log("MongoDb is connected"))
    .catch((err) => console.log(err))


//Global - middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));



app.use('/', routes)




app.listen(3000, () => {
    console.log('Server running on port 3000')
})
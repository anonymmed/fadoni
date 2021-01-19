const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fadoni', {useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('connected to db')
}).catch((error) => {
    console.log(error)
})

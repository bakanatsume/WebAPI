const mongoose = require('mongoose')

mongoose.connect(
    `mongodb://localhost:27017/chhantyalBank`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('database connected!!')
});